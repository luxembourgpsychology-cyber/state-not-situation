import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { ext, extensionMetadata, extensionOn, visibleOffers } from "@/lib/extension";
import type { OfferCopy } from "@/content/extension-types";
import { PageHead, ScopeNote, Shell } from "@/components/extension/Shell";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale) || !visibleOffers().length) return {};
  return extensionMetadata(locale, "/invite", "invite");
}

/**
 * INVITE IVANA — the paid-sessions page.
 *
 * Built like the press page, because the reader is the same kind of person:
 * an organiser who wants the facts quickly. An index of the four formats,
 * then the four in one template — who it is for, the proposed formats, what
 * it explores, one glimpse, what people take away, practicalities and scope —
 * each ending on the same action with its format already chosen. Every offer
 * is described before anyone is asked for anything. No fee appears.
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
      <PageHead eyebrow={x.eyebrow} title={x.title}>
        <p className="t-body">{x.intro}</p>
        <p className="mt-4 text-sm text-quiet">{x.availabilityNote}</p>
      </PageHead>

      {/* The index: four audiences, each a link to its own section. */}
      <nav aria-labelledby="invite-index" className="pb-[var(--space-section)]">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-4">
          <div className="md:col-span-3">
            <h2 id="invite-index" className="t-mono">{x.indexLabel}</h2>
          </div>
          <div className="md:col-span-8">
            <ol className="border-t border-[var(--rule)]">
              {offers.map((o, i) => (
                <li key={o.id} className="border-b border-[var(--rule)]">
                  <a href={`#${o.id}`} className="flex items-baseline gap-4 py-3 hover:text-red">
                    <span className="t-mono text-red shrink-0 w-7">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 min-w-0">
                      <span className="t-body block">{o.title}</span>
                      <span className="t-mono block mt-1">{o.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-[var(--space-block)]">
              <Link href={enquire("not_sure")} className="btn btn-red">{x.quoteLabel}</Link>
            </p>
          </div>
        </div>
      </nav>

      {offers.map((o, i) => (
        <Offer key={o.id} offer={o} number={i + 1} href={enquire(o.id)} labels={x} />
      ))}

      {/* Shared questions, answered once. */}
      <section className="section" aria-labelledby="invite-faq">
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
      <section className="section" aria-labelledby="invite-author">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)] items-start">
          <div className="md:col-span-3">
            {photo ? (
              <Image src={photo} alt={c.author.photoAlt} width={1200} height={1200} sizes="(max-width: 767px) 160px, 22vw" className="w-[160px] md:w-full md:max-w-[220px] h-auto" />
            ) : null}
          </div>
          <div className="md:col-span-8">
            <h2 id="invite-author" className="t-head">{siteConfig.author.name}</h2>
            <p className="t-mono mt-2">{c.hero.credential}</p>
            <p className="t-body mt-[var(--space-block)]">{longBio}</p>
            {siteConfig.press.enabled ? (
              <div className="mt-[var(--space-block)]">
                <Link href={`/${locale}/press`} className="btn">{x.pressLabel}</Link>
                <p className="mt-3 text-sm text-quiet">{x.pressNote}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Shell>
  );
}

/** One offer. All four share it, so no audience gets a thinner page. */
function Offer({ offer: o, number, href, labels: x }: { offer: OfferCopy; number: number; href: string; labels: ReturnType<typeof ext>["invite"] }) {
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
    <section id={o.id} className="section" aria-labelledby={`${o.id}-title`}>
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
        <div className="md:col-span-3">
          <p className="t-label t-label-red">{o.label}</p>
          <p className="t-mono mt-3">{String(number).padStart(2, "0")}</p>
          {!o.approvedForPublication ? <p className="t-mono mt-3">{x.draftOffer}</p> : null}
        </div>
        <div className="md:col-span-8">
          <h2 id={`${o.id}-title`} className="t-head">{o.title}</h2>
          <p className="t-lead mt-[var(--space-tight)]">{o.hook}</p>
          <p className="t-body mt-[var(--space-block)]">{o.description}</p>

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
      </div>
    </section>
  );
}
