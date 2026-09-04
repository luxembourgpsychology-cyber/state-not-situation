"use client";
import Script from "next/script";
import { siteConfig } from "@/site.config";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/** Renders nothing unless a provider is chosen in site.config.ts. */
export function Analytics() {
  const { provider, plausibleDomain } = siteConfig.analytics;
  if (provider === "plausible" && plausibleDomain) {
    return <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
  }
  if (provider === "vercel") return <VercelAnalytics />;
  return null;
}
