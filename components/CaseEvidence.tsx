import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The CASE EVIDENCE pages, reproduced from the book. Every chapter opens on
 * one: the time, the sentence the day produced, what actually came in, and
 * what was afterwards verified. The distance between the quotation and the
 * verified line is the whole argument, so the page sets them apart and lets
 * the reader close the gap.
 *
 * Set as a card per case; two columns from md, three from lg.
 */
export function CaseEvidence({ content, regionLabel }: { content: SiteContent["cases"]; regionLabel: string }) {
  return (
    <section id="cases" className="bg-paper border-t border-[var(--rule)]" aria-labelledby="cases-title">
      <div className="container-book py-[var(--section)]">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow eyebrow-red mb-4">{content.eyebrow}</p>
            <h2 id="cases-title" className="serif-title text-[clamp(2rem,5vw,3.4rem)]">{content.title}</h2>
            <p className="prose-book mt-6 text-ink-soft">{content.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-12 md:mt-16 grid gap-px bg-[var(--rule)] border border-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3" aria-label={regionLabel}>
          {content.items.map((c, i) => (
            <li key={c.chapter}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <article className="case-card border-0">
                  <p className="mono-label">
                    {content.eyebrow} / {c.chapter}
                  </p>
                  <p className="case-card__time mt-5">{c.time}</p>
                  <p className="case-card__quote">{c.quote}</p>

                  <dl className="mt-6 sm:mt-auto pt-2 sm:pt-8 space-y-4">
                    <div>
                      <dt className="mono-label text-[0.68rem]" style={{ color: "var(--time)" }}>{c.inputLabel}</dt>
                      <dd className="mt-1 text-[0.98rem] leading-snug">{c.input}</dd>
                    </div>
                    <div>
                      <dt className="mono-label text-[0.68rem]" style={{ color: "var(--red)" }}>{c.verifiedLabel}</dt>
                      <dd className="mt-1 text-[0.98rem] leading-snug">{c.verified}</dd>
                    </div>
                  </dl>

                  <p className="mono-label mt-6 sm:mt-8 pt-4 border-t border-[var(--rule)] text-[0.68rem]">
                    {content.pageLabel} {c.page}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
