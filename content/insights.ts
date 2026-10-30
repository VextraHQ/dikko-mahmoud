import { hasText, uniqueById } from "@/lib/content";

export type InsightPreview = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  image: { src: string; alt: string; position?: string } | null;
};

export const insightsHome = {
  eyebrow: "Perspectives & insights",
  heading: "Perspectives that keep you informed.",
  description:
    "Explore ideas on business, disputes and the changing legal landscape from our lawyers.",
  action: "Explore all insights",
  featuredLabel: "Featured perspective",
  reviewNote: "Article previews · full content pending",
};

// Design-supplied preview titles, not published articles. Future Sanity selection
// resolves one feature and up to three distinct supporting records into this shape.
export const featuredInsight: InsightPreview = {
  id: "corporate-decisions",
  title: "Navigating corporate decisions in a changing market",
  excerpt:
    "A perspective on the legal considerations shaping corporate and commercial decisions.",
  category: "Corporate & commercial",
  image: null,
};

export const supportingInsights: InsightPreview[] = [
  {
    id: "dispute-strategy",
    title: "Resolving disputes with a clear strategy",
    excerpt: null,
    category: "Dispute resolution",
    image: null,
  },
  {
    id: "energy-projects",
    title: "A legal perspective on energy projects",
    excerpt: null,
    category: "Energy & resources",
    image: null,
  },
  {
    id: "technology-ip",
    title: "Technology & intellectual property",
    excerpt: null,
    category: "Technology & IP",
    image: null,
  },
];

const homeFeature = [featuredInsight, ...supportingInsights].find((item) =>
  hasText(item.title),
);

/**
 * Homepage selection: the first titled insight is featured, followed by up to
 * three other titled, de-duplicated insights. `null` hides the section.
 */
export const homeInsights = homeFeature
  ? {
      feature: homeFeature,
      supporting: uniqueById(
        supportingInsights.filter(
          (item) => hasText(item.title) && item.id !== homeFeature.id,
        ),
      ).slice(0, 3),
    }
  : null;
