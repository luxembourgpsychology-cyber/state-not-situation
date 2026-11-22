"use client";

import { useId, useState } from "react";
import type { ExperienceProgress } from "@/lib/live/types";

const interviewAnswers = [
  { question: "Why did you write the book?", answer: "How can the same life feel so different when nothing obvious has changed? You read a message one way when you’re rested, and another way when you’re tense. I wanted to bring research into those ordinary moments, so we could notice what might be shaping a first reading before acting on it." },
  { question: "How long did you work on it?", answer: "Around three years. It brought together research I had done for my studies and for other papers. I wanted to integrate it into a full story, so the ideas could be followed through someone’s everyday life. That is why Katrin matters: work, family, messages, sleep, and the small moments that change the feel of a day." },
  { question: "How do Kennedy and Sully fit together?", answer: "The Kennedy investigation found spatial disorientation. The FAA teaches pilots to rely on flight instruments in those conditions. Sully adds trained judgment: information, experience and teamwork under pressure. His crew could not complete the whole engine-failure checklist. The instruments supplied information; choosing what to do with it required judgment. The question I bring back to daily life is: what is my feeling based on, and what can I check?", source: "https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1003.pdf", label: "NTSB Flight 1549 report · sections 2.3.1 to 2.3.5" },
  { question: "Why use such dramatic examples?", answer: "Aviation gives us unusually detailed evidence about some gaps between perception and events. At home, someone feels criticised and someone else feels ignored. We can still ask what happened, what each person experienced and what evidence we have. It is a useful comparison. The situations and mechanisms are not identical." },
  { question: "Do other fields account for the person’s state?", answer: "In England and Wales, police interviewing rules specifically ask whether a detained person’s physical or mental state could affect the reliability of what they say. The principle I want to borrow is simple: notice the conditions in which a story is being formed. We can ask that about the stories we tell ourselves, too.", source: "https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible#annex-g-fitness-to-be-interviewed", label: "PACE Code C · Annex G · England and Wales" },
  { question: "What if an old story is shaping this moment?", answer: "If I already carry a story such as ‘I always disappoint people’, an unclear message may fit into it very quickly. I can ask what this moment actually adds, rather than letting an old story finish every new sentence." },
];

const notes = [
  {
    title: "Welcome", time: "0 to 8 min",
    question: "State or situation: which are we in right now?",
    line: "Both. The situation is a book launch in a café. My state is excited, a little nervous, and aware that you can all now read something I spent a long time writing.",
    points: ["Around three years: research from your studies and other papers, brought into one story.", "Use Kennedy and Sully briefly. The interviewing-rules example is below if Jessika asks.", "Keep the first eight minutes for the opening questions. Then let Jessika lead her phone question."],
    bridge: "Separate what is happening around you from what is happening in you.",
    steps: ["Welcome everyone while their phones are down.", "Ask them to scan the audience QR.", "Press Open Experience 1 when you are ready."],
  },
  {
    title: "Jessika’s vote", time: "8 to 11 min",
    question: "What were we looking for when we checked our phones?",
    line: "Notice what you feel like doing while we wait.",
    points: ["In the book, Katrin checks her phone during a wonderful dinner. A gap is enough for her to reach for it.", "Read the real vote totals aloud. Ask for one or two reactions."],
    bridge: "The phone check can offer a little relief even when nothing new has arrived.",
    steps: ["Guests tap Experience 1 and choose one answer. Allow about 30 seconds.", "Jessika opens her prediction envelope. Press Show room vote.", "After the discussion, press Open Experience 2."],
  },
  {
    title: "The first surprise", time: "11 to 15 min",
    question: "Before you saw the real reply, what did you think was coming?",
    line: "You’re writing to somebody in this room. One line is plenty.",
    points: ["A writes the subtitles for their face. B writes what people get wrong about them at first glance.", "Only A sees ‘Can I be honest?’ before the real reply. At the reveal, explain clearly that this line came from the app.", "Ask what people thought was coming. Keep the full State/Situation recap for the ending."],
    bridge: "A feeling and a guess can arrive before you have the full situation.",
    steps: ["Ask guests to tap Experience 2. When the ready count is right, press Pair guests and start.", "Give them 30 to 45 seconds to send one line.", "Press Show the message. Allow 10 to 15 seconds to notice a feeling or reply.", "Press Reveal the real reply. Give people a moment to read, then bring their attention back to you."],
  },
  {
    title: "Read it again", time: "15 to 18 min",
    question: "Did the same words feel the same on the second reading?",
    line: "Take a moment. Notice how you feel, then read their message again.",
    points: ["Invite people to notice their jaw, breathing or shoulders, as well as the feeling they chose.", "Let them say whether anything changed. Their first and second readings can also feel the same."],
    bridge: "The book asks us to notice the state of the person doing the reading.",
    steps: ["Press Next moment to open moment 2.", "Guests tap How I feel and reply with a question. Allow 30 to 45 seconds.", "Press Reveal the replies, then pause for the interview."],
  },
  {
    title: "The other side", time: "18 to 22 min",
    question: "How can we tell a strong feeling from something we actually know?",
    line: "What did ‘Wait, really?’ sound like to you?",
    points: ["The surprise now reaches the other side of each pair. Let guests describe their own reading.", "Jessika can say ‘I thought you were coming’ with relief, then with annoyance. Ask what the tone added."],
    bridge: "Words, tone, context and our state can all contribute to a reading.",
    steps: ["Press Next moment to open moment 3. Guests answer their partner’s question.", "When most messages are in, press Show the message. Allow 10 to 15 seconds.", "Press Reveal the real reply, then discuss what people expected."],
  },
  {
    title: "At first I thought…", time: "22 to 25 min",
    question: "What was the first story you told yourself?",
    line: "Finish this sentence: ‘At first I thought…’",
    points: ["Invite one or two people to share their sentence aloud, if they wish.", "Ask what they knew at the time and what they were guessing."],
    bridge: "Notice how you formed a guess and what helped you revise it.",
    steps: ["Press Next moment to open moment 4.", "Give guests 30 to 45 seconds to finish the sentence and send it.", "Press Reveal the replies. Leave the closing screen for your final discussion."],
  },
  {
    title: "Bring it home", time: "25 to 30 min",
    question: "What can we use tomorrow, before replying to a message?",
    line: "Before I reply: what do I know, and what am I guessing?",
    points: ["Katrin reads ‘Nothing urgent’ when she is tired and tense. She expects bad news. The meeting turns out to concern a budget timeline.", "Her state helps us understand her first reading. The meeting gives her new information."],
    bridge: "A feeling is real. It does not tell you the whole situation.",
    steps: ["Press Show closing screen. Everyone sees the book connection on their own phone.", "Ask: What did you know? What did you guess?", "Guests can tap Look back at my chat to revisit their own conversation and private feeling history."],
  },
];

function currentNote(progress?: ExperienceProgress) {
  if (!progress || progress.phase === "welcome") return 0;
  if (progress.phase === "vote" || progress.phase === "vote_result") return 7;
  if (progress.phase === "finished") return 12;
  return progress.phase === "pairing" ? 8 : progress.moment + 8;
}

const pages = [
  { title: notes[0].title, question: notes[0].question, paragraphs: [notes[0].line, notes[0].bridge] },
  ...interviewAnswers.map(item => ({ title: item.question, question: item.question, paragraphs: [item.answer] })),
  ...notes.slice(1).map(note => ({
    title: note.title,
    question: note.question,
    paragraphs: [note.line, ...(note.title === "Bring it home" ? note.points : []), note.bridge],
  })),
];

export default function HostTalkGuide({ progress, liveStatus }: {
  progress?: ExperienceProgress;
  liveStatus?: string;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const active = currentNote(progress);
  const index = chosen ?? active;
  const page = pages[index];
  const titleId = useId();
  const jumpId = useId();
  function showNote(position: number | null) {
    setChosen(position);
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  return <section className="host-talk-reader" aria-label="My talk">
    <header className="host-talk-heading">
      <div><p className="live-label">Private notes</p><h1>My talk</h1></div>
      {progress && <button className="live-outline-button" type="button" onClick={() => showNote(null)}>Current part</button>}
    </header>
    {liveStatus && <p className="host-talk-live-status" role="status">{liveStatus}</p>}
    <label className="host-talk-jump" htmlFor={jumpId}>Jump to
      <select id={jumpId} value={index} onChange={event => showNote(Number(event.target.value))}>
        {pages.map((part, position) => <option key={part.title} value={position}>{String(position + 1).padStart(2, "0")} · {part.title}</option>)}
      </select>
    </label>
    <article className="host-talk-page" aria-labelledby={titleId}>
      <p className="host-talk-position">{index + 1} / {pages.length}</p>
      {page.title === page.question && <p className="live-label">Jessika</p>}
      <h2 id={titleId}>{page.title}</h2>
      {page.title !== page.question && <div className="host-talk-question"><span>Jessika</span><p>{page.question}</p></div>}
      <div className="host-talk-answer"><span>Ivana</span>{page.paragraphs.map((paragraph, position) => <p key={position}>{paragraph}</p>)}</div>
    </article>
    <div className="host-talk-paging">
        <button type="button" disabled={index === 0} onClick={() => showNote(index - 1)}>← Previous note</button>
        <button type="button" disabled={index === pages.length - 1} onClick={() => showNote(index + 1)}>Next note →</button>
    </div>
  </section>;
}
