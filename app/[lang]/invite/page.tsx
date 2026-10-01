import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { ext, extensionMetadata, extensionOn, visibleOffers } from "@/lib/extension";
import type { OfferCopy } from "@/content/extension-types";
import { ScopeNote, Shell } from "@/components/extension/Shell";
import { OpenOnHash } from "@/components/extension/OpenOnHash";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale) || !visibleOffers().length) return {};
  return extensionMetadata(locale, "/invite", "invite");
}

/**
 * INVITE IVANA — the paid-sessions page, for someone who scans.
 *
 * A face and one sentence first: organisers book a person. Then the four
 * offers as four big lines — who it is for, the title, one short line, the
 * length in mono — each opening in place to the whole format: who it is for,
 * what it explores, a glimpse, what people take away, practicalities, scope,
 * and the action with its format already chosen. Everything is in the page;
 * nothing is asked of anyone before the format is described. No fee appears.
 */
export default async function InvitePage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  const offers = visibleOffers();
  if (!extensionOn(locale) || !offers.length) notFound();
  const c = getContent(locale);
  const x = ext().invite;
  const photo = siteConfig.press.authorPhoto;
  const longBio = c.press.bios.find((b) => b.label === "Long")?.text ?? c.author.bio;
  const enquire = (format: string) => `/${locale}/enquire?format=${format}&source=invite`;

  return (
    <Shell locale={locale}>
      <header className="section">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <p className="t-label t-label-red">{x.eyebrow}</p>
            {photo ? (
              <Image
                src={photo}
                alt={c.author.photoAlt}
                width={1200}
                height={1200}
                priority
                sizes="(max-width: 767px) 160px, 22vw"
                className="mt-4 w-[160px] md:w-full md:max-w-[220px] h-auto"
              />
            ) : null}
            <p className="t-mono mt-3">{siteConfig.author.name} · {c.hero.credential}</p>
          </div>
          <div className="md:col-span-8">
            <h1 className="t-display">{x.title}</h1>
            <p className="t-body mt-[var(--space-tight)]">{x.intro}</p>
            <p className="mt-3 text-sm text-quiet">{x.availabilityNote}</p>
            <p className="mt-[var(--space-block)]">
              <Link href={enquire("not_sure")} className="btn btn-red">{x.quoteLabel}</Link>
            </p>
          </div>
        </div>
      </header>

      <section aria-label={x.indexLabel} className="pb-[var(--space-section)]">
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <ol className="border-t border-[var(--rule)]">
              {offers.map((o) => (
                <Offer key={o.id} offer={o} href={enquire(o.id)} labels={x} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Shared questions, answered once. */}
      <section className="pb-[var(--space-section)]" aria-labelledby="invite-faq">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <h2 id="invite-faq" className="t-label t-label-red">{x.faqTitle}</h2>
          </div>
          <div className="md:col-span-8">
            <dl className="border-t border-[var(--rule)]">
              {x.faq.map((f) => (
                <div key={f.q} className="grid sm:grid-cols-[11rem_1fr] gap-x-4 gap-y-1 py-4 border-b border-[var(--rule)]">
                  <dt className="t-mono pt-1">{f.q}</dt>
                  <dd className="t-body">{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[var(--space-block)]">
              <Link href={enquire("not_sure")} className="btn btn-red">{x.quoteLabel}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* The author, for an organiser's programme notes, and the press kit. */}
      <section className="pb-[var(--space-section)]" aria-labelledby="invite-author">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-8 md:col-start-4">
            <h2 id="invite-author" className="t-head">{siteConfig.author.name}</h2>
            <p className="t-body mt-[var(--space-tight)]">{c.author.bio}</p>
            <details className="mt-4">
              <summary className="btn">{x.moreAbout}</summary>
              <p className="t-body mt-[var(--space-tight)]">{longBio}</p>
            </details>
            {siteConfig.press.enabled ? (
              <div className="mt-[var(--space-block)]">
                <Link href={`/${locale}/press`} className="btn">{x.pressLabel}</Link>
                <p className="mt-3 text-sm text-quiet">{x.pressNote}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <OpenOnHash locale={locale} />
    </Shell>
  );
}

/** One offer: four lines to scan, the whole format one tap away. All four share it. */
function Offer({ offer: o, href, labels: x }: { offer: OfferCopy; href: string; labels: ReturnType<typeof ext>["invite"] }) {
  const rows: [string, React.ReactNode][] = [
    [x.rows.audience, o.audience],
    [x.rows.formats, <ul key="f">{o.formats.map((f) => <li key={f}>{f}</li>)}</ul>],
    [x.rows.explore, (
      <ul key="e">
        {o.explore.map((t) => (
          <li key={t} className="flex gap-3"><span aria-hidden="true" className="text-quiet">—</span><span>{t}</span></li>
        ))}
      </ul>
    )],
    [x.rows.glimpse, o.glimpse],
    [x.rows.takeaway, o.takeaway],
    [x.rows.practical, o.practical],
  ];
  return (
    <li id={o.id} className="py-[var(--space-block)] border-b border-[var(--rule)]">
      <p className="t-label t-label-red">{o.label}</p>
      <h2 id={`${o.id}-title`} className="t-display mt-3">{o.title}</h2>
      <p className="t-lead mt-[var(--space-tight)]">{o.short}</p>
      <p className="t-mono text-ink mt-3">{o.duration} · {o.who}</p>
      {!o.approvedForPublication ? <p className="t-mono mt-2">{x.draftOffer}</p> : null}

      <details data-offer={o.id} className="mt-4">
        <summary className="btn btn-red" aria-describedby={`${o.id}-title`}>
          <span className="ext-closed">{x.seeFormat}</span>
          <span className="ext-open">{x.closeFormat}</span>
        </summary>
        <div className="mt-[var(--space-block)]">
          <p className="t-body">{o.hook}</p>
          <p className="t-body mt-[var(--space-tight)]">{o.description}</p>

          <dl className="mt-[var(--space-block)] border-t border-[var(--rule)]">
            {rows.map(([label, value]) => (
              <div key={label} className="grid sm:grid-cols-[11rem_1fr] gap-x-4 gap-y-1 py-4 border-b border-[var(--rule)]">
                <dt className="t-mono pt-1">{label}</dt>
                <dd className="t-body">{value}</dd>
              </div>
            ))}
          </dl>

          <ScopeNote className="mt-[var(--space-block)]">{o.scope}</ScopeNote>

          <p className="mt-[var(--space-block)]">
            <Link href={href} className="btn btn-red">{x.quoteLabel}</Link>
          </p>
        </div>
      </details>
    </li>
  );
}
