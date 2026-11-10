import type { Metadata } from "next";
import { createPageMetadata, getSiteUrl, shareCardImage } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/content/site";
import type { InsightArticle, InsightQuery } from "@/types/insights";
import { insightQueryString, hasInsightFilters } from "@/lib/insights/query";
import { insightsCopy } from "@/content/insight-copy";
import { safeArticleHref } from "@/lib/insights/article";

export function insightListingMetadata(query: InsightQuery) {
  const filtered = hasInsightFilters(query) || query.sort !== "newest";
  const canonicalQuery = filtered ? "" : insightQueryString(query);
  return {
    ...createPageMetadata({
      title: insightsCopy.series,
      description: insightsCopy.description,
      path: `${routes.insights}${canonicalQuery}`,
    }),
    robots: { index: siteConfig.indexable && !filtered, follow: true },
  };
}

export function insightArticleMetadata(article: InsightArticle): Metadata {
  const image = article.seo?.image ?? article.heroImage ?? article.image;
  const shareImage =
    image &&
    image.width / image.height >= 1.7 &&
    image.width / image.height <= 2.1 &&
    safeArticleHref(image.src)
      ? {
          url: image.src,
          alt: image.alt,
          width: image.width,
          height: image.height,
        }
      : shareCardImage(routes.insight(article.id), article.title);
  const metadata = createPageMetadata({
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt,
    path: routes.insight(article.id),
    image: shareImage,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article" as const,
      publishedTime: article.publishedAt,
      ...(article.revisedAt ? { modifiedTime: article.revisedAt } : {}),
    },
    robots: { index: siteConfig.indexable && !article.demoOnly, follow: true },
  };
}

export function insightStructuredData(article: InsightArticle) {
  if (article.demoOnly) return null;
  const url = new URL(routes.insight(article.id), getSiteUrl()).href;
  const image = article.seo?.image ?? article.heroImage ?? article.image;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      mainEntityOfPage: url,
      datePublished: article.publishedAt,
      ...(article.revisedAt ? { dateModified: article.revisedAt } : {}),
      ...(image ? { image: new URL(image.src, getSiteUrl()).href } : {}),
      author: article.authors.map((author) => ({
        "@type": "Person",
        name: author.name,
        ...(author.profileSlug
          ? {
              url: new URL(routes.person(author.profileSlug), getSiteUrl())
                .href,
            }
          : {}),
      })),
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: insightsCopy.home,
          item: new URL(routes.home, getSiteUrl()).href,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: insightsCopy.hub,
          item: new URL(routes.insights, getSiteUrl()).href,
        },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ] as const;
}
