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
 *
 * `more` (the commercial extension, English only) adds one item after Press:
 * "More ways in", a disclosure that opens a second quiet bar under this one
 * with the new pages. The four sections keep their place and their size. To
 * make room between 768 and 1023 the wordmark beside the pulse mark yields,
 * as it already does below 420; the mark is still the home link. On a phone
 * the same links follow the existing sheet's own items. Without `more` the
 * header renders exactly as it did before the extension.
 */
export function Nav({
  locale,
  content,
  variant = "home",
  excerptAvailable = true,
  more = null,
  homeOnlyLanguage,
}: {
  locale: Locale;
  content: SiteContent;
  variant?: "home" | "page";
  excerptAvailable?: boolean;
  more?: { label: string; links: { href: string; label: string }[] } | null;
  /** On a page that exists in one language only: where the other marks go, and what they say. */
  homeOnlyLanguage?: Partial<Record<Locale, { label: string; title: string }>>;
}) {
  const c = content;
  const base = `/${locale}`;
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);
  const moreBar = useRef<HTMLDivElement>(null);
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

  // The disclosure closes on Escape (focus back to its button) and on a click
  // or a focus move anywhere outside it. It is not a modal: nothing is trapped.
  useEffect(() => {
    if (!moreOpen) return;
    const inside = (t: EventTarget | null) =>
      t instanceof Node && (moreBar.current?.contains(t) || moreButton.current?.contains(t));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMoreOpen(false); moreButton.current?.focus(); }
    };
    const onPointer = (e: PointerEvent) => { if (!inside(e.target)) setMoreOpen(false); };
    const onFocus = (e: FocusEvent) => { if (!inside(e.target)) setMoreOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-[var(--rule)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-paper focus:px-3 focus:py-2 t-label">
        {c.nav.skipToContent}
      </a>
      <div className="container-book container-wide flex items-center justify-between gap-4 h-14">
        <Link href={base} aria-label={c.nav.home} className="flex items-center gap-3 shrink-0 min-h-11">
          <PulseMark className="w-9 h-auto" />
          <span className={`t-label hidden min-[420px]:inline ${more ? "md:hidden lg:inline" : ""}`}>State. Not Situation.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 min-w-0">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="t-label inline-flex items-center min-h-11 text-ink-soft hover:text-red whitespace-nowrap">
              {l.label}
            </Link>
          ))}
          {more ? (
            <button
              ref={moreButton}
              type="button"
              className={`t-label inline-flex items-center min-h-11 whitespace-nowrap hover:text-red ${moreOpen ? "text-red" : "text-ink-soft"}`}
              aria-expanded={moreOpen}
              aria-controls="more-ways-in"
              onClick={() => setMoreOpen((v) => !v)}
            >
              {more.label}
            </button>
          ) : null}
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
            homeOnly={homeOnlyLanguage}
          />
        </div>
      </div>

      {/* The second bar: the same type, the same rule, no shadow and no box. */}
      {more ? (
        <div id="more-ways-in" ref={moreBar} hidden={!moreOpen} className="hidden md:block border-t border-[var(--rule)] bg-paper">
          <nav aria-label={more.label} className="container-book container-wide">
            <ul className="flex flex-wrap justify-center gap-x-7 py-1">
              {more.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="t-label inline-flex items-center min-h-11 text-ink-soft hover:text-red whitespace-nowrap" onClick={() => setMoreOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}

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
            {/* After the sheet's own items, never before them. */}
            {more ? (
              <nav aria-label={more.label} className="mt-[var(--space-section)]">
                <p className="t-label t-label-red">{more.label}</p>
                <ul className="mt-3 border-t border-[var(--rule)]">
                  {more.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="menu-sheet__link" onClick={() => setOpen(false)}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
