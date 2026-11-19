"use client";

import { useEffect, useId, useRef, useState } from "react";
import { feelingChoices, planted, prompts, stageNames, targetFor, type ChatEvent, type FeelingStage, type Phase, type Side } from "@/lib/live/preview-model";
import { BookFrame, BookHeader } from "./ExperiencePanels";

export type FeelingEntry = Extract<ChatEvent, { kind: "feeling" }>;
export type FeelingContext = Pick<FeelingEntry, "moment" | "stage" | "contextEventId">;

type PreviewControls = {
  changeSide: (side: Side) => void;
  restart: () => void;
  advance: () => void;
  label: string;
  ready: boolean;
  share: () => void;
  shared: boolean;
};

type ConversationProps = {
  entries: ChatEvent[];
  moment: number;
  side: Side;
  phase: Phase;
  stage: FeelingStage;
  partnerLabel: string;
  cueShown: boolean;
  hasPartnerMessage: boolean;
  writing: boolean;
  draft: string;
  typing: boolean;
  held: boolean;
  reviewing?: boolean;
  busy?: boolean;
  error?: string;
  onDraft: (value: string) => void;
  onSend: () => void;
  onFeeling: (value: string, context: FeelingContext) => void;
  preview?: PreviewControls;
};

const firstFeelings = ["Curious", "Excited", "Calm", "Unsure", "Shy", "Amused"];

function FeelingChoices({ selected, onChoose }: { selected: string; onChoose: (feeling: string) => void }) {
  const [more, setMore] = useState(false);
  const [custom, setCustom] = useState(false);
  const [word, setWord] = useState("");
  const inputId = useId();
  const options = more ? [...firstFeelings, ...feelingChoices.filter(feeling => !firstFeelings.includes(feeling))] : firstFeelings;
  return <div className="chat-veil-choices">
    <div className="chat-veil-words" role="group" aria-label="Choose a feeling">
      {options.map(feeling => <button type="button" key={feeling} aria-pressed={selected === feeling} onClick={() => onChoose(feeling)}>{feeling}</button>)}
    </div>
    <div className="chat-veil-more">
      <button type="button" aria-expanded={more} onClick={() => setMore(old => !old)}>{more ? "Fewer feelings" : "More feelings"}</button>
      <button type="button" aria-expanded={custom} onClick={() => setCustom(old => !old)}>My own word</button>
    </div>
    {custom && <form className="chat-other-feeling" onSubmit={event => {
      event.preventDefault();
      if (word.trim()) onChoose(word);
    }}>
      <label className="sr-only" htmlFor={inputId}>Your own feeling</label>
      <input id={inputId} value={word} onChange={event => setWord(event.target.value)} placeholder="Your word…" maxLength={40} autoFocus />
      <button disabled={!word.trim()}>Save privately</button>
    </form>}
  </div>;
}

function FeelingVeil({ open, selected, onChoose, onDismiss }: {
  open: boolean;
  selected: string;
  onChoose: (feeling: string) => void;
  onDismiss: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const noteId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return <dialog ref={dialog} className="chat-feeling-veil" aria-labelledby={titleId} aria-describedby={noteId}
    onCancel={event => { event.preventDefault(); onDismiss(); }}
    onClick={event => { if (event.target === event.currentTarget) onDismiss(); }}>
    {open && <div className="chat-veil-body">
      <header className="chat-veil-header"><span>My state · Private</span><button type="button" onClick={onDismiss} autoFocus>Not now</button></header>
      <h2 id={titleId}>What are you feeling right now?</h2>
      <p id={noteId}>Excited, unsure, or something else? Only you see your choice.</p>
      <FeelingChoices selected={selected} onChoose={onChoose} />
    </div>}
  </dialog>;
}

export default function ConversationPanel({
  entries, moment, side, phase, stage, partnerLabel, cueShown, hasPartnerMessage, writing, draft, typing, held,
  reviewing, busy, error, onDraft, onSend, onFeeling, preview,
}: ConversationProps) {
  const [topPicker, setTopPicker] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const thread = useRef<HTMLDivElement>(null);
  const composeArea = useRef<HTMLDivElement>(null);
  const revealSummary = useRef<HTMLElement>(null);
  const trail = useRef<HTMLOListElement>(null);
  const feelingContext = useRef<FeelingContext | null>(null);
  const conversation = entries.filter(event => event.kind !== "feeling");
  const feelings = entries.filter(event => event.kind === "feeling");
  const momentFeelings = feelings.filter(event => event.moment === moment);
  const currentFeeling = momentFeelings.filter(event => event.stage === stage).at(-1)?.value || "";
  const beforeReveal = momentFeelings.filter(event => event.stage !== "after").at(-1)?.value;
  const afterReveal = momentFeelings.filter(event => event.stage === "after").at(-1)?.value;
  const selectedFeeling = feelings.find(feeling => feeling.id === selectedStateId);
  const highlightedEventId = selectedFeeling?.contextEventId;
  const firstReply = conversation.find(entry => entry.kind === "message" && entry.moment === 0
    && entry.owner !== side && entry.message.source !== "experiment" && !entry.message.replyTo);
  const replyingToCue = phase === "waiting" && writing;
  const unsentDraft = phase === "revealed" && Boolean(draft.trim());
  const cueOnThisPhone = cueShown && targetFor(moment) === side;
  const revealedSituation = cueOnThisPhone
    ? "Added by the app."
    : cueShown ? `The app added “${planted[moment]}” on your partner’s phone.` : "";
  const revealedReply = hasPartnerMessage ? "Your partner’s reply is now visible." : "No reply arrived this round.";

  useEffect(() => {
    const element = thread.current;
    if (!element) return;
    if (reviewing) {
      element.scrollTop = 0;
      element.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }
    const prompt = writing && moment === 1 && phase === "compose"
      ? element.querySelector<HTMLElement>('[data-prompt-moment="1"]') : null;
    element.scrollTop = prompt
      ? element.scrollTop + prompt.getBoundingClientRect().top - element.getBoundingClientRect().top - 4
      : element.scrollHeight;
    if (window.matchMedia("(max-width: 700px)").matches && writing && (phase === "waiting" || moment > 0)) {
      composeArea.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }, [reviewing, moment, side, conversation.length, phase, writing]);

  useEffect(() => {
    if (phase === "revealed" && !reviewing && window.matchMedia("(max-width: 700px)").matches) {
      revealSummary.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }, [phase, moment, reviewing]);

  useEffect(() => {
    const element = trail.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
    element.scrollLeft = element.scrollWidth;
  }, [feelings.length, side]);

  function openFeelingVeil() {
    const log = thread.current;
    let contextEventId = highlightedEventId ?? conversation.at(-1)?.id;
    if (log) {
      const bounds = log.getBoundingClientRect();
      const visible = Array.from(log.querySelectorAll<HTMLElement>("[data-event-id]")).filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.bottom > Math.max(0, bounds.top) && rect.top < Math.min(window.innerHeight, bounds.bottom);
      });
      const relevant = visible.find(element => Number(element.dataset.eventId) === highlightedEventId) ?? visible.at(-1);
      if (relevant) contextEventId = Number(relevant.dataset.eventId);
    }
    feelingContext.current = { moment, stage, contextEventId };
    setTopPicker(true);
  }

  function chooseFeeling(value: string) {
    if (feelingContext.current) onFeeling(value, feelingContext.current);
    setTopPicker(false);
    setSelectedStateId(null);
  }

  function goToEntry(selector: string) {
    const log = thread.current;
    const entry = log?.querySelector<HTMLElement>(selector);
    if (!log || !entry) return;
    if (reviewing) entry.scrollIntoView({ block: "center", behavior: "auto" });
    else log.scrollTop += entry.getBoundingClientRect().top - log.getBoundingClientRect().top - 10;
  }

  function revisitFeeling(feeling: FeelingEntry) {
    setSelectedStateId(feeling.id);
    if (feeling.contextEventId !== undefined) goToEntry(`[data-event-id="${feeling.contextEventId}"]`);
    if (!reviewing) thread.current?.scrollIntoView({ block: "nearest", behavior: "auto" });
  }

  function renderEntry(entry: Exclude<ChatEvent, { kind: "feeling" }>) {
    const contextClass = entry.id === highlightedEventId ? " is-state-context" : "";
    if (entry.kind === "prompt") {
      return <div className={`chat-prompt-card${contextClass}`} key={entry.id} data-prompt-moment={entry.moment} data-event-id={entry.id}>
        <small className="chat-event-label">Ivana · Prompt 0{entry.moment + 1}</small>
        {entry.moment === 1 ? <>
          {firstReply?.kind === "message" && <blockquote className="chat-reread">
            <small>Your partner wrote</small>
            <p>{firstReply.message.text}</p>
          </blockquote>}
          <p>{firstReply ? "Read it again. " : ""}Tap <button type="button" className="chat-prompt-feeling" aria-haspopup="dialog" aria-expanded={topPicker}
            disabled={reviewing} onClick={openFeelingVeil}>How I feel</button>, then reply with a question.</p>
        </> : <p>{entry.text}</p>}
      </div>;
    }
    if (entry.kind === "reveal") {
      const question = entry.moment === 0
        ? "In the book, Katrin is already tense. “Nothing urgent” sounds like bad news. What did you expect?"
        : targetFor(entry.moment) === side
          ? "Read it once with surprise, once with doubt. What did you hear first?"
          : "How did you expect your partner’s answer to sound?";
      return <div className={`chat-app-reveal${contextClass}`} key={entry.id} data-event-id={entry.id}>
        <small className="chat-event-label">What happened</small><p>{entry.text}</p><p>{question}</p>
      </div>;
    }
    const own = entry.owner === side;
    const experiment = entry.message.source === "experiment";
    const disclosed = experiment && (entry.moment < moment || phase === "revealed");
    return <div className={`chat-bubble ${own ? "is-own" : "is-partner"} ${experiment ? "is-planted" : ""} ${disclosed ? "is-retired" : ""}${contextClass}`} key={entry.id} data-event-id={entry.id}>
      <small className="chat-bubble-label">{disclosed ? "Added by the app" : own ? "You" : `Partner ${partnerLabel}`}</small>
      <p>{disclosed ? <s>{entry.message.text}</s> : entry.message.text}</p>
      {entry.message.source === "example" && <small className="chat-bubble-source">Example</small>}
      {disclosed && <small className="chat-bubble-source">Not written by your partner</small>}
      {entry.message.replyTo && <small className="chat-bubble-source">Reply to “{entry.message.replyTo}”</small>}
    </div>;
  }

  const hostControl = preview && <div className="chat-host-controls" aria-label="Ivana’s demo controls">
    <span>Ivana</span>
    <button className="chat-host-action" disabled={!preview.ready} onClick={() => {
      setSelectedStateId(null);
      preview.advance();
    }}>{preview.label}<span aria-hidden="true">↗</span></button>
  </div>;

  return <BookFrame controls={hostControl}>
    {preview && <header className="chat-demo-bar">
      <span>Solo demo · Phone {side === 0 ? "A" : "B"}</span>
      <div className="chat-demo-tools">
        <nav className="chat-demo-moments" aria-label="Conversation prompts">
          {prompts.map((_, index) => <button key={index} aria-label={`Prompt ${index + 1}`} aria-current={moment === index ? "step" : undefined}
            disabled={!conversation.some(entry => entry.kind === "prompt" && entry.moment === index)}
            onClick={() => { setSelectedStateId(null); goToEntry(`[data-prompt-moment="${index}"]`); }}>0{index + 1}</button>)}
        </nav>
        <div className="chat-phone-switch" aria-label="Preview phone">
          {([0, 1] as const).map(phone => <button key={phone} aria-label={phone === 0 ? "Phone A" : "Phone B"} aria-pressed={side === phone}
            onClick={() => { setSelectedStateId(null); preview.changeSide(phone); }}>{phone === 0 ? "A" : "B"}</button>)}
        </div>
        <button className="chat-restart" onClick={preview.restart}>Restart</button>
      </div>
    </header>}
    <section className={`chat-experience ${reviewing ? "is-reviewing" : ""}`} aria-label="Guest experience">
      <BookHeader step={reviewing ? "Full conversation" : `0${moment + 1} / 04`} />
      <div className="chat-main">
        <header className="chat-header chat-connection">
          <div className="chat-space-key"><strong>Situation</strong><span>What’s happening around you</span></div>
          <h2>You’re paired with someone in this room.</h2><p>Neither of you sees the other’s name.</p>
        </header>
        <div className="chat-thread" role="log" aria-label="Your conversation" aria-live="polite" ref={thread}>
          {conversation.map(renderEntry)}
          {!reviewing && typing && <div className="chat-typing" aria-label={preview ? "Example partner is typing" : "Your partner is typing"}><i /><i /><i /></div>}
          {!reviewing && held && <p className="chat-wait">Waiting for Ivana</p>}
          {preview && phase === "revealed" && moment === 3 && <div className="chat-share">
            {preview.shared ? <span>Marked for sharing in this demo.</span> : <button onClick={preview.share}>Share my last message with the room</button>}
          </div>}
        </div>
        {!reviewing && <div className="chat-compose-area" ref={composeArea}>
          {phase === "revealed" && <section className="chat-reveal-summary" aria-label="Situation and state at the reveal" ref={revealSummary}>
            <div className="chat-summary-situation">
              <h3>Situation</h3><p className="chat-summary-caption">What happened</p>
              {cueOnThisPhone && <blockquote className="chat-summary-line">“{planted[moment]}”</blockquote>}
              {revealedSituation && <p className="chat-summary-value">{revealedSituation}</p>}
              <p className="chat-summary-value">{revealedReply}</p>
            </div>
            <div className="chat-summary-state">
              <div className="chat-summary-heading"><h3>My state</h3><span>Private</span></div>
              <p className="chat-summary-caption">What I felt</p>
              <dl className="chat-summary-feelings">
                <div><dt>Before the reveal</dt><dd>{beforeReveal || <span className="chat-summary-empty">Not recorded</span>}</dd></div>
                <div><dt>Now</dt><dd>{afterReveal || <button className="chat-summary-check-in" type="button" aria-haspopup="dialog" aria-expanded={topPicker} onClick={openFeelingVeil}>How I feel now</button>}</dd></div>
              </dl>
              {afterReveal && <button className="chat-summary-check-in" type="button" aria-label="Update how I feel now" aria-haspopup="dialog" aria-expanded={topPicker} onClick={openFeelingVeil}>Update</button>}
            </div>
            {feelings.length > 0 && <details className="chat-summary-history">
              <summary>My feelings so far <span>Private</span></summary>
              <ol aria-label="All my feeling check-ins">{feelings.map(feeling => <li key={feeling.id}>
                <button type="button" aria-pressed={selectedStateId === feeling.id} onClick={() => revisitFeeling(feeling)}>
                  <small>0{feeling.moment + 1} · {stageNames[feeling.stage]}</small><strong>{feeling.value}</strong>
                </button>
              </li>)}</ol>
              <p>Tap a feeling to revisit that moment.</p>
            </details>}
          </section>}
          {(phase !== "revealed" || unsentDraft) && <form className="chat-composer" onSubmit={event => {
            event.preventDefault();
            if (writing && !busy && draft.trim()) onSend();
          }}>
            <label className="sr-only" htmlFor={`chat-message-${moment}`}>Your message</label>
            <textarea id={`chat-message-${moment}`} value={draft} disabled={!writing || busy} onChange={event => onDraft(event.target.value)}
              placeholder={replyingToCue ? "Reply to this message…" : writing ? "Your message…" : "Sent"} rows={2} maxLength={500} required />
            <button className="chat-send" type="submit" disabled={!writing || busy || !draft.trim()} aria-label="Send"><span aria-hidden="true">↗</span></button>
          </form>}
          {(replyingToCue || unsentDraft) && <p className="chat-composer-note">{unsentDraft ? "Unsent draft. Only you can see this." : "If you send a reply, your partner sees it after Ivana reveals."}</p>}
          {error && <p className="chat-entry-error" role="alert">{error}</p>}
        </div>}
      </div>
      <aside className="chat-feelings" aria-label="Your private feelings">
        <header><h2>My state</h2><span>Private</span></header>
        <p className="chat-private-note">What’s happening in me. Only I can see it.</p>
        <button className="chat-add-feeling" aria-haspopup="dialog" aria-expanded={topPicker} disabled={reviewing} onClick={openFeelingVeil}>How I feel</button>
        <div className="chat-state-trace" aria-live="polite">
          {feelings.length ? <>
            <ol ref={trail} aria-label="Your private state trace">{feelings.map((feeling, index) => <li key={feeling.id} className={`${index === feelings.length - 1 ? "is-current" : ""} ${selectedStateId === feeling.id ? "is-selected" : ""}`}>
              <button className="chat-state-point" aria-pressed={selectedStateId === feeling.id} onClick={() => revisitFeeling(feeling)}>
                <span className="chat-state-dot" aria-hidden="true" /><strong>{feeling.value}</strong><small>0{feeling.moment + 1} · {stageNames[feeling.stage]}</small>
              </button>
              {index < feelings.length - 1 && <svg className="chat-state-wave" viewBox="0 0 48 18" aria-hidden="true"><path d="M0 9 C8 -2 16 20 24 9 S40 -2 48 9" fill="none" /></svg>}
            </li>)}</ol>
            <p className="chat-state-hint">Tap a feeling to revisit that moment.</p>
          </> : <p className="chat-trail-empty">Your trace starts with your first choice.</p>}
        </div>
        {reviewing && <p className="chat-review-note">What was on the screen? What did you feel? What did you think it meant?</p>}
      </aside>
    </section>
    {preview && <p className="chat-demo-note">The other phone is simulated. Nothing is sent to the event.</p>}
    <FeelingVeil open={topPicker} selected={currentFeeling} onChoose={chooseFeeling} onDismiss={() => setTopPicker(false)} />
  </BookFrame>;
}
