import assert from "node:assert/strict";
import { test } from "node:test";
import { addParticipant, createRoom, hostCommand, hostView, participantView } from "../lib/live/engine.ts";
import { createBookExperience, submitExperienceAnswer } from "../lib/live/experience.ts";

function rehearsal() {
  const room = createRoom({ id: "test", code: "TEST1234", inviteToken: "rehearsal", mode: "rehearsal", now: 1 });
  room.experience = createBookExperience();
  let command = 0;
  const add = id => addParticipant(room, { id, name: `Guest ${id}`, tokenHash: `key-${id}`, joinedAt: 1, context: "a" });
  const next = () => hostCommand(room, "next", `cue-${++command}`, room.revision);
  const answer = (id, data) => submitExperienceAnswer(room, room.experience, id, data);
  const state = id => participantView(room, id).experience;
  const chat = id => state(id).chat;
  const enterChat = id => answer(id, { kind: "chat_join" });
  const message = (id, text) => answer(id, { kind: "message", moment: room.experience.moment, text });
  const chatMessages = id => chat(id).entries.filter(entry => entry.kind === "message").map(entry => entry.message.text);
  return { room, add, next, answer, state, chat, enterChat, message, chatMessages };
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
  const { room, add, next, answer, chat, enterChat, message, chatMessages } = rehearsal();
  add("a");
  add("b");
  next(); next(); next();
  enterChat("a");
  enterChat("b");
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
  const { room, add, next, enterChat, message, chat, chatMessages } = rehearsal();
  for (const id of ["a", "b", "c", "d"]) add(id);
  next(); next(); next();
  enterChat("a");
  enterChat("b");
  enterChat("c");
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
