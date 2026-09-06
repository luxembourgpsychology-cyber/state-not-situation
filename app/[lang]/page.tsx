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
import { Investigation } from "@/components/Investigation";
import { ThreeSystems } from "@/components/ThreeSystems";
import { Author } from "@/components/Author";
import { Closing } from "@/components/Closing";
import { Companion } from "@/components/Companion";
import { Launch } from "@/components/Launch";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * The page follows the book's own front matter, in the book's order, then
 * the extract, then the reference material: the cover; page 10; page 11,
 * the Investigation; page 13, the three checks and the question; page 13's
 * markers; the author's two lines; the extract; four case pages; the three
 * systems and page 226; the author; the book's last sentence above the form.
 * Decided in translation/EDITORIAL-POSITIONING.md and translation/HOOK-DECISION.md,
 * then cut back by the author on 6 September 2026.
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
        <Investigation content={c.map} />
        <TheReading content={c.reading} />
        <BeforeWeBegin content={c.map} regionLabel={c.a11y.evidenceRegion} />
        <TheBook content={c.book} />
        <ExcerptTeaser locale={locale} />
        {ed.audioUrl ? <Listen locale={locale} /> : null}
        <CaseEvidence content={c.cases} regionLabel={c.a11y.casesRegion} />
        <ThreeSystems content={c.map} regionLabel={c.a11y.mapRegion} />
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
