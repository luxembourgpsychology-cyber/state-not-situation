"use client";

import { Brand, CountResults, Progress, Room, stepNames, usePolling } from "./client";

type ScreenState = { room: Room; counts: { joined: number; paired: number; waiting: number; submitted: number; total: number }; reveal?: { explanation?: string; forecast?: Parameters<typeof CountResults>[0]["forecast"]; counts?: Parameters<typeof CountResults>[0]["counts"]; responseCount?: number; scenarios?: string[] } };

export default function LiveScreen({ roomCode = "", invite = "" }: { roomCode?: string; invite?: string }) {
  const polling = usePolling<ScreenState>(roomCode ? `/api/live/screen?room=${encodeURIComponent(roomCode)}&invite=${encodeURIComponent(invite)}` : null);
  const state = polling.data;
  return <main className="live-app live-screen"><Brand code={state?.room.code || roomCode} mode={state?.room.mode} />
    {state && <Progress step={state.room.step} />}
    <div className="live-screen-content live-container">
      {!state ? <><p className="live-label">The room screen</p><h1>{polling.error ? "One moment." : "Welcome to the room."}</h1><p>{polling.error?.message || (roomCode ? "Opening the session…" : "Open this screen from the host desk.")}</p></>
        : state.room.paused || state.room.lookUp ? <><p className="live-label">Phones down for a moment</p><h1>Look up<br />at Ivana.</h1></>
        : <><p className="live-label">{state.room.step.startsWith("reveal_") ? "The reveal" : state.room.step === "lobby" ? "Welcome" : "Follow the step on your phone"}</p><h1>{screenTitles[state.room.step] || stepNames[state.room.step]}</h1>
          {state.room.step === "lobby" ? <p>{state.counts.joined} {state.counts.joined === 1 ? "person has" : "people have"} joined. Ivana will start the first game.</p>
            : state.room.step === "reveal_room" ? <><CountResults forecast={state.reveal?.forecast} counts={state.reveal?.counts} /><p>{state.reveal?.responseCount ?? 0} people answered.</p></>
            : state.room.step === "reveal_context" ? <><p className="live-screen-quote">“Can we talk tomorrow?”</p><div className="live-screen-scenarios">{state.reveal?.scenarios?.map((scenario, index) => <div key={scenario}><span className="live-label">Scenario {index + 1}</span><p>{scenario}</p></div>)}</div></>
            : state.room.step === "finished" ? <p className="live-screen-quote">What belongs to the situation, and what might my state be adding?</p>
            : state.room.step.startsWith("reveal_") ? <p>Compare your answers on your own phone. Share only what you choose.</p>
            : state.room.step === "ready_reveal" ? <p>Keep your answers in mind. We’ll return to them together.</p>
            : <p>{screenPrompts[state.room.step as keyof typeof screenPrompts]}</p>}
          {state.reveal?.explanation && <p className="live-reveal-note">{state.reveal.explanation}</p>}
        </>}
      {polling.error && state && <p className="live-caption" role="status">Reconnecting to the room…</p>}
    </div><footer className="live-footer"><span>State. Not Situation.</span><span>Ivana Budišin</span></footer>
  </main>;
}

const screenTitles: Record<string, string> = { lobby: "A room full of possibilities.", compose: "01. The message.", interpret: "A message for you.", reply: "02. The wait.", reply_delivered: "Your reply has arrived.", context: "03. Tomorrow.", room: "04. The room.", ready_reveal: "And now, the reveal.", reveal_message: "One message. Two readings.", reveal_pause: "What happened while you waited?", reveal_context: "Same words. Different context.", reveal_room: "The guess. And the room.", finished: "Take the question with you." };
const screenPrompts = { compose: "Write a short message. Then write what you want your partner to understand.", interpret: "Read the message on your phone. What do you think it means?", reply: "Write a reply. Before it arrives, save what you expect your partner to say.", reply_delivered: "Read the reply on your phone. We’ll come back to it at the reveal.", context: "Read your own situation, then answer the message. Keep your scenario to yourself for now.", room: "Listen to Ivana, then give your response on your phone." };
