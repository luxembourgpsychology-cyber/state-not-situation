import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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

/** Written by lib/make-press-kit.mjs, so the size on the page cannot drift. */
function pressKit() {
  try {
    const m = JSON.parse(readFileSync(join(process.cwd(), "public/press/State-Not-Situation-press-kit.json"), "utf8"));
    return { files: m.files as number, megabytes: m.megabytes as number };
  } catch {
    return null;
  }
}

const colour = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;
const RAIL = ["var(--time)", "var(--attention)", "var(--safety)"];

/**
 * The press page answers a journalist's first four questions — title, author,
 * date, ISBN — in the first screen, and then carries the reference material
 * the home page sheds: the sixteen-chapter map printed on page 11 with its own
 * colour keys and rail, the page 13 passage on the three systems, and page
 * 226 on how the book's sources are set out.
 */
export default async function PressPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!siteConfig.press.enabled) notFound();
  const c = getContent(locale);
  const p = c.press;
  const ed = siteConfig.editions[locale];
  const facts = p.facts.map((f) => (f.label.startsWith("ISBN") && ed.isbn ? { ...f, value: ed.isbn } : f));
  const photo = siteConfig.press.authorPhoto;
  const bios = p.bios.filter((b) => !b.text.startsWith("[COPY NEEDED"));
  const assets = p.assets.filter((a) => (a.file.includes("author-photo") ? Boolean(photo) : true));
  const kit = pressKit();

  return (
    <>
      <Nav locale={locale} content={c} variant="page" excerptAvailable={ed.excerptAvailable} />
      <main id="main" className="bg-page">
        <div className="container-book section grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-4">
            <p className="t-label t-label-red">{p.eyebrow}</p>
            <h1 className="t-head mt-3">{p.title}</h1>

            <div className="mt-[var(--space-block)] max-w-[240px]">
              <Image
                src="/images/cover-front.jpg"
                alt={c.hero.coverAlt}
                width={1200}
                height={1800}
                sizes="240px"
                className="cover-figure"
              />
            </div>

            {photo ? (
              <div className="mt-[var(--space-block)] max-w-[240px]">
                <Image src={photo} alt={c.author.photoAlt} width={1200} height={1200} sizes="240px" className="w-full h-auto" />
                <p className={`t-mono mt-2 ${p.photoCredit.startsWith("[COPY NEEDED") ? "opacity-60" : ""}`}>{p.photoCredit}</p>
              </div>
            ) : null}

            <div className="mt-[var(--space-block)]">
              <p className="t-mono mb-2">{p.contactHeading}</p>
              <p className="t-lead">{siteConfig.author.name}</p>
              <a href={`mailto:${siteConfig.author.pressEmail}`} className="btn mt-2 break-all">
                {siteConfig.author.pressEmail}
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-[var(--space-section)]">
            <div>
              <p className="t-body">{p.intro}</p>
              {siteConfig.press.pressKitZipUrl && kit ? (
                <p className="mt-[var(--space-block)] flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <a href={siteConfig.press.pressKitZipUrl} download className="btn btn-solid">{p.kitLabel}</a>
                  <span className="t-mono">ZIP · {kit.megabytes} MB</span>
                </p>
              ) : null}
            </div>

            <section aria-labelledby="press-facts">
              <h2 id="press-facts" className="t-label t-label-red mb-4">{p.factsHeading}</h2>
              <dl className="border-t border-[var(--rule)]">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-b border-[var(--rule)]">
                    <dt className="t-mono pt-1">{f.label}</dt>
                    <dd className="t-body">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="press-description">
              <h2 id="press-description" className="t-label t-label-red mb-4">{p.descriptionHeading}</h2>
              <div className="t-body">{p.description.map((t, i) => <p key={i}>{t}</p>)}</div>
            </section>

            {bios.length ? (
              <section aria-labelledby="press-bio">
                <h2 id="press-bio" className="t-label t-label-red mb-4">{p.bioHeading}</h2>
                <dl className="space-y-[var(--space-block)]">
                  {bios.map((b) => (
                    <div key={b.label}>
                      <dt className="t-mono mb-2">{b.label}</dt>
                      <dd className="t-body">{b.text}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <section aria-labelledby="press-downloads">
              <h2 id="press-downloads" className="t-label t-label-red mb-4">{p.assetsHeading}</h2>
              <ul className="border-t border-[var(--rule)]">
                {assets.map((a) => (
                  <li key={a.file} className="border-b border-[var(--rule)]">
                    <a href={a.file} download className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:text-red">
                      <span className="t-body">{a.label}</span>
                      <span className="t-mono">{a.note}</span>
                    </a>
                  </li>
                ))}
                {!photo ? (
                  <li className="border-b border-[var(--rule)] py-4 t-mono">{p.photoUnavailable}</li>
                ) : null}
              </ul>
            </section>

            {/* Page 11, whole: the map, its colour keys and its rail. */}
            <section aria-labelledby="press-map">
              <h2 id="press-map" className="t-label t-label-red mb-4">{p.mapHeading}</h2>
              <p className="t-label text-ink">{p.mapLabel}</p>
              <p className="t-head text-red">{p.mapTitle}</p>
              <p className="t-body mt-3">{p.mapLine}</p>

              <ul className="map-keys mt-[var(--space-block)]" aria-hidden="true">
                {c.variables.loops.map((loop) => (
                  <li key={loop.key}>
                    <span className="map-keys__rule" style={{ background: colour[loop.key] }} />
                    <span className="t-label" style={{ color: colour[loop.key] }}>{loop.name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-5 sm:gap-8">
                <div className="map-rail" aria-hidden="true">
                  {RAIL.map((col) => <span key={col} style={{ background: col }} />)}
                </div>
                {/* As printed: 00 to 07 down the left column, 08 to 15 down the right. */}
                <ol className="flex-1 min-w-0 grid sm:grid-cols-2 sm:grid-flow-col sm:grid-rows-8 gap-x-12">
                  {p.chapters.map((ch) => (
                    <li key={ch.number} className="flex items-baseline gap-4 py-3">
                      <span className="font-mono text-[0.78rem] text-red w-6 shrink-0">{ch.number}</span>
                      <span className="t-label text-ink leading-[1.5] flex-1">{ch.title}</span>
                      <span className="t-mono shrink-0">{ch.page}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="t-body mt-[var(--space-block)]">{p.sortingTool}</p>
            </section>

            <section aria-labelledby="press-sources">
              <h2 id="press-sources" className="t-label t-label-red mb-4">{p.sourcesHeading}</h2>
              <div className="t-body">{p.sources.map((t, i) => <p key={i}>{t}</p>)}</div>
              <p className="t-mono mt-4">{p.sourcesLabel}</p>
            </section>

            <section aria-labelledby="press-credits">
              <h2 id="press-credits" className="t-label t-label-red mb-4">{p.creditsHeading}</h2>
              <dl className="border-t border-[var(--rule)]">
                {p.credits.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-b border-[var(--rule)]">
                    <dt className="t-mono pt-1">{f.label}</dt>
                    <dd className="t-body">{f.value}</dd>
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
