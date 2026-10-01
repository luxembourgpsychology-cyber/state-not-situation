"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { SceneCopy } from "@/content/extension-types";
import { track } from "@/lib/analytics";
import { ScopeNote } from "./ScopeNote";
import { DayLine } from "./DayLine";

const noop = () => () => {};

type Labels = {
  listLabel: string;
  sceneLabel: string;
  stepIn: string;
  close: string;
  back: string;
  chosen: string;
  dayLabel: string;
  morningTime: string;
  morningHint: string;
  boundary: string;
};

/** Where each time sits under the day line, as a share of its width. */
const STATION_LEFT: Record<string, string> = { message: "11.5%", starting: "34%", evening: "63.5%", morning: "88%" };

/**
 * THE THREE MOMENTS, as one day. The day line first (DayLine.tsx), so the eye
 * has something to land on; then each moment as a big mono time and one big
 * sentence — page 4's timestamp, at DISPLAY — opening in place. The morning
 * is shown as a time and a question mark: it is the evening's turn.
 *
 * Built on <details>, so with no script every scene and every reveal can
 * still be opened and read; the server sends all of it. With the script:
 * one scene open at a time, ?scene= follows it (allow-listed; anything else
 * is the list), Back and Forward move between scenes, and "Back to the three
 * moments" closes the scene and returns focus to the button that opened it.
 *
 * Opening a scene leaves focus on its own button, which the scene follows
 * directly: the native disclosure pattern, so nothing jumps.
 *
 * The two readings in the message scene lead to the same reveal. Which one a
 * visitor chose is held in this component only — never stored, never sent.
 */
export function SceneList({
  scenes,
  labels,
  ending,
  teamsLink,
  locale,
}: {
  scenes: SceneCopy[];
  labels: Labels;
  /** The book actions, rendered by the server, shown at the end of every reveal. */
  ending: ReactNode;
  /** The one quiet extra link for the scene with an organiser angle; null when Invite is off. */
  teamsLink: ReactNode;
  locale: string;
}) {
  const ids = scenes.map((s) => s.id) as string[];
  const panels = useRef<Record<string, HTMLDetailsElement | null>>({});
  const reveals = useRef<Record<string, HTMLDetailsElement | null>>({});
  const triggers = useRef<Record<string, HTMLElement | null>>({});
  const completed = useRef<Set<string>>(new Set());
  // False on the server and in the first paint, true once the script runs:
  // the choice buttons only exist where they can work.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [chosen, setChosen] = useState<Record<string, number>>({});

  const sceneInUrl = () => {
    const v = new URLSearchParams(window.location.search).get("scene");
    return v && ids.includes(v) ? v : null;
  };
  const urlFor = (id: string | null) => {
    const u = new URL(window.location.href);
    if (id) u.searchParams.set("scene", id);
    else u.searchParams.delete("scene");
    return `${u.pathname}${u.search}${u.hash}`;
  };

  // Arriving with ?scene= opens that scene and brings it into view.
  useEffect(() => {
    const id = sceneInUrl();
    if (id && panels.current[id]) {
      panels.current[id]!.open = true;
      document.getElementById(`scene-${id}`)?.scrollIntoView({ block: "start" });
    }
    const onPop = () => {
      const target = sceneInUrl();
      for (const k of ids) if (panels.current[k]) panels.current[k]!.open = k === target;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggle = (id: string) => {
    const el = panels.current[id];
    if (!el) return;
    const current = sceneInUrl();
    if (el.open) {
      for (const k of ids) if (k !== id && panels.current[k]?.open) panels.current[k]!.open = false;
      if (current !== id) window.history.pushState({ scene: id }, "", urlFor(id));
      track("sample_opened", { scene: id, locale });
    } else if (current === id) {
      window.history.pushState({ scene: null }, "", urlFor(null));
    }
  };

  const onReveal = (id: string) => {
    if (reveals.current[id]?.open && !completed.current.has(id)) {
      completed.current.add(id);
      track("sample_completed", { scene: id, locale });
    }
  };

  const choose = (id: string, i: number) => {
    setChosen((c) => ({ ...c, [id]: i }));
    if (reveals.current[id]) reveals.current[id]!.open = true;
  };

  // From the day line or the morning row: open the moment and go to it.
  // The morning opens the evening scene with its turn already shown.
  const openScene = (id: string, reveal = false) => {
    const el = panels.current[id];
    if (!el) return;
    el.open = true;
    if (reveal && reveals.current[id]) reveals.current[id]!.open = true;
    document.getElementById(`scene-${id}`)?.scrollIntoView({ block: "start" });
    triggers.current[id]?.focus({ preventScroll: true });
  };

  const closeScene = (id: string) => {
    if (panels.current[id]) panels.current[id]!.open = false;
    triggers.current[id]?.focus();
  };

  return (
    <>
    {/* Said once, above all three: every scene below is invented. */}
    <p className="t-mono mb-6">{labels.sceneLabel}</p>
    <DayLine
      label={labels.dayLabel}
      onSelect={mounted ? openScene : undefined}
      stations={[
        ...scenes.map((s) => ({ time: s.time, target: s.id, title: s.title, left: STATION_LEFT[s.id] })),
        { time: labels.morningTime, target: "evening", title: labels.morningHint, left: STATION_LEFT.morning, quiet: true, reveal: true },
      ]}
    />
    <ol aria-label={labels.listLabel} className="mt-[var(--space-block)] border-t border-[var(--rule)]">
      {scenes.map((s) => (
        <li key={s.id} id={`scene-${s.id}`} className="py-[var(--space-block)] border-b border-[var(--rule)]">
          <div>
            <p className="ext-stamp">{s.time}</p>
            <div className="min-w-0">
              <h2 id={`scene-${s.id}-title`} className="t-display mt-3">{s.title}</h2>

              <details
                ref={(el) => { panels.current[s.id] = el; }}
                onToggle={() => onToggle(s.id)}
                className="mt-4"
              >
                <summary
                  ref={(el) => { triggers.current[s.id] = el; }}
                  className="btn btn-red"
                >
                  <span className="ext-closed">{labels.stepIn}</span>
                  <span className="ext-open">{labels.close}</span>
                  {/* Three buttons say the same word; this says which scene. */}
                  <span className="sr-only">: {s.title}</span>
                </summary>

                <div className="mt-[var(--space-block)]">
                  <p className="t-body">{s.scene}</p>
                  {s.prompt ? <p className="t-lead mt-[var(--space-block)]">{s.prompt}</p> : null}

                  {s.options.length ? (
                    mounted ? (
                      <ul className="mt-4 flex flex-col items-start gap-2">
                        {s.options.map((o, i) => (
                          <li key={o}>
                            <button
                              type="button"
                              className={`btn ${chosen[s.id] === i ? "btn-red" : ""}`}
                              aria-pressed={chosen[s.id] === i}
                              onClick={() => choose(s.id, i)}
                            >
                              {o}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="mt-4 t-body">
                        {s.options.map((o) => (
                          <li key={o} className="flex gap-3"><span aria-hidden="true" className="text-quiet">—</span><span>{o}</span></li>
                        ))}
                      </ul>
                    )
                  ) : null}

                  <details
                    ref={(el) => { reveals.current[s.id] = el; }}
                    onToggle={() => onReveal(s.id)}
                    className="mt-[var(--space-block)]"
                  >
                    <summary className="btn">{s.revealLabel}</summary>
                    <div className="mt-[var(--space-block)]" aria-live="polite">
                      {s.options.length && chosen[s.id] !== undefined ? (
                        <p className="t-mono mb-3">{labels.chosen}: {s.options[chosen[s.id]]}</p>
                      ) : null}
                      {s.revealTime ? <p className="ext-stamp mb-4">{s.revealTime}</p> : null}
                      <p className="t-lead">{s.reveal}</p>
                      <p className="t-body mt-[var(--space-tight)]">{s.question}</p>
                      <ScopeNote className="mt-[var(--space-block)]">{labels.boundary}</ScopeNote>
                      <div className="mt-[var(--space-block)]">{ending}</div>
                      {s.relatedOffer === "teams" && teamsLink ? <div className="mt-3">{teamsLink}</div> : null}
                    </div>
                  </details>

                  {mounted ? (
                    <p className="mt-[var(--space-block)]">
                      <button type="button" className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red" onClick={() => closeScene(s.id)}>
                        ← {labels.back}
                      </button>
                    </p>
                  ) : null}
                </div>
              </details>
            </div>
          </div>
        </li>
      ))}
      {/* The morning: a time and a question mark. The evening holds the answer. */}
      <li className="py-[var(--space-block)] border-b border-[var(--rule)]">
        <p className="ext-stamp text-quiet">{labels.morningTime}</p>
        <p className="t-display mt-3 text-quiet" aria-hidden="true">?</p>
        <p className="mt-3">
          <a
            href="#scene-evening"
            className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red"
            onClick={mounted ? (e) => { e.preventDefault(); openScene("evening", true); } : undefined}
          >
            {labels.morningHint}
          </a>
        </p>
      </li>
    </ol>
    </>
  );
}
