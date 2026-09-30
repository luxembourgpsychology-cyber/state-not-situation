import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * Page 4, whole: one ordinary day, read five times.
 *
 * This replaced three CASE EVIDENCE panels on 30 September 2026. The panels
 * are not in the book any more — v50 prints neither "CASE EVIDENCE" nor
 * "VERIFIED" anywhere — and on screen all three ended on a negation: Nothing
 * has happened. / None. / None. Three refusals in a row told a reader skimming
 * that the book was about nothing. The five readings are five positives, and
 * they are one day, so they hold together instead of standing as specimens.
 *
 * No new type step and no new device: the timestamp is the mono DISPLAY the
 * panels already used, and the INPUT / VERIFIED apparatus, which is the part
 * that read as bureaucratic, is simply gone. The rows are a description list
 * because that is what they are — a time, and what it felt like.
 */
export function Moments({ content }: { content: SiteContent["moments"] }) {
  return (
    <section id="moments" className="section" aria-labelledby="moments-title">
      <div className="container-book">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal>
              <p className="t-label t-label-red">{content.line}</p>
              <p className="t-mono mt-3">{content.folio}</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal>
              <h2 id="moments-title" className="t-head">{content.title}</h2>
            </Reveal>

            <Reveal delay={80}>
              <dl className="mt-[var(--space-block)] border-t border-[var(--rule)]">
                {content.items.map((item) => (
                  <div
                    key={item.time}
                    className="py-5 border-b border-[var(--rule)] sm:grid sm:grid-cols-[6rem_1fr] sm:gap-x-8 sm:items-baseline"
                  >
                    <dt className="t-mono text-ink">{item.time}</dt>
                    <dd className="t-lead mt-2 sm:mt-0">{item.line}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={140}>
              <p className="t-display mt-[var(--space-block)]">{content.closing}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
