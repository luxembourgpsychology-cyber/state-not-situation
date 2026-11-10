import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addParticipant, createRoom, EngineError, hostCommand, hostView, pairParticipants,
  participantView, setForecast, submitAnswer,
} from "../lib/live/engine.ts";

const NOW = Date.parse("2026-11-11T10:00:00Z");
function makeRoom(count = 2) {
  const room = createRoom({ id: "test-room", code: "ROOM42", inviteToken: "private-invite", mode: "rehearsal", now: NOW });
  for (let index = 0; index < count; index++) {
    addParticipant(room, {
      id: `guest-${index}`, tokenHash: `secret-token-hash-${index}`, name: `Guest ${index}`,
      joinedAt: NOW + index, context: index % 2 ? "b" : "a",
    });
  }
  return room;
}
let serial = 0;
function command(room, action) {
  hostCommand(room, action, `command-${++serial}`, room.revision);
  // Persistence owns revisions and commits each successful mutation atomically.
  room.revision++;
}
function pairedRoom() {
  const room = makeRoom();
  pairParticipants(room, () => 0.999);
  command(room, "next");
  return room;
}
function composeBoth(room) {
  submitAnswer(room, "guest-0", "compose", { message: "A message", intention: "A private intention" });
  submitAnswer(room, "guest-1", "compose", { message: "B message", intention: "B private intention" });
}
const forecast = { "More interested": 1, "About the same": 1, "Less interested": 0, "Not sure": 0 };

test("room defaults are an empty rehearsal, with no fake partners, answers, or forecast", () => {
  const room = makeRoom(0);
  assert.equal(room.step, "lobby");
  assert.equal(room.expiresAt, NOW + 86_400_000);
  assert.deepEqual(room.answers, {});
  assert.deepEqual(room.pairs, []);
  assert.equal(Object.values(room.forecast).reduce((sum, n) => sum + n, 0), 0);
  assert.throws(() => command(room, "next"), /Match at least one pair/);
  assert.throws(() => command(room, "skip"), /start with The Message/);
});

test("matching is stable once started, with an explicit real waiting guest for an odd count", () => {
  const room = makeRoom(5);
  pairParticipants(room, () => 0.999);
  const ids = room.pairs.flatMap(pair => [pair.a, pair.b]);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(participantView(room, "guest-4").participant.waiting, true);
  command(room, "next");
  const pairs = structuredClone(room.pairs);
  assert.throws(() => pairParticipants(room), /Pairs stay together/);
  const original = room.participants[0];
  addParticipant(room, { ...original, name: "Changed on reconnect" });
  assert.deepEqual(room.pairs, pairs);
  assert.equal(room.participants.length, 5);
  assert.equal(room.participants[0].name, "Guest 0");
  assert.throws(() => submitAnswer(room, "guest-4", "compose", { message: "hello", intention: "hello" }), /waiting for the next/);
  addParticipant(room, { id: "late", tokenHash: "late-hash", name: "Late", joinedAt: NOW + 10, context: "b" });
  assert.equal(participantView(room, "late").participant.waiting, true);
  assert.deepEqual(room.pairs, pairs);
  while (room.step !== "context") command(room, "next");
  assert.equal(participantView(room, "late").participant.waiting, false);
  submitAnswer(room, "late", "context", { contextTone: "Neutral", contextReply: "Tomorrow works." });
});

test("private partner intention stays off every pre-reveal DTO, even after interpretation is saved", () => {
  const room = pairedRoom();
  composeBoth(room);
  assert.equal(participantView(room, "guest-0").partnerMessage, undefined);
  command(room, "next");
  assert.equal(participantView(room, "guest-0").partnerMessage, "B message");
  submitAnswer(room, "guest-0", "interpret", { interpretation: "My guess", confidence: "Not sure" });
  for (const step of ["interpret", "reply", "reply_delivered", "context", "room", "ready_reveal"]) {
    assert.equal(room.step, step);
    const guest = participantView(room, "guest-0");
    assert.equal(guest.reveal, undefined);
    assert.doesNotMatch(JSON.stringify(guest), /B private intention|secret-token-hash|private-invite/);
    assert.doesNotMatch(JSON.stringify(hostView(room)), /A private intention|B private intention|A message|B message/);
    if (step === "context") setForecast(room, forecast);
    if (step !== "ready_reveal") command(room, "next");
  }
  assert.throws(() => command(room, "next"), /final reveal control/);
  command(room, "reveal");
  const reveal = participantView(room, "guest-0").reveal;
  assert.equal(reveal.intention, "B private intention");
  assert.equal(reveal.interpretation, "My guess");
  assert.doesNotMatch(JSON.stringify(reveal), /A private intention/);
});

test("reply delivery is host controlled and independent of private expectations", () => {
  const room = pairedRoom();
  composeBoth(room);
  command(room, "next");
  command(room, "next");
  submitAnswer(room, "guest-0", "reply", { reply: "A actual reply", expectation: "A private expectation" });
  submitAnswer(room, "guest-1", "reply", { reply: "B actual reply", expectation: "B private expectation" });
  assert.equal(participantView(room, "guest-0").partnerReply, undefined);
  command(room, "next");
  assert.equal(participantView(room, "guest-0").partnerReply, "B actual reply");
  assert.doesNotMatch(JSON.stringify(participantView(room, "guest-0")), /B private expectation/);
  command(room, "next");
  command(room, "skip");
  command(room, "reveal");
  command(room, "next");
  const reveal = participantView(room, "guest-0").reveal;
  assert.equal(reveal.expectation, "A private expectation");
  assert.equal(reveal.reply, "B actual reply");
});

test("accepted answers cannot be changed, retries are safe, unexpected payload fields are ignored", () => {
  const room = pairedRoom();
  const data = { message: "  One message  ", intention: "One intention", interest: "Less interested", admin: true };
  submitAnswer(room, "guest-0", "compose", data);
  submitAnswer(room, "guest-0", "compose", data);
  assert.deepEqual(room.answers["guest-0"], { message: "One message", intention: "One intention" });
  assert.throws(() => submitAnswer(room, "guest-0", "compose", { ...data, message: "Changed" }), /stays locked/);
  assert.throws(() => submitAnswer(room, "guest-1", "compose", { message: "x".repeat(301), intention: "ok" }), /300 characters/);
  assert.throws(() => submitAnswer(room, "guest-1", "room", { interest: "More interested" }), /another step/);
  assert.deepEqual(room.answers["guest-1"], {});
});

test("paused and Look up rooms reject submissions and advancing, without changing saved answers", () => {
  const room = pairedRoom();
  submitAnswer(room, "guest-0", "compose", { message: "Saved", intention: "Saved intention" });
  const before = structuredClone(room.answers);
  command(room, "pause");
  assert.equal(room.paused, true);
  assert.throws(() => command(room, "next"), /Return everyone/);
  assert.throws(() => submitAnswer(room, "guest-1", "compose", { message: "Other", intention: "Other" }), /room is paused/);
  command(room, "resume");
  command(room, "look_up");
  assert.equal(room.lookUp, true);
  assert.throws(() => command(room, "next"), /Return everyone/);
  command(room, "return");
  assert.deepEqual(room.answers, before);
  assert.equal(room.step, "compose");
});

test("commands are idempotent before revision checking, stale commands cannot advance", () => {
  const room = pairedRoom();
  const revision = room.revision;
  hostCommand(room, "next", "same-request", revision);
  room.revision++;
  const step = room.step;
  hostCommand(room, "next", "same-request", revision);
  assert.equal(room.step, step);
  assert.throws(() => hostCommand(room, "next", "new-request", revision), error => error instanceof EngineError && error.status === 409);
  assert.equal(room.step, step);
  assert.throws(() => hostCommand(room, "reveal", "premature", room.revision), /Complete or skip/);
});

test("forecast must be a genuine nonzero prediction and locks before audience responses", () => {
  const room = pairedRoom();
  while (room.step !== "context") command(room, "next");
  assert.throws(() => command(room, "next"), /Save your prediction/);
  assert.throws(() => setForecast(room, { ...forecast, "More interested": -1 }), /whole number/);
  assert.throws(() => setForecast(room, Object.fromEntries(Object.keys(forecast).map(label => [label, 0]))), /at least one/);
  setForecast(room, forecast);
  command(room, "next");
  assert.equal(room.step, "room");
  assert.equal(room.forecastLocked, true);
  assert.throws(() => setForecast(room, forecast), /already locked/);
  assert.equal(participantView(room, "guest-0").reveal, undefined);
});

test("final counts include only real submitted answers and no missing or fabricated response", () => {
  const room = pairedRoom();
  while (room.step !== "context") command(room, "next");
  setForecast(room, forecast);
  command(room, "next");
  submitAnswer(room, "guest-0", "room", { interest: "More interested" });
  const readiness = hostView(room);
  assert.equal(readiness.counts.submitted, 1);
  assert.equal(readiness.counts.total, 2);
  assert.equal(room.answers["guest-1"].interest, undefined);
  command(room, "next");
  command(room, "reveal");
  command(room, "next");
  command(room, "next");
  command(room, "next");
  const reveal = participantView(room, "guest-0").reveal;
  assert.equal(reveal.responseCount, 1);
  assert.deepEqual(reveal.counts, { "More interested": 1, "About the same": 0, "Less interested": 0, "Not sure": 0 });
  assert.deepEqual(reveal.forecast, forecast);
  reveal.forecast["More interested"] = 999;
  assert.equal(room.forecast["More interested"], 1, "DTOs cannot mutate the persisted forecast");
});

test("unknown participants and invalid credentials cannot inspect or replace another participant", () => {
  const room = makeRoom();
  assert.throws(() => participantView(room, "intruder"), error => error.status === 403);
  assert.throws(() => addParticipant(room, { ...room.participants[0], tokenHash: "wrong" }), error => error.status === 403);
  assert.equal(hostView(room).counts.joined, 2);
  const guest = participantView(room, "guest-0");
  guest.own.message = "Client mutation";
  assert.equal(room.answers["guest-0"].message, undefined);
});
