import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The sixteen names, as page 292 lists them, and one entry opened in full.
 *
 * This replaced the fifteen chapter-opening instrument readings on
 * 30 September 2026. The book stopped printing those values in v50 — the
 * openers now carry a question and three plain phrases — and the names are
 * the better answer to the only question this part of the page is asked:
 * what is actually in this book. Sixteen nouns answer it; fifteen telegrams
 * did not.
 *
 * The opened entry is chapter 01 because its three examples are already on
 * this page. The extract, two sections above, gives them as prose — tiredness
 * as a question about a career, caffeine as worry about an email, low blood
 * sugar as doubt about a relationship. A reader meets them twice, the second
 * time with a name on them, and learns the book's method by doing it once.
 *
 * No new type step, colour or device. The list is the dashboard the readings
 * already were: a number in red mono, the name at BODY, the page in quiet
 * mono. The entry underneath is the same parts at one size up.
 */
export function Names({ content }: { content: SiteContent["names"] }) {
  const e = content.example;

  return (
    <section id="names" className="section" aria-labelledby="names-title">
      <div className="container-book">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
          <div className="md:col-span-3">
            <Reveal>
              <h2 id="names-title" className="t-head">{content.title}</h2>
              <p className="t-mono mt-3">{content.label}</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={80}>
              <ol className="border-t border-[var(--rule)]">
                {content.items.map((item) => (
                  <li
                    key={item.number}
                    className="flex items-baseline gap-4 py-3 border-b border-[var(--rule)]"
                  >
                    <span className="t-mono text-red shrink-0 w-7">{item.number}</span>
                    <span className="t-body flex-1 min-w-0">{item.name}</span>
                    <span className="t-mono shrink-0">
                      <span className="sr-only">{content.pageLabel} </span>
                      {item.page}
                    </span>
                  </li>
                ))}
              </ol>
              {/* A whole sentence, so not the mono caps the folios use: that
                  register is for things that are measured. Same small size as
                  the note under the form. */}
              <p className="mt-4 text-sm text-quiet">{content.note}</p>
            </Reveal>

            {/* One entry, whole, so the list above is not sixteen words a
                reader has to take on trust. */}
            <Reveal delay={140} className="mt-[var(--space-section)]">
              <p className="t-label t-label-red">{content.label} / {e.number}</p>
              <h3 className="t-head mt-3">{e.name}</h3>
              <p className="t-body mt-[var(--space-tight)]">{e.body}</p>

              <p className="t-mono mt-[var(--space-block)]">{e.showsUpLabel}</p>
              <ul className="mt-2 t-body">
                {e.showsUp.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="text-quiet">—</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="t-mono mt-[var(--space-block)] text-red">{e.tryLabel}</p>
              <p className="t-body mt-2">{e.tryIt}</p>

              <p className="t-mono mt-[var(--space-block)]">
                <span className="sr-only">{content.pageLabel} </span>{e.page}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
