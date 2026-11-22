"use client";

import { useEffect, useReducer, useState } from "react";
import { emptyVoteTotals, type VoteChoice } from "@/lib/live/experience-copy";
import { canWrite, composerDraft, createPreview, feelingStage, previewReducer, targetFor, type Pair, type Side } from "@/lib/live/preview-model";
import type { ExperiencePhase } from "@/lib/live/types";
import ConversationPanel from "./ConversationPanel";
import { BookFrame, BookHeader, BookStatus, ExperienceCards, RoomVote, SessionClosing, VoteResults } from "./ExperiencePanels";

export default function LivePreview({ initialMoment = 1, directChat = false }: { initialMoment?: number; directChat?: boolean }) {
  const [view, setView] = useState<"host" | Side>("host");
  const [phase, setPhase] = useState<ExperiencePhase>(directChat ? "chat" : "welcome");
  const [votes, setVotes] = useState<Pair<VoteChoice | undefined>>([undefined, undefined]);
  const [voteOpen, setVoteOpen] = useState<Pair<boolean>>([false, false]);
  const [joined, setJoined] = useState<Pair<boolean>>([directChat, directChat]);
  const [reviewingChat, setReviewingChat] = useState<Pair<boolean>>([false, false]);
  const [state, dispatch] = useReducer(previewReducer, { moment: initialMoment - 1, arrival: false }, createPreview);
  const { moment, reviewing } = state;
  const round = state.rounds[moment];

  useEffect(() => {
    if (round.phase !== "typing") return;
    const timer = setTimeout(() => dispatch({ type: "ready", moment, generation: state.generation }), 1800);
    return () => clearTimeout(timer);
  }, [moment, round.phase, state.generation]);

  function phone(next: Side) {
    dispatch({ type: "side", side: next });
    setView(next);
  }

  function restart() {
    setView("host"); setPhase("welcome"); setVotes([undefined, undefined]);
    setVoteOpen([false, false]); setJoined([false, false]); setReviewingChat([false, false]);
    dispatch({ type: "restart" });
  }

  function advance() {
    if (phase === "welcome") setPhase("vote");
    else if (phase === "vote") setPhase("vote_result");
    else if (phase === "vote_result") setPhase("pairing");
    else if (phase === "pairing" && joined.every(Boolean)) setPhase("chat");
    else if (phase === "chat" && !reviewing) dispatch({ type: "host", moment, phase: round.phase });
  }

  const totals = emptyVoteTotals();
  for (const vote of votes) if (vote) totals[vote]++;
  const sent = round.messages.filter(Boolean).length;
  const chatReady = ["ready", "waiting", "revealed"].includes(round.phase);
  const nextLabel = reviewing ? "Closing screen open" : phase === "welcome" ? "Open Experience 1"
    : phase === "vote" ? "Show room vote" : phase === "vote_result" ? "Open Experience 2"
    : phase === "pairing" ? "Pair guests and start" : round.phase === "waiting" ? "Reveal the real reply"
    : round.phase === "revealed" ? moment < 3 ? "Next moment" : "Show closing screen"
    : moment === 0 || moment === 2 ? "Show the message" : "Reveal the replies";
  const blocked = reviewing || (phase === "pairing" && !joined.every(Boolean)) || (phase === "chat" && !chatReady);

  let guest;
  if (view !== "host") {
    const viewing = view;
    if (phase === "chat" && reviewing && !reviewingChat[viewing]) {
      guest = <BookFrame rehearsal><SessionClosing onReview={() => setReviewingChat(old => viewing === 0 ? [true, old[1]] : [old[0], true])} /></BookFrame>;
    } else if (phase === "chat") {
      guest = <ConversationPanel
        key={`${viewing}:${state.generation}`}
        entries={state.timelines[viewing]}
        moment={moment} side={viewing} phase={round.phase} stage={feelingStage(state)}
        partnerLabel={viewing === 0 ? "07" : "12"}
        cueShown={targetFor(moment) !== null}
        hasPartnerMessage={Boolean(round.messages[viewing === 0 ? 1 : 0])}
        writing={canWrite(state)} draft={composerDraft(state)}
        typing={round.phase === "typing"}
        held={round.phase === "ready" || round.phase === "waiting" || (round.phase === "compose" && !canWrite(state))}
        reviewing={reviewing}
        onClosing={reviewing ? () => setReviewingChat(old => viewing === 0 ? [false, old[1]] : [old[0], false]) : undefined}
        onDraft={value => dispatch({ type: "draft", moment, side: viewing, value })}
        onSend={() => dispatch({ type: "send", moment, side: viewing })}
        onFeeling={(value, context) => dispatch({ type: "feeling", side: viewing, value, contextEventId: context.contextEventId })}
        rehearsal
      />;
    } else if (phase === "pairing" && joined[viewing]) {
      guest = <BookFrame rehearsal><BookStatus title="You’re ready.">Ivana will pair the room when everyone is ready.</BookStatus></BookFrame>;
    } else if (voteOpen[viewing] && (phase === "vote" || phase === "vote_result")) {
      guest = <BookFrame rehearsal><RoomVote vote={votes[viewing]} totals={phase === "vote_result" ? totals : undefined}
        sample onVote={choice => setVotes(old => viewing === 0 ? [choice, old[1]] : [old[0], choice])} /></BookFrame>;
    } else {
      guest = <BookFrame rehearsal><ExperienceCards phase={phase}
        onVote={() => setVoteOpen(old => viewing === 0 ? [true, old[1]] : [old[0], true])}
        onChat={() => setJoined(old => viewing === 0 ? [true, old[1]] : [old[0], true])} /></BookFrame>;
    }
  }

  return <div className="rehearsal-console">
    <header className="rehearsal-switcher">
      <p>Private rehearsal · One shared pair</p>
      <nav aria-label="Rehearsal view">
        <button type="button" aria-pressed={view === "host"} onClick={() => setView("host")}>Your controls</button>
        <button type="button" aria-pressed={view === 0} onClick={() => phone(0)}>Phone A</button>
        <button type="button" aria-pressed={view === 1} onClick={() => phone(1)}>Phone B</button>
      </nav>
      <p className="rehearsal-view-note">{view === "host" ? "Only this view can reveal a reply or move the pair ahead." : "Guest view. Return to Your controls to reveal or continue."}</p>
    </header>
    {view === "host" ? <BookFrame rehearsal>
      <section className="chat-entry-frame rehearsal-host" aria-label="Your rehearsal dashboard">
        <BookHeader step="Your controls" />
        <div className="chat-entry-body">
          <h1>{reviewing ? "The closing screen is open." : phase === "chat" ? `Moment 0${moment + 1}`
            : phase === "pairing" ? "Ready to pair" : phase === "vote_result" ? "The room vote" : phase === "vote" ? "Jessika’s quick vote" : "Let’s try both sides."}</h1>
          <p>{phase === "chat" ? `${sent} of 2 messages in. A and B stay on the same moment.`
            : phase === "pairing" ? `${joined.filter(Boolean).length} of 2 phones ready. Open each phone and tap Experience 2.`
              : phase === "vote" ? `${votes.filter(Boolean).length} of 2 votes in. Open each phone and tap Experience 1.`
                : "Use Phone A and Phone B to try the guest screens. Come back here for every reveal."}</p>
          {phase === "chat" && !reviewing && <ul className="rehearsal-ready" aria-label="Pair readiness">
            <li>Phone A <strong>{round.messages[0] ? "Sent" : "Writing"}</strong></li>
            <li>Phone B <strong>{round.messages[1] ? "Sent" : "Writing"}</strong></li>
          </ul>}
          {phase === "vote_result" && <VoteResults totals={totals} sample />}
          {!reviewing && <button type="button" className="live-button" disabled={blocked} onClick={advance}>{nextLabel}<span aria-hidden="true">↗</span></button>}
          {phase === "chat" && round.phase === "compose" && <button type="button" className="live-outline-button"
            disabled={sent > 0 || round.drafts.some(value => value.trim())}
            onClick={() => dispatch({ type: "sample", moment })}>Use an example pair</button>}
          {phase === "vote" && <button type="button" className="live-outline-button" onClick={() => setVotes(old => [old[0] ?? "Check again", old[1] ?? "Put it away"])}>Use two example votes</button>}
          {phase === "chat" && <p className="chat-entry-note">{reviewing ? "Both phones can now see the book connection and look back at their own chat."
            : round.phase === "waiting" ? `Only Phone ${targetFor(moment) === 0 ? "A" : "B"} sees the added line. The real replies stay hidden until you reveal.`
              : round.phase === "revealed" ? "Both phones have the real messages. The State/Situation recap stays closed until the ending."
                : "Type a line on each phone, or use the example pair before you start typing."}</p>}
          <button type="button" className="chat-restart" onClick={restart}>Restart rehearsal</button>
          <p className="chat-entry-note">For a test on several real phones, use Create a test room in your host dashboard. This rehearsal stays on this page.</p>
        </div>
      </section>
    </BookFrame> : guest}
  </div>;
}
