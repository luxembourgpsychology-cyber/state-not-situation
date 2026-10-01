import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { eventLists, ext, extensionMetadata, extensionOn, visibleOffers } from "@/lib/extension";
import { mailtoHref } from "@/lib/extension/rules";
import { PageHead, Shell } from "@/components/extension/Shell";
import { EventRow } from "@/components/extension/EventParts";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) return {};
  return extensionMetadata(locale, "/events", "events");
}

/**
 * EVENTS — for someone who wants to come, kept apart from someone who wants
 * to host. With no approved event the page says so, and offers two honest
 * doors: a short email asking about plans (a question, not a reservation or
 * a signup), and, separately, the organiser's page.
 *
 * No calendar, no countdown, no seats left. A list of real records from
 * content/events.ts, which is empty until one is approved.
 */
export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
  const x = ext().events;
  const now = new Date();
  const { upcoming, past } = eventLists(now);
  const ask = mailtoHref(siteConfig.author.pressEmail, x.attendee.subject, x.attendee.body);
  const invite = visibleOffers().length > 0;

  return (
    <Shell locale={locale}>
      <PageHead eyebrow={x.eyebrow} title={x.title}>
        <p className="t-body">{x.intro}</p>
      </PageHead>

      <section className="pb-[var(--space-section)]" aria-labelledby="events-upcoming">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <h2 id="events-upcoming" className="t-mono">{x.upcomingLabel}</h2>
          </div>
          <div className="md:col-span-8">
            {upcoming.length ? (
              <ol className="border-t border-[var(--rule)]">
                {upcoming.map((e) => <EventRow key={e.slug} e={e} href={`/${locale}/events/${e.slug}`} now={now} />)}
              </ol>
            ) : (
              <div className="border-t border-[var(--rule)] pt-[var(--space-block)]">
                <p className="t-head">{x.emptyTitle}</p>
                <p className="t-body mt-[var(--space-tight)]">{x.emptyText}</p>
              </div>
            )}

            {/* Attending: a question by email, nothing reserved, no list. */}
            <p className="mt-[var(--space-block)]">
              <a href={ask} className="btn btn-red">{x.attendee.label}</a>
            </p>
            <p className="mt-3 text-sm text-quiet">{x.attendee.hint}</p>
            <p className="mt-1 text-sm text-quiet font-mono break-words select-all">{siteConfig.author.pressEmail}</p>

            {/* Hosting: a different journey, said apart. */}
            {invite ? (
              <div className="mt-[var(--space-section)] pt-[var(--space-block)] border-t border-[var(--rule)]">
                <p className="t-lead">{x.hostQuestion}</p>
                <p className="mt-3"><Link href={`/${locale}/invite`} className="btn">{x.hostLabel}</Link></p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {past.length ? (
        <section className="section" aria-labelledby="events-past">
          <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
            <div className="md:col-span-3">
              <h2 id="events-past" className="t-mono">{x.pastLabel}</h2>
            </div>
            <div className="md:col-span-8">
              <ol className="border-t border-[var(--rule)]">
                {past.map((e) => <EventRow key={e.slug} e={e} href={`/${locale}/events/${e.slug}`} now={now} />)}
              </ol>
            </div>
          </div>
        </section>
      ) : null}
    </Shell>
  );
}
