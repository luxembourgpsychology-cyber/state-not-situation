import assert from "node:assert/strict";
import { test } from "node:test";
import { addParticipant, createRoom, hostCommand, hostView, participantView } from "../lib/live/engine.ts";
import { advanceExperience, createBookExperience, submitExperienceAnswer } from "../lib/live/experience.ts";

function rehearsal() {
  const room = createRoom({ id: "test", code: "TEST1234", inviteToken: "rehearsal", mode: "rehearsal", now: 1 });
  room.experience = createBookExperience();
  let command = 0;
  const add = id => addParticipant(room, { id, name: `Guest ${id}`, tokenHash: `key-${id}`, joinedAt: 1, context: "a" });
  const next = () => hostCommand(room, "next", `cue-${++command}`, room.revision);
  const answer = (id, data) => submitExperienceAnswer(room, room.experience, id, { run: room.experience.run ?? 0, ...data });
  const state = id => participantView(room, id).experience;
  const chat = id => state(id).chat;
  const enterChat = id => answer(id, { kind: "chat_join" });
  const draw = () => advanceExperience(room, room.experience, () => 0.999);
  const message = (id, text) => answer(id, { kind: "message", moment: room.experience.moment, text });
  const chatMessages = id => chat(id).entries.filter(entry => entry.kind === "message").map(entry => entry.message.text);
  return { room, add, next, answer, state, chat, enterChat, draw, message, chatMessages };
}

test("Jessika’s vote is counted once and totals are released on the host cue", () => {
  const { room, add, next, answer, state } = rehearsal();
  add("a");
  add("b");
  add("c");
  assert.throws(() => answer("a", { kind: "vote", choice: "Check again" }), { code: "step_changed" });
  next();
  answer("a", { kind: "vote", choice: "Check again" });
  answer("a", { kind: "vote", choice: "Check again" });
  assert.throws(() => answer("a", { kind: "vote", choice: "Put it away" }), { code: "answer_locked" });
  answer("b", { kind: "vote", choice: "Put it away" });
  assert.equal(hostView(room).counts.submitted, 2);
  assert.equal(hostView(room).voteTotals, undefined);
  assert.equal(state("c").totals, undefined);
  assert.equal(state("c").vote, undefined);
  next();
  assert.deepEqual(state("c").totals, { "Put it away": 1, "Check again": 1, "Open something else": 0 });
  assert.throws(() => answer("c", { kind: "vote", choice: "Open something else" }), { code: "step_changed" });
});

test("both sides receive real replies only on reveal, with the planted line alternating A then B", () => {
  const { room, add, next, answer, chat, enterChat, draw, message, chatMessages } = rehearsal();
  add("a");
  add("b");
  next(); next(); next();
  enterChat("a");
  enterChat("b");
  assert.equal(room.experience.phase, "pairing");
  assert.equal(room.pairs.length, 0);
  draw();
  assert.equal(chat("a").side, 0);
  assert.equal(chat("b").side, 1);

  message("a", "A’s first line");
  message("b", "B’s first line");
  assert.deepEqual(chatMessages("a"), ["A’s first line"]);
  next();
  assert.deepEqual(chatMessages("a"), ["A’s first line", "Can I be honest?"]);
  assert.deepEqual(chatMessages("b"), ["B’s first line"]);
  assert.equal(chat("a").entries.find(entry => entry.message?.text === "Can I be honest?").message.source, "typed");
  answer("a", { kind: "cue_reply", moment: 0, text: "Sure." });
  assert(!chatMessages("b").includes("Sure."));
  next();
  assert(chatMessages("a").includes("B’s first line"));
  assert(chatMessages("b").includes("Sure."));
  assert.equal(chat("a").entries.find(entry => entry.message?.text === "Can I be honest?").message.source, "experiment");
  assert.doesNotMatch(JSON.stringify(hostView(room)), /first line|Sure\./);

  next();
  assert(chatMessages("a").includes("B’s first line"));
  assert.throws(() => answer("a", { kind: "message", moment: 0, text: "Stale" }), { code: "step_changed" });
  message("a", "How did you decide?");
  message("b", "What was your first thought?");
  next(); next();
  message("a", "A answers.");
  message("b", "B answers.");
  next();
  assert.equal(chat("a").cueShown, false);
  assert.equal(chat("b").cueShown, true);
  assert(!chatMessages("a").includes("Wait, really?"));
  assert(chatMessages("b").includes("Wait, really?"));
  assert(!chatMessages("b").includes("A answers."));
  next();
  assert(chatMessages("b").includes("A answers."));
});

test("only guests who tap Experience 2 are paired and an unfinished pair gets no invented reply", () => {
  const { room, add, next, enterChat, draw, message, chat, chatMessages } = rehearsal();
  for (const id of ["a", "b", "c", "d"]) add(id);
  next(); next(); next();
  enterChat("a");
  enterChat("b");
  enterChat("c");
  draw();
  assert.equal(room.pairs.length, 1);
  assert.equal(chat("c"), undefined);
  assert.equal(chat("d"), undefined);
  message("a", "Only one line was written.");
  next();
  assert.equal(room.experience.conversationPhase, "revealed");
  assert.deepEqual(chatMessages("a"), ["Only one line was written."]);
  assert.equal(chat("a").hasPartnerMessage, false);
  enterChat("d");
  assert.equal(room.pairs.length, 1);
  next();
  assert.equal(room.pairs.length, 2);
  assert.equal(chat("c").entries[0].moment, 1);
  assert.equal(chat("a").side, 0);
});

test("the host draws from the ready guests and keeps random pairs stable for 4, 10, 20, 50 and 51 guests", () => {
  for (const count of [4, 10, 20, 50, 51]) {
    const { room, add, next, enterChat, chat, message } = rehearsal();
    for (let index = 0; index < count; index++) add(`guest-${index}`);
    next(); next(); next();
    for (let index = 0; index < count; index++) enterChat(`guest-${index}`);
    assert.equal(room.pairs.length, 0, "tapping Experience 2 must wait for the host draw");
    assert.equal(hostView(room).chatReady, count);
    next();
    assert.equal(room.pairs.length, Math.floor(count / 2));
    const paired = room.pairs.flatMap(pair => [pair.a, pair.b]);
    assert.equal(new Set(paired).size, Math.floor(count / 2) * 2);
    assert(room.pairs.every(pair => pair.a !== pair.b));
    assert.equal(hostView(room).counts.waiting, count % 2);
    const originalPairs = structuredClone(room.pairs);
    for (const pair of room.pairs) {
      for (const id of [pair.a, pair.b]) {
        enterChat(id);
        addParticipant(room, { ...room.participants.find(person => person.id === id) });
        message(id, `A line from ${id}`);
      }
      assert.equal(chat(pair.a).label, chat(pair.b).label);
      assert.notEqual(chat(pair.a).side, chat(pair.b).side);
    }
    next(); next();
    assert.deepEqual(room.pairs, originalPairs);
    for (const pair of room.pairs) {
      const replies = chat(pair.a).entries.filter(entry => entry.kind === "message" && entry.owner === 1);
      assert(replies.some(entry => entry.message.text === `A line from ${pair.b}`));
      assert(replies.every(entry => entry.message.text === `A line from ${pair.b}` || entry.message.source === "experiment"));
    }
  }
});

test("a rehearsal can restart on the same QR while stale answers stay out of the new run", () => {
  const { room, add, next, enterChat, draw, message, answer } = rehearsal();
  for (const id of ["a", "b", "c", "d"]) add(id);
  next(); next(); next();
  for (const id of ["a", "b", "c", "d"]) enterChat(id);
  draw();
  message("a", "Old test message");
  const ids = room.participants.map(person => person.id);
  const invitation = room.inviteToken;
  const restart = () => hostCommand(room, "restart_rehearsal", "restart-test", room.revision);
  restart();
  assert.equal(room.experience.run, 1);
  assert.equal(room.experience.phase, "welcome");
  assert.deepEqual(room.participants.map(person => person.id), ids);
  assert.equal(room.inviteToken, invitation);
  assert.deepEqual(room.pairs, []);
  assert.deepEqual(room.experience.chatGuests, []);
  restart();
  assert.equal(room.experience.run, 1, "retrying one restart must not restart again");
  next();
  assert.throws(() => answer("a", { kind: "vote", choice: "Check again", run: 0 }), { code: "step_changed" });
  next(); next();
  for (const id of ["a", "b", "c", "d"]) enterChat(id);
  advanceExperience(room, room.experience, () => 0);
  assert.equal(room.pairs.length, 2);
  assert(room.pairs.every(pair => pair.a !== pair.b));
  assert(!JSON.stringify(room.experience).includes("Old test message"));
  room.mode = "live";
  assert.throws(() => hostCommand(room, "restart_rehearsal", "restart-live", room.revision), { code: "rehearsal_only" });
});

test("random draws can produce all three possible pairings for four guests", () => {
  const combinations = new Set();
  for (let seed = 1; seed <= 60; seed++) {
    const { room, add, next, enterChat } = rehearsal();
    for (const id of ["a", "b", "c", "d"]) add(id);
    next(); next(); next();
    for (const id of ["a", "b", "c", "d"]) enterChat(id);
    let counter = seed;
    const random = () => {
      counter = (Math.imul(counter, 1664525) + 1013904223) >>> 0;
      return counter / 4294967296;
    };
    advanceExperience(room, room.experience, random);
    combinations.add(room.pairs.map(pair => [pair.a, pair.b].sort().join("")).sort().join("-"));
  }
  assert.equal(combinations.size, 3);
});

test("the host sees accurate room progress without message text, including late pairs and the closing screen", () => {
  const { room, add, next, enterChat, draw, message, answer } = rehearsal();
  for (const id of ["a", "b", "c", "d", "e", "f"]) add(id);
  assert.deepEqual(hostView(room).chatStats, { rounds: [], cueReplies: 0, cueRecipients: 0 });
  next(); next(); next();
  for (const id of ["a", "b", "c", "d", "e"]) enterChat(id);
  draw();
  message("a", "PRIVATE_MESSAGE_A");
  message("b", "PRIVATE_MESSAGE_B");
  message("c", "PRIVATE_MESSAGE_C");
  let host = hostView(room);
  assert.equal(host.counts.joined, 6);
  assert.equal(host.chatReady, 5);
  assert.equal(host.counts.waiting, 1);
  assert.deepEqual(host.chatStats.rounds, [{ moment: 0, sent: 3, total: 4, pairsReady: 1, pairs: 2 }]);
  next();
  host = hostView(room);
  assert.equal(host.chatStats.cueRecipients, 1, "only a pair with both messages receives a suspense line");
  assert.equal(host.chatStats.cueReplies, 0);
  answer("a", { kind: "cue_reply", moment: 0, text: "PRIVATE_CUE_REPLY" });
  assert.equal(hostView(room).chatStats.cueReplies, 1);
  enterChat("f");
  next(); next();
  assert.equal(room.pairs.length, 3);
  for (let moment = 1; moment < 4; moment++) {
    assert.equal(room.experience.moment, moment);
    for (const id of ["a", "b", "c", "d", "e", "f"]) message(id, `PRIVATE_MOMENT_${moment}_${id}`);
    next();
    if (room.experience.conversationPhase === "waiting") next();
    next();
  }
  host = hostView(room);
  assert.equal(host.room.experience.phase, "finished");
  assert.deepEqual(host.chatStats.rounds.map(round => round.total), [4, 6, 6, 6], "later guests do not inflate earlier rounds");
  assert.deepEqual(host.chatStats.rounds.map(round => round.pairsReady), [1, 3, 3, 3]);
  assert.equal(host.chatStats.rounds.at(-1).sent, 6, "the final dashboard retains the finished round's totals");
  assert.doesNotMatch(JSON.stringify(host), /PRIVATE_|tokenHash|draft|feeling/i);
});
