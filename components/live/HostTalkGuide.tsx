"use client";

import { useId, useRef, useState, type RefObject } from "react";
import type { ExperienceProgress } from "@/lib/live/types";

const notes = [
  {
    title: "Welcome", time: "0 to 5 min",
    question: "State or situation: which are we in right now?",
    line: "The situation is a book launch in a café. My state is how I feel being here.",
    points: ["Say why you wrote the book, in your own words.", "Use one short example from the opening. Keep it to about a minute."],
    bridge: "Separate what is happening around you from what is happening in you.",
    steps: ["Welcome everyone while their phones are down.", "Ask them to scan the audience QR.", "Press Open Experience 1 when you are ready."],
  },
  {
    title: "Jessika’s vote", time: "5 to 8 min",
    question: "What were we looking for when we checked our phones?",
    line: "Notice what you feel like doing while we wait.",
    points: ["In the book, Katrin checks her phone during a wonderful dinner. A gap is enough for her to reach for it.", "Read the real vote totals aloud. Ask for one or two reactions."],
    bridge: "The phone check can offer a little relief even when nothing new has arrived.",
    steps: ["Guests tap Experience 1 and choose one answer. Allow about 30 seconds.", "Jessika opens her prediction envelope. Press Show room vote.", "After the discussion, press Open Experience 2."],
  },
  {
    title: "The first surprise", time: "8 to 12 min",
    question: "Before you saw the real reply, what did you think was coming?",
    line: "You’re writing to somebody in this room. One line is plenty.",
    points: ["Someone sees ‘Can I be honest?’ and may feel nervous, curious, amused, or something else.", "Ask: what was on the screen, what did you feel, and what did you think it meant?"],
    bridge: "A feeling and a guess can arrive before you have the full situation.",
    steps: ["Ask guests to tap Experience 2. When the ready count is right, press Pair guests and start.", "Give them 30 to 45 seconds to send one line.", "Press Show the message. Allow 10 to 15 seconds to notice a feeling or reply.", "Press Reveal the real reply. Give people a moment to read, then bring their attention back to you."],
  },
  {
    title: "Read it again", time: "12 to 16 min",
    question: "Did the same words feel the same on the second reading?",
    line: "Take a moment. Notice how you feel, then read their message again.",
    points: ["Invite people to notice their jaw, breathing or shoulders, as well as the feeling they chose.", "Let them say whether anything changed. Their first and second readings can also feel the same."],
    bridge: "The book asks us to notice the state of the person doing the reading.",
    steps: ["Press Next moment to open moment 2.", "Guests tap How I feel and reply with a question. Allow 30 to 45 seconds.", "Press Reveal the replies, then pause for the interview."],
  },
  {
    title: "The other side", time: "16 to 20 min",
    question: "How can we tell a strong feeling from something we actually know?",
    line: "What did ‘Wait, really?’ sound like to you?",
    points: ["The surprise now reaches the other side of each pair. Let guests describe their own reading.", "Jessika can say ‘I thought you were coming’ with relief, then with annoyance. Ask what the tone added."],
    bridge: "Words, tone, context and our state can all contribute to a reading.",
    steps: ["Press Next moment to open moment 3. Guests answer their partner’s question.", "When most messages are in, press Show the message. Allow 10 to 15 seconds.", "Press Reveal the real reply, then discuss what people expected."],
  },
  {
    title: "At first I thought…", time: "20 to 24 min",
    question: "What was the first story you told yourself?",
    line: "Finish this sentence: ‘At first I thought…’",
    points: ["Invite one or two people to share their sentence aloud, if they wish.", "Ask what they knew at the time and what they were guessing."],
    bridge: "Notice how you formed a guess and what helped you revise it.",
    steps: ["Press Next moment to open moment 4.", "Give guests 30 to 45 seconds to finish the sentence and send it.", "Press Reveal the replies. Leave the closing screen for your final discussion."],
  },
  {
    title: "Bring it home", time: "24 to 30 min",
    question: "What can we use tomorrow, before replying to a message?",
    line: "Before I reply: what do I know, and what am I guessing?",
    points: ["Katrin reads ‘Nothing urgent’ when she is tired and tense. She expects bad news. The meeting turns out to concern a budget timeline.", "Her state helps us understand her first reading. The meeting gives her new information."],
    bridge: "A feeling is real. It does not tell you the whole situation.",
    steps: ["Press Show closing screen. Everyone sees the book connection on their own phone.", "Ask: What did you know? What did you guess?", "Guests can tap Look back at my chat to revisit their own conversation and private feeling history."],
  },
];

function currentNote(progress?: ExperienceProgress) {
  if (!progress || progress.phase === "welcome") return 0;
  if (progress.phase === "vote" || progress.phase === "vote_result") return 1;
  if (progress.phase === "finished") return 6;
  return progress.phase === "pairing" ? 2 : progress.moment + 2;
}

export default function HostTalkGuide({ progress, detailsRef, liveStatus, onControls }: {
  progress?: ExperienceProgress;
  detailsRef?: RefObject<HTMLDetailsElement | null>;
  liveStatus?: string;
  onControls?: () => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const active = currentNote(progress);
  const index = chosen ?? active;
  const note = notes[index];
  const titleId = useId();
  const navigation = useRef<HTMLElement>(null);
  function showNote(position: number | null) {
    setChosen(position);
    requestAnimationFrame(() => navigation.current?.scrollIntoView({ block: "start", behavior: "auto" }));
  }
  return <details className="live-talk-guide" ref={detailsRef}>
    <summary><span>Your talk and timing</span><small>30-minute plan · Private</small></summary>
    <div className="live-talk-body">
      <div className="live-talk-sticky"><div className="live-talk-toolbar">
        {onControls && <button type="button" onClick={onControls}>Back to live controls ↑</button>}
        {progress && <button type="button" onClick={() => showNote(null)}>Current part</button>}
      </div>
      {liveStatus && <p className="live-talk-status" role="status">{liveStatus}</p>}</div>
      <p className="live-talk-overview">About 8 to 10 minutes of phone activity, spread through a 30-minute conversation. Use these times as a guide.</p>
      <details className="live-talk-book">
        <summary>The book connection</summary>
        <dl><div><dt>Situation</dt><dd>What appeared on the screen. The wait. The real reply.</dd></div><div><dt>State</dt><dd>What I felt in that moment.</dd></div><div><dt>My guess</dt><dd>What I thought those words meant.</dd></div></dl>
        <p>The app creates uncertainty, then adds information at the reveal. Discuss how people formed and revised a guess.</p>
      </details>
      <nav className="live-talk-nav" aria-label="Interview notes" ref={navigation}>{notes.map((part, position) => <button type="button" key={part.title}
        aria-label={`Note ${position + 1}: ${part.title}`} aria-current={position === index ? "step" : undefined}
        onClick={() => showNote(position)}>0{position + 1}</button>)}</nav>
      <article className="live-talk-card" aria-labelledby={titleId}>
        <p className="live-talk-time">{note.time} · Note {index + 1} of {notes.length}</p>
        <h2 id={titleId}>{note.title}</h2>
        <div className="live-talk-question"><span>Jessika asks</span><p>{note.question}</p></div>
        <div className="live-talk-line"><span>Ivana · Suggested words</span><blockquote>{note.line}</blockquote></div>
        <ul>{note.points.map(point => <li key={point}>{point}</li>)}</ul>
        <p className="live-talk-bridge"><strong>Book connection</strong>{note.bridge}</p>
        <details className="live-talk-steps" key={index}>
          <summary>Phone steps for this part</summary>
          <ol>{note.steps.map(step => <li key={step}>{step}</li>)}</ol>
        </details>
      </article>
      <div className="live-talk-paging">
        <button type="button" disabled={index === 0} onClick={() => showNote(index - 1)}>← Previous note</button>
        <button type="button" disabled={index === notes.length - 1} onClick={() => showNote(index + 1)}>Next note →</button>
      </div>
      <p className="live-talk-private">These are your notes. Guests stay on their current screen while you browse.</p>
    </div>
  </details>;
}
