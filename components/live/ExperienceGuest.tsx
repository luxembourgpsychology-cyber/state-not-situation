"use client";

import { useEffect, useRef, useState } from "react";
import type { FeelingStage } from "@/lib/live/preview-model";
import type { ExperienceProgress, GuestState } from "@/lib/live/types";
import { api, usePolling } from "./client";
import ConversationPanel, { type FeelingContext, type FeelingEntry } from "./ConversationPanel";
import { BookFrame, BookStatus, ExperienceCards, RoomVote } from "./ExperiencePanels";

type EntryState = Pick<GuestState, "room" | "experience" | "partnerTyping"> & { participant?: GuestState["participant"] };
type ChatView = NonNullable<NonNullable<GuestState["experience"]>["chat"]>;
type LocalNotes = { drafts: Record<string, string>; feelings: FeelingEntry[] };

export default function ExperienceGuest({ roomCode, invite }: { roomCode: string; invite?: string }) {
  const [showVote, setShowVote] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const params = new URLSearchParams({ room: roomCode, entry: "1" });
  if (invite) params.set("invite", invite);
  const session = usePolling<EntryState>(`/api/live/state?${params}`);
  const state = session.data;
  const progress = state?.room.experience;
  const experience = state?.experience;

  async function submit(answer: Record<string, string | number>) {
    if (submitting.current) return false;
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      if (!state?.participant) {
        const joined = await api<GuestState>("/api/live/join", { room: roomCode, invite, consent: true });
        session.setData(joined);
      }
      const next = await api<GuestState>("/api/live/answer", { room: roomCode, data: answer });
      session.setData(next);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      void session.refresh();
      return false;
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  if (!progress || !experience) {
    return <BookFrame><BookStatus title="Opening the room…">{session.error?.message || "One moment."}</BookStatus></BookFrame>;
  }
  if (state.room.paused || state.room.lookUp) {
    return <BookFrame><BookStatus title="Look up.">Ivana will let you know when to return to your phone.</BookStatus></BookFrame>;
  }
  if (experience.joinedChat && state.participant && experience.chat) {
    return <GuestConversation
      key={state.participant.id}
      state={state}
      chat={experience.chat}
      progress={progress}
      storageKey={`sns:experience:${roomCode}:${state.participant.id}`}
      busy={busy}
      error={error || (session.error ? "Reconnecting to the room…" : "")}
      submit={submit}
    />;
  }
  if (experience.joinedChat && progress.phase !== "finished") {
    return <BookFrame><BookStatus title="Finding a partner.">Keep this page open. Ivana will guide the room.</BookStatus></BookFrame>;
  }
  if (progress.phase === "finished") {
    return <BookFrame><BookStatus title="Thank you.">What did you know, and what might your state have added?</BookStatus></BookFrame>;
  }

  return <BookFrame>
    {showVote && (progress.phase === "vote" || progress.phase === "vote_result")
      ? <RoomVote vote={experience.vote} totals={experience.totals} busy={busy} error={error} onVote={choice => void submit({ kind: "vote", choice })} />
      : <ExperienceCards phase={progress.phase} disabled={busy} error={error} onVote={() => setShowVote(true)} onChat={() => void submit({ kind: "chat_join" })} />}
  </BookFrame>;
}

function GuestConversation({ state, chat, progress, storageKey, busy, error, submit }: {
  state: EntryState;
  chat: ChatView;
  progress: ExperienceProgress;
  storageKey: string;
  busy: boolean;
  error: string;
  submit: (answer: Record<string, string | number>) => Promise<boolean>;
}) {
  const [notes, setNotes] = useState<LocalNotes>({ drafts: {}, feelings: [] });
  const [loaded, setLoaded] = useState(false);
  const lastTyping = useRef(0);
  const { moment, conversationPhase, phase } = progress;
  const kind = conversationPhase === "compose" ? "message" : "cue_reply";
  const draftKey = `${moment}:${kind}`;
  const draft = notes.drafts[draftKey] ?? "";
  const replied = chat.entries.some(entry => entry.kind === "message" && entry.moment === moment && entry.owner === chat.side && entry.message.replyTo);
  let stage: FeelingStage = chat.writing ? "before" : "waiting";
  if (conversationPhase === "revealed") stage = "after";
  else if (conversationPhase === "waiting" && chat.cueShown) stage = replied ? "responded" : "reading";

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const value = JSON.parse(sessionStorage.getItem(storageKey) || "null") as LocalNotes | null;
        if (value?.drafts && Array.isArray(value.feelings)) setNotes(value);
      } catch { /* A blocked browser store must not interrupt the chat. */ }
      setLoaded(true);
    });
    return () => { active = false; };
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify(notes)); } catch { /* Notes stay in this page. */ }
  }, [notes, loaded, storageKey]);

  function changeDraft(text: string) {
    setNotes(previous => ({ ...previous, drafts: { ...previous.drafts, [draftKey]: text } }));
    if (conversationPhase !== "compose" || !text.trim()) return;
    const now = Date.now();
    if (now - lastTyping.current < 850) return;
    lastTyping.current = now;
    void api("/api/live/typing", { room: state.room.code, moment, active: true }).catch(() => {});
  }

  async function send() {
    if (!await submit({ kind, moment, text: draft })) return;
    setNotes(previous => {
      const drafts = { ...previous.drafts };
      delete drafts[draftKey];
      return { ...previous, drafts };
    });
  }

  function recordFeeling(word: string, context: FeelingContext) {
    const value = word.trim().slice(0, 40);
    if (!value) return;
    setNotes(previous => {
      const last = previous.feelings.at(-1);
      if (last?.value === value && last.moment === context.moment && last.stage === context.stage && last.contextEventId === context.contextEventId) return previous;
      const entry: FeelingEntry = { kind: "feeling", id: (last?.id ?? 1000) + 1, value, ...context };
      return { ...previous, feelings: [...previous.feelings.slice(-99), entry] };
    });
  }

  return <ConversationPanel
    entries={[...chat.entries, ...notes.feelings]}
    moment={moment}
    side={chat.side}
    phase={conversationPhase}
    stage={stage}
    partnerLabel={chat.label}
    cueShown={chat.cueShown}
    hasPartnerMessage={chat.hasPartnerMessage}
    writing={chat.writing}
    draft={draft}
    typing={Boolean(state.partnerTyping)}
    held={conversationPhase === "waiting" || (conversationPhase === "compose" && !chat.writing)}
    reviewing={phase === "finished"}
    busy={busy}
    error={error}
    onDraft={changeDraft}
    onSend={() => void send()}
    onFeeling={recordFeeling}
  />;
}
