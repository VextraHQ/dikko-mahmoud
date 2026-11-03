import type { PortableTextBlock } from "@portabletext/types";

export const insightTypes = [
  { value: "article", label: "Article" },
  { value: "case-note", label: "Case note" },
  { value: "regulatory-update", label: "Regulatory update" },
  { value: "firm-news", label: "Firm news" },
] as const;

export type InsightType = (typeof insightTypes)[number]["value"];

export type InsightImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  sourceUrl: string;
  focalPoint?: { x: number; y: number };
  /** Retained for the later Sanity asset adapter; never discard editor metadata. */
  crop?: { top: number; right: number; bottom: number; left: number };
  hotspot?: { x: number; y: number; width: number; height: number };
};

export type InsightReference = {
  id: string;
  title: string;
  publisher: string;
  href: string;
  note?: string;
};

export type CalloutBlock = {
  _type: "takeaways";
  _key: string;
  title: string;
  items: string[];
};

export type TableBlock = {
  _type: "comparisonTable";
  _key: string;
  caption: string;
  headers: string[];
  rows: { _key: string; cells: string[] }[];
};

export type ImageBlock = {
  _type: "articleImage";
  _key: string;
  image: InsightImage;
  caption?: string;
};

export type InsightTextBlock = PortableTextBlock & {
  _type: "block";
  _key: string;
};

export type InsightBlock =
  InsightTextBlock | CalloutBlock | TableBlock | ImageBlock;

export type InsightSource = {
  id: string;
  title: string;
  excerpt: string;
  type: InsightType;
  practiceIds: string[];
  authorIds: string[];
  publishedAt: string;
  revisedAt?: string;
  image: InsightImage | null;
  heroImage?: InsightImage | null;
  keywords: string[];
  demoOnly: boolean;
  readTimeOverride?: number;
  relatedIds?: string[];
  seo?: { title?: string; description?: string; image?: InsightImage };
};

export type InsightAuthor = { id: string; name: string; profileSlug?: string };

export type InsightCard = Omit<
  InsightSource,
  "authorIds" | "keywords" | "relatedIds" | "readTimeOverride" | "seo"
> & {
  authors: InsightAuthor[];
  category: string;
  readTimeMinutes: number;
};

export type InsightArticle = InsightCard & {
  body: InsightBlock[];
  references: InsightReference[];
  practices: { slug: string; title: string; summary: string }[];
  seo?: InsightSource["seo"];
};

export type InsightQuery = {
  q: string;
  type: string;
  practice: string;
  sort: "newest" | "oldest";
  page: number;
};

export type InsightFacets = {
  practices: { value: string; label: string }[];
  types: { value: string; label: string }[];
};

export type InsightPage = {
  items: InsightCard[];
  total: number;
  catalogueTotal: number;
  page: number;
  pageSize: number;
  totalPages: number;
  facets: InsightFacets;
  query: InsightQuery;
  featured: InsightCard | null;
};

export type ArticleContentsItem = { id: string; text: string; level: number };
