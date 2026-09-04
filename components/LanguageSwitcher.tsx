"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, type Locale } from "@/site.config";

/** EN FR DE. Keeps the visitor on the equivalent page and section. */
export function LanguageSwitcher({ current, locales, label }: { current: Locale; locales: Locale[]; label: string }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  if (locales.length < 2) return null;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (
    <nav aria-label={label} className="flex items-center gap-3">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}${hash}`}
          hrefLang={siteConfig.languages[l].htmlLang}
          lang={siteConfig.languages[l].htmlLang}
          aria-current={l === current ? "page" : undefined}
          className={`eyebrow py-2 ${l === current ? "text-ink" : "text-quiet hover:text-ink"}`}
        >
          {siteConfig.languages[l].label}
        </Link>
      ))}
    </nav>
  );
}
