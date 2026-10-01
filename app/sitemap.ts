import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { alternatesFor, indexableLocales, localeUrl } from "@/lib/i18n";
import { eventLists, extensionOn, isDraft, visibleOffers } from "@/lib/extension";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/read", "/press"].filter((p) => (p === "/press" ? siteConfig.press.enabled : true));
  const out: MetadataRoute.Sitemap = [];
  for (const l of indexableLocales()) {
    for (const p of paths) {
      if (p === "/read" && !siteConfig.editions[l].excerptAvailable) continue;
      out.push({ url: localeUrl(l, p), changeFrequency: "monthly", priority: p === "" ? 1 : 0.6, alternates: { languages: alternatesFor(p) } });
    }
    // The commercial extension: only once approved, and only in its own
    // language. Its pages have no translations, so no hreflang alternates.
    // The enquiry form is a tool, not a page to land on, and is left out.
    if (extensionOn(l) && !isDraft()) {
      const extra = ["/explore", ...(visibleOffers().length ? ["/invite"] : []), "/events", "/research", "/app"];
      for (const p of extra) out.push({ url: localeUrl(l, p), changeFrequency: "monthly", priority: 0.5 });
      for (const e of eventLists().upcoming) out.push({ url: localeUrl(l, `/events/${e.slug}`), changeFrequency: "weekly", priority: 0.5 });
    }
  }
  return out;
}
