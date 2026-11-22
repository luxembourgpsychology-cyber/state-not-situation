import assert from "node:assert/strict";
import { test } from "node:test";
import { canWrite, createPreview, previewReducer } from "../lib/live/preview-model.ts";

function controller() {
  let state = createPreview({ arrival: false });
  const send = action => (state = previewReducer(state, action));
  return { send, state: () => state };
}

test("A and B write to the same rehearsal and neither view reveals or advances automatically", () => {
  const c = controller();
  const aPrompt = c.state().timelines[0][0].text;
  const bPrompt = c.state().timelines[1][0].text;
  assert.match(aPrompt, /subtitles/);
  assert.match(bPrompt, /first glance/);
  c.send({ type: "draft", moment: 0, side: 0, value: "I’m hungry." });
  c.send({ type: "send", moment: 0, side: 0 });
  assert.equal(c.state().rounds[0].phase, "compose");
  assert.equal(c.state().rounds[0].messages[1], null, "A cannot silently create B’s answer");
  assert.equal(canWrite(c.state()), false);
  c.send({ type: "side", side: 1 });
  assert.equal(canWrite(c.state()), true);
  c.send({ type: "draft", moment: 0, side: 1, value: "I’m shy, even if I look confident." });
  c.send({ type: "send", moment: 0, side: 1 });
  assert.equal(c.state().rounds[0].phase, "typing");
  c.send({ type: "ready", moment: 0, generation: 0 });
  assert.equal(c.state().rounds[0].phase, "ready");
  assert(!JSON.stringify(c.state().timelines).includes("Can I be honest?"));
  c.send({ type: "host", moment: 0, phase: "ready" });
  assert.equal(c.state().rounds[0].phase, "waiting");
  assert(c.state().timelines[0].some(x => x.message?.text === "Can I be honest?"));
  assert(!c.state().timelines[1].some(x => x.message?.text === "Can I be honest?"));
  assert(!c.state().timelines[0].some(x => x.message?.text === "I’m shy, even if I look confident."));
  assert(!c.state().timelines[1].some(x => x.kind === "reveal"));
  c.send({ type: "side", side: 0 });
  c.send({ type: "draft", moment: 0, side: 0, value: "Yes, go on." });
  c.send({ type: "send", moment: 0, side: 0 });
  assert.equal(canWrite(c.state()), false, "one optional reply matches the event room");
  assert.equal(c.state().rounds[0].responses[0].length, 1);
  assert(!c.state().timelines[1].some(x => x.message?.text === "Yes, go on."));
  c.send({ type: "host", moment: 0, phase: "ready" });
  assert.equal(c.state().rounds[0].phase, "waiting", "a stale second tap cannot reveal");
  c.send({ type: "host", moment: 0, phase: "waiting" });
  assert(c.state().timelines[0].some(x => x.message?.text === "I’m shy, even if I look confident."));
  assert(c.state().timelines[1].some(x => x.message?.text === "I’m hungry."));
  assert.equal(c.state().moment, 0);
  c.send({ type: "host", moment: 0, phase: "revealed" });
  assert.equal(c.state().moment, 1);
  assert(c.state().timelines.every(t => t.some(x => x.kind === "prompt" && x.moment === 1)));
});

test("examples require an explicit host action and do not overwrite someone’s draft", () => {
  const c = controller();
  c.send({ type: "draft", moment: 0, side: 0, value: "My own line" });
  c.send({ type: "sample", moment: 0 });
  assert.equal(c.state().rounds[0].drafts[0], "My own line");
  assert(c.state().rounds[0].messages.every(x => x === null));
  c.send({ type: "draft", moment: 0, side: 0, value: "" });
  c.send({ type: "sample", moment: 0 });
  assert(c.state().rounds[0].messages.every(x => x.source === "example"));
});

test("both views stay on moment four until the host opens the closing screen", () => {
  const c = controller();
  for (let moment = 0; moment < 4; moment++) {
    c.send({ type: "sample", moment });
    c.send({ type: "ready", moment, generation: 0 });
    c.send({ type: "host", moment, phase: "ready" });
    if (c.state().rounds[moment].phase === "waiting") c.send({ type: "host", moment, phase: "waiting" });
    assert.equal(c.state().reviewing, false);
    c.send({ type: "host", moment, phase: "revealed" });
  }
  assert.equal(c.state().reviewing, true);
  c.send({ type: "restart" });
  assert.equal(c.state().reviewing, false);
  assert.equal(c.state().moment, 0);
  assert.equal(canWrite(c.state()), true);
});
