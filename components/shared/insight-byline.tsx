import { getInsightAuthor, insightAuthorPending } from "@/content/insights";
import type { InsightAuthor } from "@/types/insights";
import { formatNames } from "@/lib/format";
import { cn } from "@/lib/utils";

export function InsightByline({
  article,
  className,
}: {
  article: { authorId?: string | null; authors?: readonly InsightAuthor[] };
  className?: string;
}) {
  const author = getInsightAuthor(article);
  return (
    <span data-insight-byline className={cn("mt-3 block text-xs/5", className)}>
      {article.authors?.length
        ? formatNames(article.authors.map((item) => item.name))
        : (author?.name ?? insightAuthorPending)}
    </span>
  );
}
