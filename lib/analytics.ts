"use client";
import { siteConfig } from "@/site.config";

/**
 * Minimal, privacy-conscious event tracking. Does nothing unless a provider
 * is selected in site.config.ts. Events used on the site:
 *   excerpt_open, audio_play, amazon_click, notify_submit
 *
 * The commercial extension adds six. Their properties are ids and the
 * language only — never a name, an address, a field's text or which reading
 * of a scene someone chose:
 *   sample_opened, sample_completed     { scene, locale }
 *   offer_viewed                        { offer, locale }
 *   enquiry_email_draft_opened          { offer, source, locale }   (a draft, not a delivery)
 *   event_booking_clicked               { event, provider, locale } (an outbound click, not a purchase)
 *   app_outbound_clicked                { source, locale }
 */
export type SiteEvent =
  | "excerpt_open" | "audio_play" | "amazon_click" | "notify_submit"
  | "sample_opened" | "sample_completed" | "offer_viewed"
  | "enquiry_email_draft_opened" | "event_booking_clicked" | "app_outbound_clicked";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function track(event: SiteEvent, props: Record<string, string> = {}) {
  const { provider } = siteConfig.analytics;
  if (provider === "plausible") {
    window.plausible?.(event, { props });
  } else if (provider === "vercel") {
    import("@vercel/analytics").then((m) => m.track(event, props)).catch(() => {});
  }
}
