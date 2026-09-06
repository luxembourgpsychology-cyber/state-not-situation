import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { AmazonButton } from "./AmazonButton";
import { Notify } from "./Notify";
import { Reveal } from "./Reveal";

/**
 * The page ends once. Page 225, the book's last sentence, then the line
 * printed on the cover foot, then the only remaining action. The question
 * comes first and the cover line last, so the question is not read as a
 * marketing hook standing over an email field.
 */
export function Closing({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const ed = siteConfig.editions[locale];
  const published = isPublished(locale);

  return (
    <section id="closing" className="section-tall" aria-labelledby="closing-title">
      <div className="container-book">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal><p className="t-mono">{c.closing.source}</p></Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 id="closing-title" className="t-display">{c.closing.question}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-lead mt-[var(--space-block)] text-ink-soft">{c.closing.line}</p>
            </Reveal>
          </div>
        </div>

        <div id="notify" className="mt-[var(--space-section)] grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <Reveal delay={100}>
              {published && ed.amazonUrl ? (
                <AmazonButton href={ed.amazonUrl} label={c.status.buy} locale={locale} />
              ) : (
                <Notify content={c.status} edition={ed} pressEmail={siteConfig.author.pressEmail} locale={locale} />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
