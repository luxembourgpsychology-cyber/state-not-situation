import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * Page 225, the book's last sentence: the opening question with one word
 * changed. It sits directly above the notify form, so the page opens and
 * closes on the same question, turned outward.
 */
export function Closing({ content }: { content: SiteContent["closing"] }) {
  return (
    <section id="closing" className="bg-paper border-t border-[var(--rule)]">
      <div className="container-book pt-[var(--section)] pb-10 md:pb-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal><p className="mono-label">{content.source}</p></Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal delay={80}>
            <p className="serif-title text-[clamp(1.9rem,4.6vw,3.2rem)] max-w-2xl">{content.question}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
