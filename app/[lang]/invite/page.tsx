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
 * INVITE IVANA — the paid-sessions page, understandable before it is poetic.
 *
 * A face and the questions the sessions explore first: organisers book a
 * person. Then each offer as an organiser reads it — who it is for, what it
 * is in plain words, the book's own name for it, what happens, how long, what
 * people take away — with its own enquiry link, before anything is opened.
 * "What happens in the session" holds the rest: what we explore, practical
 * details, scope. Everything is in the page; nothing is asked of anyone
 * before the format is described. No fee appears.
 */
export default async function InvitePage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  const offers = visibleOffers();
  if (!extensionOn(locale) || !offers.length) notFound();
  const c = getContent(locale);
  const x = ext().invite;
  const photo = siteConfig.press.authorPhoto;
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
            <p className="t-body mt-[var(--space-tight)]">{x.support}</p>
            <p className="mt-[var(--space-block)]">
              <Link href={enquire("not_sure")} className="btn btn-red">{x.primaryAction}</Link>
            </p>
            <p className="mt-3 text-sm text-quiet">{x.practicalLine}</p>
          </div>
        </div>
      </header>

      <section aria-labelledby="invite-sessions" className="pb-[var(--space-section)]">
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <h2 id="invite-sessions" className="t-head">{x.listTitle}</h2>
            <ol className="mt-[var(--space-block)] border-t border-[var(--rule)]">
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
                <div key={f.q} className="py-4 border-b border-[var(--rule)]">
                  <dt className="t-lead">{f.q}</dt>
                  <dd className="t-body mt-2">{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[var(--space-block)]">
              <Link href={enquire("not_sure")} className="btn btn-red">{x.primaryAction}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Meet Ivana: the short introduction; the full biographies stay on /press. */}
      <section className="pb-[var(--space-section)]" aria-labelledby="invite-author">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-8 md:col-start-4">
            <h2 id="invite-author" className="t-head">{x.authorTitle}</h2>
            <p className="t-body mt-[var(--space-tight)]">{x.authorBio}</p>
            <details className="mt-4">
              <summary className="btn">{x.authorMoreLabel}</summary>
              <p className="t-body mt-[var(--space-tight)]">{x.authorMore}</p>
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

/**
 * One offer. What an organiser needs to decide is visible: audience, plain
 * title, the book's name, description, duration, takeaway, the enquiry link.
 * All four share it, so no audience gets a thinner page.
 */
function Offer({ offer: o, href, labels: x }: { offer: OfferCopy; href: string; labels: ReturnType<typeof ext>["invite"] }) {
  return (
    <li id={o.id} className="py-[var(--space-block)] border-b border-[var(--rule)]">
      <p className="t-label t-label-red">{o.audience}</p>
      <h3 id={`${o.id}-title`} className="t-head mt-3">{o.title}</h3>
      <p className="t-mono mt-2">{o.series}</p>
      {!o.approvedForPublication ? <p className="t-mono mt-2">{x.draftOffer}</p> : null}

      <p className="t-body mt-[var(--space-tight)]">{o.description}</p>
      <ul className="mt-3">
        {o.durations.map((d) => <li key={d} className="t-mono text-ink">{d}</li>)}
      </ul>
      <div className="mt-[var(--space-tight)]">
        <p className="t-mono">{x.takeawayLabel}</p>
        <p className="t-body mt-1">{o.takeaway}</p>
      </div>

      <p className="mt-[var(--space-block)] flex flex-wrap items-center gap-x-8 gap-y-2">
        <Link href={href} className="btn btn-red">{o.action}</Link>
        {o.alternative ? (
          <Link href={o.alternative.href} className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red">{o.alternative.label}</Link>
        ) : null}
      </p>

      <details data-offer={o.id} className="mt-2">
        <summary className="btn">
          <span className="ext-closed">{x.openDetails}</span>
          <span className="ext-open">{x.closeDetails}</span>
          {/* Four buttons say the same words; this says which session. */}
          <span className="sr-only">: {o.series}</span>
        </summary>
        <div className="mt-[var(--space-block)]">
          {o.details ? <p className="t-body">{o.details}</p> : null}

          <h4 className="t-mono mt-[var(--space-block)]">{x.exploreLabel}</h4>
          <ul className="t-body mt-2">
            {o.explore.map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="text-quiet">—</span><span>{t}</span></li>
            ))}
          </ul>

          {o.takeawayDetail ? (
            <>
              <h4 className="t-mono mt-[var(--space-block)]">{o.takeawayDetail.label}</h4>
              <p className="t-body mt-2">{o.takeawayDetail.text}</p>
            </>
          ) : null}

          <h4 className="t-mono mt-[var(--space-block)]">{x.practicalLabel}</h4>
          <p className="t-body mt-2">{o.practical}</p>

          {o.scope ? <ScopeNote className="mt-[var(--space-block)]">{o.scope}</ScopeNote> : null}
        </div>
      </details>
    </li>
  );
}
