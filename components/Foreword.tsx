import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The foreword, where the printed book puts it.
 *
 * It sits between the evidence markers and the extract because that is the
 * order of the object: the foreword is front matter and the pilot opens arabic
 * page 1. A reader meets the book's own account of its uncertainty, then the
 * person who vouched for it, then the writing itself.
 *
 * No folio, on purpose. Every other folio on the site is a verified printed
 * page, and v47's front matter is still moving; rather than print a number
 * that may be wrong, this section prints none. Add one when it settles.
 *
 * The section renders only when there is a passage to quote, exactly as the
 * Listen section renders only when there is a recording. The credit is not
 * gated on that: it belongs under the byline and on the press sheet whether or
 * not a passage has been cleared, which is where a jacket carries it.
 *
 * No new font, type step, colour, device or CSS class. The eyebrow in the
 * label column, the passage at DISPLAY in the book's own display serif, the
 * rest at BODY, her name at LEAD in the same serif, and her title in the mono
 * the site already uses for the photographer's credit and the hero's
 * credential line.
 */
export function Foreword({ content }: { content: SiteContent["foreword"] }) {
  if (content.quote.length === 0) return null;
  const [opening, ...rest] = content.quote;

  return (
    <section id="foreword" className="section" aria-labelledby="foreword-title">
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
        <div className="md:col-span-3">
          <Reveal>
            <h2 id="foreword-title" className="t-label t-label-red">{content.eyebrow}</h2>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <Reveal>
            <figure>
              <blockquote>
                <p className="t-display">{opening}</p>
                {rest.length ? (
                  <div className="t-body mt-[var(--space-block)]">
                    {rest.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                ) : null}
              </blockquote>
              <figcaption className="mt-[var(--space-block)]">
                <span className="t-lead block">{content.name}</span>
                <span className="t-mono block mt-2">{content.role}, {content.organisation}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
