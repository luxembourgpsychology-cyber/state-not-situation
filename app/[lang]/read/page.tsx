import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { alternatesFor, getContent, localeUrl } from "@/lib/i18n";
import { StatusLine } from "@/components/StatusLine";
import { PulseMark } from "@/components/PulseMark";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const c = getContent(locale);
  return {
    title: c.meta.readTitle,
    description: c.meta.readDescription,
    alternates: { canonical: localeUrl(locale, "/read"), languages: alternatesFor("/read") },
    openGraph: { title: `${c.meta.readTitle} · ${c.meta.title}`, description: c.meta.readDescription, url: localeUrl(locale, "/read") },
  };
}

/**
 * READING MODE. No navigation, no colour, the interior page: running head,
 * the drop-cap opening, the FAA sentence set apart, folios in the margin.
 */
export default async function ReadPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!siteConfig.editions[locale].excerptAvailable) notFound();
  const c = getContent(locale);
  const x = c.excerpt;
  const third = Math.ceil(x.paragraphs.length / 3);

  return (
    <div className="reading-page">
      <header className="sticky top-0 bg-page/95 backdrop-blur-[2px] z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href={`/${locale}#read`} className="eyebrow text-quiet hover:text-ink py-2">← {x.back}</Link>
          <p className="running-head">{x.runningHead}</p>
          <PulseMark className="w-8 h-auto" />
        </div>
      </header>

      <main id="main" aria-label={x.readingModeLabel} className="px-6 pt-16 pb-24 md:pt-24">
        <article className="max-w-3xl mx-auto">
          <div className="reading-body">
            <p className="eyebrow eyebrow-quiet mb-4">{x.eyebrow} · {x.title}</p>
            <h1 className="serif-title text-[clamp(2.4rem,6vw,3.8rem)] mb-14 md:mb-20">{x.sectionLabel}</h1>
            {x.paragraphs.map((t, i) => (
              <div key={i} className="reading-para">
                <p className={i === 0 ? "dropcap" : undefined}>{t}</p>
                {i === x.quoteAfter ? (
                  <blockquote className="my-8 md:my-10 pl-6 border-l-[1.5px] border-red font-mono text-[0.95em] leading-[1.7] text-ink">{x.quote}</blockquote>
                ) : null}
                {(i + 1) % third === 0 && i + 1 < x.paragraphs.length ? (
                  <p className="font-mono text-xs text-quiet text-right my-10 select-none" aria-hidden="true">{x.folios[Math.floor((i + 1) / third) - 1]}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="reading-body mt-16 md:mt-24 pt-10 border-t border-[var(--rule)]">
            <p className="font-mono text-sm text-quiet mb-10">{x.endNote}</p>
            <StatusLine locale={locale} />
            {siteConfig.editions[locale].audioUrl ? (
              <p className="mt-10"><Link href={`/${locale}#listen`} className="btn">{c.listen.title}</Link></p>
            ) : null}
          </div>
        </article>
      </main>
    </div>
  );
}
