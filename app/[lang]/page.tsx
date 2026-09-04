import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TheReading } from "@/components/TheReading";
import { ThreeLoops } from "@/components/ThreeLoops";
import { CaseEvidence } from "@/components/CaseEvidence";
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
  const ed = siteConfig.editions[locale];
  const published = isPublished(locale);

  return (
    <>
      <Nav locale={locale} />
      <main id="main" aria-label={c.a11y.mainLandmark}>
        <Hero
          locale={locale}
          content={c}
          published={published}
          amazonUrl={ed.amazonUrl}
          publicationDate={ed.publicationDate}
          excerptAvailable={ed.excerptAvailable}
        />
        <TheReading content={c.reading} />
        <ThreeLoops content={c.loops} />
        <CaseEvidence content={c.cases} regionLabel={c.a11y.casesRegion} />
        <ExcerptTeaser locale={locale} />
        <Listen locale={locale} />
        <AboutBook content={c.about} />
        <Author locale={locale} content={c.author} />
        <Companion locale={locale} />
        <Launch locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd locale={locale} />
    </>
  );
}
