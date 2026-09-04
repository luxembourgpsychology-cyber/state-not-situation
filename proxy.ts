import { NextResponse, type NextRequest } from "next/server";
import { siteConfig, type Locale } from "@/site.config";

const all: Locale[] = ["en", "fr", "de"];
const enabled = all.filter((l) => siteConfig.languages[l].enabled);

function preferred(req: NextRequest): Locale {
  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if ((enabled as string[]).includes(code)) return code as Locale;
  }
  return siteConfig.defaultLocale;
}

/** Sends un-prefixed paths to the visitor's best enabled language. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if ((all as string[]).includes(first)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/${preferred(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|press|audio|fonts|favicon|icon|apple-icon|opengraph-image|robots\\.txt|sitemap\\.xml|manifest|.*\\..*).*)"],
};
