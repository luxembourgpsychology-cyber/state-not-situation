import { EngineError } from "./engine-error.ts";
import { emptyVoteTotals, VOTE_CHOICES, type VoteChoice } from "./experience-copy.ts";
import { cueDisclosure, planted, prompts, targetFor, type ChatEvent, type Side } from "./preview-model.ts";
import type { BookExperience, ExperienceGuest, ExperienceProgress, Pair, Room } from "./types.ts";

export function createBookExperience(run = 0): BookExperience {
  return {
    run,
    phase: "welcome",
    moment: 0,
    conversationPhase: "compose",
    votes: {},
    chatGuests: [],
    rounds: prompts.map(() => ({ messages: {}, replies: {} })),
  };
}

export function experienceProgress(experience: BookExperience): ExperienceProgress {
  const { phase, moment, conversationPhase } = experience;
  return { phase, moment, conversationPhase, run: experience.run ?? 0 };
}

export function disclosedVotes(experience: BookExperience) {
  if (experience.phase === "welcome" || experience.phase === "vote") return undefined;
  const totals = emptyVoteTotals();
  for (const vote of Object.values(experience.votes)) totals[vote]++;
  return totals;
}

function matchWaiting(room: Room, experience: BookExperience, random: () => number) {
  const paired = new Set(room.pairs.flatMap(pair => [pair.a, pair.b]));
  const waiting = experience.chatGuests.filter(id => !paired.has(id));
  for (let index = waiting.length - 1; index > 0; index--) {
    const draw = random();
    if (!Number.isFinite(draw) || draw < 0 || draw >= 1) throw new EngineError("Pairing could not complete. Please try again.");
    const other = Math.floor(draw * (index + 1));
    [waiting[index], waiting[other]] = [waiting[other], waiting[index]];
  }
  for (let index = 0; index + 1 < waiting.length; index += 2) {
    const ordinal = room.pairs.length + 1;
    room.pairs.push({
      id: `pair-${ordinal}`,
      a: waiting[index],
      b: waiting[index + 1],
      label: `Pair ${String(ordinal).padStart(2, "0")}`,
      startMoment: experience.moment,
    });
  }
}

function hasCue(experience: BookExperience, pair: Pair, moment: number) {
  const { messages } = experience.rounds[moment];
  return targetFor(moment) !== null && Boolean(messages[pair.a] && messages[pair.b]);
}

export function advanceExperience(room: Room, experience: BookExperience, random: () => number = Math.random) {
  switch (experience.phase) {
    case "welcome":
      experience.phase = "vote";
      return;
    case "vote":
      experience.phase = "vote_result";
      return;
    case "vote_result":
      experience.phase = "pairing";
      return;
    case "pairing":
      if (experience.chatGuests.length < 2) throw new EngineError("Wait for at least two guests to tap Experience 2.", 409, "waiting");
      matchWaiting(room, experience, random);
      experience.phase = "chat";
      room.step = "compose";
      return;
    case "finished":
      throw new EngineError("This session has finished.", 409, "finished");
  }
  const { moment, conversationPhase } = experience;
  if (conversationPhase === "compose") {
    const showCue = room.pairs.some(pair => hasCue(experience, pair, moment));
    experience.conversationPhase = showCue ? "waiting" : "revealed";
  } else if (conversationPhase === "waiting") {
    experience.conversationPhase = "revealed";
  } else if (moment + 1 < prompts.length) {
    experience.moment += 1;
    experience.conversationPhase = "compose";
    matchWaiting(room, experience, random);
  } else {
    experience.phase = "finished";
    room.step = "finished";
  }
}

function saveOnce<T extends string>(answers: Record<string, T>, id: string, value: T) {
  if (answers[id] !== undefined && answers[id] !== value) {
    throw new EngineError("Your first response is already saved.", 409, "answer_locked");
  }
  answers[id] = value;
}

function chatLine(raw: unknown) {
  const line = typeof raw === "string" ? raw.trim() : "";
  if (!line || line.length > 500 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(line)) {
    throw new EngineError("Write a short message of up to 500 characters.");
  }
  return line;
}

export function submitExperienceAnswer(room: Room, experience: BookExperience, id: string, payload: unknown) {
  if (!room.participants.some(person => person.id === id)) throw new EngineError("Join the room first.", 403);
  if (room.paused || room.lookUp) throw new EngineError("Look up for a moment. You can continue when Ivana is ready.", 409, "paused");
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new EngineError("Please send a valid answer.");
  const answer = payload as Record<string, unknown>;
  if ((answer.run !== undefined || (experience.run ?? 0) > 0) && answer.run !== (experience.run ?? 0)) {
    throw new EngineError("A new rehearsal has started. Your phone will update in a moment.", 409, "step_changed");
  }

  if (answer.kind === "vote") {
    if (experience.phase !== "vote") throw new EngineError("The vote has closed.", 409, "step_changed");
    if (!VOTE_CHOICES.includes(answer.choice as VoteChoice)) throw new EngineError("Choose one of the available answers.");
    saveOnce(experience.votes, id, answer.choice as VoteChoice);
    return;
  }
  if (answer.kind === "chat_join") {
    if (experience.phase !== "chat" && experience.phase !== "pairing") throw new EngineError("The chat is not open.", 409, "step_changed");
    if (!experience.chatGuests.includes(id)) experience.chatGuests.push(id);
    return;
  }
  if (experience.phase !== "chat") throw new EngineError("The chat is not open.", 409, "step_changed");

  const { moment, conversationPhase } = experience;
  if (answer.moment !== moment) throw new EngineError("Ivana has opened a new moment.", 409, "step_changed");
  const pair = room.pairs.find(pair => pair.a === id || pair.b === id);
  if (!pair) throw new EngineError("You are waiting for a partner.", 409, "waiting");
  const side = pair.a === id ? 0 : 1;
  const round = experience.rounds[moment];
  if (answer.kind === "message" && conversationPhase === "compose") {
    saveOnce(round.messages, id, chatLine(answer.text));
  } else if (answer.kind === "cue_reply" && conversationPhase === "waiting" && targetFor(moment) === side && hasCue(experience, pair, moment)) {
    saveOnce(round.replies, id, chatLine(answer.text));
  } else {
    throw new EngineError("That part of the chat has closed.", 409, "step_changed");
  }
}

export function experienceGuestView(room: Room, experience: BookExperience, id?: string): ExperienceGuest {
  const view: ExperienceGuest = { joinedChat: !!id && experience.chatGuests.includes(id) };
  const totals = disclosedVotes(experience);
  if (totals) view.totals = totals;
  if (!id) return view;
  view.vote = experience.votes[id];
  if (!view.joinedChat) return view;
  const pair = room.pairs.find(pair => pair.a === id || pair.b === id);
  if (!pair) return view;

  const side: Side = pair.a === id ? 0 : 1;
  const partnerSide: Side = side === 0 ? 1 : 0;
  const partner = side === 0 ? pair.b : pair.a;
  const entries: ChatEvent[] = [];
  const { moment: active, conversationPhase } = experience;
  for (let moment = pair.startMoment ?? 0; moment <= active; moment++) {
    const offset = moment * 10;
    const round = experience.rounds[moment];
    const phase = moment < active ? "revealed" : conversationPhase;
    const cueThisPair = hasCue(experience, pair, moment);
    entries.push({ id: offset + 1, moment, kind: "prompt", text: prompts[moment] });
    if (round.messages[id]) entries.push({ id: offset + 2, moment, kind: "message", owner: side, message: { text: round.messages[id], source: "typed" } });
    if (cueThisPair && targetFor(moment) === side && phase !== "compose") {
      entries.push({
        id: offset + 3, moment, kind: "message", owner: partnerSide,
        message: { text: planted[moment], source: phase === "revealed" ? "experiment" : "typed" },
      });
      if (round.replies[id]) {
        entries.push({ id: offset + 4, moment, kind: "message", owner: side, message: { text: round.replies[id], source: "typed", replyTo: planted[moment] } });
      }
    }
    if (phase === "revealed") {
      if (cueThisPair) entries.push({ id: offset + 5, moment, kind: "reveal", text: cueDisclosure(moment, side) });
      if (round.messages[partner]) entries.push({ id: offset + 6, moment, kind: "message", owner: partnerSide, message: { text: round.messages[partner], source: "typed" } });
      if (round.replies[partner]) {
        entries.push({ id: offset + 7, moment, kind: "message", owner: partnerSide, message: { text: round.replies[partner], source: "typed", replyTo: planted[moment] } });
      }
    }
  }

  const round = experience.rounds[active];
  const cueThisPair = conversationPhase !== "compose" && hasCue(experience, pair, active);
  const replying = conversationPhase === "waiting" && targetFor(active) === side && cueThisPair;
  const composing = conversationPhase === "compose" && !round.messages[id];
  view.chat = {
    side,
    label: pair.label.replace("Pair ", ""),
    entries,
    cueShown: cueThisPair && (conversationPhase === "revealed" || replying),
    hasPartnerMessage: conversationPhase === "revealed" && Boolean(round.messages[partner]),
    writing: experience.phase === "chat" && !room.paused && !room.lookUp && (composing || (replying && !round.replies[id])),
  };
  return view;
}

export function experienceTypingAllowed(room: Room, id: string): boolean {
  const experience = room.experience;
  return Boolean(experience?.phase === "chat" && experience.conversationPhase === "compose"
    && !room.paused && !room.lookUp && !experience.rounds[experience.moment].messages[id]
    && room.pairs.some(pair => pair.a === id || pair.b === id));
}

export function experienceReadiness(room: Room, experience: BookExperience, id: string) {
  if (experience.phase === "pairing") {
    return { eligible: experience.chatGuests.includes(id), submitted: false };
  }
  if (experience.phase === "vote" || experience.phase === "vote_result") {
    return { eligible: true, submitted: Boolean(experience.votes[id]) };
  }
  const pair = room.pairs.find(pair => pair.a === id || pair.b === id);
  const eligible = experience.phase === "chat" && Boolean(pair);
  return { eligible, submitted: eligible && Boolean(experience.rounds[experience.moment].messages[id]) };
}
