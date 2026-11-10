"use client";

import { useEffect, useRef, useState } from "react";

const moments = [
  { title: "Make them smile.", question: "Someone in this room will read this. Make them smile in one sentence.", short: "Make them smile" },
  { title: "The unsent version.", question: "What did you almost write instead?", short: "Almost sent" },
  { title: "Who’s on the other side?", question: "You haven’t met. What have you already guessed about them?", short: "Your guess" },
  { title: "Caught yourself?", question: "What surprised you more: their words, or your own reaction?", short: "Caught yourself?" },
];
const examples = [
  ["I look calm. This is excellent acting.", "I came for the book. My social skills came for the snacks."],
  ["I nearly wrote something clever. Then I remembered you could answer.", "Just ‘hello’. Apparently I can overthink five letters."],
  ["I think you look calm but have six thoughts at once.", "I think you make jokes when you’re a little nervous. Or maybe that’s me."],
  ["I felt nervous, then annoyed with myself for feeling nervous. You had only written one sentence.", "I was curious. Then I laughed at how quickly I had invented a whole person."],
];
const planted = ["Can I be honest?", "", "I didn’t expect that.", ""];
type Phase = "compose" | "typing" | "ready" | "waiting" | "revealed";
type Round = { drafts: [string, string]; messages: [string, string]; feelings: [string, string]; feelingDrafts: [string, string]; reflections: [string, string]; reflectionDrafts: [string, string]; phase: Phase };
const makeRounds = (): Round[] => moments.map(() => ({ drafts: ["", ""], messages: ["", ""], feelings: ["", ""], feelingDrafts: ["", ""], reflections: ["", ""], reflectionDrafts: ["", ""], phase: "compose" }));
const pairValue = (values: [string, string], side: number, value: string): [string, string] => side === 0 ? [value, values[1]] : [values[0], value];

export default function LivePreview({ initialMoment = 1, startAtArrival = true }: { initialMoment?: number; startAtArrival?: boolean }) {
  const [moment, setMoment] = useState(() => Number.isInteger(initialMoment) && initialMoment >= 1 && initialMoment <= 4 ? initialMoment - 1 : 0);
  const [arrival, setArrival] = useState(startAtArrival);
  const [side, setSide] = useState<0 | 1>(0);
  const [nickname, setNickname] = useState("");
  const [rounds, setRounds] = useState<Round[]>(makeRounds);
  const [shared, setShared] = useState(false);
  const revealHeading = useRef<HTMLHeadingElement>(null);
  const round = rounds[moment];
  const current = moments[moment];
  const partner = side === 0 ? 1 : 0;
  const partnerLabel = side === 0 ? "07" : "12";
  const target: 0 | 1 | null = moment === 0 ? 0 : moment === 2 ? 1 : null;
  const seesPlant = side === target;
  const isOpen = round.phase === "revealed";
  const reactionNeeded = round.phase === "waiting" && seesPlant && !round.feelings[side];
  const ownName = side === 0 ? nickname || "You" : "You";
  const partnerMessage = round.messages[partner] || examples[moment][partner];

  useEffect(() => {
    if (arrival || (round.phase !== "waiting" && round.phase !== "revealed")) return;
    revealHeading.current?.focus({ preventScroll: true });
    revealHeading.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [arrival, round.phase, moment]);

  function updateRound(index: number, update: (old: Round) => Round) {
    setRounds(old => old.map((item, i) => i === index ? update(item) : item));
  }

  useEffect(() => {
    if (round.phase !== "typing") return;
    const timer = setTimeout(() => updateRound(moment, old => ({ ...old, phase: "ready" })), 1800);
    return () => clearTimeout(timer);
  }, [moment, round.phase]);

  function showMessage() {
    if (round.phase === "ready") {
      updateRound(moment, old => ({ ...old, phase: target !== null ? "waiting" : "revealed" }));
    } else if (round.phase === "waiting" && !reactionNeeded) {
      updateRound(moment, old => ({ ...old, phase: "revealed" }));
    }
  }

  function saveReflection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reflection = round.reflectionDrafts[side].trim();
    if (!reflection) return;
    updateRound(moment, old => ({ ...old, reflections: pairValue(old.reflections, side, reflection) }));
  }

  function chooseMoment(index: number) {
    setArrival(false);
    setMoment(index);
    window.history.replaceState(null, "", `?moment=${index + 1}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = round.drafts[side].trim();
    if (!message || round.phase !== "compose") return;
    updateRound(moment, old => ({ ...old, messages: pairValue(pairValue(old.messages, partner, old.messages[partner] || examples[moment][partner]), side, message), phase: "typing" }));
  }

  function saveFeeling(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const feeling = round.feelingDrafts[side].trim();
    if (!feeling) return;
    updateRound(moment, old => ({ ...old, feelings: pairValue(old.feelings, side, feeling) }));
  }

  function startAgain() {
    setRounds(makeRounds()); setShared(false); setNickname(""); setSide(0); setMoment(0); setArrival(true);
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return <main className="live-app conversation-preview experiment-preview">
    <div className="conversation-preview-shell">
      <header className="conversation-preview-toolbar"><span>Solo preview · example pair</span><button onClick={startAgain}>Start again</button></header>
      <nav className="conversation-preview-tabs" aria-label="Preview the four moments">{moments.map((item, i) => <button key={item.title} onClick={() => chooseMoment(i)} aria-current={!arrival && moment === i ? "step" : undefined} className={!arrival && moment === i ? "is-active" : ""}><span>0{i + 1}</span><span>{item.short}</span></button>)}</nav>
      {!arrival && <div className="experiment-phones" aria-label="Choose a phone to preview"><button aria-pressed={side === 0} onClick={() => setSide(0)}>Your phone</button><button aria-pressed={side === 1} onClick={() => setSide(1)}>Other phone</button></div>}
      <section className="conversation-phone" aria-label={arrival ? "Guest arrival preview" : `Guest view, moment ${moment + 1}`}>
        <header className="conversation-brand"><span>STATE.<br />NOT SITUATION.</span><span>{arrival ? "An evening with the book" : `Moment 0${moment + 1} / 04`}</span></header>
        {arrival ? <div className="conversation-arrival"><p className="conversation-eyebrow">A person. A message. A little curiosity.</p><h1>Someone’s<br />on the other side.</h1><p>You’ll write to one person in this room. Your name stays hidden.</p><p className="experiment-arrival-note">Some messages are part of tonight’s experiment. We’ll reveal which.</p><form onSubmit={event => { event.preventDefault(); chooseMoment(0); }}><label htmlFor="conversation-nickname">Your name or nickname</label><input id="conversation-nickname" value={nickname} onChange={event => setNickname(event.target.value)} placeholder="What shall we call you?" autoComplete="nickname" maxLength={40} required /><button className="conversation-send" type="submit">Join<span aria-hidden="true">↗</span></button></form></div>
          : <div className="conversation-body">
            <div className="conversation-partner"><span className="conversation-partner-dot" aria-hidden="true" /><span>Your partner: <strong>{partnerLabel}</strong></span><span>Name hidden</span></div>
            <h1 ref={revealHeading} tabIndex={-1}>{isOpen ? target !== null ? <>A little<br />reveal.</> : moment === 3 ? <>Thank you<br />for sharing.</> : <>A message<br />for you.</> : round.phase === "waiting" && seesPlant ? <>A message<br />for you.</> : current.title}</h1>
            {isOpen ? <div className="conversation-opened" aria-live="polite">
              {target !== null && <div className="experiment-reveal"><p className="conversation-eyebrow">Part of the experiment</p><p className="experiment-planted-line"><s>{planted[moment]}</s></p><p>{seesPlant ? "Your partner did not write this." : "Your partner saw this. You did not write it."}</p>{seesPlant && round.feelings[side] && <p className="experiment-feeling-recap">Your word: <strong>{round.feelings[side]}</strong></p>}</div>}
              <div className="conversation-bubble conversation-bubble-partner"><span>Partner {partnerLabel}{target !== null ? " actually wrote" : ""}</span><p>{partnerMessage}</p></div>
              <div className="conversation-bubble conversation-bubble-own"><span>{ownName}</span><p>{round.messages[side] || examples[moment][side]}</p></div>
              {target !== null ? <div className="experiment-book-note"><p className="conversation-eyebrow">State. Not Situation.</p><p>{seesPlant ? "What did you see? What did you feel? What did you think it meant?" : "They had different words on their screen. You’ll both continue with the messages you actually wrote."}</p><p className="conversation-quiet">A feeling is real. What someone means can still be a question.</p></div> : <p className="conversation-quiet">{moment === 3 ? "Your note stays between you and your partner unless you choose to share it." : "Keep this between you. Look up at Ivana when you’re ready."}</p>}
              {target !== null && seesPlant && <div className="experiment-metaemotion">{round.reflections[side] ? <><p className="conversation-eyebrow">A note to yourself</p><p>{round.reflections[side]}</p><p className="conversation-quiet">This stays private.</p></> : <form className="conversation-compose experiment-feeling" onSubmit={saveReflection}><label htmlFor={`experiment-reflection-${moment}`}>How do you feel about your first reaction now?</label><input id={`experiment-reflection-${moment}`} value={round.reflectionDrafts[side]} onChange={event => updateRound(moment, old => ({ ...old, reflectionDrafts: pairValue(old.reflectionDrafts, side, event.target.value) }))} placeholder="Your words…" maxLength={160} /><p className="conversation-quiet">Optional. This stays private.</p><button className="live-text-button" disabled={!round.reflectionDrafts[side].trim()}>Save for myself</button></form>}</div>}
              {moment === 3 && <div className="experiment-share">{shared ? <p role="status">Your note is offered to the room in this preview only. Nothing has been published.</p> : <button className="live-text-button" onClick={() => setShared(true)}>Offer my note to the room</button>}</div>}
            </div>
            : round.phase === "compose" ? <>
              {moment > 0 && <div className="conversation-previous"><span>Partner {partnerLabel}</span><p>{rounds[moment - 1].messages[partner] || examples[moment - 1][partner]}</p></div>}
              <form className="conversation-compose" onSubmit={send}><label htmlFor={`conversation-message-${moment}`}>{current.question}</label>{moment === 1 && <p className="experiment-starters">A thought, a joke, or the line you edited in your head.</p>}{moment === 2 && <p className="experiment-starters">Keep it playful. You can be completely wrong.</p>}{moment === 3 && <p className="experiment-starters">“I felt…”<br />“I told myself…”<br />“Looking back…”</p>}<textarea id={`conversation-message-${moment}`} value={round.drafts[side]} onChange={event => updateRound(moment, old => ({ ...old, drafts: pairValue(old.drafts, side, event.target.value) }))} placeholder="Your words…" maxLength={600} rows={4} required /><button className="conversation-send" type="submit" disabled={!round.drafts[side].trim()}>Send<span aria-hidden="true">↗</span></button></form>
            </> : <div className="conversation-holding" aria-live="polite">
              {round.phase === "typing" ? <><div className="conversation-bubble conversation-bubble-own"><span>{ownName}</span><p>{round.messages[side] || examples[moment][side]}</p></div><p className="conversation-saved"><span aria-hidden="true">✓</span> Your message is saved.</p><div className="conversation-example-typing"><span className="live-typing-bubble" aria-hidden="true"><i /><i /><i /></span><span>Partner {partnerLabel} is typing</span></div></>
                : round.phase === "waiting" && seesPlant ? <><div className="conversation-bubble conversation-bubble-partner"><span>Partner {partnerLabel}</span><p>{planted[moment]}</p></div>{reactionNeeded ? <form className="conversation-compose experiment-feeling" onSubmit={saveFeeling}><label htmlFor={`experiment-feeling-${moment}`}>One word: how do you feel right now?</label><input id={`experiment-feeling-${moment}`} value={round.feelingDrafts[side]} onChange={event => updateRound(moment, old => ({ ...old, feelingDrafts: pairValue(old.feelingDrafts, side, event.target.value) }))} placeholder="Your word…" autoComplete="off" maxLength={40} required /><p className="conversation-quiet">Your word stays private.</p><button type="submit" className="conversation-send" disabled={!round.feelingDrafts[side].trim()}>Save my word<span aria-hidden="true">↗</span></button></form> : <><p className="conversation-saved">Your word: {round.feelings[side]}</p><p className="conversation-waiting">Look up. Ivana will reveal the reply.</p></>}</>
                : <><p className="conversation-saved"><span aria-hidden="true">✓</span> Your message is saved.</p><span className="experiment-sealed" aria-hidden="true">↗</span><p className="conversation-waiting">A reply is waiting.<br />Ivana decides when to open it.</p></>}
            </div>}
          </div>}
        <footer className="conversation-phone-footer">State. Not Situation. <span>Ivana Budišin</span></footer>
      </section>
      <div className="conversation-preview-controls" aria-label="Preview controls, outside the guest screen">
        {!arrival && <p className="conversation-eyebrow">Your demo controls</p>}
        {!arrival && (isOpen ? <button className="conversation-preview-main-control" onClick={moment < 3 ? () => chooseMoment(moment + 1) : startAgain}>{moment < 3 ? "Next moment" : "Try again"}<span aria-hidden="true">→</span></button> : <button className="conversation-preview-main-control" disabled={round.phase !== "ready" && (round.phase !== "waiting" || reactionNeeded)} onClick={showMessage}>{round.phase === "waiting" && target !== null ? "Reveal the real reply" : "Show the message"}<span aria-hidden="true">↗</span></button>)}
        <p>{arrival ? "Write your own words. You control every message and reveal with the buttons below the guest screen." : round.phase === "compose" ? "Write and send first. Then use Show the message when you’re ready." : round.phase === "typing" ? "These example typing dots will stop. The message stays closed until you press the button." : isOpen ? "You decide when to start the next moment. The note to yourself is optional." : reactionNeeded ? "Save your first feeling on the phone. Then reveal the real reply whenever you choose." : round.phase === "waiting" && target !== null && !seesPlant ? "The other phone has the planted line. Switch phones to try their reaction, or reveal the replies." : "Nothing opens automatically. Take your time, then press the button."}</p>
        <span className="conversation-preview-disclosure">Example pair only. No one else is connected. Nothing is sent, stored or shared with the event. The new experiment is a preview, not the live room.</span>
      </div>
    </div>
  </main>;
}
