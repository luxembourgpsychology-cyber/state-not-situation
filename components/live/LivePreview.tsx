"use client";

import { useEffect, useId, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { createPreview, feelingChoices, feelingStage, previewReducer, prompts, stageNames, type ChatEvent } from "@/lib/live/preview-model";
import "@/app/live/experience-preview.css";

function FeelingPicker({ selected, onChoose }: { selected: string; onChoose: (feeling: string) => void }) {
  const [custom, setCustom] = useState(false);
  const [word, setWord] = useState("");
  const inputId = useId();
  return <div className="chat-emotion-picker">
    <div className="chat-emotion-options" aria-label="Choose a feeling">{feelingChoices.map(feeling => <button type="button" key={feeling} aria-pressed={selected === feeling} onClick={() => onChoose(feeling)}>{feeling}</button>)}</div>
    <button type="button" aria-expanded={custom} onClick={() => setCustom(old => !old)}>Other</button>
    {custom && <form className="chat-other-feeling" onSubmit={event => { event.preventDefault(); if (word.trim()) onChoose(word); }}><label className="sr-only" htmlFor={inputId}>Your own feeling</label><input id={inputId} value={word} onChange={event => setWord(event.target.value)} placeholder="Your word…" maxLength={40} autoFocus /><button disabled={!word.trim()}>Save privately</button></form>}
  </div>;
}

export default function LivePreview({ initialMoment = 1, startAtArrival = true }: { initialMoment?: number; startAtArrival?: boolean }) {
  const [state, dispatch] = useReducer(previewReducer, { moment: Number.isInteger(initialMoment) && initialMoment >= 1 && initialMoment <= 4 ? initialMoment - 1 : 0, arrival: startAtArrival }, createPreview);
  const [nickname, setNickname] = useState("");
  const [topPicker, setTopPicker] = useState(false);
  const thread = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLOListElement>(null);
  const round = state.rounds[state.moment];
  const timeline = state.timelines[state.side];
  const conversation = timeline.filter(event => event.kind !== "feeling");
  const personalFeelings = timeline.filter(event => event.kind === "feeling");
  const lastFeeling = personalFeelings.at(-1);
  const stage = feelingStage(state);
  const currentFeeling = personalFeelings.filter(event => event.moment === state.moment && event.stage === stage).at(-1)?.value || "";
  const partnerLabel = state.side === 0 ? "07" : "12";
  const isHeld = round.phase === "ready" || round.phase === "waiting";

  useEffect(() => {
    if (round.phase !== "typing") return;
    const timer = setTimeout(() => dispatch({ type: "ready", moment: state.moment, generation: state.generation }), 1800);
    return () => clearTimeout(timer);
  }, [state.moment, state.generation, round.phase]);

  useEffect(() => {
    window.history.replaceState(null, "", state.arrival ? window.location.pathname : `?moment=${state.moment + 1}`);
  }, [state.arrival, state.moment]);

  useEffect(() => {
    const element = thread.current;
    if (!element || state.arrival) return;
    if (state.reviewing) {
      element.scrollTop = 0;
      element.scrollIntoView({ block: "start", behavior: "auto" });
    } else element.scrollTop = element.scrollHeight;
  }, [state.arrival, state.reviewing, state.moment, state.side, conversation.length, round.phase]);

  useEffect(() => {
    const element = trail.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
    element.scrollLeft = element.scrollWidth;
  }, [personalFeelings.length, state.side]);

  function chooseFeeling(value: string) {
    dispatch({ type: "feeling", side: state.side, value });
    setTopPicker(false);
  }

  function jumpToPrompt(index: number) {
    const log = thread.current;
    const entry = log?.querySelector<HTMLElement>(`[data-prompt-moment="${index}"]`);
    if (!log || !entry) return;
    if (state.reviewing) entry.scrollIntoView({ block: "start", behavior: "auto" });
    else log.scrollTop += entry.getBoundingClientRect().top - log.getBoundingClientRect().top - 10;
  }

  function restart() {
    dispatch({ type: "restart" });
    setNickname(""); setTopPicker(false);
  }

  function hostAction() {
    setTopPicker(false);
    if (state.reviewing) dispatch({ type: "review", open: false });
    else dispatch({ type: "host", moment: state.moment, phase: round.phase });
  }

  function renderEntry(entry: ChatEvent) {
    if (entry.kind === "prompt") return <div className="chat-prompt-card" key={entry.id} data-prompt-moment={entry.moment}><small className="chat-event-label">Ivana · Prompt 0{entry.moment + 1}</small><p>{entry.text}</p></div>;
    if (entry.kind === "feeling") return null;
    if (entry.kind === "reveal") return <div className="chat-app-reveal" key={entry.id}><small className="chat-event-label">App reveal</small><p>{entry.text}</p></div>;
    const own = entry.owner === state.side;
    const experiment = entry.message.source === "experiment";
    const disclosed = experiment && state.rounds[entry.moment].phase === "revealed";
    return <div className={`chat-bubble ${own ? "is-own" : "is-partner"} ${experiment ? "is-planted" : ""} ${disclosed ? "is-retired" : ""}`} key={entry.id}>
      <small className="chat-bubble-label">{disclosed ? "App message" : own ? "You" : `Partner ${partnerLabel}`}</small>
      <p>{disclosed ? <s>{entry.message.text}</s> : entry.message.text}</p>
      {entry.message.source === "example" && <small className="chat-bubble-source">Example</small>}
      {disclosed && <small className="chat-bubble-source">Shown as Partner {partnerLabel}</small>}
    </div>;
  }

  const hostLabel = state.reviewing ? "Back to live view" : round.phase === "revealed" ? state.moment < 3 ? "Next moment" : "See whole chat" : round.phase === "waiting" ? "Reveal the real reply" : "Show the message";
  const ready = ["ready", "waiting", "revealed"].includes(round.phase);

  return <main className="live-app chat-preview">
    <h1 className="sr-only">Your book launch conversation</h1>
    <div className="chat-preview-shell">
      <header className="chat-demo-bar">
        <span>Demo · example pair</span>
        <div className="chat-demo-tools">
          <nav className="chat-demo-moments" aria-label="Conversation prompts">{prompts.map((_, index) => <button key={index} aria-label={`Prompt ${index + 1}`} aria-current={!state.arrival && state.moment === index ? "step" : undefined} disabled={!state.rounds[index].prompted} onClick={() => jumpToPrompt(index)}>0{index + 1}</button>)}</nav>
          <div className="chat-phone-switch" aria-label="Preview phone">{([0, 1] as const).map(side => <button key={side} aria-pressed={state.side === side} onClick={() => { dispatch({ type: "side", side }); setTopPicker(false); }}>{side === 0 ? "A" : "B"}</button>)}</div>
          <button className="chat-restart" onClick={restart}>Restart</button>
        </div>
      </header>

      {state.arrival ? <section className="chat-arrival">
        <Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link>
        <h2>Someone in this room.</h2><p>You’ll write to each other. Your name stays hidden.</p>
        <form onSubmit={event => { event.preventDefault(); dispatch({ type: "join" }); }}><label htmlFor="chat-name">Your name or nickname</label><input id="chat-name" value={nickname} onChange={event => setNickname(event.target.value)} placeholder="Your name" maxLength={40} autoComplete="nickname" required /><button className="chat-send" type="submit">Join <span aria-hidden="true">↗</span></button></form>
        <small>The app adds a few messages too.</small>
      </section> : <>
        <section className={`chat-experience ${state.reviewing ? "is-reviewing" : ""}`} aria-label="Guest experience">
          <header className="chat-book-header"><Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link><span className="chat-step">{state.reviewing ? "Full conversation" : `0${state.moment + 1} / 04`}</span></header>
          <div className="chat-main">
            <header className="chat-header chat-connection"><h2>You’re paired with someone in this room.</h2><p>Neither of you sees the other’s name.</p></header>
            <div className="chat-thread" role="log" aria-label="Your conversation" aria-live="polite" ref={thread}>
              {conversation.map(renderEntry)}
              {!state.reviewing && round.phase === "typing" && <div className="chat-typing" aria-label="Example partner is typing"><i /><i /><i /></div>}
              {!state.reviewing && isHeld && <p className="chat-wait">Waiting for Ivana</p>}
              {round.phase === "revealed" && state.moment === 3 && <div className="chat-share">{state.shared[state.side] ? <span>Marked for sharing in this demo.</span> : <button onClick={() => dispatch({ type: "share", side: state.side })}>Share my last message with the room</button>}</div>}
            </div>
            {!state.reviewing && <form className="chat-composer" onSubmit={event => { event.preventDefault(); setTopPicker(false); dispatch({ type: "send", moment: state.moment, side: state.side }); }}><label className="sr-only" htmlFor={`chat-message-${state.moment}`}>Your message</label><textarea id={`chat-message-${state.moment}`} value={round.phase === "compose" ? round.drafts[state.side] : ""} disabled={round.phase !== "compose"} onChange={event => dispatch({ type: "draft", moment: state.moment, side: state.side, value: event.target.value })} placeholder={round.phase === "compose" ? "Your message…" : "Sent"} rows={2} maxLength={500} required /><button className="chat-send" type="submit" disabled={round.phase !== "compose" || !round.drafts[state.side].trim()} aria-label="Send"><span aria-hidden="true">↗</span></button></form>}
          </div>

          <aside className="chat-feelings" aria-label="Your private feelings">
            <header><h2>Private feelings</h2><span>Only you</span></header>
            <p className="chat-private-note">Never sent to your partner.</p>
            {lastFeeling && <p className="chat-last-feeling">Last noted: <strong>{lastFeeling.value}</strong></p>}
            <button className="chat-add-feeling" aria-expanded={topPicker} disabled={state.reviewing} onClick={() => setTopPicker(old => !old)}>How I feel</button>
            {topPicker && <div className="chat-top-picker"><FeelingPicker key={`top-${state.side}-${state.moment}-${round.phase}`} selected={currentFeeling} onChoose={chooseFeeling} /></div>}
            {state.reviewing && <div className="chat-feeling-trail" aria-live="polite">{personalFeelings.length ? <ol ref={trail} aria-label="Your private feeling notes">{personalFeelings.map(feeling => <li key={feeling.id}><span className="chat-trail-point" aria-hidden="true" /><small>0{feeling.moment + 1} · {stageNames[feeling.stage]}</small><span>{feeling.value}</span></li>)}</ol> : <p className="chat-trail-empty">No private feelings recorded.</p>}</div>}
          </aside>
        </section>
        <div className="chat-host-controls" aria-label="Ivana’s demo controls"><span>Ivana</span><button className="chat-host-action" onClick={hostAction} disabled={!ready}>{hostLabel}<span aria-hidden="true">↗</span></button></div>
      </>}
      <p className="chat-demo-note">Example pair. Nothing is sent to the event.</p>
    </div>
  </main>;
}
