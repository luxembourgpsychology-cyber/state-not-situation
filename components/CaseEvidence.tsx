import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The short rule each CASE EVIDENCE page prints under its label, read per
 * page from the print file (28 × 1.6 pt at (72, 467.4)): Time on the pages
 * for 00 and 02, Safety on the pages for 11 and 13. It is read, not derived:
 * chapter 12's page prints no rule at all.
 */
const RULE: Record<string, string> = {
  "00": "var(--time)",
  "02": "var(--time)",
  "11": "var(--safety)",
  "13": "var(--safety)",
};

/**
 * Four of the book's CASE EVIDENCE pages, reproduced: 00, 02, 11 and 13, the
 * chapters whose panels stand on their own. Seven chapters open on such a page
 * in the book; nine do not. No title and no introduction, because the count
 * belongs to the map, where the book prints it. The section closes on the
 * page 20 verdict on the first card.
 */
export function CaseEvidence({ content, regionLabel }: { content: SiteContent["cases"]; regionLabel: string }) {
  return (
    <section id="cases" className="bg-paper border-t border-[var(--rule)]" aria-label={regionLabel}>
      <div className="container-book pt-[calc(var(--section)*0.8)] pb-[calc(var(--section)*0.7)]">
        <Reveal>
          <p className="eyebrow eyebrow-red mb-8">{content.eyebrow}</p>
        </Reveal>
        <ul className="grid gap-px bg-[var(--rule)] border border-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((c, i) => (
            <li key={c.chapter}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <article className="case-card border-0">
                  <p className="mono-label">{content.eyebrow} / {c.chapter}</p>
                  {RULE[c.chapter] ? <span className="case-card__rule" style={{ background: RULE[c.chapter] }} aria-hidden="true" /> : null}
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
        <Reveal delay={120} className="mt-12 md:mt-16 max-w-3xl">
          <p className="serif-title text-[clamp(1.9rem,7vw,3.2rem)]">{content.closing}</p>
          <p className="mono-label mt-4">{content.closingSource}</p>
        </Reveal>
      </div>
    </section>
  );
}
