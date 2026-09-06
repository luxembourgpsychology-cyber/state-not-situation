import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * Section 2, in two movements, and the only place the homepage explains the
 * book.
 *
 * One: the mechanism — page 181's line, page 10's three lines, and the four
 * sentences the back cover prints, which is the one passage on the object
 * written to make a stranger pick it up.
 *
 * Two: the reading — page 13, where the book stops and asks the reader to
 * check. Nothing here is dimmed and nothing waits for an observer: the three
 * checks are display type and they arrive on one screen.
 */
export function Premise({
  premise,
  reading,
}: {
  premise: SiteContent["premise"];
  reading: SiteContent["reading"];
}) {
  return (
    <section id="premise" className="section" aria-labelledby="premise-title">
      <div className="container-book">
        {/* Movement one — the mechanism */}
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal>
              <p className="t-label t-label-red">{premise.eyebrow}</p>
              <p className="t-mono mt-3">{premise.folio}</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 id="premise-title" className="t-display">{premise.sensorLine}</h2>
            </Reveal>
            <Reveal delay={80} className="mt-[var(--space-block)]">
              {premise.lines.map((line) => (
                <p key={line} className="t-lead">{line}</p>
              ))}
            </Reveal>
            <Reveal delay={120} className="mt-[var(--space-block)]">
              <div className="t-body">
                {premise.mechanism.map((t) => <p key={t}>{t}</p>)}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Movement two — the reading */}
        <div className="mt-[var(--space-section)] grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal>
              <h3 className="t-label t-label-red">{reading.eyebrow}</h3>
              <p className="t-mono mt-3">{reading.folio}</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="t-body">{reading.lead}</p>
            </Reveal>
            <Reveal delay={80}>
              <ol className="mt-[var(--space-block)] space-y-2">
                {reading.steps.map((step) => (
                  <li key={step} className="t-display">{step}</li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lead mt-[var(--space-block)] text-red">{reading.result}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
