import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";
import { EvidencePulse } from "./EvidencePulse";

/**
 * The lower half of page 13, "Before We Begin": the note on how much evidence
 * the book's claims carry, both paragraphs open in plain text, then the three
 * confidence markers set as the row the book prints, HIGH / MEDIUM / LOW, each
 * in its own cell behind a hairline. The three are never stacked: their
 * meaning is comparative, and a near-flatline on its own reads as a broken
 * image.
 *
 * These are the page 13 markers. The back-matter section on page 226 has its
 * own name and is quoted in the map.
 */
export function BeforeWeBegin({ content, regionLabel }: { content: SiteContent["map"]; regionLabel: string }) {
  return (
    <section id="before-we-begin" className="bg-paper border-y border-[var(--rule)]" aria-label={regionLabel}>
      <div className="container-book py-[calc(var(--section)*0.8)]">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
          <div className="md:col-span-3">
            <Reveal>
              <h2 id="evidence-title" className="eyebrow eyebrow-red">{content.evidenceEyebrow}</h2>
              <p className="mono-label mt-3">13</p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={80}>
              <p className="text-[clamp(1.15rem,3.6vw,1.35rem)] leading-[1.5] text-ink max-w-[46ch]">{content.evidenceIntro}</p>
              <p className="prose-book mt-6 text-ink-soft">{content.evidenceMarkers}</p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120} className="mt-10 md:mt-14">
          <ul className="pulse-band">
            {content.grades.map((g) => (
              <li key={g.key} className="pulse-band__cell">
                <EvidencePulse grade={g.key} className="pulse-band__svg" />
                <p className="din-head text-[0.72rem] tracking-[0.28em] mt-3" style={{ color: g.key === "low" ? "var(--grade-low-ink)" : `var(--grade-${g.key})` }}>
                  {g.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
