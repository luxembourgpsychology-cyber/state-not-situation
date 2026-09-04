"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";

/**
 * Page 13. The book stops and asks the reader to take a reading before it
 * explains anything. The site asks in the same words, one instruction at a
 * time, and ends where the book ends: with the question.
 *
 * Each line brightens as it reaches the middle of the screen. Nothing is
 * hidden from assistive technology or from a visitor with reduced motion:
 * the text is in the DOM at full contrast, only the dimming is decorative.
 */
export function TheReading({ content }: { content: SiteContent["reading"] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = el.querySelector<HTMLElement>(".reading-list");
    const steps = Array.from(el.querySelectorAll<HTMLElement>(".reading-step"));
    if (!list || !("IntersectionObserver" in window)) return;
    // Only dim once we know we can undim: without scripting every line stays
    // at full contrast.
    list.classList.add("is-dimmed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-on");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section id="reading" className="bg-page border-y border-[var(--rule)]">
      <div className="container-book py-[var(--section)]" ref={root}>
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="eyebrow eyebrow-red">{content.eyebrow}</p>
            <p className="mono-label mt-3">13</p>
          </div>

          <div className="md:col-span-9">
            <p className="serif-title text-[clamp(1.4rem,3vw,2rem)] text-quiet max-w-2xl">{content.lead}</p>

            <ol className="reading-list mt-10 md:mt-14 space-y-8 md:space-y-10">
              {content.steps.map((step, i) => (
                <li key={i} className="reading-step">
                  <span className="reading-step__num">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-14 md:mt-20 pt-10 border-t border-[var(--rule)] max-w-2xl">
              <p className="serif-title text-[clamp(1.6rem,3.6vw,2.4rem)] text-red">{content.result}</p>
              <p className="prose-book mt-6 text-ink-soft">{content.afterResult}</p>
              <p className="serif-title text-[clamp(1.8rem,4.4vw,3rem)] mt-10">{content.question}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
