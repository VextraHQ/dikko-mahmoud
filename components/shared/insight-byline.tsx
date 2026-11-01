import {
  getInsightAuthor,
  insightAuthorPending,
  type InsightPreview,
} from "@/content/insights";
import { cn } from "@/lib/utils";

export function InsightByline({
  article,
  className,
}: {
  article: InsightPreview;
  className?: string;
}) {
  const author = getInsightAuthor(article);
  return (
    <span data-insight-byline className={cn("mt-3 block text-xs/5", className)}>
      {author ? author.name : insightAuthorPending}
    </span>
  );
}
