import type { Metadata } from "next";
import { siteConfig, type Locale } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { extensionEn } from "@/content/extension.en";
import type { OfferCopy } from "@/content/extension-types";
import { events } from "@/content/events";
import {
  draftsAllowed, extensionVisible, partitionEvents, resolveAppState, resolveBookAction,
  ENQUIRY_FORMATS, type AppState, type BookAction,
} from "./rules";

/**
 * The commercial extension, wired to this site's config and content.
 *
 * Everything that decides whether a new page, link or offer exists comes
 * through here, from one reading of process.env.VERCEL_ENV at build time:
 * production shows only what is approved; previews and local builds show the
 * drafts too, under the draft note.
 */

const vercelEnv = process.env.VERCEL_ENV;

/** True where the new pages exist for this language on this deployment. */
export function extensionOn(locale: Locale): boolean {
  return extensionVisible(siteConfig.extension, locale, vercelEnv);
}

/** True while any of the extension's copy still waits for the author. */
export function isDraft(): boolean {
  return !siteConfig.extension.approved;
}

/** The words. English is the only language the extension has. */
export function ext() {
  return extensionEn;
}

/** Offers the visitor may see: approved ones, and on previews the drafts too. */
export function visibleOffers(): OfferCopy[] {
  return OFFERS.filter((o) => o.approvedForPublication || draftsAllowed(vercelEnv));
}

/** Formats the enquiry form may offer and preselect. */
export function allowedFormats(): string[] {
  const ids: string[] = visibleOffers().map((o) => o.id);
  return ENQUIRY_FORMATS.filter((f) => f === "not_sure" || ids.includes(f));
}

export function bookAction(locale: Locale): BookAction {
  const x = ext();
  return resolveBookAction(siteConfig.editions[locale], { buy: x.book.buy, preorder: x.book.preorder, details: x.book.details }, x.book.detailsHref);
}

let warned = false;
export function appState(): AppState {
  const s = resolveAppState(siteConfig.extension.app);
  if (s.status === "in_development" && s.configWarning && !warned && process.env.NODE_ENV !== "production") {
    warned = true;
    console.warn(`[extension] ${s.configWarning}`);
  }
  return s;
}

export function appCopy() {
  return ext().app.copyByStatus[appState().status];
}

/** Events, split at the moment of the build. A redeploy moves an event into the past. */
export function eventLists(now = new Date()) {
  return partitionEvents(events, now);
}

export function eventBySlug(slug: string) {
  const { upcoming, past } = eventLists();
  return [...upcoming, ...past].find((e) => e.slug === slug) ?? null;
}

export type ExtensionLink = {
  href: string;
  /** The full label: header bar and footer. */
  label: string;
  /** The word on the phone menu's strip, and the line under it. */
  word: string;
  hint: string;
};

/** The links the header disclosure, the phone menu and the footer share. */
export function extensionLinks(locale: Locale): ExtensionLink[] {
  const x = ext();
  const base = `/${locale}`;
  return [
    { href: `${base}/explore`, label: x.nav.explore, word: x.nav.explore, hint: x.ways.explore },
    { href: `${base}/events`, label: x.nav.events, word: x.nav.events, hint: x.ways.events },
    ...(inviteLink(locale) ? [{ ...inviteLink(locale)!, word: x.nav.invite, hint: "" }] : []),
    { href: `${base}/research`, label: x.nav.research, word: x.nav.research, hint: x.ways.research },
    { href: `${base}/app`, label: appCopy().menuLabel, word: x.ways.app, hint: appCopy().statusLabel },
  ];
}

/** Invite Ivana, when there is an offer to show: a primary destination of its own. */
export function inviteLink(locale: Locale): { href: string; label: string } | null {
  return visibleOffers().length ? { href: `/${locale}/invite`, label: ext().nav.invite } : null;
}

/**
 * What Nav needs. `primary` (Invite Ivana) joins Book, Extract, Author and
 * Press; `links` are the other ways in, behind "More ways in". Null keeps the
 * header exactly as it was.
 */
export function navExtension(locale: Locale) {
  if (!extensionOn(locale)) return null;
  const invite = inviteLink(locale);
  return {
    label: ext().moreWaysIn,
    primary: invite,
    links: extensionLinks(locale).filter((l) => l.href !== invite?.href),
  };
}

const OFFERS: OfferCopy[] = extensionEn.invite.offers;

/**
 * Metadata for a new page. English only, so hreflang names English and
 * x-default and nothing else; drafts are never indexed.
 */
export function extensionMetadata(locale: Locale, path: string, key: keyof ReturnType<typeof ext>["meta"]): Metadata {
  const m = ext().meta[key];
  const c = getContent(locale);
  const url = `${siteConfig.siteUrl}/${locale}${path}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url, languages: { en: url, "x-default": url } },
    openGraph: {
      type: "website",
      siteName: c.meta.title,
      title: `${m.title} · ${c.meta.title}`,
      description: m.description,
      url,
      locale: "en",
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: c.meta.ogImageAlt }],
    },
    robots: isDraft() ? { index: false, follow: false, nocache: true } : { index: true, follow: true },
  };
}
