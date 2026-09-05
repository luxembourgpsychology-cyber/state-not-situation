"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, type Locale } from "@/site.config";

/** EN FR DE. Keeps the visitor on the equivalent page and section. */
export function LanguageSwitcher({ current, locales, browsable, label, comingLabel }: { current: Locale; locales: Locale[]; browsable: Locale[]; label: string; comingLabel: string }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (
    <nav aria-label={label} className="flex items-center gap-3">
      {locales.map((l) => {
        const lang = siteConfig.languages[l];
        if (browsable.includes(l)) {
          return (
            <Link
              key={l}
              href={`/${l}${rest}${hash}`}
              hrefLang={lang.htmlLang}
              lang={lang.htmlLang}
              aria-current={l === current ? "page" : undefined}
              className={`eyebrow inline-flex items-center min-h-11 px-0.5 ${l === current ? "text-ink" : "text-quiet hover:text-ink"}`}
            >
              {lang.label}
            </Link>
          );
        }
        // Edition not yet available: shown, muted, not a link.
        return (
          <span key={l} className="eyebrow inline-flex items-center min-h-11 px-0.5 text-ink/30 cursor-default" title={`${lang.name} — ${comingLabel}`} aria-label={`${lang.name} — ${comingLabel}`}>
            {lang.label}
          </span>
        );
      })}
    </nav>
  );
}
