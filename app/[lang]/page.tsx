import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Misreading } from "@/components/Misreading";
import { TheReading } from "@/components/TheReading";
import { BeforeWeBegin } from "@/components/BeforeWeBegin";
import { TheBook } from "@/components/TheBook";
import { ExcerptTeaser } from "@/components/ExcerptTeaser";
import { CaseEvidence } from "@/components/CaseEvidence";
import { Listen } from "@/components/Listen";
import { MapOfBook } from "@/components/MapOfBook";
import { Author } from "@/components/Author";
import { Closing } from "@/components/Closing";
import { Companion } from "@/components/Companion";
import { Launch } from "@/components/Launch";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * The page follows the arc the book builds in its own first pages, decided in
 * translation/EDITORIAL-POSITIONING.md and re-weighted for the two kinds of
 * reader in translation/HOOK-DECISION.md: the cover; page 10; pages 12 to 13
 * as one passage ending on the three checks and the question; page 13's
 * markers; page 20 with the author's account; four case pages; the extract;
 * the reference block; the author; the book's last sentence above the form.
 */
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
        <Misreading content={c.misreading} regionLabel={c.a11y.misreadingRegion} />
        <TheReading day={c.knowTheDay} content={c.reading} />
        <BeforeWeBegin content={c.map} regionLabel={c.a11y.evidenceRegion} />
        <TheBook content={c.book} systemsIntro={c.map.systemsIntro} />
        <CaseEvidence content={c.cases} regionLabel={c.a11y.casesRegion} />
        <ExcerptTeaser locale={locale} />
        {ed.audioUrl ? <Listen locale={locale} /> : null}
        <MapOfBook content={c.map} regionLabel={c.a11y.mapRegion} />
        <Author locale={locale} content={c.author} />
        <Companion locale={locale} />
        <Closing content={c.closing} />
        <Launch locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd locale={locale} />
    </>
  );
}
