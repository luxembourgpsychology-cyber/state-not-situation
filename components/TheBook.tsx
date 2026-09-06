import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * The plain page after two graphic ones. The page 20 heading at full width,
 * then page 20's account of Katrin's morning, which names the three systems
 * the reader met under "Before we begin"; then the author's own two
 * paragraphs; then who it is for, page 14 first and her line beneath it.
 */
export function TheBook({ content, systemsIntro }: { content: SiteContent["book"]; systemsIntro: string }) {
  const last = content.paragraphs.length - 1;
  return (
    <section id="book-about" className="bg-page border-y border-[var(--rule)]" aria-labelledby="book-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow eyebrow-red">{content.eyebrow}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal>
            <h2 id="book-title" className="serif-title text-[clamp(2rem,7.5vw,3.6rem)] max-w-[22ch]">{content.heading}</h2>
            <p className="mono-label mt-4">{content.headingSource}</p>
          </Reveal>
          <Reveal delay={80} className="mt-10 md:mt-12">
            <div className="prose-book">
              {/* Page 20 */}
              <p>{systemsIntro}</p>
              {content.paragraphs.map((t, i) => (
                <p key={i} className={i === last ? "text-ink font-serif text-[1.25em] leading-[1.4]" : undefined}>{t}</p>
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
