import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { publicationDate } from "@/lib/publication";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Premise } from "@/components/Premise";
import { Variables } from "@/components/Variables";
import { Moments } from "@/components/Moments";
import { Evidence } from "@/components/Evidence";
import { Foreword } from "@/components/Foreword";
import { ExcerptTeaser } from "@/components/ExcerptTeaser";
import { Names } from "@/components/Names";
import { Author } from "@/components/Author";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * The canonical architecture decided in brief/REDESIGN.md against the
 * author's brief: the book as an object; the premise and the reading; the
 * three variables; page 4's five readings of one day; the evidence system;
 * the foreword; the extract; the sixteen names; the author; the book's last
 * sentence and the one form.
 *
 * On 30 September 2026 two sections were rebuilt against v50 without moving
 * any of them: the CASE EVIDENCE panels and the chapter-opening instrument
 * readings are not in the book any more.
 *
 * The foreword joined the eight on 28 September 2026 without moving any of
 * them. It sits between the evidence markers and the extract because that is
 * where the printed book has it: front matter, pages v to ix, and the pilot
 * opens arabic page 1. It renders only when a passage has been cleared.
 *
 * Section ids are English in every language, by contract, so the language
 * switch can keep a reader in the section they are in.
 */
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  const c = getContent(locale);
  const ed = siteConfig.editions[locale];
  const published = isPublished(locale);

  return (
    <>
      <Nav locale={locale} content={c} excerptAvailable={ed.excerptAvailable} />
      <main id="main" aria-label={c.a11y.mainLandmark}>
        <Hero
          locale={locale}
          content={c}
          published={published}
          amazonUrl={ed.amazonUrl}
          publicationDate={publicationDate(locale)}
          excerptAvailable={ed.excerptAvailable}
        />
        <Premise premise={c.premise} reading={c.reading} />
        <Variables content={c.variables} />
        <Moments content={c.moments} />
        <Evidence content={c.evidence} />
        <Foreword content={c.foreword} />
        <ExcerptTeaser locale={locale} />
        <Names content={c.names} />
        <Author locale={locale} content={c.author} />
        <Closing locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd locale={locale} />
    </>
  );
}
