import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { ext, extensionMetadata, extensionOn } from "@/lib/extension";
import { BookActions, PageHead, ScopeNote, Shell } from "@/components/extension/Shell";
import { EvidencePulse } from "@/components/EvidencePulse";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) return {};
  return extensionMetadata(locale, "/research", "research");
}

/**
 * RESEARCH AND LIMITS — short, public, and mostly the book's own words.
 *
 * Three movements. The framework is a sorting tool (page 7, printed). The
 * evidence is graded, by the book, in the three markers the home page
 * already draws (page 7), and its sources include the work that complicates
 * it (The Scientific Heartbeat, printed) — with one sentence of the site's
 * own about what related evidence does not prove. And the situation still
 * matters, which is a chapter of the book, not a disclaimer.
 *
 * Not the Scientific Heartbeat, and not a substitute for it.
 */
export default async function ResearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale)) notFound();
  const c = getContent(locale);
  const x = ext().research;
  const ch13 = c.press.chapters.find((ch) => ch.number === "13");

  return (
    <Shell locale={locale}>
      <PageHead eyebrow={x.eyebrow} title={x.title}>
        <p className="t-body">{x.intro}</p>
      </PageHead>

      <section className="pb-[var(--space-section)]" aria-labelledby="research-questions">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-4">
          <div className="md:col-span-3">
            <p className="t-mono">{x.questions.source}</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="research-questions" className="t-head">{x.questions.title}</h2>
            <ul className="mt-[var(--space-block)] flex flex-wrap gap-x-8 gap-y-2" aria-hidden="true">
              {c.variables.loops.map((l) => (
                <li key={l.key} className="t-label" style={{ color: `var(--${l.key})` }}>{l.name}</li>
              ))}
            </ul>
            <p className="t-body mt-[var(--space-tight)]">{c.press.sortingTool}</p>
          </div>
        </div>
      </section>

      <section className="pb-[var(--space-section)]" aria-labelledby="research-evidence">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-4">
          <div className="md:col-span-3">
            <p className="t-mono">{x.evidence.source}</p>
          </div>
          <div className="md:col-span-8">
            <h2 id="research-evidence" className="t-head">{x.evidence.title}</h2>
            <ul className="pulse-row mt-[var(--space-block)]">
              {c.evidence.grades.map((g) => (
                <li key={g.key} className="pulse-row__cell">
                  <EvidencePulse grade={g.key} className="pulse-row__svg" />
                  <div>
                    <p className="t-label" style={{ color: g.key === "low" ? "var(--grade-low-ink)" : `var(--grade-${g.key})` }}>{g.label}</p>
                    <p className="t-body mt-1">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="t-body mt-[var(--space-block)]">{c.evidence.closing}</p>
            <div className="t-body mt-[var(--space-block)]">
              {c.press.sources.map((t) => <p key={t}>{t}</p>)}
            </div>
            <p className="t-mono mt-3">{c.press.sourcesLabel}</p>
            <ScopeNote className="mt-[var(--space-block)]">{x.evidence.related}</ScopeNote>
          </div>
        </div>
      </section>

      <section className="pb-[var(--space-section)]" aria-labelledby="research-situation">
        <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-4">
          <div className="md:col-span-3">
            {ch13 ? <p className="t-mono">{x.situation.chapterLabel} · {ch13.page}</p> : null}
          </div>
          <div className="md:col-span-8">
            <h2 id="research-situation" className="t-head">{x.situation.title}</h2>
            <p className="t-body mt-[var(--space-tight)]">{x.situation.body}</p>
            {ch13 ? (
              <p className="mt-[var(--space-block)] flex items-baseline gap-4">
                <span className="t-mono text-red shrink-0">{ch13.number}</span>
                <span className="t-label text-ink">{ch13.title}</span>
              </p>
            ) : null}
            <div className="mt-[var(--space-section)]">
              <BookActions locale={locale}>
                <Link href={x.homeEvidence.href} className="btn">{x.homeEvidence.label}</Link>
              </BookActions>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
