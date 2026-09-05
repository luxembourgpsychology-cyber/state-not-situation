"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { Book3D } from "./Book3D";
import { PulseMark } from "./PulseMark";
import { AmazonButton } from "./AmazonButton";
import { ExcerptLink } from "./ExcerptLink";

/**
 * The opening. The book sits shut, everything a visitor needs is already on
 * screen, and the first scroll opens the cover to the title page.
 *
 * The scroll drives one custom property, --open, written inside a rAF frame.
 * No library, no pinning trickery beyond a single sticky stage, and nothing
 * that changes how fast the page scrolls. With reduced motion the sticky track
 * collapses and the book is simply shown ajar.
 */
export function Hero({
  locale,
  content,
  published,
  amazonUrl,
  publicationDate,
  excerptAvailable,
}: {
  locale: Locale;
  content: SiteContent;
  published: boolean;
  amazonUrl: string | null;
  publicationDate: string | null;
  excerptAvailable: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const c = content;

  useEffect(() => {
    const trackEl = track.current;
    const stageEl = stage.current;
    if (!trackEl || !stageEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    const write = () => {
      frame = 0;
      const rect = trackEl.getBoundingClientRect();
      const travel = rect.height - stageEl.offsetHeight;
      if (travel <= 0) {
        // Short screen: nothing to scroll through, so leave the book shut.
        stageEl.style.setProperty("--open", "0");
        return;
      }
      // Reach fully open at 80% of the track, then hold, so the spread is
      // readable for a moment before the section scrolls away.
      const p = Math.min(1, Math.max(0, -rect.top / (travel * 0.8)));
      stageEl.style.setProperty("--open", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    const apply = () => {
      if (reduce.matches) {
        // No motion means no opening: the shut book, which is the cover.
        trackEl.style.height = "auto";
        stageEl.style.setProperty("--open", "0");
        window.removeEventListener("scroll", onScroll);
        return;
      }
      trackEl.style.removeProperty("height");
      window.addEventListener("scroll", onScroll, { passive: true });
      write();
    };

    apply();
    reduce.addEventListener("change", apply);
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      reduce.removeEventListener("change", apply);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const status = published ? c.status.published : c.status.forthcoming;

  return (
    <section id="book" ref={track} className="hero-track" aria-label={c.a11y.bookOpening}>
      <div ref={stage} className="hero-stage" style={{ ["--open" as string]: "0" }}>
        <div className="container-book w-full">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10 items-center">
            {/* The book */}
            <div className="md:col-span-6 lg:col-span-7 md:order-2 flex justify-center">
              <Book3D
                coverAlt={c.hero.coverAlt}
                titleA={c.hero.titleA}
                titleB={c.hero.titleB}
                strapline={c.footer.madeLine}
                author={siteConfig.author.name}
                publisher={siteConfig.publisher.name}
                priority
              />
            </div>

            {/* The words. Present from the first frame, never faded out. */}
            <div className="md:col-span-6 lg:col-span-5 md:order-1">
              <div className="flex items-center gap-3 mb-5 md:mb-8">
                <PulseMark className="w-10 h-auto shrink-0" />
                <p className="eyebrow eyebrow-red">{c.hero.eyebrow}</p>
              </div>

              <h1 className="serif-title text-[clamp(2.5rem,8vw,4.5rem)] md:text-[clamp(2.75rem,4.6vw,4.25rem)]">
                <span className="block">
                  {c.hero.titleA.replace(/\.$/, "")}
                  <span className="text-red">.</span>
                </span>
                <span className="block">{c.hero.titleB}</span>
              </h1>

              <p className="din-head normal-case tracking-normal text-red mt-5 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-snug max-w-sm">
                {c.hero.subtitle}
              </p>

              <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.25rem)] max-w-sm text-ink-soft">{c.hero.strap}</p>

              <p className="mt-6 font-serif text-lg md:text-xl">
                <span className="text-quiet">{c.hero.authorPrefix} </span>
                {siteConfig.author.name}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <p className="mono-label text-ink w-full sm:w-auto">
                  {status}
                  {published && publicationDate ? (
                    <span className="text-quiet"> · {c.status.publicationDatePrefix} {publicationDate}</span>
                  ) : null}
                </p>
                {published && amazonUrl ? (
                  <AmazonButton href={amazonUrl} label={c.status.buy} locale={locale} />
                ) : (
                  <a href="#notify" className="btn">{c.status.notifyCta}</a>
                )}
                {excerptAvailable ? (
                  <ExcerptLink href={`/${locale}/read`} label={c.hero.readCta} locale={locale} className="btn btn-red" />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <p className="hero-hint eyebrow eyebrow-quiet" aria-hidden="true">
          {c.hero.scrollHint}
        </p>
      </div>
    </section>
  );
}
