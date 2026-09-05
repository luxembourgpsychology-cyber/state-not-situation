import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { AmazonButton } from "./AmazonButton";

/**
 * The publication state, resolved from site.config.ts. Forthcoming shows a
 * quiet status and a link to the notify section; published shows Buy on Amazon.
 */
export function StatusLine({ locale, align = "left" }: { locale: Locale; align?: "left" | "center" }) {
  const c = getContent(locale);
  const ed = siteConfig.editions[locale];
  const published = isPublished(locale);
  const wrap = align === "center" ? "items-center text-center" : "items-start";
  return (
    <div className={`flex flex-col gap-4 ${wrap}`}>
      <p className="mono-label text-ink">
        {published ? c.status.published : c.status.forthcoming}
        {published && ed.publicationDate ? <span className="text-quiet"> · {c.status.publicationDatePrefix} {ed.publicationDate}</span> : null}
      </p>
      {published && ed.amazonUrl ? (
        <AmazonButton href={ed.amazonUrl} label={c.status.buy} locale={locale} />
      ) : (
        <a href="#notify" className="btn">{c.status.notifyCta}</a>
      )}
    </div>
  );
}
