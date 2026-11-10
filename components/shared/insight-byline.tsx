import { getInsightAuthor, insightAuthorPending } from "@/content/insights";
import type { InsightAuthor } from "@/types/insights";
import { formatNames } from "@/lib/format";
import { keepTogether } from "@/lib/typography";
import { cn } from "@/lib/utils";

/**
 * Who wrote it. `showRole` adds a single author's firm role ("Name · Partner")
 * where there's room, such as the article header.
 */
export function InsightByline({
  article,
  showRole = false,
  className,
}: {
  article: { authorId?: string | null; authors?: readonly InsightAuthor[] };
  showRole?: boolean;
  className?: string;
}) {
  const author = getInsightAuthor(article);
  const authors = article.authors ?? [];
  const role = showRole && authors.length === 1 ? authors[0].role : undefined;

  return (
    <span data-insight-byline className={cn("mt-3 block text-xs/5", className)}>
      {authors.length
        ? keepTogether(formatNames(authors.map((item) => item.name)))
        : keepTogether(author?.name ?? insightAuthorPending)}
      {role && (
        <span className="text-muted-foreground font-normal"> · {role}</span>
      )}
    </span>
  );
}
