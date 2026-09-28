import { siteConfig, type Locale } from "@/site.config";

/**
 * THE PUBLICATION DATE, in the language the page is in.
 *
 * site.config.ts holds it once, as an ISO date. Everything that shows a date —
 * the first screen, the line above the form, the press sheet, the book's
 * structured data — formats it through here, so the date is changed in one
 * place and cannot drift from one page to the next.
 *
 * The field also accepts a human phrase ("Spring 2027"), and anything that is
 * not an ISO date is returned exactly as it was written.
 */

/**
 * Regional forms, so English reads 15 October 2026 rather than October 15,
 * 2026: the site's prose is British and the book is published in Luxembourg.
 */
const dateLocale: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", de: "de-DE" };

export function publicationDate(locale: Locale): string | null {
  const raw = siteConfig.editions[locale].publicationDate;
  if (!raw) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const [year, month, day] = raw.split("-").map(Number);
  return new Intl.DateTimeFormat(dateLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** The ISO date itself, for schema.org. Null unless the field really holds one. */
export function publicationDateIso(locale: Locale): string | null {
  const raw = siteConfig.editions[locale].publicationDate;
  return raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : null;
}
