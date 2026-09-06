import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const colour = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;

/**
 * The reference block at the foot of the page, for the reader who wants the
 * structure: the page 13 sentence on the three systems and their definitions
 * from pages 13 to 14, coloured as the loop bar beside every chapter opener;
 * then page 226 on how the Scientific Heartbeat is built.
 */
export function ThreeSystems({ content, regionLabel }: { content: SiteContent["map"]; regionLabel: string }) {
  return (
    <section id="systems" className="bg-paper border-t border-[var(--rule)]" aria-label={regionLabel}>
      <div className="container-book py-[var(--section)]">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="mono-label">13</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={80}>
              <p className="prose-book text-ink">{content.sortingTool}</p>
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

        <Reveal delay={120} className="mt-[calc(var(--section)*0.6)] pt-[calc(var(--section)*0.6)] border-t border-[var(--rule)] grid md:grid-cols-12 gap-10">
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
    </section>
  );
}
