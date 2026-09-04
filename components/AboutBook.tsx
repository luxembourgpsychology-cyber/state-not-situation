import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";
import { EvidencePulse } from "./EvidencePulse";

/**
 * What the book is, the confidence markers it prints beside its own claims,
 * and the map of the sixteen chapters as it is set on page 11.
 */
export function AboutBook({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="about" className="bg-page border-y border-[var(--rule)]" aria-labelledby="about-title">
      <div className="container-book py-[var(--section)]">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-red mb-4">{content.eyebrow}</p>
              <h2 id="about-title" className="serif-title text-[clamp(2rem,4.6vw,3.2rem)]">{content.title}</h2>
              <p className="mono-label mt-6">{content.mapLine}</p>
            </Reveal>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={80}>
              <figure className="border-l-[1.5px] border-red pl-6 md:pl-8">
                <blockquote className="prose-book">{content.quote}</blockquote>
                <figcaption className="mono-label mt-4">{content.quoteSource}</figcaption>
              </figure>
              <div className="prose-book mt-10">
                {content.paragraphs.map((t, i) => (
                  <p key={i} className={t.startsWith("[COPY NEEDED") ? "text-quiet" : undefined}>{t}</p>
                ))}
              </div>
            </Reveal>

            {/* The confidence markers, as printed */}
            <Reveal delay={120} className="mt-14 md:mt-20">
              <p className="eyebrow eyebrow-red mb-4">{content.evidenceEyebrow}</p>
              <p className="prose-book text-ink-soft">{content.evidenceIntro}</p>
              <ul className="mt-10 grid gap-8 sm:grid-cols-3 border-t border-[var(--rule)] pt-8">
                {content.grades.map((g) => (
                  <li key={g.key}>
                    <EvidencePulse grade={g.key} className="w-24 h-auto" />
                    <p className="din-head text-[0.72rem] tracking-[0.2em] mt-3" style={{ color: `var(--grade-${g.key})` }}>
                      {g.label}
                    </p>
                    <p className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{g.shape}</p>
                    <p className="text-[0.95rem] leading-snug text-ink-soft">{g.meaning}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140} className="mt-14 border-l-[1.5px] border-red pl-6 md:pl-8">
              <p className="eyebrow eyebrow-red mb-3">{content.overreachEyebrow}</p>
              <p className="prose-book">{content.overreach}</p>
            </Reveal>

            <Reveal delay={160} className="mt-14">
              <p className="eyebrow eyebrow-quiet mb-3">{content.readersEyebrow}</p>
              <p className="prose-book text-quiet">{content.readers}</p>
            </Reveal>
          </div>
        </div>

        {/* Page 11, the map of the book */}
        <Reveal className="mt-[var(--section)]">
          <p className="eyebrow eyebrow-red mb-3">{content.mapEyebrow}</p>
          <h3 className="serif-title text-[clamp(2rem,4.5vw,3.2rem)]">{content.mapTitle}</h3>
          <ol className="mt-10 grid sm:grid-cols-2 gap-x-12 border-t border-[var(--rule)]">
            {content.chapters.map((ch) => (
              <li key={ch.number} className="flex items-baseline gap-4 py-3.5 border-b border-[var(--rule)]">
                <span className="font-mono text-[0.78rem] text-red w-6 shrink-0">{ch.number}</span>
                <span className="din-head text-[0.76rem] tracking-[0.09em] leading-[1.5] flex-1">{ch.title}</span>
                <span className="font-mono text-[0.72rem] text-quiet shrink-0">{ch.page}</span>
              </li>
            ))}
          </ol>
          <p className="mono-label mt-6">{content.mapFooter}</p>
          <p className="eyebrow eyebrow-red text-center mt-10">{content.mapSubtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
