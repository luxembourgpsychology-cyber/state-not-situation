import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

try { process.loadEnvFile('.env.local'); } catch { /* CI can inject the password. */ }
const origin = process.env.LIVE_TEST_ORIGIN || 'http://127.0.0.1:3107';
const count = 40;
const jars = new Map();
const marker = randomUUID();
let code;

async function request(actor, path, payload) {
  const headers = { Origin: origin };
  if (payload !== undefined) headers['Content-Type'] = 'application/json';
  if (jars.has(actor)) headers.Cookie = jars.get(actor);
  const response = await fetch(origin + path, {
    method: payload === undefined ? 'GET' : 'POST', headers,
    body: payload === undefined ? undefined : JSON.stringify(payload),
    signal: AbortSignal.timeout(120000),
  });
  const cookies = response.headers.getSetCookie();
  if (cookies.length) jars.set(actor, cookies.map(value => value.split(';')[0]).join('; '));
  assert.equal(response.status, 200, `${actor} ${path.split('?')[0]} returned HTTP ${response.status}`);
  return response.json();
}

async function concurrent(label, work) {
  const started = performance.now();
  const results = await Promise.allSettled(work);
  const failed = results.filter(result => result.status === 'rejected');
  assert.equal(failed.length, 0, `${label}: ${failed.length} of ${count} requests failed${failed.length ? `; ${failed[0].reason.message}` : ''}`);
  console.log(`${label}: ${results.length} succeeded in ${((performance.now() - started) / 1000).toFixed(1)}s`);
  return results.map(result => result.value);
}

async function hostAction(action) {
  const current = await request('host', `/api/live/host?room=${code}`);
  return request('host', '/api/live/host', {
    action, room: code, expectedRevision: current.room.revision, requestId: randomUUID(),
  });
}

function assertPrivateGuestState(state, index) {
  const serialized = JSON.stringify(state);
  assert.doesNotMatch(serialized, /tokenHash|inviteToken|processedCommands/);
  assert.equal(state.reveal, undefined);
  assert.equal(state.partnerMessage, undefined, 'A partner message must not arrive during compose.');
  assert.equal(state.partnerReply, undefined);
  for (let other = 0; other < count; other++) {
    if (other !== index) assert.equal(serialized.includes(`LOAD_PRIVATE_INTENT_${other}_${marker}`), false, 'Another participant intention leaked.');
  }
}

try {
  assert.ok(process.env.LIVE_HOST_PASSWORD, 'LIVE_HOST_PASSWORD must be configured privately.');
  await request('host', '/api/live/host', { action: 'login', password: process.env.LIVE_HOST_PASSWORD });
  const created = await request('host', '/api/live/host', { action: 'create', mode: 'rehearsal' });
  code = created.room.code;
  console.log(`Created dedicated 40-guest load-test room ${code}.`);
  assert.equal(created.room.mode, 'rehearsal');
  const invite = new URL(created.joinPath, origin).searchParams.get('invite');
  assert.ok(invite, 'The private invitation is required.');
  const actors = Array.from({ length: count }, (_, index) => `load-${index}`);

  const joined = await concurrent('Concurrent joins', actors.map((actor, index) => request(actor, '/api/live/join', {
    room: code, invite, name: `Load guest ${index + 1}`, consent: true,
  })));
  const ids = new Set(joined.map(state => state.participant.id));
  assert.equal(ids.size, count, 'Every cookie jar must own a unique participant.');
  assert.equal(new Set(actors.map(actor => jars.get(actor))).size, count, 'Each participant needs an independent cookie.');

  const paired = await hostAction('pair');
  assert.equal(paired.counts.joined, count);
  assert.equal(paired.counts.paired, count);
  assert.equal(paired.counts.waiting, 0);
  assert.equal(new Set(paired.participants.map(person => person.id)).size, count);
  const pairCounts = new Map();
  for (const person of paired.participants) {
    assert.ok(person.pairLabel);
    pairCounts.set(person.pairLabel, (pairCounts.get(person.pairLabel) || 0) + 1);
  }
  assert.equal(pairCounts.size, count / 2, 'Exactly 20 distinct pairs must exist.');
  assert.deepEqual([...pairCounts.values()], Array(count / 2).fill(2), 'Every pair has exactly two guests.');

  const compose = await hostAction('next');
  assert.equal(compose.room.step, 'compose');
  await concurrent('Concurrent compose submissions', actors.map((actor, index) => request(actor, '/api/live/answer', {
    room: code, step: 'compose', requestId: randomUUID(),
    data: { message: `Load message ${index + 1}`, intention: `LOAD_PRIVATE_INTENT_${index}_${marker}` },
  })));

  const host = await request('host', `/api/live/host?room=${code}`);
  assert.equal(host.counts.joined, count);
  assert.equal(host.counts.submitted, count, 'All 40 committed submissions must survive competing writes.');
  assert.equal(host.counts.total, count);
  assert.equal(host.participants.filter(person => person.submitted).length, count);
  assert.equal(JSON.stringify(host).includes('LOAD_PRIVATE_INTENT_'), false, 'Host readiness must not expose answers.');

  const states = await concurrent('Independent saved-state reads', actors.map(actor => request(actor, `/api/live/state?room=${code}`)));
  states.forEach((state, index) => {
    assert.equal(state.participant.id, joined[index].participant.id, 'The original session identity must be stable.');
    assert.equal(state.own.message, `Load message ${index + 1}`);
    assert.equal(state.own.intention, `LOAD_PRIVATE_INTENT_${index}_${marker}`);
    assert.equal(state.participant.paired, true);
    assert.equal(state.participant.waiting, false);
    assertPrivateGuestState(state, index);
  });
  console.log(`PASS: ${count} unique cookie sessions, 20 unique real pairs, ${count} concurrent saved answers, stable identity, and sealed private data.`);
  console.log(`Cleanup: only dedicated rehearsal room ${code} was created or modified; it expires automatically after 24 hours.`);
} catch (error) {
  if (code) console.error(`Cleanup room: ${code}. No other room was modified.`);
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
}
