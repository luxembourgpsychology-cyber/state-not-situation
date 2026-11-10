"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@/app/live/experience-preview.css";

type Side = 0 | 1;
type Pair<T> = [T, T];
type Phase = "compose" | "typing" | "ready" | "waiting" | "revealed";
type FeelingStage = "before" | "waiting" | "message" | "after";
type Message = { text: string; source: "typed" | "example" };
type Round = { drafts: Pair<string>; messages: Pair<Message | null>; phase: Phase };
type Feeling = { round: number; stage: FeelingStage; value: string; sequence: number };

const moments = [
  "Make your partner smile in one sentence.",
  "Reply to what they wrote.",
  "Tell them one small thing they wouldn’t guess about you.",
  "Write them one last note.",
];
const examples: Pair<string>[] = [
  ["I look calm. This is excellent acting.", "I came for the book. My social skills came for the snacks."],
  ["Same here. I was hoping you would be better at small talk.", "I laughed. I’m also pretending to know what I’m doing."],
  ["I collect postcards and almost never send them.", "I can bake bread, but I cannot keep a houseplant alive."],
  ["I’m glad we said hello.", "I’d like to hear more about that sometime."],
];
const planted = ["Can I be honest?", "", "I didn’t expect that.", ""];
const feelingChoices = ["Calm", "Curious", "Amused", "Nervous", "Unsure", "Excited"];
const stageNames: Record<FeelingStage, string> = { before: "Before", waiting: "Waiting", message: "Reading", after: "After" };
const makeRounds = (): Round[] => moments.map(() => ({ drafts: ["", ""], messages: [null, null], phase: "compose" }));
function withSide<T>(pair: Pair<T>, side: Side, value: T): Pair<T> {
  return side === 0 ? [value, pair[1]] : [pair[0], value];
}

export default function LivePreview({ initialMoment = 1, startAtArrival = true }: { initialMoment?: number; startAtArrival?: boolean }) {
  const [moment, setMoment] = useState(() => Number.isInteger(initialMoment) && initialMoment >= 1 && initialMoment <= 4 ? initialMoment - 1 : 0);
  const [arrival, setArrival] = useState(startAtArrival);
  const [side, setSide] = useState<Side>(0);
  const [nickname, setNickname] = useState("");
  const [rounds, setRounds] = useState<Round[]>(makeRounds);
  const [feelings, setFeelings] = useState<Pair<Feeling[]>>([[], []]);
  const [shared, setShared] = useState<Pair<boolean>>([false, false]);
  const [ownWord, setOwnWord] = useState<Pair<string>>(["", ""]);
  const [wordOpen, setWordOpen] = useState(false);
  const thread = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLOListElement>(null);
  const round = rounds[moment];
  const partner: Side = side === 0 ? 1 : 0;
  const partnerLabel = side === 0 ? "07" : "12";
  const target: Side | null = moment === 0 ? 0 : moment === 2 ? 1 : null;
  const stage: FeelingStage = round.phase === "revealed" ? "after" : round.phase === "waiting" && target === side ? "message" : round.phase === "compose" ? "before" : "waiting";
  const personalTrail = feelings[side];
  const lastFeeling = personalTrail.at(-1);
  const currentFeeling = lastFeeling?.round === moment && lastFeeling.stage === stage ? lastFeeling.value : "";

  function updateRound(index: number, update: (old: Round) => Round) {
    setRounds(old => old.map((item, i) => i === index ? update(item) : item));
  }

  useEffect(() => {
    if (round.phase !== "typing") return;
    const timer = setTimeout(() => updateRound(moment, old => old.phase === "typing" ? { ...old, phase: "ready" } : old), 1800);
    return () => clearTimeout(timer);
  }, [moment, round.phase]);

  useEffect(() => {
    if (arrival) return;
    const element = thread.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [arrival, moment, side, round.phase]);

  useEffect(() => {
    const element = trail.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
      element.scrollLeft = element.scrollWidth;
    }
  }, [personalTrail.length, side]);

  function selectMoment(index: number) {
    setArrival(false);
    setWordOpen(false);
    setOwnWord(["", ""]);
    setMoment(index);
    window.history.replaceState(null, "", `?moment=${index + 1}`);
  }

  function switchPhone(next: Side) {
    setSide(next);
    setWordOpen(false);
    setOwnWord(["", ""]);
  }

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = round.drafts[side].trim();
    if (!text || round.phase !== "compose") return;
    setWordOpen(false);
    setOwnWord(["", ""]);
    updateRound(moment, old => {
      if (old.phase !== "compose") return old;
      const messages = withSide(old.messages, side, { text, source: "typed" } as Message);
      if (messages[partner] === null) messages[partner] = { text: examples[moment][partner], source: "example" };
      return { ...old, messages, phase: "typing" };
    });
  }

  function recordFeeling(value: string) {
    const clean = value.trim().slice(0, 40);
    if (!clean) return;
    setFeelings(old => {
      const records = old[side];
      const latest = records.at(-1);
      if (latest?.round === moment && latest.stage === stage && latest.value === clean) return old;
      return withSide(old, side, [...records, { round: moment, stage, value: clean, sequence: records.length + 1 }]);
    });
    setWordOpen(false);
    setOwnWord(old => withSide(old, side, ""));
  }

  function hostAction() {
    setWordOpen(false);
    setOwnWord(["", ""]);
    if (round.phase === "ready") updateRound(moment, old => old.phase === "ready" ? { ...old, phase: target !== null ? "waiting" : "revealed" } : old);
    else if (round.phase === "waiting") updateRound(moment, old => old.phase === "waiting" ? { ...old, phase: "revealed" } : old);
    else if (round.phase === "revealed") {
      if (moment < 3) selectMoment(moment + 1);
      else restart();
    }
  }

  function restart() {
    setRounds(makeRounds()); setFeelings([[], []]); setShared([false, false]);
    setOwnWord(["", ""]); setWordOpen(false); setNickname("");
    setSide(0); setMoment(0); setArrival(true);
    window.history.replaceState(null, "", window.location.pathname);
  }

  function bubble(message: Message, owner: Side, key: string) {
    return <div className={`chat-bubble ${owner === side ? "is-own" : "is-partner"}`} key={key}>
      <p>{message.text}</p>
      {message.source === "example" && <small className="chat-bubble-source">Example</small>}
    </div>;
  }

  const hostLabel = round.phase === "revealed" ? moment < 3 ? "Next moment" : "Start again" : round.phase === "waiting" ? "Reveal the real reply" : "Show the message";
  const ready = ["ready", "waiting", "revealed"].includes(round.phase);

  return <main className="live-app chat-preview">
    <div className="chat-preview-shell">
      <header className="chat-demo-bar">
        <span>Demo · example pair</span>
        <div className="chat-demo-tools">
          <nav className="chat-demo-moments" aria-label="Preview moments">{moments.map((_, index) => <button key={index} aria-label={`Moment ${index + 1}`} aria-current={!arrival && moment === index ? "step" : undefined} onClick={() => selectMoment(index)}>0{index + 1}</button>)}</nav>
          <div className="chat-phone-switch" aria-label="Preview phone">
            <button aria-pressed={side === 0} onClick={() => switchPhone(0)}>A</button>
            <button aria-pressed={side === 1} onClick={() => switchPhone(1)}>B</button>
          </div>
          <button className="chat-restart" onClick={restart}>Restart</button>
        </div>
      </header>

      {arrival ? <section className="chat-arrival">
        <Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link>
        <h1>Someone in this room.</h1>
        <p>You’ll write to each other. Your name stays hidden.</p>
        <form onSubmit={event => { event.preventDefault(); selectMoment(0); }}>
          <label htmlFor="chat-name">Your name or nickname</label>
          <input id="chat-name" value={nickname} onChange={event => setNickname(event.target.value)} placeholder="Your name" maxLength={40} autoComplete="nickname" required />
          <button className="chat-send" type="submit">Join <span aria-hidden="true">↗</span></button>
        </form>
        <small>The app adds a few messages too.</small>
      </section> : <>
        <section className="chat-experience" aria-label="Guest experience">
          <header className="chat-book-header">
            <Link className="chat-wordmark" href="/en">STATE.<br />NOT SITUATION.</Link>
            <span className="chat-step">0{moment + 1} / 04</span>
          </header>
          <div className="chat-main">
            <header className="chat-header"><span>Someone in this room · {partnerLabel}</span><span className="chat-presence" aria-label="Partner name hidden" /></header>
            <div className="chat-prompt"><h1>{moments[moment]}</h1></div>
            <div className="chat-thread" role="log" aria-label="Your conversation" aria-live="polite" ref={thread}>
              {rounds.slice(0, moment + 1).map((item, index) => {
                if (item.phase === "compose") return null;
                const own = item.messages[side];
                const incoming = item.messages[partner];
                const extraLineForMe = (index === 0 && side === 0) || (index === 2 && side === 1);
                const extraLineShown = extraLineForMe && (item.phase === "waiting" || item.phase === "revealed");
                return <div className="chat-round" key={index}>
                  {index > 0 && <span className="chat-round-label">0{index + 1}</span>}
                  {own && bubble(own, side, `own-${index}`)}
                  {extraLineShown && <div className={`chat-bubble is-partner is-planted ${item.phase === "revealed" ? "is-retired" : ""}`}>
                    <p>{item.phase === "revealed" ? <s>{planted[index]}</s> : planted[index]}</p>
                    {item.phase === "revealed" && <small className="chat-bubble-source">Added by the app</small>}
                  </div>}
                  {item.phase === "revealed" && incoming && bubble(incoming, partner, `partner-${index}`)}
                  {index === moment && item.phase === "typing" && <div className="chat-typing" aria-label="Example partner is typing"><i /><i /><i /></div>}
                </div>;
              })}
              {round.phase === "compose" && moment === 0 && <p className="chat-thread-empty">Just you and them.</p>}
              {(round.phase === "ready" || round.phase === "waiting") && <p className="chat-wait">Waiting for Ivana</p>}
              {round.phase === "revealed" && moment === 3 && <div className="chat-share">{shared[side] ? <span>Marked for sharing in this demo.</span> : <button onClick={() => setShared(old => withSide(old, side, true))}>Share my last note with the room</button>}</div>}
            </div>
            <form className="chat-composer" onSubmit={send}>
              <label className="sr-only" htmlFor={`chat-message-${moment}`}>Your message</label>
              <textarea id={`chat-message-${moment}`} value={round.phase === "compose" ? round.drafts[side] : ""} disabled={round.phase !== "compose"} onChange={event => updateRound(moment, old => ({ ...old, drafts: withSide(old.drafts, side, event.target.value) }))} placeholder={round.phase === "compose" ? "Your message…" : "Sent"} rows={2} maxLength={500} required />
              <button className="chat-send" type="submit" disabled={round.phase !== "compose" || !round.drafts[side].trim()} aria-label="Send"><span aria-hidden="true">↗</span></button>
            </form>
          </div>

          <aside className="chat-feelings" aria-label="Your private feelings">
            <header><h2>Your feelings</h2><span>Private</span></header>
            <div className="chat-feeling-entry">
              <p>How do you feel?</p>
              <div className="chat-feeling-choices">{feelingChoices.map(feeling => <button key={feeling} aria-pressed={currentFeeling === feeling} onClick={() => recordFeeling(feeling)}>{feeling}</button>)}<button aria-expanded={wordOpen} onClick={() => setWordOpen(old => !old)}>Other</button></div>
              {wordOpen && <form className="chat-other-feeling" onSubmit={event => { event.preventDefault(); recordFeeling(ownWord[side]); }}><label className="sr-only" htmlFor="chat-my-feeling">Your own feeling</label><input id="chat-my-feeling" placeholder="Your word" value={ownWord[side]} maxLength={40} onChange={event => setOwnWord(old => withSide(old, side, event.target.value))} autoFocus /><button aria-label="Save feeling" disabled={!ownWord[side].trim()}>↗</button></form>}
            </div>
            <div className="chat-feeling-trail" aria-live="polite">
              {personalTrail.length ? <ol ref={trail} aria-label="Your feelings so far">{personalTrail.map((feeling, index) => <li key={feeling.sequence} className={index === personalTrail.length - 1 ? "is-current" : ""}><span className="chat-trail-point" aria-hidden="true" /><small>0{feeling.round + 1} · {stageNames[feeling.stage]}</small><span>{feeling.value}</span></li>)}</ol> : <p className="chat-trail-empty">Tap a feeling whenever you like.</p>}
            </div>
          </aside>
        </section>
        <div className="chat-host-controls" aria-label="Ivana’s demo controls"><span>Ivana</span><button className="chat-host-action" onClick={hostAction} disabled={!ready}>{hostLabel}<span aria-hidden="true">↗</span></button></div>
      </>}
      <p className="chat-demo-note">Example pair. Nothing is sent to the event.</p>
    </div>
  </main>;
}
