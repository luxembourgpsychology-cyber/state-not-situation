import Link from "next/link";
import type { Locale } from "@/site.config";
import { appCopy, ext, extensionOn, isDraft } from "@/lib/extension";
import { Reveal } from "./Reveal";

/**
 * THE ONE NEW SECTION ON THE HOME PAGE (the commercial extension, 1 October
 * 2026). It comes after Closing — after the form — and before the footer, so
 * the page still ends once: this is the colophon's list of other doors, not a
 * second ending.
 *
 * No new type step, colour or device. The label column and the HEAD title of
 * every section; three doors set like the evidence markers, side by side with
 * a rule between them from 640 and stacked under a rule on a phone; the app
 * as one quiet sentence and a link, because its only fact is a status.
 *
 * Renders nothing in a language the extension does not exist in, or on
 * production before the author has approved it.
 */
export function Discovery({ locale }: { locale: Locale }) {
  if (!extensionOn(locale)) return null;
  const d = ext().discovery;
  const app = appCopy();

  return (
    <section id="explore-more" className="section" aria-labelledby="explore-more-title">
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
        <div className="md:col-span-3">
          <Reveal>
            <p className="t-label t-label-red">{d.eyebrow}</p>
            {isDraft() ? <p className="t-mono mt-3">{ext().draftNote}</p> : null}
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <h2 id="explore-more-title" className="t-head">{d.title}</h2>
            <p className="t-body mt-[var(--space-tight)]">{d.intro}</p>
          </Reveal>
          <Reveal delay={80} className="mt-[var(--space-block)]">
            <ul className="doors">
              {d.items.map((item) => (
                <li key={item.href} className="doors__cell">
                  <p className="t-lead">{item.title}</p>
                  <p className="t-body mt-2">{item.text}</p>
                  <p className="mt-4">
                    <Link href={item.href} className="btn">{item.label}</Link>
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-[var(--space-block)] text-sm text-quiet flex flex-wrap items-center gap-x-4">
              <span>{app.stripText}</span>
              <Link href={`/${locale}/app`} className="inline-flex items-center min-h-11 underline underline-offset-4 hover:text-red">
                {d.appLink}
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
