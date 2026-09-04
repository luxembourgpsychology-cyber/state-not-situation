"use client";
import { siteConfig } from "@/site.config";

/**
 * Minimal, privacy-conscious event tracking. Does nothing unless a provider
 * is selected in site.config.ts. Events used on the site:
 *   excerpt_open, audio_play, amazon_click, notify_submit
 */
export type SiteEvent = "excerpt_open" | "audio_play" | "amazon_click" | "notify_submit";

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
