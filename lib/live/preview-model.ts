export type Side = 0 | 1;
export type Pair<T> = [T, T];
export type Phase = "compose" | "typing" | "ready" | "waiting" | "revealed";
export type FeelingStage = "before" | "waiting" | "reading" | "after";
export type Message = { text: string; source: "typed" | "example" | "experiment" };
export type Round = { drafts: Pair<string>; messages: Pair<Message | null>; phase: Phase; prompted: boolean };
type EventPayload =
  | { kind: "prompt"; text: string }
  | { kind: "message"; owner: Side; message: Message }
  | { kind: "feeling"; value: string; stage: FeelingStage }
  | { kind: "reveal"; text: string };
export type ChatEvent = EventPayload & { id: number; moment: number };
export type PreviewState = {
  moment: number;
  side: Side;
  arrival: boolean;
  reviewing: boolean;
  rounds: Round[];
  timelines: Pair<ChatEvent[]>;
  shared: Pair<boolean>;
  nextId: number;
  generation: number;
};
export type Action =
  | { type: "join" }
  | { type: "draft"; moment: number; side: Side; value: string }
  | { type: "send"; moment: number; side: Side }
  | { type: "ready"; moment: number; generation: number }
  | { type: "host"; moment: number; phase: Phase }
  | { type: "feeling"; side: Side; value: string }
  | { type: "side"; side: Side }
  | { type: "share"; side: Side }
  | { type: "review"; open: boolean }
  | { type: "restart" };

export const prompts = [
  "Make them smile in one sentence.",
  "Reply to their message.",
  "Ask them about something they said.",
  "Answer their question.",
];
export const feelingChoices = [
  "Curious", "Calm", "Happy", "Amused", "Excited", "Playful", "Shy", "Nervous",
  "Unsure", "Confused", "Surprised", "Relieved", "Embarrassed", "Annoyed", "Impatient", "Neutral",
];
export const planted = ["Can I be honest?", "", "I didn’t expect that.", ""];
export const stageNames: Record<FeelingStage, string> = { before: "Before", waiting: "Waiting", reading: "Reading", after: "After the reply" };
const examples: Pair<string>[] = [
  ["I look calm. This is excellent acting.", "I came for the book. The snacks helped."],
  ["I’m here with a friend. We both wanted to hear about the book.", "I like book events. You always meet someone interesting."],
  ["What made you say yes to this one?", "Have you and your friend read any of the book yet?"],
  ["A little. We keep recognising ourselves in the everyday examples.", "I wanted to hear the conversation, and meet a few people."],
];
export function withSide<T>(pair: Pair<T>, side: Side, value: T): Pair<T> {
  return side === 0 ? [value, pair[1]] : [pair[0], value];
}
export function targetFor(moment: number): Side | null {
  return moment === 0 ? 0 : moment === 2 ? 1 : null;
}
export function feelingStage(state: PreviewState): FeelingStage {
  const phase = state.rounds[state.moment].phase;
  if (phase === "revealed") return "after";
  if (phase === "compose") return "before";
  if (phase === "waiting" && targetFor(state.moment) === state.side) return "reading";
  return "waiting";
}
function append(state: PreviewState, side: Side, moment: number, payload: EventPayload): PreviewState {
  const entry: ChatEvent = { ...payload, moment, id: state.nextId };
  return { ...state, nextId: state.nextId + 1, timelines: withSide(state.timelines, side, [...state.timelines[side], entry]) };
}
function patchRound(state: PreviewState, moment: number, update: (round: Round) => Round): PreviewState {
  return { ...state, rounds: state.rounds.map((round, index) => index === moment ? update(round) : round) };
}
function enterMoment(state: PreviewState, moment: number): PreviewState {
  let next = { ...state, moment, arrival: false, reviewing: false };
  if (next.rounds[moment].prompted) return next;
  next = patchRound(next, moment, round => ({ ...round, prompted: true }));
  for (const side of [0, 1] as const) next = append(next, side, moment, { kind: "prompt", text: prompts[moment] });
  return next;
}
function deliverReply(state: PreviewState): PreviewState {
  const moment = state.moment;
  const target = targetFor(moment);
  let next = state;
  for (const side of [0, 1] as const) {
    if (target !== null) {
      next = append(next, side, moment, { kind: "reveal", text: side === target ? `“${planted[moment]}” was added by the app.` : "Your partner also saw a message added by the app." });
    }
    const owner: Side = side === 0 ? 1 : 0;
    const message = state.rounds[moment].messages[owner];
    if (message) next = append(next, side, moment, { kind: "message", owner, message });
  }
  return patchRound(next, moment, round => ({ ...round, phase: "revealed" }));
}
export function createPreview({ moment = 0, arrival = true, generation = 0 }: { moment?: number; arrival?: boolean; generation?: number } = {}): PreviewState {
  const initial: PreviewState = {
    moment, side: 0, arrival, reviewing: false,
    rounds: prompts.map(() => ({ drafts: ["", ""], messages: [null, null], phase: "compose", prompted: false })),
    timelines: [[], []], shared: [false, false], nextId: 1, generation,
  };
  return arrival ? initial : enterMoment(initial, moment);
}
export function previewReducer(state: PreviewState, action: Action): PreviewState {
  const round = state.rounds[state.moment];
  switch (action.type) {
    case "join": return state.arrival ? enterMoment(state, state.moment) : state;
    case "draft":
      if (state.arrival || action.moment !== state.moment || action.side !== state.side || round.phase !== "compose") return state;
      return patchRound(state, state.moment, old => ({ ...old, drafts: withSide(old.drafts, action.side, action.value) }));
    case "send": {
      if (state.arrival || action.moment !== state.moment || action.side !== state.side || round.phase !== "compose") return state;
      const text = round.drafts[action.side].trim();
      if (!text) return state;
      const partner: Side = action.side === 0 ? 1 : 0;
      const messages = withSide(round.messages, action.side, { text, source: "typed" } as Message);
      if (messages[partner] === null) messages[partner] = { text: examples[state.moment][partner], source: "example" };
      let next = patchRound(state, state.moment, old => ({ ...old, messages, phase: "typing" }));
      for (const side of [0, 1] as const) {
        const message = messages[side];
        if (message) next = append(next, side, state.moment, { kind: "message", owner: side, message });
      }
      return next;
    }
    case "ready":
      if (action.generation !== state.generation || action.moment !== state.moment || round.phase !== "typing") return state;
      return patchRound(state, state.moment, old => ({ ...old, phase: "ready" }));
    case "host": {
      if (state.arrival || state.reviewing || action.moment !== state.moment || action.phase !== round.phase) return state;
      if (round.phase === "ready") {
        const target = targetFor(state.moment);
        if (target === null) return deliverReply(state);
        const owner: Side = target === 0 ? 1 : 0;
        const next = append(state, target, state.moment, { kind: "message", owner, message: { text: planted[state.moment], source: "experiment" } });
        return patchRound(next, state.moment, old => ({ ...old, phase: "waiting" }));
      }
      if (round.phase === "waiting") return deliverReply(state);
      if (round.phase === "revealed") return state.moment < 3 ? enterMoment(state, state.moment + 1) : { ...state, reviewing: true };
      return state;
    }
    case "feeling": {
      if (state.arrival || state.reviewing || action.side !== state.side) return state;
      const value = action.value.trim().slice(0, 40);
      if (!value) return state;
      const stage = feelingStage(state);
      const latest = state.timelines[action.side].at(-1);
      if (latest?.kind === "feeling" && latest.moment === state.moment && latest.stage === stage && latest.value === value) return state;
      return append(state, action.side, state.moment, { kind: "feeling", value, stage });
    }
    case "side": return { ...state, side: action.side };
    case "share":
      if (state.moment !== 3 || round.phase !== "revealed" || action.side !== state.side) return state;
      return { ...state, shared: withSide(state.shared, action.side, true) };
    case "review":
      if (state.moment !== 3 || round.phase !== "revealed") return state;
      return { ...state, reviewing: action.open };
    case "restart": return createPreview({ generation: state.generation + 1 });
  }
}
