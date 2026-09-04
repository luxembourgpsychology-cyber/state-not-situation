import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/** The author, after the book. One photograph, one sentence, three links. */
export function Author({ locale, content }: { locale: Locale; content: SiteContent["author"] }) {
  const { author } = siteConfig;
  const photo = siteConfig.press.authorPhoto;
  return (
    <section id="author" className="bg-paper" aria-labelledby="author-title">
      <div className="container-book py-[var(--section)] grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4">
          <Reveal>
            {photo ? (
              <Image
                src={photo}
                alt={content.photoAlt}
                width={1200}
                height={1200}
                sizes="(max-width: 767px) 62vw, 30vw"
                className="w-[62%] max-w-[240px] md:w-full md:max-w-[300px] h-auto"
              />
            ) : (
              <div className="w-[62%] max-w-[240px] md:w-full md:max-w-[300px] aspect-square border border-[var(--rule)] grid place-items-center">
                <p className="mono-label text-center px-4">{content.photoPlaceholder}</p>
              </div>
            )}
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal delay={80}>
            <p className="eyebrow eyebrow-red mb-4">{content.eyebrow}</p>
            <h2 id="author-title" className="serif-title text-[clamp(2rem,4.6vw,3.2rem)]">{content.title}</h2>
            <p className="prose-book mt-8">{content.bio}</p>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {author.website ? (
                <li>
                  <a href={author.website} className="btn" rel="noopener">{content.websiteLabel}</a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${author.pressEmail}`} className="btn">{content.contactLabel}</a>
              </li>
              {siteConfig.press.enabled ? (
                <li>
                  <Link href={`/${locale}/press`} className="btn">{content.pressLabel}</Link>
                </li>
              ) : null}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
