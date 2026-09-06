"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";

/**
 * Pages 12 to 13, which the book prints as one unbroken passage.
 *
 * Block A is page 12: one paragraph behind the page's only disclosure, the
 * recognition sentence set a step up from body, the quiet echo of page 10,
 * the printed section mark, and the paragraph that ends on "try something
 * right now". Block B is page 13: the book stops and asks the reader to take
 * a reading. The three checks are body prose in the book; the site sets them
 * as display type, which is a promotion, not a reproduction. The section
 * ends where the page ends: on the question.
 *
 * Each check brightens as it reaches the middle of the screen. Nothing is
 * hidden from assistive technology or from a visitor with reduced motion:
 * the text is in the DOM at full contrast, only the dimming is decorative.
 */
export function TheReading({ day, content }: { day: SiteContent["knowTheDay"]; content: SiteContent["reading"] }) {
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

  const runs = day.runs;

  return (
    <section id="reading" className="bg-page" aria-labelledby="day-title">
      <div className="container-book pt-[calc(var(--section)*0.55)] pb-[var(--section)]" ref={root}>
        {/* Block A — page 12 */}
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
          <div className="md:col-span-3">
            <h2 id="day-title" className="eyebrow eyebrow-red">{day.eyebrow}</h2>
            <p className="mono-label mt-3">12</p>
          </div>
          <div className="md:col-span-7">
            <details className="disclosure">
              <summary className="disclosure__summary eyebrow">{day.moreLabel}</summary>
              <div className="disclosure__body">
                <p className="prose-book mt-4">{runs[0]}</p>
              </div>
            </details>
            <p className="mt-8 text-[clamp(1.2rem,4.4vw,1.5rem)] leading-[1.45] text-ink max-w-[44ch]">{runs[1]}</p>
            <p className="prose-book mt-6 text-ink-soft">{runs[2]}</p>
            <p className="text-center text-red font-serif text-2xl my-8 select-none max-w-[62ch]" aria-hidden="true">§</p>
            <p className="prose-book">{runs[3]}</p>
          </div>
        </div>

        {/* Block B — page 13 */}
        <div className="mt-[calc(var(--section)*0.45)] grid md:grid-cols-12 gap-x-8 gap-y-6">
          <div className="md:col-span-3">
            <h3 className="eyebrow eyebrow-red">{content.eyebrow}</h3>
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
