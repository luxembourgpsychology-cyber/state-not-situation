"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, type Locale } from "@/site.config";

/**
 * EN FR DE. Three marks, never a select.
 *
 * The architecture is canonical and the section ids are English in every
 * language, so the switch preserves the section a reader is in rather than a
 * pixel offset: it tracks the id crossing the top of the viewport and appends
 * it. All three languages are browsable, so there is no greyed state.
 */
export function LanguageSwitcher({ current, locales, browsable, label }: { current: Locale; locales: Locale[]; browsable: Locale[]; label: string }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sections = () => Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const update = () => {
      if (window.location.hash) { setHash(window.location.hash); return; }
      const top = window.scrollY + Number.parseFloat(getComputedStyle(document.documentElement).fontSize || "16") * 4;
      const here = sections().filter((s) => s.offsetTop <= top).pop();
      setHash(here ? `#${here.id}` : "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const visible = locales.filter((l) => browsable.includes(l));

  return (
    <nav aria-label={label} className="flex items-center gap-3">
      {visible.map((l) => {
        const lang = siteConfig.languages[l];
        return (
          <Link
            key={l}
            href={`/${l}${rest}${hash}`}
            hrefLang={lang.htmlLang}
            lang={lang.htmlLang}
            aria-current={l === current ? "page" : undefined}
            className={`t-label inline-flex items-center justify-center min-h-11 min-w-11 ${l === current ? "text-ink" : "text-quiet hover:text-ink"}`}
          >
            {lang.label}
          </Link>
        );
      })}
    </nav>
  );
}
