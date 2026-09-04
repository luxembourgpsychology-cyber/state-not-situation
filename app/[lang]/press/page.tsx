import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { alternatesFor, getContent, localeUrl } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const c = getContent(locale);
  return {
    title: c.meta.pressTitle,
    description: c.meta.pressDescription,
    alternates: { canonical: localeUrl(locale, "/press"), languages: alternatesFor("/press") },
  };
}

export default async function PressPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!siteConfig.press.enabled) notFound();
  const c = getContent(locale);
  const p = c.press;
  const ed = siteConfig.editions[locale];
  const facts = p.facts.map((f) => (f.label === "ISBN" && ed.isbn ? { ...f, value: ed.isbn } : f));

  return (
    <>
      <Nav locale={locale} variant="page" />
      <main id="main" className="bg-page border-t-[6px] border-red">
        <div className="container-book py-16 md:py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="eyebrow eyebrow-red mb-4">{p.eyebrow}</p>
            <h1 className="serif-title text-[clamp(2.2rem,5vw,3.6rem)]">{p.title}</h1>
            <div className="mt-10 max-w-[240px]">
              <Image src="/images/cover-front.jpg" alt={c.hero.coverAlt} width={1200} height={1800} sizes="240px" className="w-full h-auto shadow-[0_18px_50px_-24px_rgba(17,17,17,0.45)]" />
            </div>
            <div className="mt-10">
              <p className="mono-label mb-2">{p.contactHeading}</p>
              <p className="font-serif text-xl">{p.contactBody}</p>
              <a href={`mailto:${siteConfig.author.pressEmail}`} className="btn mt-2">{siteConfig.author.pressEmail}</a>
            </div>
          </div>

          <div className="md:col-span-8 md:col-start-5 space-y-16">
            <p className="prose-book">{p.intro}</p>

            <section aria-labelledby="press-downloads">
              <h2 id="press-downloads" className="eyebrow eyebrow-red mb-4">{p.assetsHeading}</h2>
              <ul className="border-t border-[var(--rule)]">
                {p.assets.map((a) => (
                  <li key={a.file} className="border-b border-[var(--rule)]">
                    <a href={a.file} download className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:text-red">
                      <span className="font-body text-lg">{a.label}</span>
                      <span className="font-mono text-xs text-quiet">{a.note}</span>
                    </a>
                  </li>
                ))}
                {siteConfig.press.authorPhoto ? (
                  <li className="border-b border-[var(--rule)]">
                    <a href={siteConfig.press.authorPhoto} download className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:text-red">
                      <span className="font-body text-lg">{c.author.title}</span>
                      <span className="font-mono text-xs text-quiet">JPEG</span>
                    </a>
                  </li>
                ) : (
                  <li className="border-b border-[var(--rule)] py-4 font-mono text-sm text-quiet">{p.photoUnavailable}</li>
                )}
                {siteConfig.press.pressKitZipUrl ? (
                  <li className="border-b border-[var(--rule)]"><a href={siteConfig.press.pressKitZipUrl} download className="block py-4 btn">Press kit (.zip)</a></li>
                ) : null}
              </ul>
            </section>

            <section aria-labelledby="press-description">
              <h2 id="press-description" className="eyebrow eyebrow-red mb-4">{p.descriptionHeading}</h2>
              <div className="prose-book">{p.description.map((t, i) => <p key={i}>{t}</p>)}</div>
            </section>

            <section aria-labelledby="press-bio">
              <h2 id="press-bio" className="eyebrow eyebrow-red mb-4">{p.bioHeading}</h2>
              <dl className="space-y-8">
                {p.bios.map((b) => (
                  <div key={b.label}>
                    <dt className="mono-label mb-2">{b.label}</dt>
                    <dd className="prose-book">{b.text}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="press-facts">
              <h2 id="press-facts" className="eyebrow eyebrow-red mb-4">{p.factsHeading}</h2>
              <dl className="border-t border-[var(--rule)]">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[8rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-b border-[var(--rule)]">
                    <dt className="mono-label pt-1">{f.label}</dt>
                    <dd className="font-body">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <p><Link href={`/${locale}`} className="btn">{p.back}</Link></p>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
