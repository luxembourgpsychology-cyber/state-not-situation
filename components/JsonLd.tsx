import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, localeUrl } from "@/lib/i18n";

/** Book + Person structured data. Only facts that exist in site.config.ts are emitted. */
export function JsonLd({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const ed = siteConfig.editions[locale];
  const person = {
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#author`,
    name: siteConfig.author.name,
    ...(siteConfig.author.website ? { url: siteConfig.author.website } : {}),
  };
  const book = {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${localeUrl(locale)}#book`,
    name: c.meta.title,
    alternativeHeadline: c.hero.subtitle,
    description: c.meta.description,
    author: person,
    publisher: { "@type": "Organization", name: siteConfig.publisher.name, address: siteConfig.publisher.place },
    inLanguage: siteConfig.languages[locale].htmlLang,
    bookFormat: "https://schema.org/Paperback",
    image: `${siteConfig.siteUrl}/images/cover-front.jpg`,
    url: localeUrl(locale),
    ...(ed.isbn ? { isbn: ed.isbn } : {}),
    ...(ed.publicationDate ? { datePublished: ed.publicationDate } : {}),
    ...(ed.amazonUrl ? { offers: { "@type": "Offer", url: ed.amazonUrl, availability: "https://schema.org/InStock" } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([book, { "@context": "https://schema.org", ...person }]) }} />;
}
