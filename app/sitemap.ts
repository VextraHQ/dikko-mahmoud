import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { launchedRoutes, routes } from "@/lib/routes";

// Lists only live pages, so it grows automatically as pages launch.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  return launchedRoutes.map((path) => ({
    url: `${siteUrl}${path === routes.home ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === routes.home ? 1 : 0.8,
  }));
}
