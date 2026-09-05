import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { alternatesFor, indexableLocales, localeUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/read", "/press"].filter((p) => (p === "/press" ? siteConfig.press.enabled : true));
  const out: MetadataRoute.Sitemap = [];
  for (const l of indexableLocales()) {
    for (const p of paths) {
      if (p === "/read" && !siteConfig.editions[l].excerptAvailable) continue;
      out.push({ url: localeUrl(l, p), changeFrequency: "monthly", priority: p === "" ? 1 : 0.6, alternates: { languages: alternatesFor(p) } });
    }
  }
  return out;
}
