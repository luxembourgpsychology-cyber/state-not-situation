import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const dot = ["var(--time)", "var(--safety)", "var(--safety)", "var(--attention)", "var(--time)"];

/**
 * Page 10, set as the display page it is in the book: the printed heading,
 * three short lines, "This book is the Investigation.", the five timestamped
 * readings down a thin rule with a coloured dot each, and the two closing
 * lines. Every word is the page's own.
 */
export function Misreading({ content, regionLabel }: { content: SiteContent["misreading"]; regionLabel: string }) {
  return (
    <section id="misreading" className="bg-page border-y border-[var(--rule)]" aria-label={regionLabel}>
      <div className="container-book py-[var(--section)]">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow eyebrow-red">{content.eyebrow}</p>
            <div className="border-t border-[var(--rule)] mt-4 mb-8" />
            <h2 className="serif-title text-[clamp(2.4rem,7vw,4.6rem)]">
              {content.lines[0]}
            </h2>
            <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.5] text-ink">
              {content.lines[1]}
              <br />
              {content.lines[2]}
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-12 md:mt-16">
            <p className="eyebrow text-ink">{content.investigationLabel}</p>
            <p className="serif-title text-red text-[clamp(2.6rem,7.5vw,5rem)] mt-1">{content.investigation}</p>
          </Reveal>

          <Reveal delay={120} className="mt-12 md:mt-16">
            <p className="mono-label mb-5">{content.readingsLabel}</p>
            <ol className="relative border-l border-[var(--rule)] ml-[5px] pl-7 space-y-5">
              {content.readings.map((r, i) => (
                <li key={r.time} className="relative grid grid-cols-[3.4rem_1fr] gap-x-4 items-baseline">
                  <span
                    className="absolute -left-[calc(1.75rem+5px)] top-[0.45em] w-[9px] h-[9px] rounded-full"
                    style={{ background: dot[i % dot.length] }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[0.78rem] text-ink-soft">{r.time}</span>
                  <span className="text-[1rem] leading-snug">{r.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={160} className="mt-12 md:mt-16 pt-6 border-t border-[var(--rule)]">
            <p className="eyebrow text-ink">{content.closing[0]}</p>
            <p className="eyebrow eyebrow-red mt-2">{content.closing[1]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
