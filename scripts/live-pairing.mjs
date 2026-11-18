import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { connect, constants } from "node:http2";
import { writeFile } from "node:fs/promises";

try { process.loadEnvFile(".env.local"); } catch { /* CI can inject the host password. */ }
const origin = process.env.LIVE_TEST_ORIGIN || "http://127.0.0.1:3117";
const groupSizes = (process.env.LIVE_PAIRING_COUNTS || "4,10,20,50").split(",").map(Number);
assert(groupSizes.every(size => Number.isInteger(size) && size >= 2 && size <= 120), "Use group sizes between 2 and 120");
const cookies = new Map();
const report = { origin, startedAt: new Date().toISOString(), retriedReads: 0, retriedSends: 0, groups: [] };
let roomCode;
let connection;
const connections = new Set();

function browserRequest(path, options) {
  if (!origin.startsWith("https:")) return fetch(origin + path, options);
  // Multiplex the guest requests over HTTP/2, as the deployed browser page
  // does, instead of opening 50 new TLS connections from one test computer.
  if (!connection || connection.closed || connection.destroyed) {
    connection = connect(origin);
    connections.add(connection);
    const current = connection;
    current.on("error", () => { /* Each active stream reports its own error. */ });
    current.on("goaway", () => { current.close(); });
    current.on("close", () => connections.delete(current));
  }
  return new Promise((resolve, reject) => {
    const stream = connection.request({ ":method": options.method, ":path": path, ...options.headers });
    const headers = new Headers();
    let status;
    let text = "";
    stream.setEncoding("utf8");
    stream.on("response", incoming => {
      status = incoming[":status"];
      for (const [name, value] of Object.entries(incoming)) {
        if (name.startsWith(":") || value === undefined) continue;
        for (const part of Array.isArray(value) ? value : [value]) headers.append(name, String(part));
      }
    });
    stream.on("data", chunk => { text += chunk; });
    stream.on("end", () => resolve(new Response(text, { status, headers })));
    stream.on("error", reject);
    stream.setTimeout(90000, () => {
      stream.close(constants.NGHTTP2_CANCEL);
      reject(new Error("Timed out waiting for the test response"));
    });
    stream.end(options.body);
  });
}

async function sendRequest(actor, path, payload, expected) {
  const headers = { Origin: origin };
  if (cookies.has(actor)) headers.Cookie = cookies.get(actor);
  if (payload !== undefined) headers["Content-Type"] = "application/json";
  const response = await browserRequest(path, {
    method: payload === undefined ? "GET" : "POST",
    headers,
    body: payload === undefined ? undefined : JSON.stringify(payload),
    signal: AbortSignal.timeout(90000),
  });
  const receivedCookies = response.headers.getSetCookie();
  if (receivedCookies.length) cookies.set(actor, receivedCookies.map(value => value.split(";")[0]).join("; "));
  const data = await response.json().catch(() => ({}));
  assert.equal(response.status, expected, `${actor} ${path.split("?")[0]} returned ${response.status}: ${data.error || ""}`);
  return data;
}

async function request(actor, path, payload, expected = 200) {
  // The app polls again after a lost read. Exercise that recovery without
  // replaying a join whose cookie might have been lost after it committed.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await sendRequest(actor, path, payload, expected);
    } catch (error) {
      const safeSend = path === "/api/live/answer" || path === "/api/live/typing"
        || (path === "/api/live/host" && payload?.requestId);
      const cause = error.cause?.code || error.cause?.message || error.message;
      if ((payload !== undefined && !safeSend) || attempt === 2) {
        throw new Error(`${error.message} (${cause})`, { cause: error });
      }
      if (payload === undefined) report.retriedReads++;
      else report.retriedSends++;
      console.log(`Retrying a ${payload === undefined ? "read" : "repeat-safe send"} after ${cause}.`);
      await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 500));
    }
  }
}

async function saveReport() {
  if (process.env.LIVE_PAIRING_REPORT) await writeFile(process.env.LIVE_PAIRING_REPORT, JSON.stringify(report, null, 2));
}

async function together(label, tasks) {
  const results = await Promise.allSettled(tasks);
  const failures = results.filter(result => result.status === "rejected");
  assert.equal(failures.length, 0, `${label}: ${failures.length} failed. ${failures[0]?.reason?.message || ""}`);
  return results.map(result => result.value);
}

function checkpoint(room) {
  const { run = 0, phase, moment, conversationPhase } = room.experience;
  return [run, phase, moment, conversationPhase, room.paused, room.lookUp].join(":");
}

async function command(action = "next") {
  const host = await request("host", `/api/live/host?room=${roomCode}`);
  return request("host", "/api/live/host", {
    action,
    room: roomCode,
    expectedRevision: host.room.revision,
    checkpoint: checkpoint(host.room),
    requestId: randomUUID(),
  });
}

const guestState = actor => request(actor, `/api/live/state?room=${roomCode}`);
const answer = (actor, run, data, expected = 200) => request(actor, "/api/live/answer", {
  room: roomCode, data: { run, ...data },
}, expected);
const onlyMessages = state => state.experience.chat.entries.filter(entry => entry.kind === "message");

try {
  assert(process.env.LIVE_HOST_PASSWORD, "The host password must be configured privately");
  await request("host", "/api/live/host", { action: "login", password: process.env.LIVE_HOST_PASSWORD });
  for (const count of groupSizes) {
    const started = performance.now();
    const created = await request("host", "/api/live/host", { action: "create", mode: "rehearsal", experience: true });
    roomCode = created.room.code;
    assert.equal(created.room.mode, "rehearsal");
    const invite = new URL(created.joinPath, origin).searchParams.get("invite");
    const actors = Array.from({ length: count }, (_, index) => `${roomCode}-phone-${index + 1}`);
    const joined = await together("simultaneous joins", actors.map((actor, index) => request(actor, "/api/live/join", {
      room: roomCode, invite, consent: true, name: `Phone ${index + 1}`,
    })));
    assert.equal(new Set(joined.map(state => state.participant.id)).size, count);
    assert.equal(new Set(actors.map(actor => cookies.get(actor))).size, count);
    const assignments = [];

    for (const run of [0, 1]) {
      await command();
      await together("simultaneous votes", actors.map(actor => answer(actor, run, { kind: "vote", choice: "Check again" })));
      assert.equal((await guestState(actors[0])).experience.totals, undefined);
      const votes = await command();
      assert.equal(votes.voteTotals["Check again"], count);
      await command();
      await together("simultaneous chat entry", actors.map(actor => answer(actor, run, { kind: "chat_join" })));
      const waiting = await request("host", `/api/live/host?room=${roomCode}`);
      assert.equal(waiting.chatReady, count);
      assert.equal(waiting.counts.paired, 0);
      const drawn = await command();
      assert.equal(drawn.counts.paired, Math.floor(count / 2) * 2);
      assert.equal(drawn.counts.waiting, count % 2);
      const roster = drawn.participants.filter(person => person.pairLabel);
      const labels = new Map();
      for (const person of roster) {
        const members = labels.get(person.pairLabel) || [];
        members.push(person.id);
        labels.set(person.pairLabel, members);
      }
      assert.equal(labels.size, Math.floor(count / 2));
      assert([...labels.values()].every(members => members.length === 2 && members[0] !== members[1]));
      assignments.push([...labels.values()].map(members => members.sort().join("/")).sort().join("|"));
      const expectedPartners = new Map([...labels.values()].flatMap(([a, b]) => [[a, b], [b, a]]));
      const pairedActors = actors.filter((actor, index) => expectedPartners.has(joined[index].participant.id));
      const identity = new Map(joined.map((state, index) => [state.participant.id, actors[index]]));
      const assignedViews = await together("assigned guest views", actors.map(guestState));
      await together("repeat entry", pairedActors.map(actor => answer(actor, run, { kind: "chat_join" })));
      const restored = await together("reconnect existing browsers", actors.map(actor => request(actor, "/api/live/join", {
        room: roomCode, invite, consent: true,
      })));
      restored.forEach((view, index) => {
        assert.equal(view.participant.id, joined[index].participant.id);
        assert.equal(view.experience.chat?.label, assignedViews[index].experience.chat?.label);
        assert.equal(view.experience.chat?.side, assignedViews[index].experience.chat?.side);
      });
      assert.equal((await request("host", `/api/live/host?room=${roomCode}`)).counts.joined, count);

      for (const moment of [0, 1, 2, 3]) {
        const text = actor => `TEST_${roomCode}_RUN${run}_M${moment}_${actor}`;
        await together("simultaneous messages", pairedActors.map(actor => answer(actor, run, { kind: "message", moment, text: text(actor) })));
        if (moment === 0) {
          const before = await together("pre-reveal privacy", pairedActors.map(guestState));
          before.forEach((view, index) => assert.deepEqual(onlyMessages(view).map(entry => entry.message.text), [text(pairedActors[index])]));
        }
        let host = await command();
        if (host.room.experience.conversationPhase === "waiting") {
          const held = await together("planted-line delivery", pairedActors.map(guestState));
          held.forEach(view => {
            const cue = onlyMessages(view).filter(entry => entry.moment === moment && entry.owner !== view.experience.chat.side);
            assert.equal(cue.length, view.experience.chat.side === (moment === 0 ? 0 : 1) ? 1 : 0);
            assert(cue.every(entry => !entry.message.text.startsWith("TEST_")));
          });
          host = await command();
        }
        assert.equal(host.room.experience.conversationPhase, "revealed");
        assert.doesNotMatch(JSON.stringify(host), /TEST_/);
        const revealed = await together("partner-only replies", pairedActors.map(guestState));
        revealed.forEach(view => {
          const partnerId = expectedPartners.get(view.participant.id);
          const peerActor = identity.get(partnerId);
          const messages = onlyMessages(view).filter(entry => entry.moment === moment && entry.owner !== view.experience.chat.side && entry.message.source !== "experiment");
          assert.deepEqual(messages.map(entry => entry.message.text), [text(peerActor)]);
          assert.equal(view.experience.chat.label, assignedViews[joined.findIndex(state => state.participant.id === view.participant.id)].experience.chat.label);
        });
        await command();
      }
      assert.equal((await guestState(actors[0])).room.experience.phase, "finished");
      if (run === 0) {
        const restarted = await command("restart_rehearsal");
        assert.equal(restarted.room.experience.run, 1);
        assert.equal(restarted.room.experience.phase, "welcome");
        assert.equal(restarted.counts.paired, 0);
        assert.equal(restarted.counts.joined, count);
        assert.equal(restarted.joinPath, created.joinPath);
        await answer(actors[0], 0, { kind: "vote", choice: "Put it away" }, 409);
      }
    }
    report.groups.push({ guests: count, pairs: Math.floor(count / 2), waiting: count % 2, repetitions: 2, seconds: Math.round((performance.now() - started) / 1000), freshDrawChanged: assignments[0] !== assignments[1], passed: true });
    await saveReport();
    console.log(JSON.stringify(report.groups.at(-1)));
  }
  report.finishedAt = new Date().toISOString();
  await saveReport();
  console.log("PASS: simultaneous guests, random draw, unique pairs, four moments, reconnect, repeat on the same QR, and private replies.");
} catch (error) {
  report.error = error.message;
  await saveReport();
  console.error(`FAIL in dedicated test room ${roomCode || "not created"}: ${error.message}`);
  process.exitCode = 1;
} finally {
  for (const active of connections) active.close();
}
