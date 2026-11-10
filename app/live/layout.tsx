import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Source_Sans_3, IBM_Plex_Mono, Instrument_Serif, Barlow_Semi_Condensed } from "next/font/google";
import "../globals.css";
import "./live.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const source = Source_Sans_3({ weight: ["400", "600"], subsets: ["latin", "latin-ext"], variable: "--font-source", display: "swap" });
const plex = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-plex", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const barlow = Barlow_Semi_Condensed({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });

export const metadata: Metadata = {
  title: "Four small moments | State. Not Situation.",
  description: "Join in, watch, or pass at Ivana's book launch. There is no score.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};
export const viewport: Viewport = { themeColor: "#f7f3ec", width: "device-width", initialScale: 1 };

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  const kit = process.env.ADOBE_FONTS_KIT_ID || "ysb1xql";
  return <html lang="en" className={`${bebas.variable} ${source.variable} ${plex.variable} ${instrument.variable} ${barlow.variable}`}>
    <head>{kit ? <link rel="stylesheet" href={`https://use.typekit.net/${kit}.css`} /> : null}</head>
    <body className="book-live">{children}</body>
  </html>;
}
