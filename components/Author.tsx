import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { Reveal } from "./Reveal";

/**
 * A face, a credential, and the answer to "is this for me?" at the moment the
 * reader is deciding. Five lines and one link. The photograph is held to 240px
 * on a phone: it should not outweigh the cover.
 */
export function Author({ locale, content }: { locale: Locale; content: SiteContent["author"] }) {
  const photo = siteConfig.press.authorPhoto;
  return (
    <section id="author" className="section" aria-labelledby="author-title">
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)] items-start">
        <div className="md:col-span-4">
          <Reveal>
            {photo ? (
              <Image
                src={photo}
                alt={content.photoAlt}
                width={1200}
                height={1200}
                sizes="(max-width: 767px) 240px, 30vw"
                className="w-[240px] md:w-full md:max-w-[300px] h-auto"
              />
            ) : (
              <div className="w-[240px] md:w-full md:max-w-[300px] aspect-square border border-[var(--rule)] grid place-items-center">
                <p className="t-mono text-center px-4">{content.photoPlaceholder}</p>
              </div>
            )}
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal delay={80}>
            <h2 id="author-title" className="t-head">{content.title}</h2>
            <p className="t-body mt-[var(--space-block)]">{content.bio}</p>
            <p className="t-body mt-[var(--space-tight)]">{content.readers}</p>
            {siteConfig.press.enabled ? (
              <p className="mt-[var(--space-block)]">
                <Link href={`/${locale}/press`} className="btn">{content.pressLabel}</Link>
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
