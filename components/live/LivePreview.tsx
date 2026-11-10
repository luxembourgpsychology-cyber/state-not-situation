"use client";

import { useState } from "react";
import Link from "next/link";
import type { Answers, Forecast, GuestState, Interest, Step } from "@/lib/live/types";
import { GuestStep } from "./LiveGuest";
import { Brand, interests } from "./client";

const stages: Step[] = ["compose", "interpret", "reply", "reply_delivered", "context", "room", "ready_reveal", "reveal_message", "reveal_pause", "reveal_context", "reveal_room", "finished"];
const moments = [
  { name: "The message", start: 0 },
  { name: "The wait", start: 2 },
  { name: "Tomorrow", start: 4 },
  { name: "The room", start: 5 },
];
const partner = { message: "Can I ask you something?", intention: "I wanted to ask how you heard about the book.", reply: "Which chapter would you start with?" };
const scenarios = [
  "You and a colleague have an unfinished task. You are not sure whether something was missed.",
  "You and a colleague have just finished a project you both enjoyed. You are arranging a relaxed catch-up.",
];
const exampleAnswers: Partial<Record<Step, Answers>> = {
  compose: { message: "Can we talk later?", intention: "I wanted to ask you to recommend a restaurant." },
  interpret: { interpretation: "They may want to ask about something important.", confidence: "Somewhat sure" },
  reply: { reply: "Of course. What would you like to ask?", expectation: "They might ask for my opinion about the book." },
  context: { contextTone: "Concerning", contextReply: "Yes, of course. Is there something I should prepare?" },
  room: { interest: "More interested" },
};

export default function LivePreview({ initialMoment = 1 }: { initialMoment?: number }) {
  const validMoment = Number.isInteger(initialMoment) && initialMoment >= 1 && initialMoment <= 4 ? initialMoment : 1;
  const [index, setIndex] = useState(() => moments[validMoment - 1].start);
  const [answers, setAnswers] = useState<Answers>({});
  const [exampleSteps, setExampleSteps] = useState<Step[]>([]);
  const [visited, setVisited] = useState<number[]>([]);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const [typingVisible, setTypingVisible] = useState(true);
  const [prediction, setPrediction] = useState<Interest>("Not sure");
  const [predictionSaved, setPredictionSaved] = useState(false);
  const step = stages[index];
  const moment = index <= 1 ? 0 : index <= 3 ? 1 : index === 4 ? 2 : index <= 6 ? 3 : -1;
  const saved = isSaved(step, answers);
  const requiresAnswer = Boolean(exampleAnswers[step]);
  const state = previewState(step, answers, typingVisible, predictionSaved ? prediction : "Not sure");

  function move(nextIndex: number) {
    if (moment >= 0) setVisited(old => old.includes(moment) ? old : [...old, moment]);
    setIndex(nextIndex); setFormVersion(old => old + 1);
    if (nextIndex === 2) setTypingVisible(true);
    const nextMoment = nextIndex <= 1 ? 1 : nextIndex <= 3 ? 2 : nextIndex === 4 ? 3 : nextIndex <= 6 ? 4 : null;
    if (nextMoment) window.history.replaceState(null, "", `?moment=${nextMoment}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function useExample() {
    setAnswers(old => ({ ...old, ...exampleAnswers[step] }));
    setExampleSteps(old => old.includes(step) ? old : [...old, step]);
    setFormVersion(old => old + 1);
  }
  function showResults() { setResultsOpen(true); move(7); }
  function restart() {
    setAnswers({}); setExampleSteps([]); setVisited([]); setResultsOpen(false); setPrediction("Not sure"); setPredictionSaved(false); move(0);
  }

  return <main className="live-app live-preview">
    <Brand />
    <div className="live-preview-notice"><strong>Practice on your own · Example partner</strong><span>Fictional examples. No other person is connected. Nothing is sent to the event.</span></div>
    <div className="live-container live-preview-intro"><div><p className="live-label">Your own preview</p><h1>Four small moments.</h1><p>Try the guest’s screen and see what you do as host. Choose any moment below. There is no score, and you can pass.</p></div><Link className="live-text-button" href="/live/host">Back to your event controls</Link></div>
    <nav className="live-preview-nav live-container" aria-label="Choose a moment">{moments.map((item, i) => <button key={item.name} onClick={() => move(item.start)} className={moment === i ? "is-current" : ""} aria-current={moment === i ? "step" : undefined}><b>0{i + 1}</b><span>{item.name}</span>{visited.includes(i) && <small aria-label="Visited">✓</small>}</button>)}<button onClick={() => move(7)} disabled={!resultsOpen} className={moment < 0 ? "is-current" : ""} aria-current={moment < 0 ? "step" : undefined}><b>R</b><span>Results</span></button></nav>
    <div className="live-container live-preview-layout">
      <aside className="live-preview-guide"><p className="live-label">For you as host</p><h2>{guides[step].title}</h2><p><strong>What you do:</strong> {guides[step].action}</p>{guides[step].say && <blockquote><span className="live-label">You can say</span><p>“{guides[step].say}”</p></blockquote>}<p className="live-caption">At the event, you press one button to move everyone to the next step. Here, use Continue below.</p>
        {step === "reply" && <button className="live-outline-button" onClick={() => setTypingVisible(!typingVisible)}>{typingVisible ? "Hide example dots" : "Show example dots"}</button>}
        {step === "room" && <div className="live-preview-prediction"><label className="live-field">Your practice prediction<select value={prediction} disabled={predictionSaved || saved} onChange={event => setPrediction(event.target.value as Interest)}>{interests.map(interest => <option key={interest}>{interest}</option>)}</select></label><p className="live-caption">Guess one person’s response before you answer. This is a small version of the host’s prediction.</p><button className="live-outline-button" disabled={predictionSaved || saved} onClick={() => setPredictionSaved(true)}>{predictionSaved ? "Prediction saved" : "Save my prediction"}</button>{!predictionSaved && <p className="live-caption">If you pass, “Not sure” is used as the example guess.</p>}</div>}
        {step.startsWith("reveal_") && <div className="live-preview-host-reveal"><span className="live-label">Why this moment is here</span><p>{hostLessons[step]}</p></div>}
      </aside>
      <section className="live-preview-player" aria-label="Try the guest screen"><div className="live-preview-player-label"><span className="live-label">The guest’s screen</span><span>Example partner</span></div>
        {exampleSteps.includes(step) && <p className="live-preview-example" role="status">You chose an example answer for this step.</p>}
        {step === "reveal_room" && <p className="live-preview-example">{predictionSaved ? "The guess below is your saved practice prediction." : "The guess below is an example, not Ivana’s prediction."}{!answers.interest ? " No response was saved for Moment 04." : exampleSteps.includes("room") ? " The response is the example answer you selected." : " The response is your own practice answer."}</p>}
        <div className="live-task"><GuestStep key={`${step}:${formVersion}`} state={state} practice onAnswer={async data => ({ ...state, own: { ...state.own, ...data } as Answers })} onState={next => { setAnswers(next.own); setExampleSteps(old => old.filter(value => value !== step)); }} /></div>
        <div className="live-preview-controls">
          {requiresAnswer && !saved && <div className="live-preview-example-choice"><p>Write your own answer above, or use an example to see the next screen.</p><button className="live-outline-button" onClick={useExample}>Use an example answer</button></div>}
          <div className="live-preview-navigation"><button className="live-text-button" disabled={index === 0} onClick={() => move(Math.max(0, index - 1))}>← Back</button>
            {step === "ready_reveal" ? <button className="live-button" onClick={showResults}>Show results<span aria-hidden="true">↗</span></button>
              : step === "finished" ? <button className="live-button" onClick={restart}>Try again<span aria-hidden="true">↗</span></button>
              : <button className="live-button" disabled={requiresAnswer && !saved} onClick={() => move(index + 1)}>{nextLabels[step] || "Continue"}<span aria-hidden="true">→</span></button>}
          </div>
          {requiresAnswer && !saved && <div className="live-preview-pass"><p className="live-caption">Continue opens after you save. You can also pass.</p><button className="live-text-button" onClick={() => move(index + 1)}>Continue without answering</button></div>}
          {step === "ready_reveal" && <p className="live-caption">This opens all four explanations. It does not affect your real event.</p>}
        </div>
      </section>
    </div>
    <footer className="live-footer"><span>State. Not Situation.</span><span>Solo practice only</span></footer>
  </main>;
}

function isSaved(step: Step, answers: Answers) {
  switch (step) {
    case "compose": return Boolean(answers.message && answers.intention);
    case "interpret": return Boolean(answers.interpretation && answers.confidence);
    case "reply": return Boolean(answers.reply && answers.expectation);
    case "context": return Boolean(answers.contextTone && answers.contextReply);
    case "room": return Boolean(answers.interest);
    default: return true;
  }
}

function previewState(step: Step, own: Answers, typing: boolean, prediction: Interest): GuestState {
  const state: GuestState = { room: { code: "PRACTICE", mode: "rehearsal", step, revision: 0, paused: false, lookUp: false }, participant: { id: "solo-practice", name: "You", paired: true, pairLabel: "Example partner", waiting: false }, own, partnerMessage: partner.message, scenario: scenarios[0], partnerTyping: step === "reply" && typing };
  if (step === "reply_delivered") state.partnerReply = partner.reply;
  if (step === "reveal_message") state.reveal = { message: partner.message, intention: partner.intention, interpretation: own.interpretation, explanation: "This was one possible intention in a fictional example. Your first answer had less information. At the event, both people compare their own saved answers." };
  if (step === "reveal_pause") state.reveal = { expectation: own.expectation, reply: partner.reply, explanation: "The dots tell us that someone is composing. They do not tell us what will be written or why someone pauses. Here they were a clearly labelled demonstration." };
  if (step === "reveal_context") state.reveal = { message: "Can we talk tomorrow?", scenarios, explanation: "The words stayed the same. The imagined situation changed. Did the scene add anything to the meaning you gave the message?" };
  if (step === "reveal_room") {
    const empty = (): Forecast => ({ "More interested": 0, "About the same": 0, "Less interested": 0, "Not sure": 0 });
    const forecast = empty(); forecast[prediction] = 1;
    const counts = empty(); if (own.interest) counts[own.interest] = 1;
    state.reveal = { forecast, counts, responseCount: own.interest ? 1 : 0, explanation: "In the event, Ivana saves a prediction before hearing the room. Then everyone’s responses are counted. This practice only uses your own response, or the example answer you chose." };
  }
  return state;
}

const nextLabels: Partial<Record<Step, string>> = { compose: "Read an example message", interpret: "Continue to Moment 02", reply: "Show the example reply", reply_delivered: "Continue to Moment 03", context: "Continue to Moment 04", room: "Finish the four moments", reveal_message: "See Moment 02 results", reveal_pause: "See Moment 03 results", reveal_context: "See Moment 04 results", reveal_room: "Finish the preview" };
const guides: Record<Step, { title: string; action: string; say?: string }> = {
  lobby: { title: "Welcome everyone", action: "Ask people to scan the QR code." },
  compose: { title: "01. The message", action: "Let people write a short message and what they mean. Wait for the saved-answer count, then continue.", say: "Write something simple and everyday. Then write what you want your partner to understand." },
  interpret: { title: "Let them read", action: "Send each saved message to its partner. Let people write what they think it means.", say: "What do you think they mean? How sure are you? Save your answer." },
  reply: { title: "02. The wait", action: "Let both people write. Before you deliver the replies, ask them to save what they expect. These dots are examples in this preview.", say: "Write a reply. Before replies arrive, save what you think your partner will say." },
  reply_delivered: { title: "Deliver the replies", action: "Press one button to send the saved replies. Give everyone a moment to read. Keep explanations for the end." },
  context: { title: "03. Tomorrow", action: "Let people read their private fictional situation, then answer the same message. Different people receive different situations.", say: "Imagine the situation on your phone. Read the message and answer. Keep your situation to yourself for now." },
  room: { title: "04. The room", action: "Save your prediction first. Read the words below aloud, then let people answer.", say: "I’m nervous about sharing this book. I notice that I’m expecting to be judged." },
  ready_reveal: { title: "Bring everyone back", action: "You choose when to open the results. Nothing is revealed automatically.", say: "Let’s look at what happened. You only need to share what you choose." },
  reveal_message: { title: "Compare the meanings", action: "Invite people to compare the message, the sender’s intention and their own first answer." },
  reveal_pause: { title: "Return to the wait", action: "Ask what people expected while their partner was writing. They can keep their answers private." },
  reveal_context: { title: "Show both situations", action: "Show that the sentence was identical, while the fictional situations differed." },
  reveal_room: { title: "Show the room’s answers", action: "Compare your saved prediction with the actual totals. A difference is a conversation, not a score." },
  finished: { title: "You’ve seen the whole flow", action: "Try any moment again, or return to your event controls when you want to create a real test room." },
};
const hostLessons: Partial<Record<Step, string>> = {
  reveal_message: "A few words leave space for a reading. The sender’s intention and the receiver’s first answer can differ.",
  reveal_pause: "Waiting can invite a story about what comes next. A typing signal gives only a little information.",
  reveal_context: "The scene around a sentence can change how we hear it. There is no correct reaction to the fictional scene.",
  reveal_room: "A prediction about being judged may differ from what people report. This room gives one observation, not proof about every audience.",
};
