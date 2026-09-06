import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const colour = { time: "var(--time)", attention: "var(--attention)", safety: "var(--safety)" } as const;

/**
 * The three variables, once, as a spread. The word carries the colour, so
 * there are no coloured rules beside it; "They" in the two printed sentences
 * points at the three display words above, which reads better here than it
 * does on the page. No cards, no icons, no chapter numbers.
 */
export function Variables({ content }: { content: SiteContent["variables"] }) {
  return (
    <section id="variables" className="section-tall" aria-labelledby="variables-title">
      <div className="container-book container-wide">
        <h2 id="variables-title" className="sr-only">
          {content.loops.map((l) => l.name).join(". ")}.
        </h2>
        <div className="variables-band grid gap-[var(--space-block)] md:grid-cols-12 md:gap-x-10">
          {content.loops.map((loop, i) => (
            <Reveal
              key={loop.key}
              delay={i * 80}
              className={`md:col-span-4 ${i > 0 ? "border-t border-[var(--rule)] pt-[var(--space-block)] md:border-t-0 md:pt-0" : ""}`}
            >
              <p className="t-cover" style={{ color: colour[loop.key] }} aria-hidden="true">{loop.name}</p>
              <p className="mt-[var(--space-tight)] t-body">{loop.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={240} className="mt-[var(--space-section)] grid md:grid-cols-12 gap-x-10 gap-y-3">
          <div className="md:col-span-3">
            <p className="t-mono">{content.folio}</p>
          </div>
          <div className="md:col-span-8 t-body">
            {content.sortingLines.map((t) => <p key={t}>{t}</p>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
