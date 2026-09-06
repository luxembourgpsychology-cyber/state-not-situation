import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The author's account of the book, under a heading from page 20, and who it
 * is for: page 14 first, in the book's words, then her own line beneath it.
 */
export function TheBook({ content }: { content: SiteContent["book"] }) {
  return (
    <section id="book-about" className="bg-page border-y border-[var(--rule)]" aria-labelledby="book-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow eyebrow-red mb-4">{content.eyebrow}</p>
            <h2 id="book-title" className="serif-title text-[clamp(1.9rem,4.2vw,3rem)]">{content.heading}</h2>
            <p className="mono-label mt-4">{content.headingSource}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal delay={80}>
            <div className="prose-book">
              {content.paragraphs.map((t, i) => (
                <p key={i} className={i === content.paragraphs.length - 1 ? "text-ink font-serif text-[1.25em] leading-[1.4]" : undefined}>{t}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-12 md:mt-14 border-l-[1.5px] border-red pl-6 md:pl-8">
            <p className="eyebrow eyebrow-red mb-3">{content.readersEyebrow}</p>
            <p className="prose-book">{content.readersAnchor}</p>
            <p className="prose-book mt-5 text-ink-soft">{content.readers}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
