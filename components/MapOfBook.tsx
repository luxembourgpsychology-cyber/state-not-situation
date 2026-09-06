import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";
import { EvidencePulse } from "./EvidencePulse";

const colour = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;

/**
 * One reference block, in the order the book presents these things: the three
 * systems introduced by the page 20 paragraph and the front-matter definitions,
 * the evidence note from page 13 with the printed HIGH / MEDIUM / LOW pulses,
 * and the map of sixteen chapters from page 11, closed by page 226 on the
 * Scientific Heartbeat. This is the section for the reader who wants the
 * structure: the psychologist, the academic, the editor.
 */
export function MapOfBook({ content, regionLabel }: { content: SiteContent["map"]; regionLabel: string }) {
  return (
    <section id="map" className="bg-paper border-t border-[var(--rule)]" aria-label={regionLabel}>
      <div className="container-book py-[var(--section)]">
        {/* The three systems */}
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-red mb-4">{content.eyebrow}</p>
              <p className="prose-book text-ink">{content.systemsIntro}</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={80}>
              <p className="prose-book text-ink-soft">{content.sortingTool}</p>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {content.loops.map((loop, i) => (
                <Reveal key={loop.key} delay={100 + i * 70}>
                  <div className="flex gap-4 h-full">
                    <span className="w-[5px] shrink-0 rounded-[1px]" style={{ background: colour[loop.key] }} aria-hidden="true" />
                    <div>
                      <h3 className="din-head text-[0.76rem] tracking-[0.2em]" style={{ color: colour[loop.key] }}>{loop.name}</h3>
                      <p className="mt-3 text-[0.98rem] leading-[1.6]">{loop.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Before we begin: the evidence note and the printed markers */}
        <div className="grid md:grid-cols-12 gap-10 mt-[var(--section)] pt-[var(--section)] border-t border-[var(--rule)]">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-red mb-4">{content.evidenceEyebrow}</p>
              <p className="mono-label">13</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={80}>
              <div className="prose-book">
                <p>{content.evidenceIntro}</p>
                <p>{content.evidenceMarkers}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-10 grid grid-cols-3 gap-6 border-t border-b border-[var(--rule)] py-8" aria-label={content.evidenceEyebrow}>
                {content.grades.map((g) => (
                  <li key={g.key} className="flex flex-col items-start gap-3">
                    <EvidencePulse grade={g.key} className="w-full max-w-[9rem] h-auto" />
                    <p className="din-head text-[0.7rem] tracking-[0.28em]" style={{ color: `var(--grade-${g.key})` }}>{g.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* The Investigation: the sixteen chapters, page 11. The markers above
            already close on a rule, so this block takes a shorter run-in than
            the others; two full section gaps between two rules read as a hole
            on a phone. */}
        <div className="mt-[calc(var(--section)*0.55)] pt-[calc(var(--section)*0.55)] border-t border-[var(--rule)]">
          <Reveal>
            <h2 className="serif-title text-[clamp(2rem,4.5vw,3.2rem)]">{content.investigationTitle}</h2>
            <p className="din-head mt-4 text-[0.78rem] tracking-[0.12em] leading-[1.6] max-w-md text-ink">{content.mapLine}</p>
          </Reveal>
          <Reveal delay={80}>
            <ol className="mt-10 grid sm:grid-cols-2 gap-x-12 border-t border-[var(--rule)]">
              {content.chapters.map((ch) => (
                <li key={ch.number} className="flex items-baseline gap-4 py-3.5 border-b border-[var(--rule)]">
                  <span className="font-mono text-[0.78rem] text-red w-6 shrink-0">{ch.number}</span>
                  <span className="din-head text-[0.74rem] tracking-[0.09em] leading-[1.5] flex-1">{ch.title}</span>
                  <span className="font-mono text-[0.72rem] text-quiet shrink-0">{ch.page}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120} className="mt-10 md:mt-12 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="mono-label">{content.mapFooter}</p>
              <p className="mono-label mt-2">{content.heartbeatSource}</p>
            </div>
            <div className="md:col-span-8 md:col-start-5 border-l-[1.5px] border-red pl-6 md:pl-8">
              <div className="prose-book">
                {content.heartbeat.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
