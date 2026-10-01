import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { ext, extensionOn } from "@/lib/extension";
import { BookActions, ScopeNote, Shell } from "@/components/extension/Shell";
import { MockupBar, MOMENTS, Trace } from "../_mockup/parts";

export const metadata: Metadata = { title: "Explore — idea 2", robots: { index: false, follow: false } };

/**
 * MOCKUP 2 — ONE MOMENT PER SCREEN. Each moment fills a phone screen, the
 * way a story does: its pulse, a big time, one big sentence, one short line,
 * and the choice right there. Scrolling is the only gesture; nothing moves
 * on its own and nothing snaps.
 */
export default async function Idea2({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
  const x = ext().explore;

  return (
    <Shell locale={locale}>
      <MockupBar n={2} title="One moment per screen" />

      {/* Short, so the first moment is already on the first screen. */}
      <header className="pt-[var(--space-block)] pb-[var(--space-tight)]">
        <div className="container-book">
          <p className="t-label t-label-red">{x.eyebrow}</p>
          <h1 className="t-head mt-3">{x.title}</h1>
          <p className="t-mono mt-3">{x.sceneLabel}</p>
        </div>
      </header>

      {MOMENTS.map((m, i) => {
        const s = x.scenes.find((sc) => sc.id === m.id)!;
        const next = MOMENTS[i + 1];
        return (
          <section key={m.id} id={`s-${m.id}`} className="ext-screen border-t border-[var(--rule)]" aria-labelledby={`s-${m.id}-t`}>
            <div className="container-book">
              <Trace kind={m.id} className="w-28 h-auto" />
              <p className="ext-stamp mt-4">{m.time}</p>
              <h2 id={`s-${m.id}-t`} className="t-display mt-3">{m.line}</h2>
              <p className="t-body mt-[var(--space-tight)] text-ink-soft">{m.short}</p>

              {s.options.length ? (
                <div className="mt-[var(--space-block)]">
                  <p className="t-lead">{s.prompt}</p>
                  <div className="ext-choices mt-3 flex flex-col items-start gap-1">
                    {s.options.map((o) => (
                      <details key={o} className="w-full">
                        <summary className="btn">{o}</summary>
                        <Turn s={s} boundary={x.boundary} />
                      </details>
                    ))}
                  </div>
                </div>
              ) : (
                <details className="mt-[var(--space-block)]">
                  <summary className="btn btn-red">{s.revealLabel}</summary>
                  <Turn s={s} boundary={x.boundary} />
                </details>
              )}

              <p className="mt-[var(--space-block)]">
                {next ? <a href={`#s-${next.id}`} className="t-mono text-ink hover:text-red">↓ {next.time}</a> : null}
              </p>
            </div>
          </section>
        );
      })}

      <section className="ext-screen border-t border-[var(--rule)]" aria-labelledby="s-end">
        <div className="container-book">
          <Trace kind="message" className="w-28 h-auto" />
          <h2 id="s-end" className="t-display mt-4">{x.endTitle}</h2>
          <p className="t-lead mt-[var(--space-tight)]">{x.endText}</p>
          <div className="mt-[var(--space-block)]"><BookActions locale={locale} /></div>
        </div>
      </section>
    </Shell>
  );
}

function Turn({ s, boundary }: { s: ReturnType<typeof ext>["explore"]["scenes"][number]; boundary: string }) {
  return (
    <div className="mt-4 mb-[var(--space-block)]">
      {s.revealTime ? (
        <>
          <Trace kind="morning" className="w-28 h-auto" />
          <p className="ext-stamp mt-3">{s.revealTime}</p>
        </>
      ) : null}
      <p className="t-lead text-red mt-3">{s.reveal}</p>
      <p className="t-body mt-[var(--space-tight)]">{s.question}</p>
      <ScopeNote className="mt-[var(--space-block)]">{boundary}</ScopeNote>
    </div>
  );
}
