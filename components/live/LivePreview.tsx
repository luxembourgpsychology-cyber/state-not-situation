"use client";

import { useEffect, useRef, useState } from "react";

const moments = [
  { title: "Someone in this room.", question: "What would you like to say to your partner?", short: "Hello" },
  { title: "Now they’ve read you.", question: "What would you like to send back?", short: "A reply" },
  { title: "A little more.", question: "Is there anything you’d like to add?", short: "A little more" },
  { title: "Before we finish.", question: "One last message for your partner?", short: "One last note" },
];

const exampleMessages = [
  "Hello! I’m curious who I’ve been paired with. What brought you here tonight?",
  "I came for the book. I didn’t expect a little conversation in the middle of the interview!",
  "I was going to write something clever. Hello again feels more like me.",
  "Thank you for the conversation. Maybe we’ll say hello properly afterwards.",
];

type ReplyState = "not-started" | "example-typing" | "example-ready";
const fourEmpty = () => ["", "", "", ""];

export default function LivePreview({ initialMoment = 1 }: { initialMoment?: number }) {
  const [moment, setMoment] = useState(() => Number.isInteger(initialMoment) && initialMoment >= 1 && initialMoment <= 4 ? initialMoment - 1 : 0);
  const [arrival, setArrival] = useState(false);
  const [nickname, setNickname] = useState("");
  const [drafts, setDrafts] = useState<string[]>(fourEmpty);
  const [messages, setMessages] = useState<string[]>(fourEmpty);
  const [opened, setOpened] = useState<boolean[]>([false, false, false, false]);
  const [replies, setReplies] = useState<ReplyState[]>(["not-started", "not-started", "not-started", "not-started"]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const current = moments[moment];
  const sent = Boolean(messages[moment]);
  const isOpen = opened[moment];
  const replyReady = replies[moment] === "example-ready";

  useEffect(() => () => { for (const timer of timers.current) clearTimeout(timer); }, []);

  function chooseMoment(index: number) {
    setArrival(false); setMoment(index);
    window.history.replaceState(null, "", `?moment=${index + 1}`);
  }

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = drafts[moment].trim();
    if (!message || sent) return;
    const chapter = moment;
    setMessages(old => old.map((value, i) => i === chapter ? message : value));
    setReplies(old => old.map((value, i) => i === chapter ? "example-typing" : value));
    const timer = setTimeout(() => {
      setReplies(old => old.map((value, i) => i === chapter ? "example-ready" : value));
    }, 1800);
    timers.current.push(timer);
  }

  function openMessages() {
    if (!sent || !replyReady) return;
    setOpened(old => old.map((value, i) => i === moment ? true : value));
  }

  function startAgain() {
    for (const timer of timers.current) clearTimeout(timer);
    timers.current = [];
    setDrafts(fourEmpty()); setMessages(fourEmpty());
    setOpened([false, false, false, false]);
    setReplies(["not-started", "not-started", "not-started", "not-started"]);
    chooseMoment(0);
  }

  return <main className="live-app conversation-preview">
    <div className="conversation-preview-shell">
      <header className="conversation-preview-toolbar"><span>Preview · fictional partner</span><button onClick={() => setArrival(true)} className={arrival ? "is-active" : ""}>Arrival</button></header>
      <nav className="conversation-preview-tabs" aria-label="Preview the four moments">{moments.map((item, i) => <button key={item.title} onClick={() => chooseMoment(i)} aria-current={!arrival && moment === i ? "step" : undefined} className={!arrival && moment === i ? "is-active" : ""}><span>0{i + 1}</span><span>{item.short}</span></button>)}</nav>
      <section className="conversation-phone" aria-label={arrival ? "Guest arrival preview" : `Guest view, moment ${moment + 1}`}>
        <header className="conversation-brand"><span>STATE.<br />NOT SITUATION.</span><span>{arrival ? "An evening with the book" : `Moment 0${moment + 1} / 04`}</span></header>
        {arrival ? <div className="conversation-arrival"><p className="conversation-eyebrow">A person. A message. A little curiosity.</p><h1>Someone’s<br />on the other side.</h1><p>You’ll write to one person in this room. Your name stays hidden. Your messages won’t be projected.</p><form onSubmit={event => { event.preventDefault(); chooseMoment(0); }}><label htmlFor="conversation-nickname">Your name or nickname</label><input id="conversation-nickname" value={nickname} onChange={event => setNickname(event.target.value)} placeholder="What shall we call you?" autoComplete="nickname" maxLength={40} required /><button className="conversation-send" type="submit">Join<span aria-hidden="true">↗</span></button></form></div>
          : <div className="conversation-body">
            <div className="conversation-partner"><span className="conversation-partner-dot" aria-hidden="true" /><span>Your partner: <strong>07</strong></span><span>Name hidden</span></div>
            <h1>{isOpen ? <>A message<br />for you.</> : current.title}</h1>
            {isOpen ? <div className="conversation-opened" aria-live="polite"><div className="conversation-bubble conversation-bubble-own"><span>{nickname || "You"}</span><p>{messages[moment]}</p></div><div className="conversation-bubble conversation-bubble-partner"><span>Partner 07</span><p>{exampleMessages[moment]}</p></div><p className="conversation-quiet">Keep this between you. Look up at Ivana when you’re ready.</p>{moment === 3 && <p className="conversation-last-note">A few words. Someone new.<br />Thank you for being part of it.</p>}</div>
              : !sent ? <>
                {moment > 0 && <div className="conversation-previous"><span>Partner 07</span><p>{exampleMessages[moment - 1]}</p></div>}
                <form className="conversation-compose" onSubmit={send}><label htmlFor={`conversation-message-${moment}`}>{current.question}</label><textarea id={`conversation-message-${moment}`} value={drafts[moment]} onChange={event => setDrafts(old => old.map((value, i) => i === moment ? event.target.value : value))} placeholder="Your words…" maxLength={600} rows={4} required /><button className="conversation-send" type="submit" disabled={!drafts[moment].trim()}>Send<span aria-hidden="true">↗</span></button></form>
              </> : <div className="conversation-holding" aria-live="polite"><div className="conversation-bubble conversation-bubble-own"><span>{nickname || "You"}</span><p>{messages[moment]}</p></div><p className="conversation-saved"><span aria-hidden="true">✓</span> Your message is saved.</p>{replies[moment] === "example-typing" && <div className="conversation-example-typing"><span className="live-typing-bubble" aria-hidden="true"><i /><i /><i /></span><span>Partner 07 is typing</span></div>}<p className="conversation-waiting">Ivana will open the messages shortly.</p></div>}
          </div>}
        <footer className="conversation-phone-footer">State. Not Situation. <span>Ivana Budišin</span></footer>
      </section>
      <div className="conversation-preview-controls" aria-label="Preview controls, outside the guest screen">{arrival ? <button className="conversation-preview-main-control" onClick={() => chooseMoment(0)}>See the first moment<span aria-hidden="true">→</span></button>
        : isOpen ? <button className="conversation-preview-main-control" onClick={moment < 3 ? () => chooseMoment(moment + 1) : startAgain}>{moment < 3 ? "Next moment" : "Start again"}<span aria-hidden="true">→</span></button>
        : <button className="conversation-preview-main-control" disabled={!sent || !replyReady} onClick={openMessages}>Open messages<span aria-hidden="true">↗</span></button>}
        <p>{arrival ? "This is the arrival screen guests would see after scanning." : isOpen ? "Preview control: this is when Ivana moves the room on." : !sent ? "Write and send a message. Then open it here as Ivana would." : !replyReady ? "The example partner is writing. These dots are simulated." : "The example reply is ready. Only this button opens it."}</p>
        <span className="conversation-preview-disclosure">This preview uses fictional messages. No one else is connected. Nothing is sent to the event.</span>
      </div>
    </div>
  </main>;
}
