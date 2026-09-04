/**
 * SITE CONFIGURATION — the one place to change launch settings.
 *
 * Everything that changes between "forthcoming" and "published" lives here,
 * per language. Nothing in components hard-codes any of these values.
 *
 * To go live with the English edition on Amazon:
 *   1. set editions.en.publicationStatus to "published"
 *   2. paste the Amazon link into editions.en.amazonUrl
 * The site will replace every "Publishing soon" / "Be notified" interface
 * with "Buy on Amazon" automatically.
 */

export type Locale = "en" | "fr" | "de";
export type PublicationStatus = "forthcoming" | "published";

export interface EditionSettings {
  /** "forthcoming" shows the launch state, "published" shows Buy on Amazon. */
  publicationStatus: PublicationStatus;
  /** The retail link for this language edition. Null until it exists. */
  amazonUrl: string | null;
  /** ISO date (YYYY-MM-DD) or a human phrase. Null = not announced. */
  publicationDate: string | null;
  /** Path under /public or an absolute URL to the author reading. Null = not yet recorded. */
  audioUrl: string | null;
  /** Show the excerpt section and the /read page for this language. */
  excerptAvailable: boolean;
  /** Form endpoint of your newsletter tool (Buttondown, Mailchimp, MailerLite, ...). Null = mailto fallback. */
  newsletterUrl: string | null;
  /** Field name the newsletter tool expects for the email address. */
  newsletterEmailField: string;
  /** ISBN-13 once issued. Used in structured data and on the press page. */
  isbn: string | null;
}

export interface SiteConfig {
  siteUrl: string;
  defaultLocale: Locale;
  languages: Record<Locale, { enabled: boolean; label: string; name: string; htmlLang: string }>;
  /** Development only: show disabled languages as real links, with missing strings marked ⟦like this⟧. Never affects production. */
  previewDraftLanguages: boolean;
  editions: Record<Locale, EditionSettings>;
  companion: { enabled: boolean };
  press: { enabled: boolean; authorPhoto: string | null; pressKitZipUrl: string | null };
  analytics: { provider: "none" | "vercel" | "plausible"; plausibleDomain: string };
  fonts: { adobeFontsKitId: string };
  author: {
    name: string;
    website: string | null;
    pressEmail: string;
    social: { instagram: string | null; linkedin: string | null; x: string | null };
  };
  publisher: { name: string; place: string };
}

export const siteConfig: SiteConfig = {
  /** Canonical origin, no trailing slash. Change when the custom domain is connected. */
  siteUrl: "https://statenotsituation.com",

  defaultLocale: "en" as Locale,

  /**
   * Language switch. A language only appears in the selector, the sitemap and
   * hreflang tags when enabled. Do not enable a language until its content
   * file (content/fr.ts, content/de.ts) is complete: missing strings render as
   * visible ⟦markers⟧, never as silent English.
   */
  languages: {
    en: { enabled: true, label: "EN", name: "English", htmlLang: "en" },
    fr: { enabled: false, label: "FR", name: "Français", htmlLang: "fr" },
    de: { enabled: false, label: "DE", name: "Deutsch", htmlLang: "de" },
  },

  /**
   * While a language is disabled its mark (FR, DE) still appears in the switcher,
   * muted and not clickable, so a visitor knows editions are coming. To walk
   * through an unfinished translation on your own machine, set this to true and
   * run `npm run dev`: the muted marks become links and every untranslated
   * string shows as ⟦fr: key⟧. Production builds ignore this flag.
   */
  previewDraftLanguages: false,

  editions: {
    en: {
      publicationStatus: "forthcoming",
      amazonUrl: null,
      publicationDate: null,
      audioUrl: null,
      excerptAvailable: true,
      newsletterUrl: null,
      newsletterEmailField: "email",
      isbn: "978-2-87996-258-0",
    },
    fr: {
      publicationStatus: "forthcoming",
      amazonUrl: null,
      publicationDate: null,
      audioUrl: null,
      excerptAvailable: false,
      newsletterUrl: null,
      newsletterEmailField: "email",
      isbn: null,
    },
    de: {
      publicationStatus: "forthcoming",
      amazonUrl: null,
      publicationDate: null,
      audioUrl: null,
      excerptAvailable: false,
      newsletterUrl: null,
      newsletterEmailField: "email",
      isbn: null,
    },
  },

  /**
   * The companion tool. Off until there is a sentence to put here: write
   * companion.line in content/en.ts, then set this to true.
   */
  companion: { enabled: false },

  /** Press section. authorPhoto: path under /public once supplied, else null. */
  press: {
    enabled: true,
    authorPhoto: "/images/author.jpg",
    pressKitZipUrl: null,
  },

  /**
   * Analytics. "none" ships no tracking at all.
   * "vercel"   → Vercel Web Analytics (cookieless, no consent banner needed under GDPR guidance).
   * "plausible" → Plausible (cookieless, EU-hosted). Set plausibleDomain to your domain.
   */
  analytics: {
    provider: "none",
    plausibleDomain: "",
  },

  /**
   * Typography. The book uses IvyPresto Display (Adobe Fonts). Create a Web Project
   * at fonts.adobe.com containing ivypresto-display (and din-2014 if you like) and
   * paste the kit id here. Until then the site uses close open-source substitutes.
   */
  fonts: { adobeFontsKitId: "" },

  author: {
    name: "Ivana Budišin",
    /** Your psychology website. Null hides the link. */
    // Your psychology practice website. Null hides the link.
    website: null,
    pressEmail: "luxembourgpsychology@gmail.com",
    social: {
      instagram: null,
      linkedin: null,
      x: null,
    },
  },

  publisher: { name: "Budisin Publishing", place: "Luxembourg" },
};

