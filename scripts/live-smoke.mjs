import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
try { process.loadEnvFile('.env.local'); } catch { /* CI injects secrets */ }
const origin = process.env.LIVE_TEST_ORIGIN || 'http://127.0.0.1:3107';
const jars = new Map();
async function request(actor, path, payload, expected = 200) {
  const headers = { Origin: origin };
  if (payload !== undefined) headers['Content-Type'] = 'application/json';
  if (jars.has(actor)) headers.Cookie = jars.get(actor);
  const response = await fetch(origin + path, { method: payload === undefined ? 'GET' : 'POST', headers, body: payload === undefined ? undefined : JSON.stringify(payload) });
  const set = response.headers.getSetCookie();
  if (set.length) jars.set(actor, set.map(value => value.split(';')[0]).join('; '));
  const data = await response.json();
  assert.equal(response.status, expected, `${path}: ${data.error || response.status}`);
  return data;
}
await request('host', '/api/live/host', { action: 'login', password: process.env.LIVE_HOST_PASSWORD });
const host = await request('host', '/api/live/host', { action: 'create', mode: 'rehearsal' });
const code = host.room.code;
const invite = new URL(host.joinPath, origin).searchParams.get('invite');
const state = who => request(who, `/api/live/state?room=${code}`);
const answer = (who,step,data) => request(who, '/api/live/answer', { room:code,step,data,requestId:randomUUID() });
async function action(name, extra={}) {
 const current=await request('host',`/api/live/host?room=${code}`);
 return request('host','/api/live/host',{action:name,room:code,expectedRevision:current.room.revision,requestId:randomUUID(),...extra});
}
await request('outsider','/api/live/join',{room:code,name:'Not invited',consent:true},403);
await Promise.all(['A','B'].map(name=>request(name,'/api/live/join',{room:code,invite,name,consent:true})));
await action('forecast',{forecast:{'More interested':1,'About the same':1,'Less interested':0,'Not sure':0}});
const paired=await action('pair');
assert.equal(paired.counts.paired,2);
const a=await state('A'),b=await state('B');
assert.equal(a.participant.pairLabel,b.participant.pairLabel);
assert.notEqual(a.participant.id,b.participant.id);
await action('next');
const late=await request('late','/api/live/join',{room:code,invite,name:'Late',consent:true});
assert.equal(late.participant.waiting,true);
await Promise.all([
 answer('A','compose',{message:'Can we talk after this?',intention:'Ask about a book club.'}),
 answer('B','compose',{message:'How do you know Ivana?',intention:'Find out how they met the author.'}),
]);
await action('next');
const read=await state('B');
assert.equal(read.partnerMessage,'Can we talk after this?');
assert.doesNotMatch(JSON.stringify(read),/Ask about a book club|tokenHash|inviteToken/);
await Promise.all(['A','B'].map(who=>answer(who,'interpret',{interpretation:'A friendly question.',confidence:'Somewhat sure'})));
await action('next');
await request('B','/api/live/typing',{room:code,active:true});
assert.equal((await state('A')).partnerTyping,true);
await action('pause');
assert.equal((await state('A')).partnerTyping,false);
await request('A','/api/live/answer',{room:code,step:'reply',data:{reply:'Yes.',expectation:'A friendly reply.'}},409);
await action('resume');
await request('B','/api/live/typing',{room:code,active:true});
await new Promise(resolve=>setTimeout(resolve,3200));
assert.equal((await state('A')).partnerTyping,false);
await Promise.all(['A','B'].map(who=>answer(who,'reply',{reply:'Yes, that sounds good.',expectation:'A friendly reply.'})));
assert.equal((await state('A')).partnerReply,undefined);
await action('next');
assert.equal((await state('A')).partnerReply,'Yes, that sounds good.');
await action('next');
await Promise.all(['A','B','late'].map(who=>answer(who,'context',{contextTone:'Neutral',contextReply:'Tomorrow works.'})));
await action('next');
await Promise.all(['A','B'].map(who=>answer(who,'room',{interest:'More interested'})));
await action('next');
assert.equal((await state('B')).reveal,undefined);
await action('reveal');
assert.equal((await state('B')).reveal.intention,'Ask about a book club.');
const screen=await request('screen',`/api/live/screen?room=${code}&invite=${encodeURIComponent(invite)}`);
assert.doesNotMatch(JSON.stringify(screen),/book club|A friendly question|tokenHash|inviteToken/);
await action('next');await action('next');await action('next');
const final=await state('A');
assert.equal(final.reveal.responseCount,2);
assert.equal(final.reveal.counts['More interested'],2);
assert.equal((await state('A')).participant.pairLabel,a.participant.pairLabel);
const publicRoom=await request('host','/api/live/host',{action:'create',mode:'live'});
await request('early','/api/live/join',{room:publicRoom.room.code,name:'Early',consent:true},423);
console.log('PASS: real database, independent guest cookies, pairing, late join, saved answers, typing expiry, pause, final reveal, private projector and scheduled public opening.');
console.log(`Test room ${code} contains test answers only and expires automatically.`);
