import type { ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { getContent, isPublished } from "@/lib/i18n";
import { publicationDate } from "@/lib/publication";
import { bookAction, ext, isDraft, navExtension } from "@/lib/extension";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AmazonButton } from "@/components/AmazonButton";
import { ExcerptLink } from "@/components/ExcerptLink";

/**
 * The frame every new page shares: the site's own header and footer, the
 * main landmark, and — while the copy waits for the author — one line saying
 * so. Nothing else. No breadcrumb, no sidebar, no sticky action.
 */
export function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const c = getContent(locale);
  const x = ext();
  return (
    <>
      <Nav
        locale={locale}
        content={c}
        variant="page"
        excerptAvailable={siteConfig.editions[locale].excerptAvailable}
        more={navExtension(locale)}
        homeOnlyLanguage={x.homeOnlyLanguage}
      />
      <main id="main" aria-label={c.a11y.mainLandmark} className="ext">
        <DraftNote />
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}

/** Previews only: the copy below is a draft. Production never renders unapproved pages. */
export function DraftNote({ className = "" }: { className?: string }) {
  if (!isDraft()) return null;
  return (
    <div className={`border-b border-[var(--rule)] ${className}`}>
      <p className="container-book container-wide t-mono py-3">{ext().draftNote}</p>
    </div>
  );
}

/**
 * The page head: label column and content column, the site's TEXT layout.
 * The title is the page's h1, at DISPLAY or HEAD.
 */
export function PageHead({
  eyebrow,
  aside,
  title,
  size = "display",
  children,
}: {
  eyebrow: string;
  aside?: ReactNode;
  title: string;
  size?: "display" | "head";
  children?: ReactNode;
}) {
  return (
    <header className="section">
      <div className="container-book grid md:grid-cols-12 gap-x-10 gap-y-[var(--space-block)]">
        <div className="md:col-span-3">
          <p className="t-label t-label-red">{eyebrow}</p>
          {aside ? <div className="mt-3">{aside}</div> : null}
        </div>
        <div className="md:col-span-8">
          <h1 className={size === "display" ? "t-display" : "t-head"}>{title}</h1>
          {children ? <div className="mt-[var(--space-block)]">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}

/**
 * The book, wherever a new page ends: the publication line while the book is
 * forthcoming, the one book action (Buy only when the config says it may),
 * and the existing extract. One prominent action, one quiet one.
 */
export function BookActions({ locale, children, withExtract = true }: { locale: Locale; children?: ReactNode; withExtract?: boolean }) {
  const c = getContent(locale);
  const action = bookAction(locale);
  const date = publicationDate(locale);
  const published = isPublished(locale);
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {!published && date ? (
        <p className="t-mono text-ink w-full">{c.status.forthcomingDatePrefix} {date}</p>
      ) : null}
      {action.kind === "details" ? (
        <Link href={action.href} className="btn btn-red">{action.label}</Link>
      ) : (
        <AmazonButton href={action.href} label={action.label} locale={locale} className="btn btn-red" />
      )}
      {withExtract && siteConfig.editions[locale].excerptAvailable ? (
        <ExcerptLink href={`/${locale}/read`} label={c.hero.readCta} locale={locale} />
      ) : null}
      {children}
    </div>
  );
}

export { ScopeNote } from "./ScopeNote";
