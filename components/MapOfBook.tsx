import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const colour = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;
const RAIL = ["var(--time)", "var(--attention)", "var(--safety)"];

/**
 * One reference block, for the reader who wants the structure: the page 13
 * sentence on the three systems and their definitions from pages 13 to 14,
 * then page 11, the map of sixteen chapters with the two devices that page
 * prints, the three colour keys above the list and the rail in thirds down
 * its left edge, closed by page 226 on the Scientific Heartbeat. The page 13
 * markers have their own section higher up the page.
 */
export function MapOfBook({ content }: { content: SiteContent["map"]; regionLabel?: string }) {
  return (
    <section id="map" className="bg-paper border-t border-[var(--rule)]" aria-labelledby="map-title">
      <div className="container-book py-[var(--section)]">
        {/* The three systems, pages 13 to 14 */}
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <h2 id="map-title" className="eyebrow eyebrow-red">{content.eyebrow}</h2>
              <p className="mono-label mt-3">11</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={80}>
              <p className="prose-book text-ink">{content.sortingTool}</p>
              <p className="mono-label mt-3">13</p>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {content.loops.map((loop, i) => (
                <Reveal key={loop.key} delay={100 + i * 70}>
                  <div className="flex gap-4 h-full">
                    <span className="w-[6px] shrink-0 rounded-[1px]" style={{ background: colour[loop.key] }} aria-hidden="true" />
                    <div>
                      <p className="din-head text-[0.76rem] tracking-[0.2em]" style={{ color: colour[loop.key] }}>{loop.name}</p>
                      <p className="mt-3 text-[0.98rem] leading-[1.6]">{loop.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* The Investigation: page 11 */}
        <div className="mt-[calc(var(--section)*0.7)] pt-[calc(var(--section)*0.7)] border-t border-[var(--rule)]">
          <Reveal>
            <h3 className="serif-title text-[clamp(2rem,4.5vw,3.2rem)]">{content.investigationTitle}</h3>
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
