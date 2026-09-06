import Image from "next/image";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { AmazonButton } from "./AmazonButton";
import { ExcerptLink } from "./ExcerptLink";

/**
 * The book as an object, its title, and no more than two decisions.
 *
 * The cover is flat, front-on and still, with one shadow — the only shadow on
 * the site. There is no 3D mockup and nothing driven by scroll position: the
 * brief forbids both, and a photograph of the printed cover has more authority
 * than a render of it. On a phone the cover sits above the actions, not a
 * thousand pixels below them.
 */
export function Hero({
  locale,
  content,
  published,
  amazonUrl,
  publicationDate,
  excerptAvailable,
}: {
  locale: Locale;
  content: SiteContent;
  published: boolean;
  amazonUrl: string | null;
  publicationDate: string | null;
  excerptAvailable: boolean;
}) {
  const c = content;
  const status = published ? c.status.published : c.status.forthcoming;

  return (
    <section id="top" className="section" aria-labelledby="site-title">
      <div className="container-book container-wide">
        <div className="grid gap-[var(--space-block)] md:grid-cols-12 md:items-center md:gap-x-10">
          {/* The words. First in the DOM, so first on a phone. */}
          <div className="md:col-span-6 md:order-1">
            <h1 id="site-title" className="t-cover">
              <span className="block">
                {c.hero.titleA.replace(/\.$/, "")}
                <span className="text-red">.</span>
              </span>
              <span className="block">{c.hero.titleB}</span>
            </h1>
            <p className="t-lead mt-[var(--space-tight)] text-ink-soft">{c.hero.subtitle}</p>
          </div>

          {/* The cover, above the actions on a phone, beside the words at 768. */}
          <div className="md:col-span-5 md:col-start-8 md:order-2 md:row-span-2">
            <Image
              src="/images/cover-front.jpg"
              alt={c.hero.coverAlt}
              width={1200}
              height={1800}
              priority
              sizes="(max-width: 767px) 72vw, 380px"
              className="cover-figure w-[72vw] max-w-[300px] md:w-full md:max-w-[380px]"
            />
          </div>

          <div className="md:col-span-6 md:order-3">
            <p className="t-body">{c.hero.strap}</p>
            <p className="t-lead mt-[var(--space-tight)]">
              <span className="text-quiet">{c.hero.authorPrefix} </span>
              {siteConfig.author.name}
            </p>
            {/* The author asked for her name and her work on the first screen,
                6 September 2026. One line, at LABEL, so it reads as a caption
                to the byline and does not compete with the title. */}
            <p className="t-mono mt-1">{c.hero.credential}</p>

            <div className="mt-[var(--space-block)] flex flex-wrap items-center gap-x-8 gap-y-3">
              <p className="t-mono text-ink w-full sm:w-auto">
                {status}
                {published && publicationDate ? (
                  <span className="text-quiet"> · {c.status.publicationDatePrefix} {publicationDate}</span>
                ) : null}
              </p>
              {excerptAvailable ? (
                <ExcerptLink href={`/${locale}/read`} label={c.hero.readCta} locale={locale} className="btn btn-red" />
              ) : null}
              {published && amazonUrl ? (
                <AmazonButton href={amazonUrl} label={c.status.buy} locale={locale} />
              ) : (
                <a href="#notify" className="btn">{c.status.notifyCta}</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
