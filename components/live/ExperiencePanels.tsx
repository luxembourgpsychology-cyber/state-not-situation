"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
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

export function SessionClosing({ onReview }: { onReview?: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);
  return <section className="chat-entry-frame chat-closing" aria-label="The book connection">
    <BookHeader step="One last thought" />
    <div className="chat-entry-body">
      <h2>What did you think was coming?</h2>
      <p className="chat-entry-note">Think back to the pause before Ivana revealed the reply.</p>
      <div className="chat-closing-cards">
        <div><h3>Situation</h3><p>The words on your screen. The wait. Then the real reply.</p></div>
        <div><h3>My state</h3><p>What you felt while you waited. What you felt when you read it.</p></div>
      </div>
      <p className="chat-closing-question">What did you know? What did you guess?</p>
      <div className="chat-closing-book">
        <span className="chat-event-label">In the book · Katrin</span>
        <p>Her manager asks for a short meeting. “Nothing urgent.”</p>
        <p>She is tired and tense. She reads it as a warning. The meeting turns out to be about a budget timeline.</p>
      </div>
      <p className="chat-closing-takeaway">A feeling is real. It does not tell you the whole situation.</p>
      <details className="chat-closing-trick">
        <summary>About the small trick</summary>
        <p>Some phones saw “Can I be honest?” or “Wait, really?” before the real reply. Those lines were added by the app. Your partner’s own messages appeared at the reveal.</p>
      </details>
      {onReview && <button className="chat-closing-review" type="button" onClick={onReview}>Look back at my chat <span aria-hidden="true">↗</span></button>}
    </div>
  </section>;
}
