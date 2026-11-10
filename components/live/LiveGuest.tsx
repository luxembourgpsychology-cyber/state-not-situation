"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ApiError, api, Brand, confidences, CountResults, GuestState, interests, Message, Progress, requestId, Saved, Typing, usePolling, Waiting } from "./client";

type Props = { roomCode?: string; invite?: string };

export default function LiveGuest({ roomCode = "", invite = "" }: Props) {
  const [room, setRoom] = useState(roomCode.toUpperCase());
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [joinError, setJoinError] = useState("");
  const polling = usePolling<GuestState>(room ? `/api/live/state?room=${encodeURIComponent(room)}` : null);
  const state = polling.data;
  const needsJoin = !state && (!room || polling.error instanceof ApiError && polling.error.status === 401);

  async function join(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setJoinError("");
    try {
      const next = await api<GuestState>("/api/live/join", { room: room.trim().toUpperCase(), invite: invite || undefined, name: name.trim(), consent });
      setRoom(next.room.code); polling.setData(next);
    } catch (err) { setJoinError(err instanceof Error ? err.message : "Please try joining again."); }
    finally { setBusy(false); }
  }

  return <main className="live-app live-guest">
    <Brand code={state?.room.code || undefined} mode={state?.room.mode} />
    {!state ? <div className="live-entry live-container">
      <div className="live-entry-intro"><p className="live-label">The book. In the room. With you.</p><h1>Let’s try<br />something.</h1><p>Four small moments with the people in this room. Follow the steps on your phone. Ivana will guide you.</p><p className="live-caption">A few words are enough. There is no score.</p></div>
      {needsJoin || polling.error ? <form className="live-join-form" onSubmit={join}>
        <h2>Join the room</h2>
        {!roomCode && <label className="live-field">Room code<input autoComplete="off" autoCapitalize="characters" value={room} onChange={e => setRoom(e.target.value.toUpperCase())} required maxLength={12} /></label>}
        <label className="live-field">Your name for this activity<input autoComplete="nickname" value={name} onChange={e => setName(e.target.value)} required minLength={1} maxLength={40} placeholder="First name or nickname" /></label>
        <p className="live-caption">Ivana can see your chosen name. Your messages will go to one partner. At the end, your partner will see what you meant and what you thought their message meant. Private answers stay off the room screen.</p>
        <label className="live-check"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required /><span>I agree to take part and share my messages with my partner.</span></label>
        {(joinError || polling.error && !(polling.error instanceof ApiError && polling.error.status === 401)) && <p className="live-error" role="alert">{joinError || polling.error?.message}</p>}
        <button className="live-button" disabled={busy || !consent}>{busy ? "Joining…" : "Join the room"}<span aria-hidden="true">↗</span></button>
        <p className="live-caption">Keep this page open during the session.</p>
      </form> : <Waiting title="Opening the room…">Please wait a moment.</Waiting>}
    </div> : <>
      <Progress step={state.room.step} />
      {polling.error && <p className="live-connection" role="status">Connection interrupted. Your screen will update when we reconnect.</p>}
      <div className="live-play live-container">
        <aside className="live-side"><span className="live-label">{state.participant.name}</span><p>{state.participant.paired ? state.participant.pairLabel || "Partner ready" : "In the room"}</p><span className="live-caption">Ivana moves everyone to the next step.</span></aside>
        <section className="live-task" aria-label="Your current step">
          {state.room.paused || state.room.lookUp ? <Waiting title="Look up at Ivana.">Your answers are kept. She’ll let you know when to return to your phone.</Waiting>
            : <GuestStep key={`${state.room.code}:${state.participant.id}:${state.room.step}`} state={state} onState={polling.setData} />}
        </section>
      </div>
    </>}
    <footer className="live-footer"><span>State. Not Situation.</span><span>Ivana Budišin</span></footer>
  </main>;
}

type StepPresentationProps = { state: GuestState; onState: (value: GuestState) => void; onAnswer?: (data: Record<string, string>) => Promise<GuestState>; practice?: boolean };

export function GuestStep({ state, onState, onAnswer, practice = false }: StepPresentationProps) {
  const { room, own, participant } = state;
  if (room.step === "lobby") return <Waiting title="You’re in.">Ivana will start Moment 01. You don’t need to find a partner yourself.</Waiting>;
  if (room.step.startsWith("reveal_") || room.step === "finished") return <Reveal state={state} practice={practice} />;
  if (participant.waiting || !participant.paired && ["compose", "interpret", "reply", "reply_delivered"].includes(room.step)) return <Waiting title="Follow along with the room.">There isn’t a partner for you in this round. You can join the next moments on your phone.</Waiting>;
  if (room.step === "reply_delivered") return <><p className="live-label">Moment 02 · The wait</p><h1>Your reply has arrived.</h1><Message label={practice ? "Example partner’s reply" : "Your partner’s reply"} text={state.partnerReply} /><p className="live-caption">Keep your first thoughts in mind. We’ll return to them together.</p></>;
  if (room.step === "ready_reveal") return <Waiting title={practice ? "You’ve reached the end." : "That’s the four moments."}>{practice ? "Choose Show results when you want to see the explanations. Your practice answers stay separate from the event." : "Look up at Ivana. The reveal comes next."}</Waiting>;
  return <AnswerForm state={state} onState={onState} initial={own} onAnswer={onAnswer} practice={practice} />;
}

function AnswerForm({ state, initial, onState, onAnswer, practice = false }: StepPresentationProps & { initial: GuestState["own"] }) {
  const step = state.room.step;
  const draftKey = `sns-draft:${state.room.code}:${state.participant.id}:${step}`;
  const [values, setValues] = useState<Record<string, string>>({ ...initial });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const typingThrottled = useRef(false);
  const typingThrottleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sent = step === "compose" ? Boolean(initial.message) : step === "interpret" ? Boolean(initial.interpretation) : step === "reply" ? Boolean(initial.reply) : step === "context" ? Boolean(initial.contextTone) : step === "room" ? Boolean(initial.interest) : false;

  useEffect(() => {
    if (practice) return;
    try {
      const saved = sessionStorage.getItem(draftKey);
      if (saved && !sent) queueMicrotask(() => setValues(old => ({ ...old, ...JSON.parse(saved) })));
    } catch { /* A blocked browser store must not block the game. */ }
  }, [draftKey, sent, practice]);

  async function typing(active: boolean) {
    if (step !== "reply" || practice) return;
    if (active && typingThrottled.current) return;
    if (active) {
      typingThrottled.current = true;
      typingThrottleTimer.current = setTimeout(() => { typingThrottled.current = false; }, 1000);
    }
    try { await api("/api/live/typing", { room: state.room.code, active }); } catch { /* Typing is optional; saving is not. */ }
  }
  useEffect(() => () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    if (typingThrottleTimer.current) clearTimeout(typingThrottleTimer.current);
    if (step === "reply" && !practice) void fetch("/api/live/typing", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ room: state.room.code, active: false }), keepalive: true });
  }, [step, state.room.code, practice]);

  function change(field: string, value: string) {
    setValues(previous => {
      const next = { ...previous, [field]: value };
      if (!practice) try { sessionStorage.setItem(draftKey, JSON.stringify(next)); } catch { /* Keep the draft in memory. */ }
      return next;
    });
    if (field === "reply") {
      void typing(Boolean(value));
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => void typing(false), 2500);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    if (step === "reply") await typing(false);
    const fields: Record<string, string[]> = { compose: ["message", "intention"], interpret: ["interpretation", "confidence"], reply: ["reply", "expectation"], context: ["contextTone", "contextReply"], room: ["interest"] };
    const data = Object.fromEntries((fields[step] || []).map(field => [field, (values[field] || "").trim()]));
    try {
      const next = onAnswer ? await onAnswer(data) : await api<GuestState>("/api/live/answer", { room: state.room.code, step, data, requestId: requestId() });
      onState(next);
      if (!practice) try { sessionStorage.removeItem(draftKey); } catch { /* Saving to the server succeeded. */ }
    } catch (err) { setError(err instanceof Error ? err.message : "Your answer was not saved. Please try again."); }
    finally { setBusy(false); }
  }

  function text(field: string, label: string, placeholder: string, maxLength = 300) {
    return <label className="live-field">{label}<textarea required value={values[field] || ""} onChange={e => change(field, e.target.value)} onBlur={field === "reply" ? () => void typing(false) : undefined} placeholder={placeholder} maxLength={maxLength} rows={3} disabled={sent || busy} /><span className="live-field-hint">{(values[field] || "").length}/{maxLength}</span></label>;
  }
  function options(field: string, legend: string, items: readonly string[]) {
    return <fieldset className="live-options"><legend>{legend}</legend>{items.map(item => <label key={item} className={values[field] === item ? "is-selected" : ""}><input type="radio" name={field} value={item} checked={values[field] === item} onChange={() => change(field, item)} required disabled={sent || busy} /><span>{item}</span></label>)}</fieldset>;
  }

  return <form onSubmit={submit} className="live-answer-form">
    {step === "compose" && <><p className="live-label">Moment 01 · The message</p><h1>Write a message.</h1><p>Write a short message to your partner. It can be simple and everyday. Please avoid personal details.</p>{text("message", "Your message", "What would you like to say?", 300)}{text("intention", "What do you want them to understand?", "Write what you mean.", 300)}<p className="live-caption">Your partner sees the message first. Your intention stays hidden until the final reveal.</p></>}
    {step === "interpret" && <><p className="live-label">Moment 01 · The message</p><h1>Read your message.</h1><Message label={practice ? "From the example partner" : "From your partner"} text={state.partnerMessage} />{text("interpretation", "What do you think they mean?", "Write your first thought.")}{options("confidence", "How sure are you?", confidences)}<p className="live-caption">Your answer stays hidden until the final reveal.</p></>}
    {step === "reply" && <><p className="live-label">Moment 02 · The wait</p><h1>What comes next?</h1><Message label="Your partner’s message" text={state.partnerMessage} /><Typing active={state.partnerTyping} label={practice ? "Example partner typing · demonstration" : undefined} />{text("reply", "Write your reply", "A short reply is enough.", 300)}{text("expectation", "What do you think your partner will reply?", "Write what you expect.")}<p className="live-caption">Replies appear when Ivana continues. Your expectation stays hidden until the final reveal.</p></>}
    {step === "context" && <><p className="live-label">Moment 03 · Tomorrow</p><h1>Imagine this situation.</h1><div className="live-scenario"><span className="live-label">For this round, imagine…</span><p>{state.scenario || "Your scenario is loading. Please wait before answering."}</p></div><Message label="A message arrives" text="Can we talk tomorrow?" />{options("contextTone", "How does this message feel?", ["Reassuring", "Neutral", "Concerning", "Not sure"])}{text("contextReply", "What would you reply?", "Write a short reply.", 300)}<p className="live-caption">This is a fictional situation. There is no correct answer.</p></>}
    {step === "room" && <><p className="live-label">Moment 04 · The room</p><h1>Your response<br />to Ivana.</h1><p>{practice ? "Read Ivana’s words in the host guide before you answer." : "Listen to Ivana before you answer."}</p>{options("interest", "After hearing that, how interested are you in the conversation?", interests)}<p className="live-caption">Only the room’s totals will appear on the shared screen.</p></>}
    {sent ? practice ? <p className="live-saved" role="status">Saved in this practice only. You can continue below.</p> : <Saved /> : <><button className="live-button" disabled={busy || step === "context" && !state.scenario}>{busy ? "Saving…" : step === "compose" ? "Save my message" : step === "reply" ? "Save my reply" : "Save my answer"}<span aria-hidden="true">↗</span></button>{error && <p className="live-error" role="alert">{error}</p>}<p className="live-caption">{practice ? "Your practice answers stay on this page. Nothing is sent to the event." : "Drafts stay in this browser tab. “Saved” means the room has received your answer."}</p></>}
  </form>;
}

function Reveal({ state, practice = false }: { state: GuestState; practice?: boolean }) {
  const { room, reveal, own } = state;
  if (room.step === "finished") return <><p className="live-label">State. Not Situation.</p><h1>Take the question<br />with you.</h1><p className="live-final-question">What belongs to the situation, and what might my state be adding?</p><p>Thank you for taking part.</p><Link className="live-button" href="/en">Meet the book<span aria-hidden="true">↗</span></Link></>;
  return <div className="live-reveal"><p className="live-label">The reveal · {room.step === "reveal_message" ? "01" : room.step === "reveal_pause" ? "02" : room.step === "reveal_context" ? "03" : "04"}</p>
    {room.step === "reveal_message" && <><h1>One message.<br />Two readings.</h1><Message label="The message you received" text={reveal?.message} /><Message label="What your partner wanted to say" text={reveal?.intention} /><Message label="What you thought it meant" text={reveal?.interpretation || own.interpretation} /><p>What did you know when you read it? What did you add?</p></>}
    {room.step === "reveal_pause" && <><h1>What happened<br />while you waited?</h1><Message label="The reply you expected" text={reveal?.expectation || own.expectation} /><Message label="The reply you received" text={reveal?.reply} /><p>The pause was shared. What we imagined during it may have been different.</p><p className="live-caption">{practice ? "In this preview, the dots and partner’s reply were examples. At the event, dots show real typing and Ivana chooses when replies arrive." : "The dots showed real typing. Replies waited until Ivana continued."}</p></>}
    {room.step === "reveal_context" && <><h1>The same words.<br />A different context.</h1><Message label="Everyone received this message" text="Can we talk tomorrow?" />{reveal?.scenarios?.map((scenario, index) => <Message key={scenario} label={`Scenario ${index + 1}`} text={scenario} />)}<p>What did the scenario add before you wrote your reply?</p></>}
    {room.step === "reveal_room" && <><h1>The guess.<br />And the room.</h1><CountResults forecast={reveal?.forecast} counts={reveal?.counts} forecastLabel={practice ? "Practice guess" : undefined} countsLabel={practice ? "Your answer" : undefined} /><p>{practice ? "This is your own practice response, not a live audience result." : `${reveal?.responseCount ?? 0} people answered.`}</p><p>{practice ? "At the event, this screen compares Ivana’s saved prediction with the room’s responses." : "Compare what Ivana expected with what people in this room reported."}</p><div className="live-loop-keys"><span className="live-loop-time">Time</span><span className="live-loop-attention">Attention</span><span className="live-loop-safety">Safety</span></div></>}
    {reveal?.explanation && <p className="live-reveal-note">{reveal.explanation}</p>}
  </div>;
}
