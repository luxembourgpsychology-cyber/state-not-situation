import { siteConfig, type Locale } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { en } from "@/content/en";
import { fr } from "@/content/fr";
import { de } from "@/content/de";

export const locales: Locale[] = ["en", "fr", "de"];

const dictionaries: Record<Locale, SiteContent> = { en, fr, de };

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

/** Languages that are switched on in site.config.ts. */
export function enabledLocales(): Locale[] {
  return locales.filter((l) => siteConfig.languages[l].enabled || draftPreview());
}

/** True in `next dev` when previewDraftLanguages is on: disabled languages become browsable. */
export function draftPreview(): boolean {
  return process.env.NODE_ENV !== "production" && siteConfig.previewDraftLanguages;
}

/** Enabled but not yet signed off by a native speaker: keep it out of search. */
export function isUnderReview(locale: Locale): boolean {
  return siteConfig.languages[locale].underReview;
}

/** Languages search engines may index: enabled and reviewed. */
export function indexableLocales(): Locale[] {
  return locales.filter((l) => siteConfig.languages[l].enabled && !siteConfig.languages[l].underReview);
}

export function isEnabled(locale: Locale): boolean {
  return siteConfig.languages[locale].enabled || draftPreview();
}

/**
 * Returns the dictionary for a language. Any empty string in a translation
 * file is replaced with a visible ⟦marker⟧ naming the missing key, so an
 * unfinished translation can never silently show English.
 */
export function getContent(locale: Locale): SiteContent {
  const dict = dictionaries[locale];
  if (locale === siteConfig.defaultLocale) return dict;
  return markMissing(dict, locale, "") as SiteContent;
}

function markMissing(value: unknown, locale: Locale, path: string): unknown {
  if (typeof value === "string") return value === "" ? `⟦${locale}: ${path}⟧` : value;
  if (Array.isArray(value)) return value.map((v, i) => markMissing(v, locale, `${path}[${i}]`));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = markMissing(v, locale, path ? `${path}.${k}` : k);
    }
    return out;
  }
  return value;
}

export function edition(locale: Locale) {
  return siteConfig.editions[locale];
}

export function isPublished(locale: Locale) {
  const e = edition(locale);
  return e.publicationStatus === "published" && !!e.amazonUrl;
}

/** Absolute URL for a path in a language. */
export function localeUrl(locale: Locale, path = "") {
  return `${siteConfig.siteUrl}/${locale}${path}`;
}

/** hreflang map for a path across enabled languages, plus x-default. */
export function alternatesFor(path = "") {
  const languages: Record<string, string> = {};
  for (const l of indexableLocales()) languages[siteConfig.languages[l].htmlLang] = localeUrl(l, path);
  languages["x-default"] = localeUrl(siteConfig.defaultLocale, path);
  return languages;
}
