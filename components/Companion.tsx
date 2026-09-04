import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/** The placeholder for the companion tool. Off with companion.enabled = false. */
export function Companion({ locale }: { locale: Locale }) {
  if (!siteConfig.companion.enabled) return null;
  const c = getContent(locale).companion;
  return (
    <section id="companion" className="bg-page border-y border-[var(--rule)]" aria-labelledby="companion-title">
      <div className="container-book py-16 md:py-24 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <Reveal><p className="eyebrow eyebrow-quiet">{c.eyebrow}</p></Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal delay={100}>
            <h2 id="companion-title" className="serif-title text-[clamp(1.6rem,3.2vw,2.4rem)] max-w-2xl">{c.line}</h2>
            <p className="prose-book text-ink-soft mt-5 text-[1rem]">{c.detail}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
