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
 * ONE EVENT. Its state first, in a sentence; then the date and place; then
 * the booking action — which exists only when the record is bookable and
 * complete (provider, https checkout, terms, and a verified total unless
 * free). Sold out, cancelled and past keep their facts and lose the button.
 * Paying, and confirming a place, happen at the provider.
 */
export default async function EventPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const e = eventBySlug(slug);
  if (!extensionOn(locale) || !e) notFound();
  const c = getContent(locale);
  const x = ext().events;
  const now = new Date();
  const { state, rows, bookLine } = eventFacts(e, now);
  const booking = bookingLink(e, now);
  const photo = siteConfig.press.authorPhoto;
  const events = `/${locale}/events`;

  const action = booking ? (
    <div>
      <OutboundLink href={booking.url} event="event_booking_clicked" props={{ event: e.slug, provider: booking.provider }} className="btn btn-solid">
        {e.isFree ? x.register : x.bookTickets} {booking.provider}
      </OutboundLink>
      <p className="mt-3 text-sm text-quiet">{x.providerNotice}</p>
    </div>
  ) : null;

  // The state, said once, with the one next step it allows.
  const statusBlock =
    state === "bookable" ? null : (
      <div className="mt-[var(--space-block)]">
        <p className="t-lead">{x.statusLine[state]}</p>
        {state === "cancelled" && e.cancellationInformation ? (
          <ScopeNote className="mt-[var(--space-tight)]">{e.cancellationInformation}</ScopeNote>
        ) : null}
        {state === "sold_out" ? <p className="mt-3"><Link href={events} className="btn">{x.otherEvents}</Link></p> : null}
        {state === "past" ? <p className="mt-3"><Link href={events} className="btn">{x.seeUpcoming}</Link></p> : null}
      </div>
    );

  const section = (title: string, body: React.ReactNode) => (
    <section className="mt-[var(--space-block)]" aria-label={title}>
      <h2 className="t-mono">{title}</h2>
      <div className="t-body mt-2">{body}</div>
    </section>
  );

  return (
    <Shell locale={locale}>
      <article>
        <header className="section">
          <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
            <div className="md:col-span-3">
              <Link href={events} className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red">← {x.back}</Link>
            </div>
            <div className="md:col-span-8">
              <p className="t-label t-label-red">{e.format}</p>
              <h1 className="t-display mt-3">{e.title}</h1>
              {statusBlock}

              <section className="mt-[var(--space-block)]" aria-label={x.sections.when}>
                <h2 className="t-mono">{x.sections.when}</h2>
                <dl className="mt-2 border-t border-[var(--rule)]">
                  {rows.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3 border-b border-[var(--rule)]">
                      <dt className="t-mono pt-1">{label}</dt>
                      <dd className="t-body">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {action ? <div className="mt-[var(--space-block)]">{action}</div> : null}
            </div>
          </div>
        </header>

        <div className="pb-[var(--space-section)]">
          <div className="container-book grid md:grid-cols-12 gap-x-10">
            <div className="md:col-span-8 md:col-start-4">
              {section(x.sections.expect, e.description.map((p) => <p key={p}>{p}</p>))}
              {e.whoFor ? section(x.sections.whoFor, <p>{e.whoFor}</p>) : null}
              {section(x.sections.included, (
                <>
                  <ul>
                    {e.includedItems.map((t) => (
                      <li key={t} className="flex gap-3"><span aria-hidden="true" className="text-quiet">—</span><span>{t}</span></li>
                    ))}
                  </ul>
                  <p className="mt-[var(--space-tight)]">{bookLine}</p>
                </>
              ))}
              {section(x.sections.access, (
                <>
                  <p>{e.accessInformation}</p>
                  <p className="mt-[var(--space-tight)]"><span className="t-mono">{x.rows.contact}</span> {e.organiserContact}</p>
                </>
              ))}
              {e.bookingTermsUrl
                ? section(x.sections.terms, (
                    <a href={e.bookingTermsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-red">{x.termsLabel}</a>
                  ))
                : null}

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
        </div>
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
