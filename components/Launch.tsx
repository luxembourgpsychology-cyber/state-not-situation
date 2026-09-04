import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { AmazonButton } from "./AmazonButton";
import { Notify } from "./Notify";
import { Reveal } from "./Reveal";

/** Publication status block: notify form while forthcoming, Buy on Amazon once published. */
export function Launch({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const ed = siteConfig.editions[locale];
  const published = isPublished(locale);
  return (
    <section id="notify" className="bg-paper" aria-labelledby="notify-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="mono-label text-ink">{published ? c.status.published : c.status.forthcoming}</p>
            {published && ed.publicationDate ? <p className="mono-label mt-2">{c.status.publicationDatePrefix} {ed.publicationDate}</p> : null}
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal delay={100}>
            {published && ed.amazonUrl ? (
              <div className="max-w-xl">
                <h2 id="notify-title" className="serif-title text-[clamp(1.9rem,4vw,3rem)]">{c.meta.title}</h2>
                <div className="mt-8"><AmazonButton href={ed.amazonUrl} label={c.status.buy} locale={locale} /></div>
              </div>
            ) : (
              <Notify content={c.status} edition={ed} pressEmail={siteConfig.author.pressEmail} locale={locale} />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
