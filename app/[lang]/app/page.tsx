import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { appCopy, appState, ext, extensionMetadata, extensionOn } from "@/lib/extension";
import { BookActions, PageHead, Shell } from "@/components/extension/Shell";
import { OutboundLink } from "@/components/extension/OutboundLink";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) return {};
  return extensionMetadata(locale, "/app", "app");
}

/**
 * THE APP'S DOORWAY. The STATE companion is a separate product built
 * elsewhere; this page owns only its status and, once there is one, its
 * approved address. No feature list, no date, no price, no guessed link.
 *
 * Its copy comes from one status (lib/extension appState), the same one the
 * home page's line, the header bar, the menu and the footer read, so a
 * development claim cannot survive the switch to live in one place only.
 */
export default async function AppPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
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
        <p className="t-lead">{copy.intro}</p>
        <p className="t-body mt-[var(--space-tight)]">{copy.body}</p>
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
          <div className="md:col-span-8">
            <BookActions locale={locale}>
              <Link href={`/${locale}/explore`} className="btn">{ext().discovery.items[0].label}</Link>
            </BookActions>
          </div>
        </div>
      </section>
    </Shell>
  );
}
