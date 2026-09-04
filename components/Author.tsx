import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Author({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.author;
  const { author } = siteConfig;
  const photo = siteConfig.press.authorPhoto;
  return (
    <section id="author" className="bg-paper" aria-labelledby="author-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow eyebrow-red mb-4">{a.eyebrow}</p>
            <h2 id="author-title" className="serif-title text-[clamp(2.2rem,5vw,3.6rem)]">{a.title}</h2>
          </Reveal>
          <Reveal delay={100} className="mt-8 max-w-[260px]">
            {photo ? (
              <Image src={photo} alt={a.photoAlt} width={800} height={1000} sizes="(max-width: 768px) 60vw, 260px" className="w-full h-auto grayscale-[0.15]" />
            ) : (
              <div className="aspect-[4/5] border border-[var(--rule)] grid place-items-center">
                <p className="mono-label text-center px-4">{a.photoPlaceholder}</p>
              </div>
            )}
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal delay={100}>
            <div className="prose-book">
              {a.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {author.website ? <li><a href={author.website} className="btn" rel="noopener">{a.websiteLabel}</a></li> : null}
              <li><a href={`mailto:${author.pressEmail}`} className="btn">{a.contactLabel}</a></li>
              {siteConfig.press.enabled ? <li><Link href={`/${locale}/press`} className="btn">{a.pressLabel}</Link></li> : null}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
