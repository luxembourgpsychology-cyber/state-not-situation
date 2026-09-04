import Image from "next/image";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { PulseMark } from "./PulseMark";
import { StatusLine } from "./StatusLine";
import { ExcerptLink } from "./ExcerptLink";

export function Hero({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const ed = siteConfig.editions[locale];
  return (
    <section id="book" className="border-t-[6px] border-red" aria-labelledby="hero-title">
      <div className="container-book grid gap-10 md:grid-cols-12 md:gap-8 items-center pt-10 pb-16 md:pt-16 md:pb-24 md:min-h-[min(calc(100svh-3.5rem),52rem)]">
        <div className="md:col-span-7 lg:col-span-7 order-2 md:order-1">
          <div className="flex items-center gap-4 mb-6 md:mb-12">
            <span className="h-px flex-1 max-w-24 bg-ink/50" aria-hidden="true" />
            <PulseMark className="w-12 h-auto" />
            <p className="eyebrow eyebrow-red">{c.hero.eyebrow}</p>
          </div>
          <h1 id="hero-title" className="m-0 sr-only md:not-sr-only">
            <span className="display text-red block text-[clamp(6.5rem,26vw,15rem)] -ml-[0.03em]">{c.hero.titleA}</span>
            <span className="din-head block text-[clamp(1.5rem,5.6vw,3.25rem)] tracking-[0.22em] mt-2">{c.hero.titleB}</span>
          </h1>
          <p className="din-head normal-case tracking-normal text-red mt-6 text-[clamp(1rem,1.4vw,1.2rem)] max-w-md leading-snug">{c.hero.subtitle}</p>
          <p className="serif-title mt-8 text-[clamp(1.4rem,2.6vw,2rem)] max-w-lg">{c.hero.strap}</p>
          <p className="mt-6 font-serif text-xl">
            <span className="text-quiet">{c.hero.authorPrefix} </span>{siteConfig.author.name}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <StatusLine locale={locale} />
            {ed.excerptAvailable ? <ExcerptLink href={`/${locale}/read`} label={c.hero.readCta} locale={locale} className="btn btn-red" /> : null}
          </div>
        </div>
        <figure className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end" aria-label={c.a11y.coverFigure}>
          <Image
            src="/images/cover-front.jpg"
            alt={c.hero.coverAlt}
            width={1200}
            height={1800}
            priority
            sizes="(max-width: 768px) 62vw, (max-width: 1200px) 34vw, 420px"
            className="w-[68vw] max-w-[320px] md:max-w-[420px] md:w-full h-auto shadow-[0_18px_50px_-24px_rgba(17,17,17,0.45)]"
          />
        </figure>
      </div>
    </section>
  );
}
