import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/** Dot colours in the printed order: Time, Safety, Safety, Attention, Time. */
const dot = ["var(--time)", "var(--safety)", "var(--safety)", "var(--attention)", "var(--time)"];

/**
 * Page 10, set as the display page it is in the book: the printed heading,
 * two short lines, "This book is the Investigation.", the five timestamped
 * readings down a thin rule with a coloured dot each, and the two closing
 * lines. Every word is the page's own.
 *
 * On a phone it is one column, set larger than the book prints it, which is
 * a promotion, not a reproduction. From 1024 px the statement takes the left
 * seven columns and the five readings sit beside it as a panel, so the whole
 * page is seen at once, as it is on paper.
 */
export function Misreading({ content, regionLabel }: { content: SiteContent["misreading"]; regionLabel: string }) {
  return (
    <section id="misreading" className="bg-page border-y border-[var(--rule)]" aria-label={regionLabel}>
      <div className="container-book pt-[var(--section)] pb-[calc(var(--section)*0.7)]">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="max-w-[46rem] lg:col-span-7 lg:max-w-none">
            <Reveal>
              <p className="eyebrow eyebrow-red">{content.eyebrow}</p>
              <p className="mono-label mt-3">10</p>
              <div className="border-t border-[var(--rule)] mt-4 mb-8" />
              <h2 className="serif-title text-[clamp(2.5rem,11.5vw,5.6rem)]">{content.lines[0]}</h2>
              <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.5] text-ink">
                {content.lines[1]}
                <br />
                {content.lines[2]}
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-8 md:mt-14">
              <p className="eyebrow text-ink">{content.investigationLabel}</p>
              <p className="serif-title text-red text-[clamp(2.6rem,12vw,6rem)] mt-1">{content.investigation}</p>
            </Reveal>
          </div>

          {/* The five readings, page 10's own dashboard */}
          <div className="lg:col-span-5 lg:pt-[3.6rem]">
            <Reveal delay={120} className="mt-8 lg:mt-0">
              <p className="mono-label mb-5">{content.readingsLabel}</p>
              <ol className="relative border-l border-[var(--rule)] ml-[6px] pl-7 space-y-5">
                {content.readings.map((r, i) => (
                  <li key={r.time} className="relative grid grid-cols-[3.4rem_1fr] gap-x-4 items-baseline">
                    <span
                      className="absolute -left-[calc(1.75rem+6px)] top-[0.4em] w-[11px] h-[11px] rounded-full"
                      style={{ background: dot[i % dot.length] }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[0.8rem] text-ink-soft">{r.time}</span>
                    <span className="text-[1.05rem] md:text-[1.15rem] lg:text-[1.25rem] leading-snug">{r.text}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160} className="mt-8 md:mt-12 pt-6 border-t border-[var(--rule)]">
          <p className="eyebrow text-ink">{content.closing[0]}</p>
          <p className="eyebrow eyebrow-red mt-2">{content.closing[1]}</p>
        </Reveal>
      </div>
    </section>
  );
}
