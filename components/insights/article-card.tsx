import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  FileText,
  Landmark,
  Megaphone,
  Scale,
  type LucideIcon,
} from "lucide-react";
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

const typeIcons: Record<InsightType, LucideIcon> = {
  article: FileText,
  "case-note": Scale,
  "regulatory-update": Landmark,
  "firm-news": Megaphone,
};

function typeLabel(type: InsightType) {
  return insightTypes.find((item) => item.value === type)?.label;
}

/**
 * Small pill naming the publication type. Solid white with a hairline ring,
 * so it stays readable on dark, busy or very light photos alike.
 */
export function InsightTypeBadge({
  type,
  className,
}: {
  type: InsightType;
  className?: string;
}) {
  const Icon = typeIcons[type];
  return (
    <span
      className={cn(
        "text-primary inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs/5 font-medium ring-1 ring-slate-900/10",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
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
  const TypeIcon = typeIcons[article.type];
  const item = "inline-flex items-center gap-1.5";
  const icon = "size-3.5 shrink-0 text-primary/70";
  return (
    <p
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs/6",
        className,
      )}
    >
      {showType && (
        <span className={item}>
          <TypeIcon aria-hidden="true" className={icon} strokeWidth={1.75} />
          {typeLabel(article.type)}
        </span>
      )}
      <span className={item}>
        <CalendarDays aria-hidden="true" className={icon} strokeWidth={1.75} />
        <time dateTime={article.publishedAt}>
          {formatInsightDate(article.publishedAt)}
        </time>
      </span>
      {showReadTime && (
        <span className={item}>
          <Clock aria-hidden="true" className={icon} strokeWidth={1.75} />
          {article.readTimeMinutes} {copy.minRead}
        </span>
      )}
    </p>
  );
}

export function ArticleCard({ article }: { article: InsightCard }) {
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
          <p className="text-primary text-[11px]/5 font-semibold tracking-wider uppercase">
            {article.category}
          </p>
          <h3 className="group-hover/article:text-primary mt-2 font-serif text-2xl/8 text-balance transition-colors duration-300 motion-reduce:transition-none">
            {article.title}
          </h3>
          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm/6">
            {article.excerpt}
          </p>
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
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
 * `brief` drops the category and reading time, for lists that already name
 * the practice, so the title gets the room.
 */
export function CompactArticleCard({
  article,
  brief = false,
}: {
  article: InsightCard;
  brief?: boolean;
}) {
  return (
    <article className="h-full min-w-0">
      <SiteLink
        href={routes.insight(article.id)}
        className="group/compact hover:border-primary/40 flex h-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 transition-colors duration-300 focus-visible:outline-offset-4 motion-reduce:transition-none"
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
            <p className="text-primary truncate text-[11px]/5 font-semibold tracking-wider uppercase">
              {article.category}
            </p>
          )}
          <h3 className="group-hover/compact:text-primary line-clamp-2 font-serif text-lg/6 transition-colors duration-300 motion-reduce:transition-none">
            {article.title}
          </h3>
          <ArticleMeta
            article={article}
            showType={false}
            showReadTime={!brief}
            className="mt-1"
          />
        </div>
      </SiteLink>
    </article>
  );
}

/** Archive item: the full card from small tablets up, a compact row on phones. */
export function ArchiveCard({ article }: { article: InsightCard }) {
  return (
    <>
      <div className="h-full max-sm:hidden">
        <ArticleCard article={article} />
      </div>
      <div className="sm:hidden">
        <CompactArticleCard article={article} />
      </div>
    </>
  );
}
