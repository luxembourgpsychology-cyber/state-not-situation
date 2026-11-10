import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/live", "/api/live"] }, sitemap: `${siteConfig.siteUrl}/sitemap.xml` };
}
