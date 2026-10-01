"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { SceneCopy } from "@/content/extension-types";
import { track } from "@/lib/analytics";
import { ScopeNote } from "./ScopeNote";

const noop = () => () => {};

type Labels = {
  listLabel: string;
  sceneLabel: string;
  stepIn: string;
  close: string;
  back: string;
  chosen: string;
  boundary: string;
};

/**
 * THE THREE MOMENTS. A list in the order and the register of page 4 — a time
 * in mono, a line at LEAD — where each moment opens in place.
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

  const closeScene = (id: string) => {
    if (panels.current[id]) panels.current[id]!.open = false;
    triggers.current[id]?.focus();
  };

  return (
    <ol aria-label={labels.listLabel} className="border-t border-[var(--rule)]">
      {scenes.map((s) => (
        <li key={s.id} id={`scene-${s.id}`} className="py-[var(--space-block)] border-b border-[var(--rule)]">
          <div className="sm:grid sm:grid-cols-[6rem_1fr] sm:gap-x-8">
            <p className="t-mono text-ink sm:pt-[0.55rem]">{s.time}</p>
            <div className="min-w-0">
              <h2 id={`scene-${s.id}-title`} className="t-lead mt-2 sm:mt-0">{s.title}</h2>
              <p className="t-body mt-2 text-ink-soft">{s.hook}</p>

              <details
                ref={(el) => { panels.current[s.id] = el; }}
                onToggle={() => onToggle(s.id)}
                className="mt-4"
              >
                <summary
                  ref={(el) => { triggers.current[s.id] = el; }}
                  className="btn btn-red"
                  aria-describedby={`scene-${s.id}-title`}
                >
                  <span className="ext-closed">{labels.stepIn}</span>
                  <span className="ext-open">{labels.close}</span>
                </summary>

                <div className="mt-[var(--space-block)]">
                  <p className="t-mono">{labels.sceneLabel} · {s.category}</p>
                  <p className="t-body mt-[var(--space-tight)]">{s.scene}</p>
                  <p className="t-lead mt-[var(--space-block)]">{s.prompt}</p>

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
                      {s.revealTime ? <p className="t-mono text-ink mb-3">{s.revealTime}</p> : null}
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
    </ol>
  );
}
