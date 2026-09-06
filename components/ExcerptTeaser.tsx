import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { ExcerptLink } from "./ExcerptLink";

/**
 * Prove the writing, then get out of the way. Two paragraphs of the opening,
 * set on the book's own paper, ending on the folio rule and one action.
 */
export function ExcerptTeaser({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const x = c.excerpt;
  const available = siteConfig.editions[locale].excerptAvailable;

  return (
    <section id="read" className="section bg-page border-y border-[var(--rule)]" aria-labelledby="read-title">
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
        <div className="md:col-span-3">
          <Reveal>
            <h2 id="read-title" className="t-head">{x.title}</h2>
            <p className="t-mono mt-3">{x.sectionLabel}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          {available ? (
            <>
              <Reveal>
                <p className="t-lead">{x.lead}</p>
              </Reveal>
              <Reveal delay={80} className="mt-[var(--space-block)]">
                <div className="t-body">
                  {x.paragraphs.slice(0, x.teaserCount).map((t, i) => (
                    <p key={i} className={i === 0 ? "dropcap" : undefined}>{t}</p>
                  ))}
                </div>
                <div className="mt-[var(--space-block)] flex items-center gap-6">
                  <ExcerptLink href={`/${locale}/read`} label={x.continueCta} locale={locale} className="btn btn-red" />
                  <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
                  <span className="t-mono">{x.folios[0]}</span>
                </div>
              </Reveal>
            </>
          ) : (
            <p className="t-body text-quiet">{x.unavailable}</p>
          )}
        </div>
      </div>
    </section>
  );
}
