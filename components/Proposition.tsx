import type { Locale } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/** The back cover, brought to the screen: the headline and the four-row table. */
export function Proposition({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.proposition;
  return (
    <section className="bg-page border-y border-[var(--rule)]" aria-labelledby="prop-title">
      <div className="container-book py-[var(--section)]">
        <Reveal>
          <p className="eyebrow eyebrow-red mb-3">{p.eyebrow}</p>
          <div className="rule-red max-w-xl mb-8" />
          <h2 id="prop-title" className="din-head tracking-[0.02em] text-[clamp(2rem,6vw,4.25rem)] max-w-4xl">
            {p.headline.map((line, i) => <span key={i} className="block">{line}</span>)}
            <span className="block text-red">{p.headlineAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-14 md:mt-20">
          <table className="w-full max-w-4xl font-mono text-[0.85rem] sm:text-base border-t border-b border-red">
            <thead>
              <tr>
                {p.tableHeaders.map((h) => (
                  <th key={h} scope="col" className="text-left eyebrow eyebrow-red py-4 pr-4 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.tableRows.map((r, i) => (
                <tr key={i} className="border-t border-[var(--rule)]">
                  <th scope="row" className="text-left font-medium py-4 pr-4 align-top">{r[0]}</th>
                  <td className="py-4 pr-4 align-top">{r[1]}</td>
                  <td className="py-4 align-top">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={150} className="mt-14 md:mt-20 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 border-l-[1.5px] border-red pl-6 md:pl-8 font-mono text-[0.95rem] sm:text-[1.02rem] leading-[1.7] max-w-2xl space-y-5">
            {p.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div className="md:col-span-4 flex md:justify-end items-end">
            <p className="bracket eyebrow text-[0.8rem] tracking-[0.3em]">{p.closer}</p>
          </div>
        </Reveal>
      </div>
      <div className="bg-red text-paper">
        <div className="container-book py-5">
          <p className="eyebrow tracking-[0.34em] text-[0.8rem]">{p.band}</p>
        </div>
      </div>
    </section>
  );
}
