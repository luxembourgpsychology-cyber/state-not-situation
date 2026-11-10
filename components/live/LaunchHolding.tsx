"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "./client";

export default function LaunchHolding({ ended }: { ended: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (ended) return;
    const timer = setInterval(() => router.refresh(), 15000);
    const wake = () => { if (document.visibilityState === "visible") router.refresh(); };
    document.addEventListener("visibilitychange", wake);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", wake); };
  }, [ended, router]);

  return <main className="live-app"><Brand /><div className="live-container live-host-home">
    <p className="live-label">State. Not Situation. · Book launch</p>
    <h1>{ended ? "Thank you for joining us." : "Four small moments."}</h1>
    {ended ? <p>This event has finished. Thank you for being part of the evening.</p> : <>
      <p>Join in, watch, or pass. There is no score.</p>
      <p style={{ marginTop: 24 }}>The room opens on <strong>3 December 2026 at 18:00 Luxembourg time.</strong></p>
      <p className="live-caption" style={{ marginTop: 16 }}>You have the right link. Keep this page open. It will update when the room opens.</p>
    </>}
  </div><footer className="live-footer"><span>State. Not Situation.</span><span>Ivana Budišin</span></footer></main>;
}
