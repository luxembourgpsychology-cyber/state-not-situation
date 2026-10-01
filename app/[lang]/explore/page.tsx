import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { ext, extensionMetadata, extensionOn, visibleOffers } from "@/lib/extension";
import { BookActions, PageHead, Shell } from "@/components/extension/Shell";
import { SceneList } from "@/components/extension/SceneList";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) return {};
  // ?scene= is a state of this page, never a page of its own: one canonical.
  return extensionMetadata(locale, "/explore", "explore");
}

/**
 * EXPLORE — three short scenes for someone who has never read the book.
 *
 * A taste, not the book: one invented scene, one optional choice or reveal,
 * one question, and the boundary line before any link. No score, no result,
 * nothing asked of the visitor and nothing kept. The page is static; the
 * scene in the address is read in the browser.
 */
export default async function ExplorePage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
  const c = getContent(locale);
  const x = ext().explore;
  const photo = siteConfig.press.authorPhoto;
  const teams = visibleOffers().some((o) => o.id === "teams");

  return (
    <Shell locale={locale}>
      <PageHead eyebrow={x.eyebrow} title={x.title}>
        <p className="t-body">{x.intro}</p>
      </PageHead>

      <section aria-label={x.listLabel} className="pb-[var(--space-section)]">
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <SceneList
              scenes={x.scenes}
              locale={locale}
              labels={{
                listLabel: x.listLabel,
                sceneLabel: x.sceneLabel,
                stepIn: x.stepIn,
                close: x.close,
                back: x.back,
                chosen: x.chosen,
                dayLabel: x.dayLabel,
                morningTime: x.morningTime,
                morningHint: x.morningHint,
                boundary: x.boundary,
              }}
              ending={<BookActions locale={locale} />}
              teamsLink={teams ? <Link href={`/${locale}/invite#teams`} className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red">{x.teamsLink}</Link> : null}
            />
          </div>
        </div>
      </section>

      {/* The way out: a sentence about the book (website copy, not a quotation), the author, the book. */}
      <section className="section" aria-labelledby="explore-end">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <p className="t-label t-label-red">{x.endEyebrow}</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="explore-end" className="t-head">{x.endTitle}</h2>
            <p className="t-body mt-[var(--space-tight)]">{x.endText}</p>

            <div className="mt-[var(--space-section)] grid sm:grid-cols-[auto_1fr] gap-x-8 gap-y-[var(--space-block)] items-start">
              {photo ? (
                <Image src={photo} alt={c.author.photoAlt} width={1200} height={1200} sizes="160px" className="w-[160px] h-auto" />
              ) : null}
              <div>
                <p className="t-lead">{siteConfig.author.name}</p>
                <p className="t-mono mt-1">{c.hero.credential}</p>
                <p className="t-body mt-[var(--space-tight)]">{c.author.bio}</p>
              </div>
            </div>

            <div className="mt-[var(--space-block)]">
              <BookActions locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
