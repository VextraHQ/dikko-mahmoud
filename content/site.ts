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
  /**
   * Show each section's "awaiting confirmation" note. Off for client demos:
   * the single preview banner covers it. Turn on for content review rounds.
   */
  reviewNotes: false,
} as const;

/** Shown site-wide while the site is not indexable. */
export const previewBanner = {
  message: "Presentation preview · content pending firm approval",
  dismiss: "Hide preview notice",
};
