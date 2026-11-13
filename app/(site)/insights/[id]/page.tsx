import { notFound } from "next/navigation";
import { InsightDetailPage } from "@/components/insights/detail-page";
import {
  getInsight,
  getInsightSlugs,
  getRelatedInsights,
} from "@/lib/insights/repository";
import {
  insightArticleMetadata,
  insightStructuredData,
} from "@/lib/insights/metadata";
import { jsonLdString } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return getInsightSlugs().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const article = await getInsight((await params).id);
  if (!article) notFound();
  return insightArticleMetadata(article);
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const article = await getInsight((await params).id);
  if (!article) notFound();
  const structured = insightStructuredData(article);
  return (
    <>
      {structured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(structured) }}
        />
      )}
      <InsightDetailPage
        article={article}
        related={getRelatedInsights(article)}
        canonical={new URL(routes.insight(article.id), getSiteUrl()).href}
      />
    </>
  );
}
