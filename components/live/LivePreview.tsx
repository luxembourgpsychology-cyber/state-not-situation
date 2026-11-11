"use client";

import { useEffect, useId, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { canWrite, composerDraft, createPreview, feelingChoices, feelingStage, previewReducer, prompts, stageNames, type ChatEvent } from "@/lib/live/preview-model";
import "@/app/live/experience-preview.css";

const firstFeelings = ["Curious", "Excited", "Calm", "Unsure", "Shy", "Amused"];

function FeelingChoices({ selected, onChoose }: { selected: string; onChoose: (feeling: string) => void }) {
  const [more, setMore] = useState(false);
  const [custom, setCustom] = useState(false);
  const [word, setWord] = useState("");
  const inputId = useId();
  const options = more ? [...firstFeelings, ...feelingChoices.filter(feeling => !firstFeelings.includes(feeling))] : firstFeelings;
  return <div className="chat-veil-choices">
    <div className="chat-veil-words" role="group" aria-label="Choose a feeling">{options.map(feeling => <button type="button" key={feeling} aria-pressed={selected === feeling} onClick={() => onChoose(feeling)}>{feeling}</button>)}</div>
    <div className="chat-veil-more">
      <button type="button" aria-expanded={more} onClick={() => setMore(old => !old)}>{more ? "Fewer feelings" : "More feelings"}</button>
      <button type="button" aria-expanded={custom} onClick={() => setCustom(old => !old)}>My own word</button>
    </div>
    {custom && <form className="chat-other-feeling" onSubmit={event => { event.preventDefault(); if (word.trim()) onChoose(word); }}><label className="sr-only" htmlFor={inputId}>Your own feeling</label><input id={inputId} value={word} onChange={event => setWord(event.target.value)} placeholder="Your word…" maxLength={40} autoFocus /><button disabled={!word.trim()}>Save privately</button></form>}
  </div>;
}

function FeelingVeil({ open, selected, onChoose, onDismiss }: { open: boolean; selected: string; onChoose: (feeling: string) => void; onDismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const noteId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return <dialog ref={dialog} className="chat-feeling-veil" aria-labelledby={titleId} aria-describedby={noteId} onCancel={event => { event.preventDefault(); onDismiss(); }} onClick={event => { if (event.target === event.currentTarget) onDismiss(); }}>
    {open && <div className="chat-veil-body">
      <header className="chat-veil-header"><span>My state · Private</span><button type="button" onClick={onDismiss} autoFocus>Not now</button></header>
      <h2 id={titleId}>What are you feeling right now?</h2>
      <p id={noteId}>Excited, unsure, or something else? Only you see your choice.</p>
      <FeelingChoices selected={selected} onChoose={onChoose} />
    </div>}
  </dialog>;
}

export default function LivePreview({ initialMoment = 1, startAtArrival = true }: { initialMoment?: number; startAtArrival?: boolean }) {
  const [state, dispatch] = useReducer(previewReducer, { moment: Number.isInteger(initialMoment) && initialMoment >= 1 && initialMoment <= 4 ? initialMoment - 1 : 0, arrival: startAtArrival }, createPreview);
  const [nickname, setNickname] = useState("");
  const [topPicker, setTopPicker] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const thread = useRef<HTMLDivElement>(null);
  const composeArea = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLOListElement>(null);
  const feelingContext = useRef<number | undefined>(undefined);
  const round = state.rounds[state.moment];
  const timeline = state.timelines[state.side];
  const conversation = timeline.filter(event => event.kind !== "feeling");
  const personalFeelings = timeline.filter(event => event.kind === "feeling");
  const selectedFeeling = personalFeelings.find(feeling => feeling.id === selectedStateId);
  const highlightedEventId = selectedFeeling?.contextEventId ?? (selectedFeeling ? conversation.filter(event => event.id < selectedFeeling.id).at(-1)?.id : undefined);
  const stage = feelingStage(state);
  const currentFeeling = personalFeelings.filter(event => event.moment === state.moment && event.stage === stage).at(-1)?.value || "";
  const partnerLabel = state.side === 0 ? "07" : "12";
  const isHeld = round.phase === "ready" || round.phase === "waiting";
  const writing = canWrite(state);
  const draft = composerDraft(state);
  const replyingToTrick = round.phase === "waiting" && writing;
  const unsentDraft = round.phase === "revealed" && Boolean(draft.trim());

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
    } else {
      element.scrollTop = element.scrollHeight;
      if (window.matchMedia("(max-width: 700px)").matches && writing && (round.phase === "waiting" || state.moment > 0)) {
        composeArea.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
      }
    }
  }, [state.arrival, state.reviewing, state.moment, state.side, conversation.length, round.phase, writing]);

  useEffect(() => {
    const element = trail.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
    element.scrollLeft = element.scrollWidth;
  }, [personalFeelings.length, state.side]);

  function openFeelingVeil() {
    const log = thread.current;
    let contextEventId = highlightedEventId;
    if (log) {
      const box = log.getBoundingClientRect();
      const visible = Array.from(log.querySelectorAll<HTMLElement>("[data-event-id]")).filter(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > Math.max(0, box.top) && bounds.top < Math.min(window.innerHeight, box.bottom);
      });
      const highlighted = visible.find(element => Number(element.dataset.eventId) === highlightedEventId);
      const id = (highlighted ?? visible.at(-1))?.dataset.eventId;
      if (id !== undefined) contextEventId = Number(id);
    }
    feelingContext.current = contextEventId;
    setTopPicker(true);
  }

  function chooseFeeling(value: string) {
    dispatch({ type: "feeling", side: state.side, value, contextEventId: feelingContext.current });
    setTopPicker(false);
    setSelectedStateId(null);
  }

  function revisitFeeling(id: number) {
    const feeling = personalFeelings.find(entry => entry.id === id);
    if (!feeling) return;
    const contextId = feeling.contextEventId ?? conversation.filter(entry => entry.id < feeling.id).at(-1)?.id;
    const log = thread.current;
    const entry = log?.querySelector<HTMLElement>(`[data-event-id="${contextId}"]`);
    setSelectedStateId(id);
    if (!log || !entry) return;
    if (state.reviewing) entry.scrollIntoView({ block: "center", behavior: "auto" });
    else log.scrollTop += entry.getBoundingClientRect().top - log.getBoundingClientRect().top - 10;
  }

  function jumpToPrompt(index: number) {
    const log = thread.current;
    const entry = log?.querySelector<HTMLElement>(`[data-prompt-moment="${index}"]`);
    if (!log || !entry) return;
    setSelectedStateId(null);
    if (state.reviewing) entry.scrollIntoView({ block: "start", behavior: "auto" });
    else log.scrollTop += entry.getBoundingClientRect().top - log.getBoundingClientRect().top - 10;
  }

  function restart() {
    dispatch({ type: "restart" });
    setNickname(""); setTopPicker(false);
    setSelectedStateId(null);
  }

  function hostAction() {
    setTopPicker(false);
    setSelectedStateId(null);
    if (state.reviewing) dispatch({ type: "review", open: false });
    else dispatch({ type: "host", moment: state.moment, phase: round.phase });
  }

  function renderEntry(entry: ChatEvent) {
    const contextClass = entry.id === highlightedEventId ? " is-state-context" : "";
    if (entry.kind === "prompt") return <div className={`chat-prompt-card${contextClass}`} key={entry.id} data-prompt-moment={entry.moment} data-event-id={entry.id}><small className="chat-event-label">Ivana · Prompt 0{entry.moment + 1}</small><p>{entry.text}</p></div>;
    if (entry.kind === "feeling") return null;
    if (entry.kind === "reveal") return <div className={`chat-app-reveal${contextClass}`} key={entry.id} data-event-id={entry.id}><small className="chat-event-label">A small trick</small><p>{entry.text}</p></div>;
    const own = entry.owner === state.side;
    const experiment = entry.message.source === "experiment";
    const disclosed = experiment && state.rounds[entry.moment].phase === "revealed";
    return <div className={`chat-bubble ${own ? "is-own" : "is-partner"} ${experiment ? "is-planted" : ""} ${disclosed ? "is-retired" : ""}${contextClass}`} key={entry.id} data-event-id={entry.id}>
      <small className="chat-bubble-label">{disclosed ? "Experiment line" : own ? "You" : `Partner ${partnerLabel}`}</small>
      <p>{disclosed ? <s>{entry.message.text}</s> : entry.message.text}</p>
      {entry.message.source === "example" && <small className="chat-bubble-source">Example</small>}
      {disclosed && <small className="chat-bubble-source">Not written by your partner</small>}
      {entry.message.replyTo && <small className="chat-bubble-source">Reply to “{entry.message.replyTo}”</small>}
    </div>;
  }

  const hostLabel = state.reviewing ? "Back to the conversation" : round.phase === "revealed" ? state.moment < 3 ? "Next moment" : "See the whole exchange" : round.phase === "waiting" ? "Reveal the real reply" : "Show the message";
  const ready = ["ready", "waiting", "revealed"].includes(round.phase);

  return <main className="live-app chat-preview">
    <h1 className="sr-only">Your book launch conversation</h1>
    <div className="chat-preview-shell">
      <header className="chat-demo-bar">
        <span>Demo · example pair</span>
        <div className="chat-demo-tools">
          <nav className="chat-demo-moments" aria-label="Conversation prompts">{prompts.map((_, index) => <button key={index} aria-label={`Prompt ${index + 1}`} aria-current={!state.arrival && state.moment === index ? "step" : undefined} disabled={!state.rounds[index].prompted} onClick={() => jumpToPrompt(index)}>0{index + 1}</button>)}</nav>
          <div className="chat-phone-switch" aria-label="Preview phone">{([0, 1] as const).map(side => <button key={side} aria-pressed={state.side === side} onClick={() => { dispatch({ type: "side", side }); setTopPicker(false); setSelectedStateId(null); }}>{side === 0 ? "A" : "B"}</button>)}</div>
          <button className="chat-restart" onClick={restart}>Restart</button>
        </div>
      </header>

      {state.arrival ? <section className="chat-arrival">
        <Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link>
        <h2>Someone in this room.</h2><p>You’ll write to each other. Your name stays hidden.</p>
        <form onSubmit={event => { event.preventDefault(); dispatch({ type: "join" }); }}><label htmlFor="chat-name">Your name or nickname</label><input id="chat-name" value={nickname} onChange={event => setNickname(event.target.value)} placeholder="Your name" maxLength={40} autoComplete="nickname" required /><button className="chat-send" type="submit">Join <span aria-hidden="true">↗</span></button></form>
        <small>A few lines are part of the experiment. We’ll reveal which.</small>
      </section> : <>
        <section className={`chat-experience ${state.reviewing ? "is-reviewing" : ""}`} aria-label="Guest experience">
          <header className="chat-book-header"><Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link><span className="chat-step">{state.reviewing ? "Full conversation" : `0${state.moment + 1} / 04`}</span></header>
          <div className="chat-main">
            <header className="chat-header chat-connection"><span className="chat-space-label">The situation</span><h2>You’re paired with someone in this room.</h2><p>Neither of you sees the other’s name.</p></header>
            <div className="chat-thread" role="log" aria-label="Your conversation" aria-live="polite" ref={thread}>
              {conversation.map(renderEntry)}
              {!state.reviewing && round.phase === "typing" && <div className="chat-typing" aria-label="Example partner is typing"><i /><i /><i /></div>}
              {!state.reviewing && isHeld && <p className="chat-wait">Waiting for Ivana</p>}
              {round.phase === "revealed" && state.moment === 3 && <div className="chat-share">{state.shared[state.side] ? <span>Marked for sharing in this demo.</span> : <button onClick={() => dispatch({ type: "share", side: state.side })}>Share my last message with the room</button>}</div>}
            </div>
            {!state.reviewing && <div className="chat-compose-area" ref={composeArea}><form className="chat-composer" onSubmit={event => { event.preventDefault(); setTopPicker(false); setSelectedStateId(null); dispatch({ type: "send", moment: state.moment, side: state.side }); }}><label className="sr-only" htmlFor={`chat-message-${state.moment}`}>Your message</label><textarea id={`chat-message-${state.moment}`} value={draft} disabled={!writing} onChange={event => dispatch({ type: "draft", moment: state.moment, side: state.side, value: event.target.value })} placeholder={replyingToTrick ? "Reply to this message…" : round.phase === "compose" ? "Your message…" : "Sent"} rows={2} maxLength={500} required /><button className="chat-send" type="submit" disabled={!writing || !draft.trim()} aria-label="Send"><span aria-hidden="true">↗</span></button></form>{(replyingToTrick || unsentDraft) && <p className="chat-composer-note">{unsentDraft ? "Unsent draft. Only you can see this." : "Your reply waits for the reveal."}</p>}</div>}
          </div>

          <aside className="chat-feelings" aria-label="Your private feelings">
            <header><h2>My state</h2><span>Private</span></header>
            <p className="chat-private-note">What I feel. Never sent to your partner.</p>
            <button className="chat-add-feeling" aria-haspopup="dialog" aria-expanded={topPicker} disabled={state.reviewing} onClick={openFeelingVeil}>How I feel</button>
            <div className="chat-state-trace" aria-live="polite">{personalFeelings.length ? <><ol ref={trail} aria-label="Your private state trace">{personalFeelings.map((feeling, index) => <li key={feeling.id} className={`${index === personalFeelings.length - 1 ? "is-current" : ""} ${selectedStateId === feeling.id ? "is-selected" : ""}`}><button className="chat-state-point" aria-pressed={selectedStateId === feeling.id} onClick={() => revisitFeeling(feeling.id)}><span className="chat-state-dot" aria-hidden="true" /><strong>{feeling.value}</strong><small>0{feeling.moment + 1} · {stageNames[feeling.stage]}</small></button>{index < personalFeelings.length - 1 && <svg className="chat-state-wave" viewBox="0 0 48 18" aria-hidden="true"><path d="M0 9 C8 -2 16 20 24 9 S40 -2 48 9" fill="none" /></svg>}</li>)}</ol><p className="chat-state-hint">Tap a feeling to revisit that moment.</p></> : <p className="chat-trail-empty">Your trace starts with your first choice.</p>}</div>
            {state.reviewing && <p className="chat-review-note">We changed a line on your screen. What changed for you?</p>}
          </aside>
        </section>
        <div className="chat-host-controls" aria-label="Ivana’s demo controls"><span>Ivana</span><button className="chat-host-action" onClick={hostAction} disabled={!ready}>{hostLabel}<span aria-hidden="true">↗</span></button></div>
      </>}
      <p className="chat-demo-note">Example pair. Nothing is sent to the event.</p>
    </div>
    <FeelingVeil open={topPicker} selected={currentFeeling} onChoose={chooseFeeling} onDismiss={() => setTopPicker(false)} />
  </main>;
}
