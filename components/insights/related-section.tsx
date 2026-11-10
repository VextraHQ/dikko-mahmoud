import { ArchiveCard } from "@/components/insights/article-card";
import { RevealGroup } from "@/components/shared/reveal-group";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { insightsCopy as copy } from "@/content/insight-copy";
import { routes } from "@/lib/routes";
import type { InsightCard } from "@/types/insights";

export function RelatedInsightsSection({
  items,
}: {
  items: readonly InsightCard[];
}) {
  if (!items.length) return null;
  return (
    <section
      aria-labelledby="related-insights-heading"
      className="mt-12 bg-slate-50 py-12 lg:mt-20 lg:py-20 print:hidden"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{copy.relatedEyebrow}</Eyebrow>
            <h2
              id="related-insights-heading"
              className="mt-4 font-serif text-3xl/10 sm:text-4xl/11"
            >
              {copy.relatedHeading}
            </h2>
            <p className="text-muted-foreground mt-4 text-sm/7">
              {copy.relatedDescription}
            </p>
          </div>
          <ArrowButton asChild size="sm">
            <SiteLink href={routes.insights}>{copy.allInsights}</SiteLink>
          </ArrowButton>
        </div>
        <RevealGroup>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item.id}
                data-reveal
                data-reveal-order={index % 3}
                className="min-w-0"
              >
                <ArchiveCard article={item} />
              </li>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
