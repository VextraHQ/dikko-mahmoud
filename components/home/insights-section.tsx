import { ArrowUpRight, Newspaper } from "lucide-react";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { RevealGroup } from "@/components/shared/reveal-group";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  homeInsights,
  insightsHome as content,
  type InsightPreview,
} from "@/content/insights";
import { SiteLink } from "@/components/layout/site-link";
import { routes } from "@/lib/routes";

function InsightImage({
  article,
  featured = false,
}: {
  article: InsightPreview;
  featured?: boolean;
}) {
  return (
    <ImageWithFallback
      src={article.image?.src}
      alt={article.image?.alt ?? ""}
      fill
      sizes={
        featured
          ? "(min-width: 1440px) 410px, (min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          : "96px"
      }
      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
      style={{ objectPosition: article.image?.position }}
      fallback={
        featured ? (
          <EditorialCover />
        ) : (
          <span
            aria-hidden="true"
            className="text-primary/50 absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200"
          >
            <Newspaper strokeWidth={1} className="size-8" />
          </span>
        )
      }
    />
  );
}

export function InsightsSection() {
  if (!homeInsights) return null;
  const { feature, supporting } = homeInsights;
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="bg-background py-12 lg:py-24"
    >
      <RevealGroup className="mx-auto grid w-full max-w-360 gap-6 px-4 sm:px-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-8 xl:px-20">
        <div
          data-reveal
          className="md:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1"
        >
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2
            id="insights-heading"
            className="mt-4 max-w-xl font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
          >
            {content.heading}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-lg text-sm/6 sm:text-base/7">
            {content.description}
          </p>
          <ArrowButton asChild size="sm" className="mt-6">
            <SiteLink href={routes.insights}>{content.action}</SiteLink>
          </ArrowButton>
          <p className="text-muted-foreground mt-4 text-xs/5">
            {content.reviewNote}
          </p>
        </div>
        <article data-reveal className="min-w-0 xl:col-start-1 xl:row-start-1">
          <SiteLink
            href={routes.insight(feature.id)}
            className="group bg-primary relative isolate flex min-h-100 w-full flex-col overflow-hidden rounded-xl p-6 text-left text-white md:h-full md:min-h-112"
          >
            <InsightImage article={feature} featured />
            <span
              aria-hidden="true"
              className="from-navy-deep/90 via-navy-deep/20 absolute inset-0 bg-linear-to-t to-transparent"
            />
            <span className="relative max-w-[calc(100%-2.5rem)] text-[10px]/4 font-semibold tracking-widest text-white/90 uppercase">
              {content.featuredLabel}
            </span>
            <span
              aria-hidden="true"
              className="text-primary absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white"
            >
              <ArrowUpRight
                strokeWidth={1.5}
                className="size-5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              />
            </span>
            <span className="relative mt-auto pt-40 font-serif text-3xl/9 decoration-white/50 underline-offset-4 group-hover:underline">
              {feature.title}
            </span>
            {feature.excerpt && (
              <span className="relative mt-4 text-sm/6 text-white/80">
                {feature.excerpt}
              </span>
            )}
          </SiteLink>
        </article>
        <ul className="grid content-start gap-4 xl:col-start-3 xl:row-start-1">
          {supporting.map((article, index) => (
            <li
              key={article.id}
              data-reveal
              data-reveal-order={index % 3}
              className="min-w-0"
            >
              <article>
                <SiteLink
                  href={routes.insight(article.id)}
                  className="group hover:border-primary/40 relative grid min-h-30 w-full grid-cols-[4.5rem_1fr] items-center gap-4 rounded-xl border border-slate-300 p-3 text-left transition-colors hover:bg-slate-50 sm:grid-cols-[6rem_1fr]"
                >
                  <span className="relative aspect-square overflow-hidden rounded-lg">
                    <InsightImage article={article} />
                  </span>
                  <span className="min-w-0 pr-3">
                    <span className="decoration-primary/40 block font-serif text-lg/6 underline-offset-4 group-hover:underline">
                      {article.title}
                    </span>
                    <span className="text-muted-foreground mt-2 block text-[10px]/4 uppercase">
                      {article.category}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="text-primary absolute top-2 right-2 size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </SiteLink>
              </article>
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
