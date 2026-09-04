import type { Locale } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Proposition } from "@/components/Proposition";
import { DayReadTwice } from "@/components/DayReadTwice";
import { ExcerptTeaser } from "@/components/ExcerptTeaser";
import { Listen } from "@/components/Listen";
import { AboutBook } from "@/components/AboutBook";
import { Author } from "@/components/Author";
import { Companion } from "@/components/Companion";
import { Launch } from "@/components/Launch";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  const c = getContent(locale);
  return (
    <>
      <Nav locale={locale} />
      <main id="main" aria-label={c.a11y.mainLandmark}>
        <Hero locale={locale} />
        <Proposition locale={locale} />
        <DayReadTwice content={c.day} regionLabel={c.a11y.dayRegion} />
        <ExcerptTeaser locale={locale} />
        <Listen locale={locale} />
        <AboutBook locale={locale} />
        <Author locale={locale} />
        <Companion locale={locale} />
        <Launch locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd locale={locale} />
    </>
  );
}
