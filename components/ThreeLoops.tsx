import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const colour = {
  time: "var(--time)",
  attention: "var(--attention)",
  safety: "var(--safety)",
} as const;

/**
 * The state line. Three systems, in the book's own words, coloured as they are
 * printed in the margin of every chapter opener.
 *
 * The layout is a stack on a phone and three columns from md up. Nothing is
 * measured in fixed English word lengths, so a longer French or German
 * definition simply makes the column taller.
 */
export function ThreeLoops({ content }: { content: SiteContent["loops"] }) {
  return (
    <section id="loops" className="bg-paper" aria-labelledby="loops-title">
      <div className="container-book py-[var(--section)]">
        <Reveal>
          <p className="eyebrow eyebrow-red mb-3">{content.eyebrow}</p>
          <div className="border-t border-red max-w-xl mb-8" />
          <h2 id="loops-title" className="serif-title text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
            {content.title}
          </h2>
          <p className="prose-book mt-8 text-ink-soft">{content.intro}</p>
        </Reveal>

        <div className="mt-14 md:mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
          {content.items.map((loop, i) => (
            <Reveal key={loop.key} delay={i * 90}>
              <article className="h-full flex flex-col">
                <div className="flex items-stretch gap-5 h-full">
                  {/* The loop bar, as printed beside the chapter openers */}
                  <span
                    className="w-[5px] shrink-0 rounded-[1px]"
                    style={{ background: colour[loop.key] }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="din-head text-[0.78rem] tracking-[0.2em]" style={{ color: colour[loop.key] }}>
                      {loop.name}
                    </h3>
                    <p className="mono-label mt-3 normal-case tracking-[0.03em] text-ink-soft text-[0.8rem]">
                      {loop.legend}
                    </p>
                    <p className="mt-5 text-[1.02rem] leading-[1.6] text-ink">{loop.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
