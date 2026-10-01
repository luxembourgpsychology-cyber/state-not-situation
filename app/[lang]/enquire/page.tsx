import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/site.config";
import { siteConfig } from "@/site.config";
import { allowedFormats, ext, extensionMetadata, extensionOn, visibleOffers } from "@/lib/extension";
import { PageHead, Shell } from "@/components/extension/Shell";
import { EnquiryForm } from "@/components/extension/EnquiryForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale) || !visibleOffers().length) return {};
  return extensionMetadata(locale, "/enquire", "enquire");
}

/**
 * THE ORGANISER'S ENQUIRY. Separate from attending an event, which has its
 * own short email on /events and never comes here.
 *
 * How it works is said before the first field, not after the button.
 */
export default async function EnquirePage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = (await params).lang as Locale;
  if (!extensionOn(locale) || !visibleOffers().length) notFound();
  const x = ext().enquiry;

  return (
    <Shell locale={locale}>
      <PageHead eyebrow={x.eyebrow} title={x.title} size="head" aside={<Link href={x.back.href} className="t-label inline-flex items-center min-h-11 text-quiet hover:text-red">← {x.back.label}</Link>}>
        <p className="t-body">{x.intro}</p>
        <div className="mt-[var(--space-block)] pl-5 border-l-[1.5px] border-[var(--rule-strong)]">
          <p className="t-mono">{x.howLabel}</p>
          <p className="t-body mt-2">{x.emailFallbackIntro}</p>
        </div>
      </PageHead>

      <div className="pb-[var(--space-section)]">
        <div className="container-book grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8 md:col-start-4">
            <EnquiryForm copy={x} recipient={siteConfig.author.pressEmail} formats={allowedFormats()} locale={locale} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
