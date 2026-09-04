import type { Locale } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function AboutBook({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.about;
  return (
    <section id="about" className="bg-page border-y border-[var(--rule)]" aria-labelledby="about-title">
      <div className="container-book py-[var(--section)]">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-red mb-4">{a.eyebrow}</p>
              <h2 id="about-title" className="serif-title text-[clamp(2.2rem,5vw,3.6rem)]">{a.title}</h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={100}>
              <div className="prose-book">
                {a.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </Reveal>
            <Reveal delay={150} className="mt-12 border-l-[1.5px] border-red pl-6 md:pl-8">
              <p className="eyebrow eyebrow-red mb-3">{a.auditEyebrow}</p>
              <p className="font-mono text-[0.95rem] leading-[1.7] max-w-xl">{a.audit}</p>
            </Reveal>
            <Reveal delay={200} className="mt-12">
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6 max-w-2xl border-t border-[var(--rule)] pt-6">
                {a.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="mono-label">{f.label}</dt>
                    <dd className="serif-title text-3xl mt-2">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={200} className="mt-12">
              <p className="eyebrow eyebrow-quiet mb-3">{a.readersEyebrow}</p>
              <p className="prose-book text-ink-soft">{a.readers}</p>
            </Reveal>
          </div>
        </div>

        {/* A map of the book, after page 11 */}
        <Reveal className="mt-[var(--section)]">
          <p className="eyebrow eyebrow-red mb-3">{a.mapEyebrow}</p>
          <h3 className="serif-title text-[clamp(2rem,4.5vw,3.2rem)]">{a.mapTitle}</h3>
          <p className="eyebrow mt-4 text-ink max-w-md leading-relaxed">{a.mapSubtitle}</p>
          <ol className="mt-10 grid sm:grid-cols-2 gap-x-12 border-t border-[var(--rule)]">
            {a.chapters.map((ch) => (
              <li key={ch.number} className="flex gap-5 py-4 border-b border-[var(--rule)]">
                <span className="font-mono text-sm text-red pt-[2px] w-6 shrink-0">{ch.number}</span>
                <span className="din-head text-[0.78rem] tracking-[0.1em] leading-[1.5]">{ch.title}</span>
              </li>
            ))}
          </ol>
          <p className="eyebrow eyebrow-red text-center mt-8">{a.mapFooter}</p>
        </Reveal>
      </div>
    </section>
  );
}
