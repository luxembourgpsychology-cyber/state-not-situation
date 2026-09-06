import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { enabledLocales, getContent, locales } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PulseMark } from "./PulseMark";

/**
 * A quiet bar: the mark, the sections, the language.
 *
 * Listen appears only once a recording exists. On a phone there is no room
 * for the section links beside a language switcher, and a cut-off row of
 * links looks broken, so below the small breakpoint only Press survives; the
 * full set is repeated in the footer.
 */
export function Nav({ locale, variant = "home" }: { locale: Locale; variant?: "home" | "page" }) {
  const c = getContent(locale);
  const base = `/${locale}`;
  const ed = siteConfig.editions[locale];
  const to = (hash: string) => (variant === "home" ? hash : `${base}${hash}`);

  const links = [
    { href: to("#book-about"), label: c.nav.book, mobile: false },
    ...(ed.excerptAvailable ? [{ href: `${base}/read`, label: c.nav.read, mobile: false }] : []),
    ...(ed.audioUrl ? [{ href: to("#listen"), label: c.nav.listen, mobile: false }] : []),
    { href: to("#author"), label: c.nav.author, mobile: false },
    ...(siteConfig.press.enabled ? [{ href: `${base}/press`, label: c.nav.press, mobile: true }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/92 backdrop-blur-[2px] border-b border-[var(--rule)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-paper focus:px-3 focus:py-2 eyebrow">
        {c.nav.skipToContent}
      </a>
      <div className="container-book flex items-center justify-between gap-4 h-14">
        <Link href={base} aria-label={c.nav.home} className="flex items-center gap-3 shrink-0 min-h-11">
          <PulseMark className="w-9 h-auto" />
          <span className="eyebrow hidden min-[420px]:inline">State. Not Situation.</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 lg:gap-7 min-w-0">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              // No unconditional display utility here: pairing `inline-flex` with
              // `hidden` lets the cascade pick the wrong one and the links never hide.
              className={`eyebrow items-center min-h-11 text-ink-soft hover:text-red whitespace-nowrap ${
                l.mobile ? "inline-flex" : "hidden sm:inline-flex"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher
          current={locale}
          locales={locales}
          browsable={enabledLocales()}
          label={c.a11y.languageSwitcher}
          comingLabel={c.a11y.languageComing}
        />
      </div>
    </header>
  );
}
