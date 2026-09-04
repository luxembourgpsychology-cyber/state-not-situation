import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent } from "@/lib/i18n";
import { PulseMark } from "./PulseMark";

export function Footer({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const s = siteConfig.author.social;
  return (
    <footer className="mt-auto">
      <div className="border-t border-[var(--rule)] bg-paper">
        <div className="container-book py-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-ink/40" aria-hidden="true" />
          <PulseMark className="w-10 h-auto" />
          <span className="h-px flex-1 bg-ink/40" aria-hidden="true" />
        </div>
        <div className="container-book pb-6 text-center">
          <p className="eyebrow tracking-[0.3em]">{c.footer.madeLine}</p>
        </div>
      </div>
      <div className="bg-red text-paper">
        <div className="container-book py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="eyebrow tracking-[0.34em] text-[0.8rem]">{c.footer.band}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase">
            {siteConfig.press.enabled ? <li><Link href={`/${locale}/press`} className="hover:underline underline-offset-4">{c.footer.pressLink}</Link></li> : null}
            <li><a href={`mailto:${siteConfig.author.pressEmail}`} className="hover:underline underline-offset-4">{c.footer.contactLink}</a></li>
            {s.instagram ? <li><a href={s.instagram} rel="noopener" className="hover:underline underline-offset-4">Instagram</a></li> : null}
            {s.linkedin ? <li><a href={s.linkedin} rel="noopener" className="hover:underline underline-offset-4">LinkedIn</a></li> : null}
            {s.x ? <li><a href={s.x} rel="noopener" className="hover:underline underline-offset-4">X</a></li> : null}
          </ul>
        </div>
        <div className="container-book pb-6 flex flex-col sm:flex-row gap-2 sm:gap-8 font-mono text-[0.68rem] text-paper/80">
          <p>{c.footer.publisher}</p>
          <p>{c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
