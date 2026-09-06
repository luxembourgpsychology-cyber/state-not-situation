import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";
import { EvidencePulse } from "./EvidencePulse";

/**
 * The book grades its own claims. The three markers printed on page 13, with
 * the author's own descriptions of what each one means, and the printed
 * sentence that says why they exist. Sober, and no count of anything.
 */
export function Evidence({ content }: { content: SiteContent["evidence"] }) {
  return (
    <section id="evidence" className="section" aria-labelledby="evidence-title">
      <div className="container-book">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal>
              <p className="t-mono">{content.folio}</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 id="evidence-title" className="t-head">{content.title}</h2>
            </Reveal>

            <Reveal delay={80} className="mt-[var(--space-block)]">
              <ul className="pulse-row">
                {content.grades.map((g) => (
                  <li key={g.key} className="pulse-row__cell">
                    <EvidencePulse grade={g.key} className="pulse-row__svg" />
                    <div>
                      <p
                        className="t-label"
                        style={{ color: g.key === "low" ? "var(--grade-low-ink)" : `var(--grade-${g.key})` }}
                      >
                        {g.label}
                      </p>
                      <p className="t-body mt-1">{g.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <p className="t-body mt-[var(--space-block)]">{content.closing}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
