import { Sparkles } from "lucide-react";
import { ArticleImage } from "@/components/insights/article-image";
import { ArticleMeta } from "@/components/insights/article-card";
import { InsightByline } from "@/components/shared/insight-byline";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { insightsCopy as copy } from "@/content/insight-copy";
import { routes } from "@/lib/routes";
import type { InsightCard } from "@/types/insights";

export function InsightsHeroSection({
  featured,
}: {
  featured: InsightCard | null;
}) {
  return (
    <section
      aria-labelledby="insights-title"
      className="bg-navy-deep pb-12 text-white lg:pt-40 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-360 px-4 pt-8 sm:px-8 lg:pt-0 xl:px-20">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="text-white/75">{copy.series}</Eyebrow>
            <h1
              id="insights-title"
              className="mt-6 font-serif text-[40px]/[1.08] sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
            >
              {copy.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <p className="max-w-lg text-base/7 text-white/85 lg:text-lg/8">
            {copy.description}
          </p>
        </div>
        {featured && (
          <article className="group/feature text-foreground mt-10 overflow-hidden rounded-2xl bg-white lg:mt-14">
            <div className="grid lg:grid-cols-2">
              <div className="relative isolate aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-104">
                <ArticleImage
                  image={featured.image}
                  title={featured.title}
                  eager
                  sizes="(min-width: 1440px) 640px, (min-width: 1024px) 45vw, 100vw"
                  className="ease-editorial motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover/feature:scale-[1.03]"
                />
                <span className="bg-primary absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs/5 font-semibold text-white ring-1 ring-white/30">
                  <Sparkles
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.75}
                  />
                  {copy.featured}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center p-6 sm:p-8 xl:p-10">
                <Eyebrow className="text-primary">{featured.category}</Eyebrow>
                <h2 className="mt-4 font-serif text-3xl/[1.15] sm:text-4xl/[1.15] xl:text-5xl/[1.1]">
                  <SiteLink
                    href={routes.insight(featured.id)}
                    className="decoration-primary/40 rounded-sm underline-offset-4 hover:underline"
                  >
                    {featured.title}
                  </SiteLink>
                </h2>
                <p className="text-muted-foreground mt-5 text-base/7">
                  {featured.excerpt}
                </p>
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <InsightByline
                    article={featured}
                    className="text-foreground mt-0 text-sm/6 font-medium"
                  />
                  <ArticleMeta article={featured} className="mt-1" />
                </div>
                <ArrowButton asChild className="mt-6">
                  <SiteLink href={routes.insight(featured.id)}>
                    {copy.readArticle}
                  </SiteLink>
                </ArrowButton>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
