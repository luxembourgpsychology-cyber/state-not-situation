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
 * RESEARCH AND LIMITS — short, public, and in the website's own words.
 *
 * Three movements, as the author's brief of 1 October 2026 sets them: the
 * book's organising ideas are questions, not measurements; its evidence is
 * graded by the book's own markers (the labels printed on page 7, shown as
 * the book's, not as a certificate for this site), and related evidence is
 * not proof that an exercise works; and the situation still matters, which
 * is a chapter of the book, cited by its printed title and page.
 *
 * Nothing here is quoted from the book. The passages that only made sense in
 * the book's own context were replaced, so no page number sits beside new
 * prose. Not the Scientific Heartbeat, and not a substitute for it.
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
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <h2 id="research-questions" className="t-head">{x.questions.title}</h2>
            {/* The three words as the home page sets them, one size down: the
                one thing on this page to see before reading. */}
            <p className="mt-[var(--space-block)] flex flex-wrap gap-x-6" aria-hidden="true">
              {c.variables.loops.map((l) => (
                <span key={l.key} className="t-display" style={{ color: `var(--${l.key})` }}>{l.name}.</span>
              ))}
            </p>
            <p className="t-body mt-[var(--space-tight)]">{x.questions.body}</p>
          </div>
        </div>
      </section>

      <section className="pb-[var(--space-section)]" aria-labelledby="research-evidence">
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <h2 id="research-evidence" className="t-head">{x.evidence.title}</h2>
            <p className="t-body mt-[var(--space-tight)]">{x.evidence.body}</p>
            <p className="t-mono mt-[var(--space-block)]">{x.evidence.markersLabel}</p>
            <ul className="pulse-row mt-3">
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
            <ScopeNote className="mt-[var(--space-block)]">{x.evidence.related}</ScopeNote>
          </div>
        </div>
      </section>

      <section className="pb-[var(--space-section)]" aria-labelledby="research-situation">
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <h2 id="research-situation" className="t-head">{x.situation.title}</h2>
            <p className="t-body mt-[var(--space-tight)]">{x.situation.body}</p>
            {ch13 ? (
              <p className="mt-[var(--space-block)] flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="t-mono">{x.situation.chapterLabel}</span>
                <span className="t-mono text-red">{ch13.number}</span>
                <span className="t-label text-ink">{ch13.title}</span>
                <span className="t-mono">{ch13.page}</span>
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
