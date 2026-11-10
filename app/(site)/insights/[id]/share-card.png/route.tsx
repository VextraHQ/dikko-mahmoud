import { renderShareCard } from "@/components/shared/share-card";
import { insightsCopy } from "@/content/insight-copy";
import { formatInsightDate } from "@/lib/insights/article";
import { getInsight } from "@/lib/insights/repository";
import { insightTypes } from "@/types/insights";

// The article's branded share image, used when it has no editor-supplied one.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const article = await getInsight((await params).id);
  if (!article) return new Response("Not found", { status: 404 });
  const type = insightTypes.find((item) => item.value === article.type);

  return renderShareCard({
    section: [insightsCopy.hub, type?.label].filter(Boolean).join(" · "),
    title: article.title,
    detail: `${article.category} · ${formatInsightDate(article.publishedAt)}`,
  });
}
