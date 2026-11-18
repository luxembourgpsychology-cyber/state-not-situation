import type { ChatEvent, Side } from "./preview-model.ts";
import type { VoteChoice, VoteTotals } from "./experience-copy.ts";

export const STEPS = [
  "lobby", "compose", "interpret", "reply", "reply_delivered", "context", "room",
  "ready_reveal", "reveal_message", "reveal_pause", "reveal_context", "reveal_room", "finished",
] as const;
export type Step = (typeof STEPS)[number];
export const INTERESTS = ["More interested", "About the same", "Less interested", "Not sure"] as const;
export type Interest = (typeof INTERESTS)[number];
export const CONFIDENCES = ["Not sure", "Somewhat sure", "Very sure"] as const;
export type Confidence = (typeof CONFIDENCES)[number];
export const CONTEXT_TONES = ["Reassuring", "Neutral", "Concerning", "Not sure"] as const;
export type ContextTone = (typeof CONTEXT_TONES)[number];
export type Forecast = Record<Interest, number>;
export interface Answers {
  message?: string;
  intention?: string;
  interpretation?: string;
  confidence?: Confidence;
  reply?: string;
  expectation?: string;
  contextTone?: ContextTone;
  contextReply?: string;
  interest?: Interest;
}
export interface Participant {
  id: string;
  tokenHash: string;
  name: string;
  joinedAt: number;
  context: "a" | "b";
}
export interface Pair { id: string; a: string; b: string; label: string; startMoment?: number }
export interface Room {
  id: string;
  code: string;
  inviteToken: string;
  mode: "rehearsal" | "live";
  createdAt: number;
  expiresAt: number;
  step: Step;
  revision: number;
  paused: boolean;
  lookUp: boolean;
  participants: Participant[];
  pairs: Pair[];
  answers: Record<string, Answers>;
  forecast: Forecast;
  forecastLocked: boolean;
  processedCommands: string[];
  experience?: BookExperience;
}
export type ExperiencePhase = "welcome" | "vote" | "vote_result" | "chat" | "finished";
export type ConversationPhase = "compose" | "waiting" | "revealed";
export interface ExperienceProgress {
  phase: ExperiencePhase;
  moment: number;
  conversationPhase: ConversationPhase;
}
export interface BookExperience extends ExperienceProgress {
  votes: Record<string, VoteChoice>;
  chatGuests: string[];
  rounds: Array<{ messages: Record<string, string>; replies: Record<string, string> }>;
}
export interface ExperienceGuest {
  vote?: VoteChoice;
  totals?: VoteTotals;
  joinedChat: boolean;
  chat?: {
    side: Side;
    label: string;
    entries: ChatEvent[];
    cueShown: boolean;
    hasPartnerMessage: boolean;
    writing: boolean;
  };
}
export interface RoomSummary {
  code: string;
  mode: Room["mode"];
  step: Step;
  revision: number;
  paused: boolean;
  lookUp: boolean;
  experience?: ExperienceProgress;
}
export interface Reveal {
  message?: string;
  intention?: string;
  interpretation?: string;
  expectation?: string;
  reply?: string;
  scenarios?: string[];
  forecast?: Forecast;
  counts?: Forecast;
  responseCount?: number;
  explanation: string;
}
export interface GuestState {
  room: RoomSummary;
  participant: { id: string; name: string; paired: boolean; pairLabel?: string; waiting: boolean };
  own: Answers;
  partnerMessage?: string;
  partnerReply?: string;
  scenario?: string;
  reveal?: Reveal;
  partnerTyping?: boolean;
  experience?: ExperienceGuest;
}
export interface HostState {
  room: RoomSummary;
  counts: { joined: number; paired: number; waiting: number; submitted: number; total: number };
  participants: Array<{ id: string; name: string; pairLabel?: string; waiting: boolean; submitted: boolean }>;
  forecast: Forecast;
  forecastLocked: boolean;
  joinPath?: string;
  screenPath?: string;
  voteTotals?: VoteTotals;
}
export type HostAction = "pair" | "next" | "pause" | "resume" | "look_up" | "return" | "reveal" | "skip";
