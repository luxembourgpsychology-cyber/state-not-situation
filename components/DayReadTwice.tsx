"use client";
import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";

const loopColor = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;

/**
 * THE SIGNATURE INTERACTION.
 * Katrin's morning from Chapter Zero, laid out the way the cover is printed:
 * the first reading in serif italic, struck through as the visitor arrives at
 * it, and the instrument reading appearing beside it in red mono. The margin
 * bar fills with the colour of the loop that was running, like the state line
 * printed beside every chapter opener.
 */
export function DayReadTwice({ content, regionLabel }: { content: SiteContent["day"]; regionLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".day-row"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { rows.forEach((r) => r.classList.add("is-read")); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).classList.add("is-read"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -25% 0px", threshold: 0.25 });
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="day" className="bg-paper" aria-label={regionLabel}>
      <div className="container-book py-[var(--section)]">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-quiet mb-4">{content.eyebrow}</p>
          <h2 className="serif-title text-[clamp(2.4rem,6vw,4.5rem)]">{content.title}</h2>
          <p className="prose-book mt-6 text-ink-soft">{content.intro}</p>
        </div>

        <div ref={ref} className="mt-14 md:mt-20 grid grid-cols-[1.25rem_1fr] sm:grid-cols-[2.5rem_1fr] gap-x-5 sm:gap-x-8">
          {/* Column headings, set like the CASE EVIDENCE labels */}
          <div className="hidden md:grid md:col-start-2 md:grid-cols-2 gap-8 mb-6">
            <p className="mono-label">{content.columnFirst}</p>
            <p className="mono-label">{content.columnState}</p>
          </div>

          {content.rows.map((row) => (
            <div key={row.time} className="day-row contents">
              <div className="relative">
                <span className="loop-seg absolute inset-0 w-[3px] sm:w-[4px] left-0" style={{ background: loopColor[row.loop] }} aria-hidden="true" />
              </div>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 py-8 md:py-10 border-t border-[var(--rule)]">
                <div>
                  <p className="font-mono text-sm tracking-[0.02em] mb-3">
                    <span className="text-ink">{row.time}</span>
                    <span className="sr-only"> {content.loopLabels[row.loop]}</span>
                  </p>
                  <p className="first-reading"><span className="strike">{row.firstReading}</span></p>
                </div>
                <ul className="md:pt-9 space-y-2" aria-label={content.columnState}>
                  {row.state.map((s, j) => (
                    <li key={j} className="state-line" style={{ "--i": j } as React.CSSProperties}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div aria-hidden="true" />
          <div className="border-t border-[var(--rule)] pt-10 md:pt-14">
            <p className="serif-title text-[clamp(1.6rem,3.6vw,2.6rem)] max-w-3xl">
              {content.closing[0]}<br /><span className="text-red">{content.closing[1]}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
