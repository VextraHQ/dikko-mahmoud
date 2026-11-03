import { ArrowLeft, ArrowUpRight, PenLine } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArticleBody } from "@/components/insights/article-body";
import { ArticleImage } from "@/components/insights/article-image";
import { ArticleMeta } from "@/components/insights/article-card";
import { ArticleShareControls } from "@/components/insights/share-controls";
import { ReadingExperience } from "@/components/insights/reading-experience";
import { RelatedInsightsSection } from "@/components/insights/related-section";
import { InsightByline } from "@/components/shared/insight-byline";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { insightsCopy as copy } from "@/content/insight-copy";
import { articleContents, formatInsightDate } from "@/lib/insights/article";
import { formatIndex } from "@/lib/format";
import {
  insightQueryString,
  normalizeInsightQuery,
} from "@/lib/insights/query";
import { routes } from "@/lib/routes";
import type { InsightArticle, InsightCard } from "@/types/insights";
import { PageTrail } from "@/components/shared/page-trail";

export function InsightDetailPage({
  article,
  related,
  canonical,
}: {
  article: InsightArticle;
  related: InsightCard[];
  canonical: string;
}) {
  const contents = articleContents(article.body);
  const primaryPractice = article.practices.find(
    (practice) => practice.slug === article.practiceIds[0],
  );
  if (article.references.length && contents.length)
    contents.push({
      id: "article-references",
      text: copy.references,
      level: 2,
    });
  return (
    <>
      <div className="mx-auto w-full max-w-360 px-4 pt-6 sm:px-8 sm:pt-10 lg:pt-36 xl:px-20">
        <PageTrail
          items={[
            { label: copy.home, href: routes.home },
            { label: copy.hub, href: routes.insights },
            {
              label: article.category,
              href: primaryPractice
                ? `${routes.insights}${insightQueryString(normalizeInsightQuery({ practice: primaryPractice.slug }))}`
                : undefined,
            },
            { label: article.title },
          ]}
        />
        <section
          aria-labelledby="article-heading"
          className="grid items-center gap-6 pt-4 pb-10 sm:gap-8 sm:pt-10 sm:pb-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-12 lg:pb-20"
        >
          <div>
            <ArticleMeta article={article} />
            <h1
              id="article-heading"
              tabIndex={-1}
              className="mt-5 scroll-mt-32 font-serif text-[40px]/[1.08] text-balance sm:text-5xl/[1.08] xl:text-6xl/[1.06]"
            >
              {article.title}
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-base/7 lg:text-lg/8">
              {article.excerpt}
            </p>
            <div className="mt-7 flex items-center gap-3 border-t border-slate-200 pt-5">
              <span className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-50">
                <PenLine
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.5}
                />
              </span>
              <div className="min-w-0">
                <InsightByline
                  article={article}
                  className="text-foreground mt-0 text-sm/6 font-medium"
                />
                {article.revisedAt && (
                  <p className="text-muted-foreground text-xs/5">
                    {copy.revised}{" "}
                    <time dateTime={article.revisedAt}>
                      {formatInsightDate(article.revisedAt)}
                    </time>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 lg:hidden">
              <ArticleShareControls
                path={routes.insight(article.id)}
                title={article.title}
                canonical={canonical}
              />
            </div>
          </div>
          <figure>
            <div className="relative isolate aspect-4/3 overflow-hidden rounded-xl">
              <ArticleImage
                image={article.heroImage ?? article.image}
                title={article.title}
                eager
                sizes="(min-width: 1440px) 580px, (min-width: 1024px) 44vw, 92vw"
              />
            </div>
            {(article.heroImage ?? article.image)?.credit && (
              <figcaption className="text-muted-foreground mt-2 text-[10px]/5">
                Photo: {(article.heroImage ?? article.image)?.credit}
              </figcaption>
            )}
          </figure>
        </section>
        <ReadingExperience
          contents={contents}
          practices={article.practices}
          path={routes.insight(article.id)}
          title={article.title}
          canonical={canonical}
        >
          <ArticleBody blocks={article.body} />
          {article.references.length > 0 && (
            <section
              aria-labelledby="article-references"
              className="my-10 rounded-xl bg-slate-50 p-6 sm:p-8"
            >
              <Eyebrow>{copy.sources}</Eyebrow>
              <h2
                id="article-references"
                tabIndex={-1}
                className="mt-4 scroll-mt-32 font-serif text-3xl/10"
              >
                {copy.references}
              </h2>
              <ol className="mt-6">
                {article.references.map((ref, index) => (
                  <li
                    key={ref.id}
                    id={`reference-${ref.id}`}
                    className="border-border scroll-mt-32 border-t py-5"
                  >
                    <a
                      href={ref.href}
                      rel="noopener noreferrer"
                      className="text-primary group/ref flex min-h-11 items-center gap-4 rounded-sm"
                    >
                      <span className="text-muted-foreground text-xs/6">
                        {formatIndex(index)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-xl/7 group-hover/ref:underline">
                          {ref.title}
                        </span>
                        <span className="text-muted-foreground text-xs/6">
                          {ref.publisher}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="size-5 shrink-0"
                      />
                    </a>
                    {ref.note && (
                      <p className="text-muted-foreground mt-2 text-sm/7">
                        {ref.note}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
          <p className="text-muted-foreground border-border mt-10 border-t pt-6 text-xs/6">
            {copy.disclaimer}
          </p>
          <SiteLink
            href={routes.insights}
            className="text-primary mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm/6 underline-offset-4 hover:underline"
          >
            <ArrowLeft
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4"
            />
            {copy.back}
          </SiteLink>
        </ReadingExperience>
      </div>
      <RelatedInsightsSection items={related} />
      <EnquiryCta />
    </>
  );
}
