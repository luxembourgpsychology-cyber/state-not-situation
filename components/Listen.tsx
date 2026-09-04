import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { AudioPlayer } from "./AudioPlayer";
import { Reveal } from "./Reveal";

export function Listen({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <section id="listen" className="bg-paper" aria-labelledby="listen-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow eyebrow-red mb-4">{c.listen.eyebrow}</p>
            <h2 id="listen-title" className="serif-title text-[clamp(2.2rem,5vw,3.6rem)]">{c.listen.title}</h2>
            <p className="mono-label mt-4">{c.listen.subtitle}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5 md:pt-4">
          <Reveal delay={100}>
            <AudioPlayer src={siteConfig.editions[locale].audioUrl} content={c.listen} locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
