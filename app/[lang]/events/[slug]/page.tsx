import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { eventBySlug, eventLists, ext, extensionOn, isDraft } from "@/lib/extension";
import { bookingLink } from "@/lib/extension/rules";
import { eventFacts } from "@/components/extension/EventParts";
import { OutboundLink } from "@/components/extension/OutboundLink";
import { ScopeNote, Shell } from "@/components/extension/Shell";

/** Only real, approved, complete records get a page. With none, there are none. */
export const dynamicParams = false;
export function generateStaticParams() {
  const { upcoming, past } = eventLists();
  return [...upcoming, ...past].map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const e = eventBySlug(slug);
  if (!extensionOn(lang as Locale) || !e) return {};
  const url = `${siteConfig.siteUrl}/${lang}/events/${e.slug}`;
  return {
    title: e.title,
    description: e.description[0],
    alternates: { canonical: url, languages: { en: url, "x-default": url } },
    robots: isDraft() ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/**
 * ONE EVENT. Facts first, then the booking action — which exists only when
 * the record is bookable and complete (provider, https checkout, terms, and a
 * verified total unless free). Sold out, cancelled and past keep their facts
 * and lose the button. Paying, and confirming, happen at the provider.
 */
export default async function EventPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const e = eventBySlug(slug);
  if (!extensionOn(locale) || !e) notFound();
  const c = getContent(locale);
  const x = ext().events;
  const now = new Date();
  const { state, rows } = eventFacts(e, now);
  const booking = bookingLink(e, now);
  const photo = siteConfig.press.authorPhoto;

  const action = booking ? (
    <div>
      <OutboundLink href={booking.url} event="event_booking_clicked" props={{ event: e.slug, provider: booking.provider, locale }} className="btn btn-solid">
        {x.bookWith} {booking.provider}
      </OutboundLink>
      <p className="mt-3 text-sm text-quiet">
        {x.providerNotice}{" "}
        <a href={booking.termsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-red">{x.termsLabel}</a>
      </p>
    </div>
  ) : null;

  return (
    <Shell locale={locale}>
      <article>
        <header className="section">
          <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
            <div className="md:col-span-3">
              <Link href={`/${locale}/events`} className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red">← {x.back}</Link>
            </div>
            <div className="md:col-span-8">
              <p className="t-label t-label-red">{e.format}</p>
              <h1 className="t-display mt-3">{e.title}</h1>
              <p className="t-mono text-ink mt-[var(--space-block)]">{x.status[state]}</p>

              <dl className="mt-[var(--space-block)] border-t border-[var(--rule)]">
                {rows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-b border-[var(--rule)]">
                    <dt className="t-mono pt-1">{label}</dt>
                    <dd className="t-body">{value}</dd>
                  </div>
                ))}
              </dl>

              {state === "cancelled" && e.cancellationInformation ? (
                <ScopeNote className="mt-[var(--space-block)]"><span className="t-mono block mb-1">{x.cancellationLabel}</span>{e.cancellationInformation}</ScopeNote>
              ) : null}
              {state === "past" ? (
                <p className="mt-[var(--space-block)]"><Link href={`/${locale}/events`} className="btn">{x.seeUpcoming}</Link></p>
              ) : null}
              {action ? <div className="mt-[var(--space-block)]">{action}</div> : null}
            </div>
          </div>
        </header>

        <section className="pb-[var(--space-section)]" aria-label={e.title}>
          <div className="container-book grid md:grid-cols-12 gap-x-10">
            <div className="md:col-span-8 md:col-start-4">
              {e.whoFor ? (
                <>
                  <h2 className="t-mono">{x.whoFor}</h2>
                  <p className="t-body mt-2">{e.whoFor}</p>
                </>
              ) : null}
              <h2 className="t-mono mt-[var(--space-block)]">{x.whatHappens}</h2>
              <div className="t-body mt-2">{e.description.map((p) => <p key={p}>{p}</p>)}</div>
              <h2 className="t-mono mt-[var(--space-block)]">{x.included}</h2>
              <ul className="t-body mt-2">
                {e.includedItems.map((t) => (
                  <li key={t} className="flex gap-3"><span aria-hidden="true" className="text-quiet">—</span><span>{t}</span></li>
                ))}
              </ul>
              <dl className="mt-[var(--space-block)] border-t border-[var(--rule)]">
                {[[x.rows.access, e.accessInformation], [x.rows.contact, e.organiserContact]].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-b border-[var(--rule)]">
                    <dt className="t-mono pt-1">{label}</dt>
                    <dd className="t-body">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-[var(--space-section)] grid sm:grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-start">
                {photo ? <Image src={photo} alt={c.author.photoAlt} width={1200} height={1200} sizes="120px" className="w-[120px] h-auto" /> : null}
                <div>
                  <p className="t-lead">{siteConfig.author.name}</p>
                  <p className="t-mono mt-1">{c.hero.credential}</p>
                  <p className="t-body mt-[var(--space-tight)]">{c.author.bio}</p>
                </div>
              </div>

              {action ? <div className="mt-[var(--space-section)]">{action}</div> : null}
            </div>
          </div>
        </section>
      </article>
      {state !== "past" ? <EventJsonLd e={e} locale={locale} cancelled={state === "cancelled"} /> : null}
    </Shell>
  );
}

/**
 * Structured data for a real, approved, upcoming event only — never on a
 * preview, never for a past one. No offer is emitted: schema.org wants a
 * numeric price, and the site holds the verified price as the sentence a
 * reader sees. Add one only with a verified number.
 */
function EventJsonLd({ e, locale, cancelled }: { e: NonNullable<ReturnType<typeof eventBySlug>>; locale: Locale; cancelled: boolean }) {
  if (isDraft()) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.startAt,
    endDate: e.endAt,
    eventStatus: cancelled ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: e.venueOrOnline },
    description: e.description.join(" "),
    inLanguage: e.language,
    performer: { "@type": "Person", name: siteConfig.author.name },
    url: `${siteConfig.siteUrl}/${locale}/events/${e.slug}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
