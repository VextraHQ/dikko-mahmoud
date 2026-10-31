import { firmBrand, firmHero } from "@/content/firm";

export const siteConfig = {
  name: firmBrand.name,
  description: firmHero.description,
  /** Fallback only; deployments set NEXT_PUBLIC_SITE_URL or use Vercel's URL. */
  url: "https://dikkoandmahmoud.com",
  locale: "en_NG",
  /**
   * Search-engine indexing for the whole site. Keep false until the client
   * approves launch; flipping it updates robots.txt and every page's meta tags.
   */
  indexable: false,
} as const;
