import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * Pages 12 to 13, "You Know The Day". Three runs of the printed text, set as
 * prose, with the book's own section mark before the last run, which ends on
 * "try something right now" and hands straight to the reading that follows.
 */
export function KnowTheDay({ content }: { content: SiteContent["knowTheDay"] }) {
  const runs = content.runs;
  const last = runs.length - 1;
  return (
    <section id="the-day" className="bg-paper" aria-labelledby="day-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <h2 id="day-title" className="eyebrow eyebrow-red">{content.eyebrow}</h2>
            <p className="mono-label mt-3">12</p>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal delay={80}>
            <div className="prose-book">
              {runs.map((run, i) => (
                <div key={i}>
                  {i === last ? (
                    <p className="text-center text-red font-serif text-2xl my-8 select-none" aria-hidden="true">§</p>
                  ) : null}
                  <p className={i === last ? "text-[clamp(1.2rem,1.6vw,1.4rem)] leading-[1.5]" : undefined}>{run}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
