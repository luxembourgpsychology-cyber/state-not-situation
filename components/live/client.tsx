"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { GuestState as EngineGuestState, HostState as EngineHostState, RoomSummary as EngineRoomSummary, Step as EngineStep, Interest as EngineInterest } from "@/lib/live/types";

export const interests = ["More interested", "About the same", "Less interested", "Not sure"] as const;
export type Interest = EngineInterest;
export const confidences = ["Not sure", "Somewhat sure", "Very sure"] as const;
export type Step = EngineStep;
export type Room = EngineRoomSummary;
export type GuestState = EngineGuestState;
export type HostState = Omit<EngineHostState, "joinPath"> & { joinPath: string };
export type RoomSummary = Pick<EngineRoomSummary, "code" | "mode" | "step">;

export const stepNames: Record<Step, string> = {
  lobby: "Welcome", compose: "Write a message", interpret: "Read your message", reply: "Write a reply", reply_delivered: "Read your reply", context: "A different tomorrow", room: "Hear from Ivana", ready_reveal: "Ready for the reveal", reveal_message: "The message", reveal_pause: "The wait", reveal_context: "The context", reveal_room: "The room", finished: "Thank you",
};
export const nextNames: Partial<Record<Step, string>> = {
  lobby: "Start Moment 01", compose: "Show the messages", interpret: "Open the reply", reply: "Deliver the replies", reply_delivered: "Open Moment 03", context: "Open Moment 04", room: "Finish the moments", reveal_message: "Show the wait", reveal_pause: "Show the contexts", reveal_context: "Show the room", reveal_room: "Finish the session",
};

export function requestId() { return crypto.randomUUID(); }

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export async function api<T>(url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    method: body === undefined ? "GET" : "POST", credentials: "same-origin", cache: "no-store", signal,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(typeof data?.message === "string" ? data.message : typeof data?.error === "string" ? data.error : "We could not complete that. Please try again.", response.status);
  return data as T;
}

export function usePolling<T>(url: string | null, interval = 1500) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | Error | null>(null);
  const [loading, setLoading] = useState(Boolean(url));
  const generation = useRef(0);
  const refresh = useCallback(async () => {
    if (!url) return;
    const current = generation.current;
    try {
      const result = await api<T>(url);
      if (current === generation.current) { setData(result); setError(null); setLoading(false); }
    } catch (err) {
      if (current === generation.current) { setError(err instanceof Error ? err : new Error("Connection lost.")); setLoading(false); }
    }
  }, [url]);
  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    generation.current += 1;
    const controller = new AbortController();
    async function poll() {
      if (!url || cancelled) return;
      try {
        const result = await api<T>(url, undefined, controller.signal);
        if (!cancelled) { setData(result); setError(null); setLoading(false); }
      } catch (err) {
        if (!cancelled) { setError(err instanceof Error ? err : new Error("Connection lost.")); setLoading(false); }
      }
      if (!cancelled) timeout = setTimeout(poll, interval);
    }
    void poll();
    const wake = () => { if (document.visibilityState === "visible") void refresh(); };
    document.addEventListener("visibilitychange", wake);
    return () => { cancelled = true; controller.abort(); clearTimeout(timeout); document.removeEventListener("visibilitychange", wake); };
  }, [url, interval, refresh]);
  return { data, setData, error, loading, refresh };
}

export function Brand({ mode, code }: { mode?: string; code?: string }) {
  return <header className="live-header">
    <Link className="live-wordmark" href="/en" aria-label="State. Not Situation. book website">STATE.<span>NOT SITUATION.</span></Link>
    <div className="live-header-meta"><span>Book event moments</span>{code && <span>Room {code}</span>}{mode === "rehearsal" && <strong className="live-rehearsal">Test room</strong>}</div>
  </header>;
}

export function Progress({ step }: { step: Step }) {
  const active = step === "lobby" ? 0 : ["compose", "interpret"].includes(step) ? 1 : ["reply", "reply_delivered"].includes(step) ? 2 : step === "context" ? 3 : ["room", "ready_reveal"].includes(step) ? 4 : 5;
  return <nav className="live-progress" aria-label="Session progress">{["The message", "The wait", "Tomorrow", "The room"].map((name, i) => <span key={name} className={active === i + 1 ? "is-current" : active > i + 1 ? "is-done" : ""} aria-current={active === i + 1 ? "step" : undefined}><b>0{i + 1}</b><span>{name}</span></span>)}<span className={active === 5 ? "is-current" : ""} aria-current={active === 5 ? "step" : undefined}><b>R</b><span>The reveal</span></span></nav>;
}

export function Waiting({ title = "You’re ready.", children }: { title?: string; children?: React.ReactNode }) {
  return <div className="live-waiting"><span className="live-waiting-rule" aria-hidden="true" /><h1>{title}</h1><div className="live-waiting-copy">{children || "Ivana will open the next step. Keep this page open."}</div></div>;
}

export function Typing({ active, label = "Your partner is typing" }: { active?: boolean; label?: string }) {
  if (!active) return <p className="live-caption live-typing-idle">Replies will appear when Ivana opens the next step.</p>;
  return <div className="live-typing" role="status" aria-live="polite"><span className="live-typing-bubble" aria-hidden="true"><i /><i /><i /></span><span>{label}</span></div>;
}

export function Message({ label, text }: { label: string; text?: string }) {
  return <div className="live-message"><span className="live-label">{label}</span><p>{text || "No answer was saved."}</p></div>;
}

export function Saved() { return <p className="live-saved" role="status"><span aria-hidden="true">✓</span> Saved. We’ll come back to this at the reveal.</p>; }

export function CountResults({ forecast, counts, forecastLabel = "Ivana’s guess", countsLabel = "The room" }: { forecast?: Record<Interest, number>; counts?: Record<Interest, number>; forecastLabel?: string; countsLabel?: string }) {
  return <div className="live-results"><div className="live-result-head"><span>Response</span><span>{forecastLabel}</span><span>{countsLabel}</span></div>{interests.map(interest => <div className="live-result-row" key={interest}><span>{interest}</span><strong>{forecast?.[interest] ?? "Not saved"}</strong><strong>{counts?.[interest] ?? 0}</strong></div>)}</div>;
}
