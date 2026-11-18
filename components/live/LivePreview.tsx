"use client";

import { useEffect, useReducer, useState } from "react";
import { emptyVoteTotals, type VoteChoice } from "@/lib/live/experience-copy";
import { canWrite, composerDraft, createPreview, feelingStage, previewReducer, targetFor } from "@/lib/live/preview-model";
import type { ExperiencePhase } from "@/lib/live/types";
import ConversationPanel from "./ConversationPanel";
import { BookFrame, ExperienceCards, RoomVote } from "./ExperiencePanels";

export default function LivePreview({ initialMoment = 1, directChat = false }: { initialMoment?: number; directChat?: boolean }) {
  const [screen, setScreen] = useState<"cards" | "vote" | "chat">(directChat ? "chat" : "cards");
  const [phase, setPhase] = useState<ExperiencePhase>(directChat ? "chat" : "vote");
  const [vote, setVote] = useState<VoteChoice>();

  function restart() {
    setScreen("cards");
    setPhase("vote");
    setVote(undefined);
  }

  if (screen === "chat") return <PreviewChat initialMoment={initialMoment} restart={restart} />;

  function advance() {
    if (phase === "vote") setPhase("vote_result");
    else {
      setScreen("cards");
      setPhase("chat");
    }
  }

  const totals = emptyVoteTotals();
  totals["Put it away"] = 4;
  totals["Check again"] = 8;
  totals["Open something else"] = 5;
  if (vote) totals[vote] += 1;

  const controls = screen === "vote" && <div className="chat-host-controls" aria-label="Ivana’s demo controls">
    <span>Ivana</span>
    <button className="chat-host-action" disabled={!vote} onClick={advance}>
      {phase === "vote" ? "Show room vote" : "Open Experience 2"}<span aria-hidden="true">↗</span>
    </button>
  </div>;

  return <BookFrame rehearsal controls={controls}>
    {screen === "cards"
      ? <ExperienceCards phase={phase} onVote={() => setScreen("vote")} onChat={() => setScreen("chat")} />
      : <RoomVote vote={vote} totals={phase === "vote_result" ? totals : undefined} sample onVote={setVote} />}
  </BookFrame>;
}

function PreviewChat({ initialMoment, restart }: { initialMoment: number; restart: () => void }) {
  const [state, dispatch] = useReducer(previewReducer, { moment: initialMoment - 1, arrival: false }, createPreview);
  const { moment, side, reviewing } = state;
  const round = state.rounds[moment];
  const { phase } = round;

  useEffect(() => {
    if (phase !== "typing") return;
    const timer = setTimeout(() => dispatch({ type: "ready", moment, generation: state.generation }), 1800);
    return () => clearTimeout(timer);
  }, [moment, phase, state.generation]);

  let label = "Show the message";
  if (reviewing) label = "Back to the conversation";
  else if (phase === "waiting") label = "Reveal the real reply";
  else if (phase === "revealed") label = moment < 3 ? "Next moment" : "See the whole exchange";

  return <ConversationPanel
    entries={state.timelines[side]}
    moment={moment}
    side={side}
    phase={phase}
    stage={feelingStage(state)}
    partnerLabel={side === 0 ? "07" : "12"}
    cueShown={targetFor(moment) !== null}
    hasPartnerMessage={Boolean(round.messages[side === 0 ? 1 : 0])}
    writing={canWrite(state)}
    draft={composerDraft(state)}
    typing={phase === "typing"}
    held={phase === "ready" || phase === "waiting"}
    reviewing={reviewing}
    onDraft={value => dispatch({ type: "draft", moment, side, value })}
    onSend={() => dispatch({ type: "send", moment, side })}
    onFeeling={(value, context) => dispatch({ type: "feeling", side, value, contextEventId: context.contextEventId })}
    preview={{
      label,
      ready: ["ready", "waiting", "revealed"].includes(phase),
      restart,
      changeSide: nextSide => dispatch({ type: "side", side: nextSide }),
      advance: () => reviewing
        ? dispatch({ type: "review", open: false })
        : dispatch({ type: "host", moment, phase }),
      share: () => dispatch({ type: "share", side }),
      shared: state.shared[side],
    }}
  />;
}
