import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { PulseMark } from "./PulseMark";

export function Footer({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const base = `/${locale}`;
  const s = siteConfig.author.social;
  const ed = siteConfig.editions[locale];

  // The full section list lives here as well, because the bar hides most of it on a phone.
  const sections = [
    { href: `${base}#book`, label: c.nav.book },
    ...(ed.excerptAvailable ? [{ href: `${base}/read`, label: c.nav.read }] : []),
    { href: `${base}#listen`, label: c.nav.listen },
    { href: `${base}#author`, label: c.nav.author },
  ];

  return (
    <footer className="mt-auto">
      <div className="border-t border-[var(--rule)] bg-paper">
        <div className="container-book py-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-ink/35" aria-hidden="true" />
          <PulseMark className="w-10 h-auto" />
          <span className="h-px flex-1 bg-ink/35" aria-hidden="true" />
        </div>
        <div className="container-book pb-8 text-center">
          <p className="eyebrow tracking-[0.28em]">{c.footer.madeLine}</p>
        </div>
      </div>

      <div className="bg-red text-paper">
        <div className="container-book py-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="eyebrow tracking-[0.3em] text-[0.78rem]">{c.footer.band}</p>

          <nav aria-label="Footer" className="sm:text-right">
            <ul className="flex flex-wrap gap-x-6 sm:justify-end font-mono text-[0.72rem] tracking-[0.08em] uppercase">
              {sections.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="inline-flex items-center min-h-11 hover:underline underline-offset-4">{l.label}</Link>
                </li>
              ))}
              {siteConfig.press.enabled ? (
                <li><Link href={`${base}/press`} className="inline-flex items-center min-h-11 hover:underline underline-offset-4">{c.footer.pressLink}</Link></li>
              ) : null}
              <li>
                <a href={`mailto:${siteConfig.author.pressEmail}`} className="inline-flex items-center min-h-11 hover:underline underline-offset-4">
                  {c.footer.contactLink}
                </a>
              </li>
              {s.instagram ? <li><a href={s.instagram} rel="noopener" className="inline-flex items-center min-h-11 hover:underline underline-offset-4">Instagram</a></li> : null}
              {s.linkedin ? <li><a href={s.linkedin} rel="noopener" className="inline-flex items-center min-h-11 hover:underline underline-offset-4">LinkedIn</a></li> : null}
              {s.x ? <li><a href={s.x} rel="noopener" className="inline-flex items-center min-h-11 hover:underline underline-offset-4">X</a></li> : null}
            </ul>
          </nav>
        </div>

        <div className="container-book pb-7 flex flex-col sm:flex-row gap-1 sm:gap-8 font-mono text-[0.68rem] text-paper/80">
          <p>{c.footer.rights}</p>
          <p>{siteConfig.publisher.name}, {siteConfig.publisher.place}</p>
          {ed.isbn ? <p>ISBN {ed.isbn}</p> : null}
        </div>
      </div>
    </footer>
  );
}
