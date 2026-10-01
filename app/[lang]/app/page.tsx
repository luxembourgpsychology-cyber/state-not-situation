import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { appCopy, appState, ext, extensionMetadata, extensionOn } from "@/lib/extension";
import { PageHead, Shell } from "@/components/extension/Shell";
import { ExcerptLink } from "@/components/ExcerptLink";
import { OutboundLink } from "@/components/extension/OutboundLink";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) return {};
  return extensionMetadata(locale, "/app", "app");
}

/**
 * THE APP'S DOORWAY. The STATE companion app is built elsewhere; this page
 * owns only its status and, once there is one, its approved address — and
 * says neither more nor less than that. No feature list, no date, no price,
 * no guessed link, and no build architecture in the visitor's words.
 *
 * Its copy comes from one status (lib/extension appState), the same one the
 * home page's line, the header bar, the menu and the footer read, so a
 * development claim cannot survive the switch to live in one place only.
 */
export default async function AppPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
  const c = getContent(locale);
  const x = ext().app;
  const state = appState();
  const copy = appCopy();

  return (
    <Shell locale={locale}>
      <PageHead
        eyebrow={x.eyebrow}
        title={x.title}
        aside={<p className="t-mono text-ink">{x.statusPrefix}: {copy.statusLabel}</p>}
      >
        <p className="t-body">{copy.body}</p>
        {copy.support ? <p className="mt-3 text-sm text-quiet">{copy.support}</p> : null}
        {state.status === "live" ? (
          <div className="mt-[var(--space-block)]">
            <OutboundLink href={state.url} event="app_outbound_clicked" props={{ source: "app_page", locale }} className="btn btn-red">
              {x.liveActionLabel}
            </OutboundLink>
            <p className="t-mono mt-3">{x.destinationPrefix} {state.host}</p>
          </div>
        ) : null}
      </PageHead>

      <section className="pb-[var(--space-section)]" aria-labelledby="app-meanwhile">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <h2 id="app-meanwhile" className="t-mono">{x.meanwhile}</h2>
          </div>
          <div className="md:col-span-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={`/${locale}/explore`} className="btn btn-red">{x.tryScene}</Link>
            {siteConfig.editions[locale].excerptAvailable ? (
              <ExcerptLink href={`/${locale}/read`} label={c.hero.readCta} locale={locale} />
            ) : null}
          </div>
        </div>
      </section>
    </Shell>
  );
}
