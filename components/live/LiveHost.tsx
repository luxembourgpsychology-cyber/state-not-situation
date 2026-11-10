"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { ApiError, api, Brand, HostState, Interest, interests, nextNames, Progress, requestId, RoomSummary, stepNames, usePolling } from "./client";

export default function LiveHost() {
  const [roomCode, setRoomCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmReveal, setConfirmReveal] = useState(false);
  const [operatorOpen, setOperatorOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const busyRef = useRef(false);
  const rooms = usePolling<{ rooms: RoomSummary[] }>("/api/live/host", 5000);
  const current = usePolling<HostState>(roomCode ? `/api/live/host?room=${encodeURIComponent(roomCode)}` : null);
  const state = current.data?.room.code === roomCode ? current.data : null;
  const authenticated = Boolean(rooms.data) && !(rooms.error instanceof ApiError && rooms.error.status === 401);
  useEffect(() => { try { const saved = sessionStorage.getItem("sns-host-room") || ""; queueMicrotask(() => setRoomCode(saved)); } catch { /* Room selection can be made again. */ } }, []);

  function select(code: string) {
    setRoomCode(code); setError(""); setConfirmReveal(false);
    try { sessionStorage.setItem("sns-host-room", code); } catch { /* This is only a convenience. */ }
  }
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try { await api("/api/live/host", { action: "login", password }); setPassword(""); await rooms.refresh(); await current.refresh(); }
    catch (err) { setError(err instanceof Error ? err.message : "Please try again."); }
    finally { setBusy(false); }
  }
  async function create(mode: "rehearsal" | "live") {
    if (busyRef.current) return; busyRef.current = true; setBusy(true); setError("");
    try { const next = await api<HostState>("/api/live/host", { action: "create", mode }); select(next.room.code); current.setData(next); await rooms.refresh(); }
    catch (err) { setError(err instanceof Error ? err.message : "The room was not created."); }
    finally { busyRef.current = false; setBusy(false); }
  }
  async function action(actionName: string, extra: Record<string, unknown> = {}) {
    if (!state || busyRef.current) return;
    busyRef.current = true; setBusy(true); setError("");
    try {
      const next = await api<HostState>("/api/live/host", { action: actionName, room: state.room.code, expectedRevision: state.room.revision, requestId: requestId(), ...extra });
      current.setData(next); setConfirmReveal(false);
    } catch (err) { setError(err instanceof Error ? err.message : "That step did not complete. Please try again."); await current.refresh(); }
    finally { busyRef.current = false; setBusy(false); }
  }

  const needsLogin = !authenticated && rooms.error instanceof ApiError && rooms.error.status === 401;
  const predictionReady = state ? interests.some(interest => (state.forecast?.[interest] || 0) > 0) : false;
  const cannotContinue = Boolean(current.error) || Boolean(state && state.room.step === "lobby" && state.counts.paired < 2) || Boolean(state && state.room.step === "context" && !predictionReady);
  if (!authenticated) return <main className="live-app live-host"><Brand /><div className="live-container live-entry"><div className="live-entry-intro"><p className="live-label">For Ivana and the event team</p><h1>Run the games.<br />One step at a time.</h1><p>Create a test room, share the QR code and press Next when everyone is ready.</p></div>{needsLogin ? <form className="live-join-form" onSubmit={login}><h2>Host sign in</h2><label className="live-field">Host password<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label><button className="live-button" disabled={busy}>{busy ? "Signing in…" : "Sign in"}<span aria-hidden="true">↗</span></button>{error && <p className="live-error" role="alert">{error}</p>}</form> : <div><p role="status">{rooms.error ? rooms.error.message : "Opening your event controls…"}</p>{rooms.error && <button className="live-text-button" onClick={() => void rooms.refresh()}>Try again</button>}</div>}</div></main>;

  return <main className="live-app live-host"><Brand mode={state?.room.mode} code={state?.room.code} />
    {!roomCode ? <div className="live-container live-host-home"><p className="live-label">Your event controls</p><h1>Let’s get the room ready.</h1><p>Start with a test room. Ask two people to join on their phones. Test answers stay separate from your event.</p><div className="live-create-options"><button className="live-button" disabled={busy} onClick={() => void create("rehearsal")}>Create a test room<span aria-hidden="true">↗</span></button><button className="live-outline-button" disabled={busy} onClick={() => void create("live")}>Create an event room</button></div><RoomList rooms={rooms.data?.rooms || []} onSelect={select} />{error && <p className="live-error" role="alert">{error}</p>}</div>
      : !state ? <div className="live-container live-host-home"><p role="status">{current.error ? current.error.message : "Opening the room…"}</p><button className="live-text-button" onClick={() => select("")}>Back to your rooms</button></div>
      : <>
        <Progress step={state.room.step} />
        {current.error && <p className="live-connection" role="status">Connection interrupted. Check the room before moving on.</p>}
        <div className={`live-host-grid live-container${state.room.step === "lobby" ? " is-lobby" : ""}`}>
          <section className="live-host-main">
            <div className="live-host-topline"><p className="live-label">Your event controls</p><button className="live-text-button" onClick={() => setOperatorOpen(!operatorOpen)} aria-expanded={operatorOpen}>Room tools {operatorOpen ? "−" : "+"}</button></div>
            <h1>{state.room.paused || state.room.lookUp ? "The room is looking up." : stepNames[state.room.step]}</h1>
            <p className="live-host-cue">{hostCues[state.room.step]}</p>
            {state.room.step === "lobby" && <ol className="live-start-guide"><li><b>1.</b> Share the QR code.</li><li><b>2.</b> Pair the guests.</li><li><b>3.</b> Start Card 01.</li></ol>}
            <div className="live-counts"><div><strong>{state.counts.joined}</strong><span>Joined</span></div><div><strong>{state.counts.paired}</strong><span>Paired guests</span></div><div><strong>{state.counts.waiting}</strong><span>Waiting for a pair</span></div><div><strong>{state.counts.submitted}<small>/{state.counts.total}</small></strong><span>Saved this step</span></div></div>
            <div className="live-host-actions">
              {state.room.step === "lobby" && <button className="live-outline-button" disabled={busy || state.counts.joined < 2} onClick={() => void action("pair")}>Pair the guests</button>}
              {state.room.paused ? <button className="live-button" disabled={busy} onClick={() => void action("resume")}>Resume the room<span aria-hidden="true">↗</span></button> : state.room.lookUp ? <button className="live-button" disabled={busy} onClick={() => void action("return")}>Return to phones<span aria-hidden="true">↗</span></button> : state.room.step === "ready_reveal" ? <button className="live-button" disabled={busy} onClick={() => setConfirmReveal(true)}>Open the final reveal<span aria-hidden="true">↗</span></button> : state.room.step === "finished" ? <p className="live-saved">The session is finished.</p> : <button className="live-button" disabled={busy || cannotContinue} onClick={() => void action("next")}>{busy ? "Updating the room…" : nextNames[state.room.step] || "Next step"}<span aria-hidden="true">→</span></button>}
              {!state.room.paused && !state.room.lookUp && state.room.step !== "finished" && <button className="live-outline-button" disabled={busy} onClick={() => void action("look_up")}>Look up at Ivana</button>}
            </div>
            {state.room.step === "lobby" && state.counts.joined < 2 && <p className="live-caption">At least two people need to join before you can pair them and start.</p>}
            {state.room.step === "lobby" && state.counts.joined >= 2 && state.counts.paired < 2 && <p className="live-caption">Press “Pair the guests” first. Then you can start Card 01.</p>}
            {state.room.step === "context" && !predictionReady && <p className="live-caption">Save your prediction below before opening Card 04.</p>}
            {state.counts.submitted < state.counts.total && state.room.step !== "lobby" && <p className="live-caption">Some people have not saved an answer. You can give them more time or continue.</p>}
            {error && <p className="live-error" role="alert">{error}</p>}
            {operatorOpen && <div className="live-operator"><h2>Room tools</h2><p className="live-caption">These controls affect every phone in this room.</p><div className="live-inline-actions"><button className="live-outline-button" disabled={busy} onClick={() => void action(state.room.paused ? "resume" : "pause")}>{state.room.paused ? "Resume session" : "Pause session"}</button>{!["lobby", "ready_reveal", "finished"].includes(state.room.step) && !state.room.step.startsWith("reveal_") && <button className="live-text-button" disabled={busy} onClick={() => { if (window.confirm("Skip this step for everyone? Unsaved answers will not be included.")) void action("skip"); }}>Skip this step</button>}<button className="live-text-button" onClick={() => select("")}>Back to room list</button></div></div>}
            {!state.forecastLocked && <details className="live-prediction-details" open={state.room.step === "context" ? true : undefined}><summary>Your prediction for Card 04 {predictionReady ? "· Saved" : "· Before you speak"}</summary><Forecast key={state.room.code} state={state} busy={busy} onSave={forecast => action("forecast", { forecast })} /></details>}
            {state.forecastLocked && <p className="live-caption live-forecast-locked">Your prediction is locked. It will appear in the final reveal.</p>}
            <div className="live-host-guests"><h2>People in the room</h2>{state.participants.length === 0 ? <p className="live-caption">No guests yet. Show the QR code and ask people to join.</p> : <div className="live-participants"><div className="live-participant-heading"><span>Game name</span><span>Pair</span><span>This step</span></div>{state.participants.map(person => <div key={person.id}><span>{person.name}</span><span>{person.pairLabel || "Waiting"}</span><span>{person.submitted ? "Saved" : person.waiting ? "Watching" : "Not saved yet"}</span></div>)}</div>}</div>
          </section>
          <aside className="live-host-aside"><JoinCode path={state.joinPath} code={state.room.code} copied={copied} onCopy={() => { void navigator.clipboard.writeText(new URL(state.joinPath, window.location.origin).toString()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }).catch(() => setError("Copy is not available here. Select the link below.")); }} /><p className="live-caption">{state.room.mode === "rehearsal" ? "This is a test room. These answers stay separate from the event room." : "Event access opens on 3 December 2026 at 18:00 Luxembourg time."}</p><a className="live-outline-button" target="_blank" rel="noopener noreferrer" href={state.joinPath.replace("/live?", "/live/screen?")}>Open room screen <span aria-hidden="true">↗</span></a><p className="live-caption">The room screen shows shared prompts and totals. Keep your event controls on your own screen.</p></aside>
        </div>
      </>}
    {confirmReveal && state && <RevealConfirm busy={busy} onCancel={() => setConfirmReveal(false)} onConfirm={() => void action("reveal")} />}
  </main>;
}

function RoomList({ rooms, onSelect }: { rooms: RoomSummary[]; onSelect: (code: string) => void }) {
  return <section className="live-room-list"><h2>Your rooms</h2>{rooms.length ? rooms.map(room => <button key={room.code} onClick={() => onSelect(room.code)}><span><strong>{room.code}</strong><span>{room.mode === "rehearsal" ? "Test room" : "Event room"} · {stepNames[room.step]}</span></span><span aria-hidden="true">↗</span></button>) : <p className="live-caption">Your rooms will appear here.</p>}</section>;
}

function Forecast({ state, busy, onSave }: { state: HostState; busy: boolean; onSave: (forecast: Record<Interest, number>) => Promise<void> }) {
  const [values, setValues] = useState<Record<Interest, string>>(() => Object.fromEntries(interests.map(interest => [interest, String(state.forecast?.[interest] || 0)])) as Record<Interest, string>);
  const forecast = Object.fromEntries(interests.map(interest => [interest, Number(values[interest]) || 0])) as Record<Interest, number>;
  const total = Object.values(forecast).reduce((sum, value) => sum + value, 0);
  const matchesSaved = total > 0 && interests.every(interest => forecast[interest] === state.forecast?.[interest]);
  return <form className="live-forecast" onSubmit={event => { event.preventDefault(); void onSave(forecast); }}><p className="live-label">Before Card 04</p><h2>Your prediction</h2><p>How many people do you think will choose each answer after you speak?</p><p className="live-caption">Save your prediction before Game 4. It locks when that game opens.</p><div className="live-forecast-fields">{interests.map(interest => <label key={interest}>{interest}<input inputMode="numeric" type="number" min="0" step="1" max="9999" required value={values[interest]} onChange={event => setValues(old => ({ ...old, [interest]: event.target.value }))} /></label>)}</div><div className="live-inline-actions"><button className="live-outline-button" disabled={busy || total < 1 || matchesSaved}>{matchesSaved ? "Prediction saved" : "Save prediction"}</button><span className="live-caption">Total: {total}</span></div></form>;
}

function JoinCode({ path, code, copied, onCopy }: { path: string; code: string; copied: boolean; onCopy: () => void }) {
  const [qr, setQr] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    const full = new URL(path, window.location.origin).toString();
    void QRCode.toDataURL(full, { width: 320, margin: 2, color: { dark: "#111111", light: "#F7F3EC" }, errorCorrectionLevel: "M" }).then(image => { if (active) { setQr(image); setUrl(full); setError(false); } }).catch(() => { if (active) { setUrl(full); setError(true); } });
    return () => { active = false; };
  }, [path]);
  return <div className="live-join-code"><p className="live-label">Join this room</p><h2>{code}</h2>{qr ? <Image src={qr} width={320} height={320} unoptimized alt={`QR code to join room ${code}`} /> : <p className="live-caption">{error ? "QR code unavailable. Share the link below." : "Creating QR code…"}</p>}<button className="live-outline-button" onClick={onCopy}>{copied ? "Link copied" : "Copy guest link"}</button><a className="live-join-url" href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>;
}

function RevealConfirm({ busy, onCancel, onConfirm }: { busy: boolean; onCancel: () => void; onConfirm: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog ref={dialog} className="live-modal live-modal-dialog" aria-labelledby="live-reveal-title" onCancel={event => { event.preventDefault(); if (!busy) onCancel(); }}><p className="live-label">One last check</p><h2 id="live-reveal-title">Ready to show the reveal?</h2><p>This will open the explanation on every phone. The games are now complete.</p><button className="live-button" autoFocus disabled={busy} onClick={onConfirm}>{busy ? "Opening…" : "Yes, show the reveal"}<span aria-hidden="true">→</span></button><button className="live-text-button" disabled={busy} onClick={onCancel}>Keep it hidden</button></dialog>;
}

const hostCues = {
  lobby: "Welcome everyone. Ask them to scan the code, enter a game name and keep the page open. Match your guests when the room is ready.",
  compose: "Say: Write a short, everyday message. Then write what you want your partner to understand. The second answer stays hidden for now.",
  interpret: "Say: Read the message on your phone. What do you think it means? How sure are you? Save your answer.",
  reply: "Say: Write a reply. You may see your partner typing. Before replies arrive, save what you think your partner will say. You control when replies are delivered.",
  reply_delivered: "Give people a moment to read the reply. Keep the discussion for the final reveal.",
  context: "Say: Read the situation on your own phone. Imagine it for a moment, then read the message and answer. Please keep your scenario to yourself for now.",
  room: "Before guests answer, say: I’m nervous about sharing this book. I notice that I’m expecting to be judged. Now ask them to give their own response on the phone.",
  ready_reveal: "Bring everyone’s attention back to you. The explanations are still hidden. Open the reveal when you are ready.",
  reveal_message: "Invite people to compare the message, the sender’s intention and the receiver’s interpretation. No one has to share their answers aloud.",
  reveal_pause: "Ask what people expected while they waited. The dots came from real typing. Replies were held until you continued.",
  reveal_context: "Show the different fictional scenarios. Everyone received the same sentence. Ask what the context added to it.",
  reveal_room: "Compare your saved prediction with the actual room totals. These are this room’s responses, not a test or diagnosis.",
  finished: "Thank everyone. Leave them with the question: What belongs to the situation, and what might my state be adding?",
} as const;
