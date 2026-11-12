import { ArrowRight } from "lucide-react";
import { CompactArticleCard } from "@/components/insights/article-card";
import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { insightsCopy } from "@/content/insight-copy";
import {
  insightQueryString,
  normalizeInsightQuery,
} from "@/lib/insights/query";
import { routes } from "@/lib/routes";
import type { InsightCard } from "@/types/insights";

const copy = insightsCopy.practiceStrip;

/**
 * The newest articles tagged with this practice. It fills itself from each
 * article's practice tags and is left out when there are none.
 */
export function PracticeInsightsSection({
  practice,
  insights,
}: {
  practice: { slug: string; title: string };
  insights: InsightCard[];
}) {
  if (!insights.length) return null;
  const archiveHref = `${routes.insights}${insightQueryString(normalizeInsightQuery({ practice: practice.slug }))}`;

  return (
    <section
      aria-labelledby="practice-insights-heading"
      className="border-border border-t py-10 lg:py-12"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2
            id="practice-insights-heading"
            className="type-section mt-3 font-serif"
          >
            {copy.heading(practice.title)}
          </h2>
        </div>
        <SiteLink
          href={archiveHref}
          className="text-primary group/all inline-flex min-h-11 items-center gap-2 rounded-sm text-sm/6 font-semibold underline-offset-4 hover:underline"
        >
          {copy.all}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/all:translate-x-0.5"
          />
        </SiteLink>
      </div>
      <ul className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {insights.map((article) => (
          <li key={article.id} className="min-w-0">
            <CompactArticleCard article={article} brief />
          </li>
        ))}
      </ul>
    </section>
  );
}
