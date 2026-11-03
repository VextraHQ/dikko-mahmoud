import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { getInsightSitemapEntries } from "@/lib/insights/repository";
import { launchedRoutes, routes } from "@/lib/routes";

// Lists only live pages, so it grows automatically as pages launch.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  return [
    ...launchedRoutes.map((path) => ({
      url: `${siteUrl}${path === routes.home ? "" : path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === routes.home ? 1 : 0.8,
    })),
    ...getInsightSitemapEntries().map((entry) => ({
      url: `${siteUrl}${routes.insight(entry.id)}`,
      lastModified: new Date(entry.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
