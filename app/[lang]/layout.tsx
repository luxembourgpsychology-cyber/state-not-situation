import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Source_Sans_3, IBM_Plex_Mono, Instrument_Serif, Barlow_Semi_Condensed } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { siteConfig, type Locale } from "@/site.config";
import { alternatesFor, enabledLocales, getContent, isLocale, isEnabled, isUnderReview, localeUrl } from "@/lib/i18n";
import { Analytics } from "@/components/Analytics";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const source = Source_Sans_3({ weight: ["300", "400", "600"], style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-source", display: "swap" });
const plex = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin", "latin-ext"], variable: "--font-plex", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-instrument", display: "swap" });
const barlow = Barlow_Semi_Condensed({ weight: ["600", "700"], subsets: ["latin", "latin-ext"], variable: "--font-barlow", display: "swap" });

export function generateStaticParams() {
  return enabledLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || !isEnabled(lang)) return {};
  const c = getContent(lang);
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: c.meta.title, template: c.meta.titleTemplate },
    description: c.meta.description,
    alternates: { canonical: localeUrl(lang), languages: alternatesFor() },
    openGraph: {
      type: "book",
      siteName: c.meta.title,
      title: c.meta.title,
      description: c.meta.description,
      url: localeUrl(lang),
      locale: siteConfig.languages[lang].htmlLang,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: c.meta.ogImageAlt }],
      authors: [siteConfig.author.name],
    },
    twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description, images: ["/images/og.jpg"] },
    // A translation still awaiting sign-off must never be indexed.
    robots: isUnderReview(lang)
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#f7f3ec", width: "device-width", initialScale: 1 };

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !isEnabled(lang)) notFound();
  const locale = lang as Locale;
  const kit = siteConfig.fonts.adobeFontsKitId;
  return (
    <html lang={siteConfig.languages[locale].htmlLang} className={`${bebas.variable} ${source.variable} ${plex.variable} ${instrument.variable} ${barlow.variable}`}>
      <head>
        {kit ? <link rel="stylesheet" href={`https://use.typekit.net/${kit}.css`} /> : null}
      </head>
      <body className="min-h-dvh flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
