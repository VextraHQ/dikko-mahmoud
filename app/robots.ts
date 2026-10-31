import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getSiteUrl } from "@/lib/metadata";

// Blocks all crawling until `siteConfig.indexable` is switched on at launch.
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: siteConfig.indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
