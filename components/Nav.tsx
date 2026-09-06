"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { enabledLocales, locales } from "@/lib/i18n";
import type { SiteContent } from "@/content/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PulseMark } from "./PulseMark";

/**
 * A quiet bar: the mark, four sections, the language. Opaque, so display type
 * never ghosts through it.
 *
 * Below 768 the four links do not fit beside a language switcher, so they move
 * into a full-screen sheet behind the word Menu — the word, not an unlabelled
 * icon. The sheet is a real dialog: focus moves into it, Escape closes it, the
 * page behind it is inert, and every item is an anchor.
 */
export function Nav({
  locale,
  content,
  variant = "home",
  excerptAvailable = true,
}: {
  locale: Locale;
  content: SiteContent;
  variant?: "home" | "page";
  excerptAvailable?: boolean;
}) {
  const c = content;
  const base = `/${locale}`;
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const to = (hash: string) => (variant === "home" ? hash : `${base}${hash}`);

  const links = [
    { href: to("#premise"), label: c.nav.book },
    ...(excerptAvailable ? [{ href: `${base}/read`, label: c.nav.read }] : []),
    { href: to("#author"), label: c.nav.author },
    ...(siteConfig.press.enabled ? [{ href: `${base}/press`, label: c.nav.press }] : []),
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      button.current?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-[var(--rule)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-paper focus:px-3 focus:py-2 t-label">
        {c.nav.skipToContent}
      </a>
      <div className="container-book container-wide flex items-center justify-between gap-4 h-14">
        <Link href={base} aria-label={c.nav.home} className="flex items-center gap-3 shrink-0 min-h-11">
          <PulseMark className="w-9 h-auto" />
          <span className="t-label hidden min-[420px]:inline">State. Not Situation.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 min-w-0">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="t-label inline-flex items-center min-h-11 text-ink-soft hover:text-red whitespace-nowrap">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 md:gap-3">
          <button
            ref={button}
            type="button"
            className="md:hidden t-label inline-flex items-center min-h-11 text-ink hover:text-red"
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? c.nav.closeMenu : c.nav.menu}
          </button>
          <LanguageSwitcher
            current={locale}
            locales={locales}
            browsable={enabledLocales()}
            label={c.a11y.languageSwitcher}
          />
        </div>
      </div>

      {open ? (
        <div
          id="menu-sheet"
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label={c.a11y.menu}
          className="menu-sheet md:hidden"
        >
          <div className="container-book container-wide flex items-center justify-end h-14 shrink-0">
            <button type="button" className="t-label inline-flex items-center min-h-11 text-ink hover:text-red" onClick={() => setOpen(false)}>
              {c.nav.closeMenu}
            </button>
          </div>
          <div className="container-book container-wide pb-[var(--space-block)]">
            <ul className="border-t border-[var(--rule)]">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="menu-sheet__link" onClick={() => setOpen(false)}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-[var(--space-block)] flex flex-col items-start gap-4">
              {excerptAvailable ? (
                <Link href={`${base}/read`} className="btn btn-red" onClick={() => setOpen(false)}>{c.hero.readCta}</Link>
              ) : null}
              <Link href={`${base}#notify`} className="btn" onClick={() => setOpen(false)}>{c.status.notifyCta}</Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
