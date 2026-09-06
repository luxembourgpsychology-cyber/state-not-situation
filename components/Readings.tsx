import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

const colour = {
  time: "var(--time)",
  attention: "var(--attention)",
  safety: "var(--safety)",
} as const;

const KEYS = ["time", "attention", "safety"] as const;

/**
 * Chapters 01 to 15 each open on a printed instrument reading: the chapter
 * number, the three systems with the value each was holding, and one line
 * under them. Fifteen of them together are the dashboard the cover tells the
 * reader to read, and every word here is set in the book.
 *
 * The three system names are not restated as content: the rows take them from
 * `variables.loops`, so a reader meets the same three words in the same three
 * inks they were given four sections earlier. Nothing on this page explains
 * what a value means, because the book does not explain it either — the
 * chapter openings carry no legend.
 */
export function Readings({
  content,
  loops,
}: {
  content: SiteContent["readings"];
  loops: SiteContent["variables"]["loops"];
}) {
  const name = Object.fromEntries(loops.map((l) => [l.key, l.name])) as Record<
    (typeof KEYS)[number],
    string
  >;

  return (
    <section id="readings" className="section" aria-labelledby="readings-title">
      <div className="container-book">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal>
              <h2 id="readings-title" className="t-head">
                {content.title}
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={80}>
              <ol className="border-t border-[var(--rule)]">
                {content.items.map((item) => (
                  <li
                    key={item.number}
                    className="py-5 border-b border-[var(--rule)]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="t-mono text-red">
                        {content.label} / {item.number}
                      </p>
                      <p className="t-mono text-quiet shrink-0">
                        <span className="sr-only">{content.pageLabel} </span>
                        {item.page}
                      </p>
                    </div>

                    <p className="t-body mt-2 max-w-[52ch]">{item.line}</p>

                    <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                      {KEYS.map((k) => (
                        <li key={k} className="t-mono">
                          <span style={{ color: colour[k] }}>{name[k]}</span>
                          <span className="text-quiet"> / </span>
                          <span>{item[k]}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
