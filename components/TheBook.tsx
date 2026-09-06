import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The book, in the author's own two lines: what it is interested in, and
 * who it is for. Both supplied by her; nothing here is paraphrased.
 */
export function TheBook({ content }: { content: SiteContent["book"] }) {
  return (
    <section id="book-about" className="bg-paper border-t border-[var(--rule)]" aria-labelledby="book-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <h2 id="book-title" className="eyebrow eyebrow-red">{content.eyebrow}</h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal>
            {content.paragraphs.map((t, i) => (
              <p key={i} className="serif-title text-[clamp(1.6rem,5.2vw,2.6rem)] leading-[1.25] max-w-[28ch]">{t}</p>
            ))}
          </Reveal>
          <Reveal delay={100} className="mt-12 md:mt-14 border-l-[1.5px] border-red pl-6 md:pl-8">
            <p className="eyebrow eyebrow-red mb-3">{content.readersEyebrow}</p>
            <p className="prose-book">{content.readers}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
