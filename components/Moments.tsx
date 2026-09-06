import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * Three of the book's printed CASE EVIDENCE pages, reproduced label for label
 * and given room. No box: the printed page prints none, and gives each of
 * these a whole leaf. The short coloured rule under each label is printed,
 * read per page from the print file.
 */
const RULE: Record<string, string> = {
  "00": "var(--time)",
  "02": "var(--time)",
  "11": "var(--safety)",
  "13": "var(--safety)",
};

export function Moments({ content }: { content: SiteContent["moments"] }) {
  return (
    <section id="moments" className="section" aria-labelledby="moments-title">
      <div className="container-book">
        <Reveal>
          <h2 id="moments-title" className="t-head">{content.line}</h2>
        </Reveal>

        <ul className="mt-[var(--space-section)] space-y-[var(--space-section)]">
          {content.items.map((c, i) => (
            <li key={c.chapter}>
              <Reveal delay={i * 60} className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-tight)]">
                <div className="md:col-span-3">
                  <p className="t-mono">{content.label} / {c.chapter}</p>
                  <p className="t-mono">{content.pageLabel} {c.page}</p>
                  {RULE[c.chapter] ? (
                    <span className="moment__rule" style={{ background: RULE[c.chapter] }} aria-hidden="true" />
                  ) : null}
                </div>
                <div className="md:col-span-8">
                  <p className="t-display">{c.time}</p>
                  <p className="t-lead mt-[var(--space-tight)]">{c.quote}</p>
                  <dl className="mt-[var(--space-block)] grid gap-[var(--space-tight)] sm:grid-cols-2 sm:gap-x-10">
                    <div>
                      <dt className="t-mono" style={{ color: "var(--time)" }}>{c.inputLabel}</dt>
                      <dd className="t-body mt-1">{c.input}</dd>
                    </div>
                    <div>
                      <dt className="t-mono" style={{ color: "var(--red)" }}>{c.verifiedLabel}</dt>
                      <dd className="t-body mt-1">{c.verified}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120} className="mt-[var(--space-section)] grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-3">
            <p className="t-mono">{content.closingSource}</p>
          </div>
          <div className="md:col-span-8">
            <p className="t-head">{content.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
