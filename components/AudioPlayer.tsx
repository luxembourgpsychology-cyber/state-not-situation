"use client";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import { PulseMark } from "./PulseMark";
import { track } from "@/lib/analytics";

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/**
 * A restrained player in the book's own materials: a mono time signature, a
 * single red rule for progress, and the pulse mark tracing itself while the
 * author reads. Set editions.<lang>.audioUrl in site.config.ts to activate.
 */
export function AudioPlayer({ src, fallback, content, locale }: { src: string | null; fallback?: string | null; content: SiteContent["listen"]; locale: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime); a.addEventListener("loadedmetadata", onMeta); a.addEventListener("durationchange", onMeta); a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("loadedmetadata", onMeta); a.removeEventListener("durationchange", onMeta); a.removeEventListener("ended", onEnd); };
  }, [src]);

  const toggle = async () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) { await a.play(); setPlaying(true); if (!counted.current) { counted.current = true; track("audio_play", { locale }); } }
    else { a.pause(); setPlaying(false); }
  };
  const seek = (v: number) => { const a = audio.current; if (a && dur) { a.currentTime = v; setTime(v); } };
  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={toggle}
          disabled={!src}
          aria-pressed={playing}
          aria-label={playing ? content.pause : content.play}
          className="shrink-0 w-14 h-14 rounded-full border-[1.5px] border-ink grid place-items-center text-ink hover:bg-ink hover:text-paper transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink disabled:cursor-default"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="1" width="4" height="14" fill="currentColor" /><rect x="10" y="1" width="4" height="14" fill="currentColor" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1.5v13L14 8z" fill="currentColor" /></svg>
          )}
        </button>
        <PulseMark className="w-28 sm:w-40 h-auto" playing={playing} />
        <div className="ml-auto font-mono text-sm tabular-nums text-ink">
          <span aria-label={content.elapsed}>{fmt(time)}</span>
          <span className="text-quiet"> / </span>
          <span aria-label={content.duration}>{src ? fmt(dur) : "–:––"}</span>
        </div>
      </div>

      {/* 44px tall so the scrubber is a real target; the rule sits centred in it. */}
      <div className="relative mt-6 h-11">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--rule-strong)]" aria-hidden="true" />
        <div className="absolute top-1/2 left-0 h-[2px] -mt-px bg-red" style={{ width: `${pct}%` }} aria-hidden="true" />
        <input
          type="range" min={0} max={dur || 0} step={0.1} value={time}
          onChange={(e) => seek(Number(e.target.value))}
          disabled={!src}
          aria-label={content.progress} aria-valuetext={`${fmt(time)} / ${fmt(dur)}`}
          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-default"
        />
      </div>

      {src ? (
        /* Nothing is fetched until the reader presses play. */
        <audio ref={audio} preload="none">
          <source src={src} type={src.endsWith(".m4a") ? "audio/mp4" : "audio/mpeg"} />
          {fallback ? <source src={fallback} type="audio/mpeg" /> : null}
        </audio>
      ) : (
        <p className="mt-4 t-mono">{content.unavailable}</p>
      )}
    </div>
  );
}
