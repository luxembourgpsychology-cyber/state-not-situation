import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const colour = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;
const RAIL = ["var(--time)", "var(--attention)", "var(--safety)"];

/**
 * Page 11, directly after page 10 says "This book is the Investigation.":
 * the printed eyebrow, "The Investigation", the sixteen chapters with their
 * page numbers, and the two devices the page prints beside them, the three
 * colour keys above the list and the rail in thirds down its left edge, both
 * drawn in CSS in the book's inks. The list runs down the left column and
 * then the right, as printed, with no rules.
 */
export function Investigation({ content }: { content: SiteContent["map"] }) {
  return (
    <section id="investigation" className="bg-paper border-t border-[var(--rule)]" aria-labelledby="map-title">
      <div className="container-book py-[var(--section)]">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
          <div className="md:col-span-3">
            <Reveal>
              <h2 id="map-title" className="eyebrow eyebrow-red">{content.eyebrow}</h2>
              <p className="mono-label mt-3">11</p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h3 className="serif-title text-[clamp(2.4rem,9vw,4.4rem)]">{content.investigationTitle}</h3>
              <p className="din-head mt-4 text-[0.78rem] tracking-[0.12em] leading-[1.6] max-w-md text-ink">{content.mapLine}</p>
            </Reveal>
            <Reveal delay={80}>
              {/* The three colour keys the page prints above its list */}
              <ul className="map-keys mt-10" aria-hidden="true">
                {content.loops.map((loop) => (
                  <li key={loop.key}>
                    <span className="map-keys__rule" style={{ background: colour[loop.key] }} />
                    <span className="din-head text-[0.68rem] tracking-[0.22em]" style={{ color: colour[loop.key] }}>{loop.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-5 sm:gap-8">
                {/* The rail down the page's left edge: three rectangles, Time, Attention, Safety */}
                <div className="map-rail" aria-hidden="true">
                  {RAIL.map((c) => <span key={c} style={{ background: c }} />)}
                </div>
                {/* As printed: 00 to 07 down the left column, 08 to 15 down the right, no rules. */}
                <ol className="flex-1 min-w-0 grid sm:grid-cols-2 sm:grid-flow-col sm:grid-rows-8 gap-x-16">
                  {content.chapters.map((ch) => (
                    <li key={ch.number} className="flex items-baseline gap-4 py-3">
                      <span className="font-mono text-[0.78rem] text-red w-6 shrink-0">{ch.number}</span>
                      <span className="din-head text-[0.74rem] tracking-[0.09em] leading-[1.5] flex-1">{ch.title}</span>
                      <span className="font-mono text-[0.72rem] text-quiet shrink-0">{ch.page}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
