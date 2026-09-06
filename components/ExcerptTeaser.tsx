import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { ExcerptLink } from "./ExcerptLink";

/**
 * The opening pages, typeset like the book, ending on "You feel level, but you
 * are not." with a door into reading mode; then the page 26 line that tells a
 * visitor the territory is kitchens and Tuesdays, not aviation.
 */
export function ExcerptTeaser({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const x = c.excerpt;
  const available = siteConfig.editions[locale].excerptAvailable;
  return (
    <section id="read" className="bg-page border-y border-[var(--rule)]" aria-labelledby="read-title">
      <div className="container-book py-[var(--section)]">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-red mb-4">{x.eyebrow}</p>
              <h2 id="read-title" className="serif-title text-[clamp(2.2rem,5vw,3.6rem)]">{x.title}</h2>
              <p className="mono-label mt-4">{x.sectionLabel}</p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            {available ? (
              <>
                <Reveal delay={80}>
                  <p className="running-head mb-8">{x.runningHead}</p>
                  <div className="reading-body !mx-0">
                    {x.paragraphs.slice(0, x.teaserCount).map((t, i) => (
                      <p key={i} className={i === 0 ? "dropcap" : undefined}>{t}</p>
                    ))}
                  </div>
                  <div className="mt-10 flex items-center gap-6">
                    <ExcerptLink href={`/${locale}/read`} label={x.continueCta} locale={locale} className="btn btn-red" />
                    <span className="h-px flex-1 bg-[var(--rule)]" aria-hidden="true" />
                    <span className="font-mono text-sm text-quiet">{x.folios[0]}</span>
                  </div>
                </Reveal>
                <Reveal delay={120} className="mt-14 md:mt-16 border-l-[1.5px] border-red pl-6 md:pl-8">
                  <p className="prose-book">{x.closing}</p>
                  <p className="mono-label mt-4">{x.closingSource}</p>
                </Reveal>
              </>
            ) : (
              <p className="prose-book text-quiet">{x.unavailable}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
