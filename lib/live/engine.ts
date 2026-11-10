import type {
  Answers, Confidence, ContextTone, Forecast, GuestState, HostAction, HostState,
  Interest, Participant, Room, RoomSummary, Step,
} from "./types.ts";
import { CONFIDENCES, CONTEXT_TONES, INTERESTS, STEPS } from "./types.ts";

export class EngineError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 400, code = "invalid_action") {
    super(message);
    this.name = "EngineError";
    this.status = status;
    this.code = code;
  }
}

export const SCENARIOS = {
  a: "You and a colleague have not finished a task. You are worried that something is missing.",
  b: "You and a colleague finished a task together. You are both pleased and are planning a friendly chat.",
} as const;

const PAIR_STEPS: readonly Step[] = ["compose", "interpret", "reply", "reply_delivered"];
const ANSWER_STEPS: readonly Step[] = ["compose", "interpret", "reply", "context", "room"];
const emptyCounts = (): Forecast => Object.fromEntries(INTERESTS.map(value => [value, 0])) as Forecast;
const ownKey = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key);

export function createRoom(input: {
  id: string; code: string; inviteToken: string; mode: Room["mode"]; now: number;
}): Room {
  if (!input.id || !input.code || !input.inviteToken || !Number.isFinite(input.now)) {
    throw new EngineError("The session details are incomplete.");
  }
  if (input.mode !== "rehearsal" && input.mode !== "live") throw new EngineError("Choose a valid session mode.");
  return {
    id: input.id, code: input.code, inviteToken: input.inviteToken, mode: input.mode,
    createdAt: input.now, expiresAt: input.now + 24 * 60 * 60 * 1000,
    step: "lobby", revision: 0, paused: false, lookUp: false,
    participants: [], pairs: [], answers: {}, forecast: emptyCounts(), forecastLocked: false, processedCommands: [],
  };
}

function participant(room: Room, id: string): Participant {
  const found = room.participants.find(value => value.id === id);
  if (!found) throw new EngineError("Join this session before continuing.", 403, "not_in_room");
  return found;
}
function pairFor(room: Room, id: string) { return room.pairs.find(pair => pair.a === id || pair.b === id); }
function partnerFor(room: Room, id: string): string | undefined {
  const pair = pairFor(room, id);
  return pair ? (pair.a === id ? pair.b : pair.a) : undefined;
}
function waiting(room: Room, id: string): boolean {
  return !pairFor(room, id) && (room.step === "lobby" || PAIR_STEPS.includes(room.step));
}

export function addParticipant(room: Room, value: Participant): Room {
  if (room.step === "finished") throw new EngineError("This session has finished.", 409, "finished");
  const existing = room.participants.find(person => person.id === value.id);
  if (existing) {
    if (existing.tokenHash !== value.tokenHash) throw new EngineError("This participant could not be restored.", 403);
    return room;
  }
  if (!value.id || !value.tokenHash || !Number.isFinite(value.joinedAt) || !["a", "b"].includes(value.context)) {
    throw new EngineError("The participant details are incomplete.");
  }
  if (value.id === "__proto__" || value.id === "constructor" || value.id === "prototype") {
    throw new EngineError("This participant identifier is invalid.");
  }
  const name = typeof value.name === "string" ? value.name.trim() : "";
  if (!name || name.length > 40) throw new EngineError("Use a name between 1 and 40 characters.");
  if (room.participants.some(person => person.tokenHash === value.tokenHash)) {
    throw new EngineError("This browser has already joined the session.", 409);
  }
  room.participants.push({ ...value, name });
  room.answers[value.id] = {};
  return room;
}

/** The store must save the entire result with one compare-and-swap operation. */
export function pairParticipants(room: Room, random: () => number = Math.random): Room {
  if (room.step !== "lobby") throw new EngineError("Pairs stay together once the first card starts.", 409);
  if (room.participants.length < 2) throw new EngineError("At least two guests must join before matching.");
  const shuffled = [...room.participants];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const draw = random();
    if (!Number.isFinite(draw) || draw < 0 || draw >= 1) throw new EngineError("Matching could not be completed. Try again.");
    const target = Math.floor(draw * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  room.pairs = [];
  for (let index = 0; index + 1 < shuffled.length; index += 2) {
    const ordinal = index / 2 + 1;
    room.pairs.push({
      id: `pair-${ordinal}`, a: shuffled[index].id, b: shuffled[index + 1].id,
      label: `Pair ${String(ordinal).padStart(2, "0")}`,
    });
  }
  return room;
}

function text(data: Record<string, unknown>, key: string, max = 500): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) throw new EngineError("Please complete every field before saving.");
  const clean = value.trim();
  if (clean.length > max) throw new EngineError(`Keep each answer to ${max} characters or fewer.`);
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(clean)) throw new EngineError("Please use ordinary text in your answer.");
  return clean;
}
function choice<T extends string>(data: Record<string, unknown>, key: string, values: readonly T[]): T {
  if (!values.includes(data[key] as T)) throw new EngineError("Choose one of the available responses.");
  return data[key] as T;
}

/** Only accepted submissions enter answers. Drafts never leave the browser. */
export function submitAnswer(room: Room, id: string, step: Step, payload: unknown): Room {
  participant(room, id);
  if (room.paused || room.lookUp) throw new EngineError("The room is paused. Keep your draft until the host continues.", 409, "paused");
  if (step !== room.step || !ANSWER_STEPS.includes(step)) throw new EngineError("The room has moved to another step. Your answer was not submitted.", 409, "step_changed");
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new EngineError("Please send a valid answer.");
  const data = payload as Record<string, unknown>;
  const partnerId = partnerFor(room, id);
  if (PAIR_STEPS.includes(step) && !partnerId) throw new EngineError("You are waiting for the next activity with everyone.", 409, "waiting");
  if (step === "interpret" && !room.answers[partnerId!]?.message) {
    throw new EngineError("Your partner has not saved a message for you to read.", 409, "missing_message");
  }
  const current = room.answers[id] ?? {};
  let update: Answers;
  switch (step) {
    case "compose": update = { message: text(data, "message", 300), intention: text(data, "intention", 300) }; break;
    case "interpret": update = { interpretation: text(data, "interpretation", 300), confidence: choice<Confidence>(data, "confidence", CONFIDENCES) }; break;
    case "reply": update = { reply: text(data, "reply", 300), expectation: text(data, "expectation", 300) }; break;
    case "context": update = { contextTone: choice<ContextTone>(data, "contextTone", CONTEXT_TONES), contextReply: text(data, "contextReply", 300) }; break;
    case "room": update = { interest: choice<Interest>(data, "interest", INTERESTS) }; break;
    default: throw new EngineError("This step does not accept answers.");
  }
  // Retries of the identical submission are safe. Changed answers stay locked.
  const keys = Object.keys(update) as (keyof Answers)[];
  if (keys.some(key => ownKey(current, key))) {
    if (keys.every(key => current[key] === update[key])) return room;
    throw new EngineError("Your first response is already saved and stays locked.", 409, "answer_locked");
  }
  room.answers[id] = { ...current, ...update };
  return room;
}

export function setForecast(room: Room, input: unknown): Room {
  if (room.forecastLocked || STEPS.indexOf(room.step) >= STEPS.indexOf("room")) {
    throw new EngineError("The prediction is already locked.", 409, "forecast_locked");
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new EngineError("Enter a prediction for the room.");
  const forecast = emptyCounts();
  for (const label of INTERESTS) {
    const count = (input as Record<string, unknown>)[label];
    if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0 || count > 10000) {
      throw new EngineError("Use a whole number from 0 to 10,000 for each predicted response.");
    }
    forecast[label] = count;
  }
  if (!INTERESTS.some(label => forecast[label] > 0)) throw new EngineError("Predict at least one response before opening The Room.");
  room.forecast = forecast;
  return room;
}

export function hostCommand(room: Room, action: HostAction, requestId: string, expectedRevision: number): Room {
  if (typeof requestId !== "string" || !requestId.trim() || requestId.length > 120) throw new EngineError("This command needs a valid request identifier.");
  if (room.processedCommands.includes(requestId)) return room;
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision !== room.revision) {
    throw new EngineError("The room changed. Refresh its state before trying again.", 409, "stale_revision");
  }
  if (action === "pause") { room.paused = true; room.lookUp = false; }
  else if (action === "resume") { room.paused = false; }
  else if (action === "look_up") { room.lookUp = true; room.paused = false; }
  else if (action === "return") { room.lookUp = false; }
  else {
    if (room.paused || room.lookUp) throw new EngineError("Return everyone to the task before continuing.", 409, "paused");
    if (action === "pair") pairParticipants(room);
    else if (action === "reveal") {
      if (room.step !== "ready_reveal") throw new EngineError("Complete or skip the activities before opening the final reveal.", 409);
      room.step = "reveal_message";
    } else if (action === "next" || action === "skip") {
      if (room.step === "finished") throw new EngineError("This session has finished.", 409);
      if (room.step === "ready_reveal") throw new EngineError("Use the final reveal control to release the explanations.", 409, "reveal_confirmation_required");
      if (room.step === "lobby" && (action === "skip" || room.pairs.length === 0)) {
        throw new EngineError("Match at least one pair, then start with The Message.");
      }
      if (room.step === "context") {
        if (action === "skip") room.step = "ready_reveal";
        else {
          if (!INTERESTS.some(label => room.forecast[label] > 0)) throw new EngineError("Save your prediction before opening The Room, or skip that activity.");
          room.forecastLocked = true;
          room.step = "room";
        }
      } else room.step = STEPS[STEPS.indexOf(room.step) + 1];
    } else throw new EngineError("Choose an available host command.");
  }
  room.processedCommands.push(requestId);
  if (room.processedCommands.length > 256) room.processedCommands.splice(0, room.processedCommands.length - 256);
  return room;
}

function summary(room: Room): RoomSummary {
  return { code: room.code, mode: room.mode, step: room.step, revision: room.revision, paused: room.paused, lookUp: room.lookUp };
}

export function participantView(room: Room, id: string): GuestState {
  const person = participant(room, id);
  const pair = pairFor(room, id);
  const partnerId = partnerFor(room, id);
  const partner = partnerId ? room.answers[partnerId] ?? {} : {};
  const own = room.answers[id] ?? {};
  const view: GuestState = {
    room: summary(room),
    participant: { id: person.id, name: person.name, paired: !!pair, ...(pair ? { pairLabel: pair.label } : {}), waiting: waiting(room, id) },
    own: { ...own },
  };
  const stepIndex = STEPS.indexOf(room.step);
  if (stepIndex >= STEPS.indexOf("interpret") && partner.message !== undefined) view.partnerMessage = partner.message;
  if (stepIndex >= STEPS.indexOf("reply_delivered") && partner.reply !== undefined) view.partnerReply = partner.reply;
  if (room.step === "context") view.scenario = SCENARIOS[person.context];
  if (room.step === "reveal_message") {
    view.reveal = {
      ...(partner.message !== undefined ? { message: partner.message } : {}),
      ...(partner.intention !== undefined ? { intention: partner.intention } : {}),
      ...(own.interpretation !== undefined ? { interpretation: own.interpretation } : {}),
      explanation: "A message and the meaning we give it can differ. Compare the intention with the first reading; neither answer diagnoses its writer.",
    };
  } else if (room.step === "reveal_pause") {
    view.reveal = {
      ...(own.expectation !== undefined ? { expectation: own.expectation } : {}),
      ...(partner.reply !== undefined ? { reply: partner.reply } : {}),
      explanation: "Typing signals recent composing activity. It does not tell us what is being written, why someone pauses, or how they feel. Compare your expectation with the actual saved reply.",
    };
  } else if (room.step === "reveal_context") {
    view.reveal = {
      message: "Can we talk tomorrow?", scenarios: [SCENARIOS.a, SCENARIOS.b],
      explanation: "The words stayed the same while the imagined context changed. Consider what that context added to your reading. Different answers are possible in either scene.",
    };
  } else if (room.step === "reveal_room") {
    const counts = emptyCounts();
    for (const person of room.participants) {
      const interest = room.answers[person.id]?.interest;
      if (interest && INTERESTS.includes(interest)) counts[interest]++;
    }
    view.reveal = {
      ...(room.forecastLocked ? { forecast: { ...room.forecast } } : {}), counts,
      responseCount: INTERESTS.reduce((sum, value) => sum + counts[value], 0),
      explanation: "Compare the prediction saved before the responses with what this room actually reported. A match or a difference can both start a conversation; missing answers are not responses.",
    };
  }
  return view;
}

function submitted(room: Room, id: string): boolean {
  const answer = room.answers[id] ?? {};
  switch (room.step) {
    case "compose": return answer.message !== undefined && answer.intention !== undefined;
    case "interpret": return answer.interpretation !== undefined && answer.confidence !== undefined;
    case "reply": return answer.reply !== undefined && answer.expectation !== undefined;
    case "context": return answer.contextTone !== undefined && answer.contextReply !== undefined;
    case "room": return answer.interest !== undefined;
    default: return false;
  }
}

/** Host readiness never includes private answer text or a guest's partner identity. */
export function hostView(room: Room): HostState {
  const people = room.participants.map(person => {
    const pair = pairFor(room, person.id);
    return { id: person.id, name: person.name, ...(pair ? { pairLabel: pair.label } : {}), waiting: waiting(room, person.id), submitted: submitted(room, person.id) };
  });
  const eligible = people.filter(person => !person.waiting && (ANSWER_STEPS.includes(room.step)));
  return {
    room: summary(room),
    counts: {
      joined: people.length, paired: room.pairs.length * 2, waiting: people.filter(person => person.waiting).length,
      submitted: eligible.filter(person => person.submitted).length, total: eligible.length,
    },
    participants: people, forecast: { ...room.forecast }, forecastLocked: room.forecastLocked,
  };
}
