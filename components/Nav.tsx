import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { enabledLocales, getContent } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PulseMark } from "./PulseMark";

export function Nav({ locale, variant = "home" }: { locale: Locale; variant?: "home" | "page" }) {
  const c = getContent(locale);
  const base = `/${locale}`;
  const ed = siteConfig.editions[locale];
  const links = [
    { href: variant === "home" ? "#book" : `${base}#book`, label: c.nav.book },
    ...(ed.excerptAvailable ? [{ href: variant === "home" ? "#read" : `${base}/read`, label: c.nav.read }] : []),
    { href: variant === "home" ? "#listen" : `${base}#listen`, label: c.nav.listen },
    { href: variant === "home" ? "#author" : `${base}#author`, label: c.nav.author },
    ...(siteConfig.press.enabled ? [{ href: `${base}/press`, label: c.nav.press }] : []),
  ];
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-[2px] border-b border-[var(--rule)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-paper focus:px-3 focus:py-2 eyebrow">{c.nav.skipToContent}</a>
      <div className="container-book flex items-center justify-between gap-4 h-14">
        <Link href={base} aria-label={c.nav.home} className="flex items-center gap-3 shrink-0">
          <PulseMark className="w-9 h-auto" />
          <span className="eyebrow hidden sm:inline">State. Not Situation.</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="eyebrow py-2 text-ink-soft hover:text-red whitespace-nowrap">{l.label}</Link>
          ))}
        </nav>
        <LanguageSwitcher current={locale} locales={enabledLocales()} label={c.a11y.languageSwitcher} />
      </div>
    </header>
  );
}
