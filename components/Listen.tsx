import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { AudioPlayer } from "./AudioPlayer";
import { Reveal } from "./Reveal";

export function Listen({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <section id="listen" className="section" aria-labelledby="listen-title">
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
        <div className="md:col-span-3">
          <Reveal>
            <h2 id="listen-title" className="t-head">{c.listen.title}</h2>
            {/* listen.subtitle ("Read by the author") is not rendered. On
                6 September 2026 the author said she is generating the reading
                in ElevenLabs, and the site may not claim a performance it
                cannot stand behind. One line puts it back once she confirms
                whose voice this is and how she wants it described. */}
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={100}>
            <AudioPlayer src={siteConfig.editions[locale].audioUrl} content={c.listen} locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
