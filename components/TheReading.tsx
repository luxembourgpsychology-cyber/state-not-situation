"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";

/**
 * Page 13. The book stops and asks the reader to take a reading before it
 * explains anything. The site asks in the same words, one instruction at a
 * time, and ends where the book ends: with the question. The three checks
 * are body prose in the book; the site sets them as display type, which is a
 * promotion, not a reproduction.
 *
 * Each check brightens as it reaches the screen. Nothing is hidden from
 * assistive technology or from a visitor with reduced motion: the text is
 * in the DOM at full contrast, only the dimming is decorative.
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
      // Brighten as soon as a check is well inside the viewport, so a thumb
      // moving at speed never sees three ghosted lines.
      { rootMargin: "-10% 0px -15% 0px", threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section id="reading" className="bg-paper border-t border-[var(--rule)]" aria-labelledby="reading-title">
      <div className="container-book py-[var(--section)]" ref={root}>
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
          <div className="md:col-span-3">
            <h2 id="reading-title" className="eyebrow eyebrow-red">{content.eyebrow}</h2>
            <p className="mono-label mt-3">13</p>
          </div>
          <div className="md:col-span-9">
            <p className="serif-title text-[clamp(1.4rem,5.5vw,2.1rem)] text-quiet max-w-2xl">{content.lead}</p>
            <ol className="reading-list mt-8 md:mt-12 space-y-7 md:space-y-10">
              {content.steps.map((step, i) => (
                <li key={i} className="reading-step">
                  <span className="reading-step__num">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-[var(--rule)]" />

        <div className="grid md:grid-cols-12 gap-x-8">
          <div className="md:col-span-7 md:col-start-4 pt-8 md:pt-10">
            <p className="serif-title text-[clamp(1.85rem,7vw,2.8rem)] text-red">{content.result}</p>
            <p className="prose-book mt-5">{content.afterResult}</p>
            <p className="serif-title text-[clamp(2rem,9vw,3.6rem)] mt-10">{content.question}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
