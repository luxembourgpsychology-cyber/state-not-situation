import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Premise } from "@/components/Premise";
import { Variables } from "@/components/Variables";
import { Moments } from "@/components/Moments";
import { Evidence } from "@/components/Evidence";
import { ExcerptTeaser } from "@/components/ExcerptTeaser";
import { Listen } from "@/components/Listen";
import { Author } from "@/components/Author";
import { Closing } from "@/components/Closing";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

/**
 * Eight sections, the canonical architecture decided in brief/REDESIGN.md
 * against the author's brief: the book as an object; the premise and the
 * reading; the three variables; three moments; the evidence system; the
 * extract; the author; the book's last sentence and the one form.
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
          publicationDate={ed.publicationDate}
          excerptAvailable={ed.excerptAvailable}
        />
        <Premise premise={c.premise} reading={c.reading} />
        <Variables content={c.variables} />
        <Moments content={c.moments} />
        <Evidence content={c.evidence} />
        <ExcerptTeaser locale={locale} />
        {ed.audioUrl ? <Listen locale={locale} /> : null}
        <Author locale={locale} content={c.author} />
        <Closing locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd locale={locale} />
    </>
  );
}
