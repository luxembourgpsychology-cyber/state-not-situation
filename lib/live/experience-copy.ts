import type { RoomSummary } from "./types.ts";

export const VOTE_CHOICES = ["Put it away", "Check again", "Open something else"] as const;
export type VoteChoice = (typeof VOTE_CHOICES)[number];
export type VoteTotals = Record<VoteChoice, number>;

export const voteQuestion = "Think of the last time you checked your phone and found nothing new. What did you feel like doing next?";

export function emptyVoteTotals(): VoteTotals {
  return { "Put it away": 0, "Check again": 0, "Open something else": 0 };
}
export function experienceCheckpoint(room: Pick<RoomSummary, "experience" | "paused" | "lookUp">) {
  const progress = room.experience;
  return progress && [progress.phase, progress.moment, progress.conversationPhase, room.paused, room.lookUp].join(":");
}
