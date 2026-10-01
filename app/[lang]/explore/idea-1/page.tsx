import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { ext, extensionOn } from "@/lib/extension";
import { BookActions, PageHead, ScopeNote, Shell } from "@/components/extension/Shell";
import { DayLine, MockupBar, MOMENTS } from "../_mockup/parts";

export const metadata: Metadata = { title: "Explore — idea 1", robots: { index: false, follow: false } };

/**
 * MOCKUP 1 — THE DAY, DRAWN. The first screen shows the whole idea before
 * anything is opened: one pulse line across the day, jumping at each moment,
 * and under it each moment as a big time and one big sentence. Skim it in two
 * seconds; open a moment for the scene and the turn.
 */
export default async function Idea1({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
  const x = ext().explore;

  return (
    <Shell locale={locale}>
      <MockupBar n={1} title="The day, drawn" />
      <PageHead eyebrow={x.eyebrow} title={x.title}>
        <p className="t-body">{x.intro}</p>
      </PageHead>

      <section className="pb-[var(--space-section)]" aria-label={x.listLabel}>
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <p className="t-mono mb-6">{x.sceneLabel}</p>
            <DayLine />

            <ol className="mt-[var(--space-block)] border-t border-[var(--rule)]">
              {MOMENTS.map((m) => {
                const s = x.scenes.find((sc) => sc.id === m.id)!;
                return (
                  <li key={m.id} id={`m-${m.id}`} className="py-[var(--space-block)] border-b border-[var(--rule)]">
                    <p className="ext-stamp">{m.time}</p>
                    <h2 className="t-display mt-3">{m.line}</h2>
                    <details className="mt-4">
                      <summary className="btn btn-red">
                        <span className="ext-closed">{x.stepIn}</span>
                        <span className="ext-open">{x.close}</span>
                      </summary>
                      <div className="mt-[var(--space-block)]">
                        <p className="t-body">{s.scene}</p>
                        {s.options.length ? (
                          <>
                            <p className="t-lead mt-[var(--space-block)]">{s.prompt}</p>
                            <ul className="mt-3 t-body">{s.options.map((o) => <li key={o} className="flex gap-3"><span aria-hidden="true" className="text-quiet">—</span>{o}</li>)}</ul>
                          </>
                        ) : null}
                        <details className="mt-[var(--space-block)]">
                          <summary className="btn">{s.revealLabel}</summary>
                          <div className="mt-[var(--space-block)]">
                            {s.revealTime ? <p className="ext-stamp mb-3">{s.revealTime}</p> : null}
                            <p className="t-lead">{s.reveal}</p>
                            <p className="t-body mt-[var(--space-tight)]">{s.question}</p>
                            <ScopeNote className="mt-[var(--space-block)]">{x.boundary}</ScopeNote>
                            <div className="mt-[var(--space-block)]"><BookActions locale={locale} /></div>
                          </div>
                        </details>
                      </div>
                    </details>
                  </li>
                );
              })}
              {/* The morning is the evening's turn: shown, not told. */}
              <li className="py-[var(--space-block)] border-b border-[var(--rule)]">
                <p className="ext-stamp text-quiet">07:08</p>
                <p className="t-display mt-3 text-quiet" aria-hidden="true">?</p>
                <p className="t-body mt-2 text-quiet"><a href="#m-evening" className="underline underline-offset-4 hover:text-red">Open 22:36</a> to see the morning.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Shell>
  );
}
