"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { VOTE_CHOICES, voteQuestion, type VoteChoice, type VoteTotals } from "@/lib/live/experience-copy";
import type { ExperiencePhase } from "@/lib/live/types";
import "@/app/live/experience-preview.css";

export function BookHeader({ step }: { step?: string }) {
  return <header className="chat-book-header">
    <Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link>
    {step && <span className="chat-step">{step}</span>}
  </header>;
}

export function BookFrame({ children, rehearsal = false, controls }: {
  children: ReactNode;
  rehearsal?: boolean;
  controls?: ReactNode;
}) {
  return <main className={`live-app chat-preview ${controls ? "chat-has-controls" : "chat-live"}`}>
    <h1 className="sr-only">State. Not Situation. book launch</h1>
    <div className="chat-preview-shell">
      {rehearsal && <p className="chat-demo-bar">Solo rehearsal</p>}
      {children}
      {controls}
    </div>
  </main>;
}

export function ExperienceCards({ phase, onVote, onChat, disabled = false, error }: {
  phase: ExperiencePhase;
  onVote: () => void;
  onChat: () => void;
  disabled?: boolean;
  error?: string;
}) {
  const voteOpen = phase === "vote" || phase === "vote_result";
  const chatOpen = phase === "pairing" || phase === "chat";
  const voteStatus = phase === "vote" ? "Open" : phase === "vote_result" ? "See the result" : phase === "welcome" ? "Opens shortly" : "Done";
  return <section className="chat-entry-frame" aria-label="Choose an experience">
    <BookHeader />
    <div className="chat-entry-body">
      <button type="button" className="chat-choice-card" disabled={disabled || !voteOpen} onClick={onVote}>
        <span className="chat-event-label">Experience 1 · Jessika</span>
        <strong>Quick vote</strong>
        <span className="chat-choice-status">{voteStatus}</span>
      </button>
      <button type="button" className="chat-choice-card" disabled={disabled || !chatOpen} onClick={onChat}>
        <span className="chat-event-label">Experience 2 · Ivana</span>
        <strong>Four small moments</strong>
        <span className="chat-choice-status">{chatOpen ? "Open" : phase === "finished" ? "Done" : "Opens next"}</span>
      </button>
      {phase !== "finished" && <p className="chat-entry-note">Join in if you like. Your chat goes to one anonymous partner. A few lines are part of the experiment.</p>}
      {error && <p className="chat-entry-error" role="alert">{error}</p>}
    </div>
  </section>;
}

export function RoomVote({ vote, totals, busy, error, sample = false, onVote }: {
  vote?: VoteChoice;
  totals?: VoteTotals;
  busy?: boolean;
  error?: string;
  sample?: boolean;
  onVote: (choice: VoteChoice) => void;
}) {
  return <section className="chat-entry-frame" aria-label="Jessika’s quick vote">
    <BookHeader step="Experience 1" />
    <div className="chat-entry-body">
      <div className="chat-prompt-card chat-vote-card" aria-live="polite">
        <small className="chat-event-label">Jessika · Quick vote</small>
        {totals ? <>
          <h2>How the room voted</h2>
          <VoteResults totals={totals} sample={sample} />
        </> : vote ? <>
          <h2>Vote in. Look up.</h2>
          <p className="chat-vote-note">Notice if you want to look again.</p>
        </> : <>
          <p>{voteQuestion}</p>
          <div className="chat-vote-choices" aria-label="Pick one answer">
            {VOTE_CHOICES.map(choice => <button key={choice} type="button" disabled={busy} onClick={() => onVote(choice)}>{choice}</button>)}
          </div>
        </>}
      </div>
      {error && <p className="chat-entry-error" role="alert">{error}</p>}
    </div>
  </section>;
}

export function VoteResults({ totals, sample = false }: { totals: VoteTotals; sample?: boolean }) {
  const count = VOTE_CHOICES.reduce((sum, choice) => sum + totals[choice], 0);
  return <div className="chat-vote-results">
    <ul aria-label="Room vote totals">{VOTE_CHOICES.map(choice => <li key={choice}>
      <span>{choice}</span><strong>{totals[choice]}</strong>
      <div aria-hidden="true"><span style={{ width: `${count ? 100 * totals[choice] / count : 0}%` }} /></div>
    </li>)}</ul>
    <p className="chat-vote-note">{sample ? "Example room · " : ""}{count} {count === 1 ? "vote" : "votes"}</p>
  </div>;
}

export function BookStatus({ title, children }: { title: string; children?: ReactNode }) {
  return <section className="chat-entry-frame" aria-label={title}>
    <BookHeader />
    <div className="chat-entry-body chat-entry-status" role="status">
      <h2>{title}</h2>
      {children && <p className="chat-entry-note">{children}</p>}
    </div>
  </section>;
}
