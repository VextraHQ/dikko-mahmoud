import { eyebrowClass } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { ArticleImage } from "@/components/insights/article-image";
import { InsightByline } from "@/components/shared/insight-byline";
import { insightsCopy as copy } from "@/content/insight-copy";
import { formatInsightDate } from "@/lib/insights/article";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  insightTypes,
  type InsightCard,
  type InsightType,
} from "@/types/insights";

export function typeLabel(type: InsightType) {
  return insightTypes.find((item) => item.value === type)?.label;
}

/**
 * Small pill naming the publication type. Solid white with a hairline ring,
 * so it stays readable on dark, busy or very light photos alike.
 */
function InsightTypeBadge({
  type,
  className,
}: {
  type: InsightType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-primary inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs/5 font-medium ring-1 ring-slate-900/10",
        className,
      )}
    >
      {typeLabel(type)}
    </span>
  );
}

/** Date and reading time, plus the type where no badge already shows it. */
export function ArticleMeta({
  article,
  showType = true,
  showReadTime = true,
  className,
}: {
  article: InsightCard;
  showType?: boolean;
  showReadTime?: boolean;
  className?: string;
}) {
  // Plain text parts split by a visible middle dot; the type leads in navy.
  const item =
    "not-first:before:mr-2 not-first:before:font-bold not-first:before:text-slate-400 not-first:before:content-['·']";
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]/6 text-slate-600",
        className,
      )}
    >
      {showType && (
        <span className={cn(item, "text-primary font-semibold")}>
          {typeLabel(article.type)}
        </span>
      )}
      <span className={item}>
        <time dateTime={article.publishedAt}>
          {formatInsightDate(article.publishedAt)}
        </time>
      </span>
      {showReadTime && (
        <span className={item}>
          {article.readTimeMinutes} {copy.minRead}
        </span>
      )}
    </p>
  );
}

function ArticleCard({ article }: { article: InsightCard }) {
  return (
    <article className="h-full min-w-0">
      <SiteLink
        href={routes.insight(article.id)}
        className="group/article ease-editorial hover:border-primary/40 flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-300 focus-visible:outline-offset-4 motion-reduce:transition-none"
      >
        <div className="relative isolate aspect-16/10 overflow-hidden bg-slate-100">
          <ArticleImage
            image={article.image}
            title={article.title}
            sizes="(min-width: 1440px) 400px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="ease-editorial motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover/article:scale-[1.04]"
          />
          <InsightTypeBadge
            type={article.type}
            className="absolute top-3 left-3 z-10"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 lg:p-6">
          <p className={eyebrowClass}>{article.category}</p>
          <h3 className="group-hover/article:text-primary type-card mt-2 font-serif text-balance transition-colors duration-300 motion-reduce:transition-none">
            {article.title}
          </h3>
          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm/6">
            {article.excerpt}
          </p>
          <div className="border-border mt-auto flex items-end justify-between gap-4 border-t pt-5">
            <div className="min-w-0">
              <InsightByline
                article={article}
                className="text-foreground mt-0 truncate font-medium"
              />
              <ArticleMeta article={article} showType={false} />
            </div>
            <span className="text-primary group-hover/article:bg-primary group-hover/article:border-primary flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-colors duration-300 group-hover/article:text-white motion-reduce:transition-none">
              <span className="sr-only">{copy.readArticle}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover/article:rotate-45 motion-reduce:transition-none"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </div>
      </SiteLink>
    </article>
  );
}

/**
 * One-line row card: small image, category, title and date. Used for short
 * lists and for the archive on phones, where full cards scroll too far.
 * `brief` drops the category, type and reading time, for lists that already
 * name the practice, so the title gets the room. `flat` drops the box and the
 * reading time, for lists that split rows with dividers instead (the phone
 * archive), so type and date fit on one line.
 */
export function CompactArticleCard({
  article,
  brief = false,
  flat = false,
}: {
  article: InsightCard;
  brief?: boolean;
  flat?: boolean;
}) {
  return (
    <article className="h-full min-w-0">
      <SiteLink
        href={routes.insight(article.id)}
        className={cn(
          "group/compact flex h-full items-center gap-4 focus-visible:outline-offset-4",
          flat
            ? "py-4"
            : "hover:border-primary/40 border-border rounded-xl border bg-white p-3 transition-colors duration-300 motion-reduce:transition-none",
        )}
      >
        <div className="relative isolate size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <ArticleImage
            image={article.image}
            title={article.title}
            sizes="80px"
            className="ease-editorial motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover/compact:scale-[1.06]"
          />
        </div>
        <div className="min-w-0">
          {!brief && (
            <p className={cn(eyebrowClass, "truncate")}>{article.category}</p>
          )}
          <h3 className="group-hover/compact:text-primary type-row line-clamp-2 font-serif transition-colors duration-300 motion-reduce:transition-none">
            {article.title}
          </h3>
          <InsightByline
            article={article}
            className="text-muted-foreground mt-1"
          />
          <ArticleMeta
            article={article}
            showType={!brief}
            showReadTime={!brief && !flat}
            className="mt-1"
          />
        </div>
      </SiteLink>
    </article>
  );
}

/**
 * Archive item: the full card from small tablets up; on phones a compact row
 * in a divided list, with the type leading its meta line (the image badge
 * that shows the type on full cards is too small to keep there).
 */
export function ArchiveCard({ article }: { article: InsightCard }) {
  return (
    <>
      <div className="h-full max-sm:hidden">
        <ArticleCard article={article} />
      </div>
      <div className="sm:hidden">
        <CompactArticleCard article={article} flat />
      </div>
    </>
  );
}
