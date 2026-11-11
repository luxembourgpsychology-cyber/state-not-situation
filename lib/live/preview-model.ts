export type Side = 0 | 1;
export type Pair<T> = [T, T];
export type Phase = "compose" | "typing" | "ready" | "waiting" | "revealed";
export type FeelingStage = "before" | "waiting" | "reading" | "responded" | "after";
export type Message = { text: string; source: "typed" | "example" | "experiment"; replyTo?: string };
export type Round = {
  drafts: Pair<string>;
  messages: Pair<Message | null>;
  responseDrafts: Pair<string>;
  responses: Pair<Message[]>;
  phase: Phase;
  prompted: boolean;
};
type EventPayload =
  | { kind: "prompt"; text: string }
  | { kind: "message"; owner: Side; message: Message }
  | { kind: "feeling"; value: string; stage: FeelingStage; contextEventId?: number }
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
  | { type: "feeling"; side: Side; value: string; contextEventId?: number }
  | { type: "side"; side: Side }
  | { type: "share"; side: Side }
  | { type: "review"; open: boolean }
  | { type: "restart" };

export const prompts = [
  "If your face had subtitles, what would they say right now?",
  "Read their first message again. Ask about one detail.",
  "Answer their question in one sentence.",
  "Finish this sentence: “At first I thought…”",
];
export const feelingChoices = [
  "Curious", "Calm", "Happy", "Amused", "Excited", "Playful", "Shy", "Nervous",
  "Unsure", "Confused", "Surprised", "Relieved", "Embarrassed", "Annoyed", "Impatient", "Neutral",
];
export const planted = ["Can I be honest?", "", "Wait, really?", ""];
export const stageNames: Record<FeelingStage, string> = { before: "Before sending", waiting: "While waiting", reading: "At the first line", responded: "After my reply", after: "After the reveal" };
const examples: Pair<string>[] = [
  ["I look calm. This is excellent acting.", "I’m trying to look mysterious. Mostly I’m looking for snacks."],
  ["Which snack would break your cover?", "What made you choose that line?"],
  ["Making myself laugh makes me feel less awkward.", "Anything with chocolate. Then all bets are off."],
  ["At first I thought I’d said something wrong.", "At first I heard doubt. On the second read, it sounded like surprise."],
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
  if (phase === "waiting" && targetFor(state.moment) === state.side) {
    return state.rounds[state.moment].responses[state.side].length > 0 ? "responded" : "reading";
  }
  return "waiting";
}
export function canWrite(state: PreviewState): boolean {
  if (state.arrival || state.reviewing) return false;
  const phase = state.rounds[state.moment].phase;
  return phase === "compose" || (phase === "waiting" && targetFor(state.moment) === state.side);
}
export function composerDraft(state: PreviewState): string {
  const round = state.rounds[state.moment];
  if (round.phase === "compose") return round.drafts[state.side];
  if (round.phase === "waiting" || round.phase === "revealed") return round.responseDrafts[state.side];
  return "";
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
      next = append(next, side, moment, {
        kind: "reveal",
        text: side === target
          ? `The app showed “${planted[moment]}” only on your phone. Your partner’s own message is below.`
          : `The app showed “${planted[moment]}” only on your partner’s phone. They can see your message now.`,
      });
    }
    const owner: Side = side === 0 ? 1 : 0;
    const message = state.rounds[moment].messages[owner];
    if (message) next = append(next, side, moment, { kind: "message", owner, message });
    for (const response of state.rounds[moment].responses[owner]) {
      next = append(next, side, moment, { kind: "message", owner, message: response });
    }
  }
  return patchRound(next, moment, round => ({ ...round, phase: "revealed" }));
}
export function createPreview({ moment = 0, arrival = true, generation = 0 }: { moment?: number; arrival?: boolean; generation?: number } = {}): PreviewState {
  const initial: PreviewState = {
    moment, side: 0, arrival, reviewing: false,
    rounds: prompts.map(() => ({ drafts: ["", ""], messages: [null, null], responseDrafts: ["", ""], responses: [[], []], phase: "compose", prompted: false })),
    timelines: [[], []], shared: [false, false], nextId: 1, generation,
  };
  return arrival ? initial : enterMoment(initial, moment);
}
export function previewReducer(state: PreviewState, action: Action): PreviewState {
  const round = state.rounds[state.moment];
  switch (action.type) {
    case "join": return state.arrival ? enterMoment(state, state.moment) : state;
    case "draft":
      if (action.moment !== state.moment || action.side !== state.side || !canWrite(state)) return state;
      return patchRound(state, state.moment, old => round.phase === "waiting"
        ? { ...old, responseDrafts: withSide(old.responseDrafts, action.side, action.value) }
        : { ...old, drafts: withSide(old.drafts, action.side, action.value) });
    case "send": {
      if (action.moment !== state.moment || action.side !== state.side || !canWrite(state)) return state;
      const text = composerDraft(state).trim();
      if (!text) return state;
      if (round.phase === "waiting") {
        const message: Message = { text, source: "typed", replyTo: planted[state.moment] };
        const next = patchRound(state, state.moment, old => ({
          ...old,
          responseDrafts: withSide(old.responseDrafts, action.side, ""),
          responses: withSide(old.responses, action.side, [...old.responses[action.side], message]),
        }));
        return append(next, action.side, state.moment, { kind: "message", owner: action.side, message });
      }
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
      const timeline = state.timelines[action.side];
      const requestedContext = timeline.find(event => event.id === action.contextEventId && event.kind !== "feeling");
      const fallbackContext = timeline.filter(event => event.kind !== "feeling").at(-1);
      const contextEventId = (requestedContext ?? fallbackContext)?.id;
      const latest = timeline.at(-1);
      if (latest?.kind === "feeling" && latest.moment === state.moment && latest.stage === stage && latest.value === value && latest.contextEventId === contextEventId) return state;
      return append(state, action.side, state.moment, {
        kind: "feeling", value, stage,
        ...(contextEventId !== undefined ? { contextEventId } : {}),
      });
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
