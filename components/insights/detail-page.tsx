import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArticleBody } from "@/components/insights/article-body";
import { ArticleImage } from "@/components/insights/article-image";
import { typeLabel } from "@/components/insights/article-card";
import { ArticleShareControls } from "@/components/insights/share-controls";
import { ReadingExperience } from "@/components/insights/reading-experience";
import { RelatedInsightsSection } from "@/components/insights/related-section";
import { InsightByline } from "@/components/shared/insight-byline";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { insightsCopy as copy } from "@/content/insight-copy";
import { articleContents, formatInsightDate } from "@/lib/insights/article";
import { formatIndex, initialsFrom } from "@/lib/format";
import {
  insightQueryString,
  normalizeInsightQuery,
} from "@/lib/insights/query";
import { routes } from "@/lib/routes";
import type { InsightArticle, InsightCard } from "@/types/insights";
import { PageTrail } from "@/components/shared/page-trail";
import { DetailHero } from "@/components/shared/detail-hero";

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
  const heroImage = article.heroImage ?? article.image;
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
        <DetailHero
          headingId="article-heading"
          eyebrow={[typeLabel(article.type), article.category]
            .filter(Boolean)
            .join(" · ")}
          title={article.title}
          lead={article.excerpt}
          credit={heroImage?.credit}
          media={
            <ArticleImage
              image={heroImage}
              title={article.title}
              eager
              sizes="(min-width: 1440px) 680px, (min-width: 1024px) 48vw, 100vw"
            />
          }
          footer={
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                {article.authors[0] && (
                  <span
                    aria-hidden="true"
                    className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-50 font-serif text-sm"
                  >
                    {initialsFrom(article.authors[0].name)}
                  </span>
                )}
                <div className="min-w-0">
                  <InsightByline
                    article={article}
                    showRole
                    className="text-foreground mt-0 text-sm/6 font-medium"
                  />
                  <p className="text-muted-foreground text-xs/5">
                    <time dateTime={article.publishedAt}>
                      {formatInsightDate(article.publishedAt)}
                    </time>
                    {" · "}
                    {article.readTimeMinutes} {copy.minRead}
                    {article.revisedAt && (
                      <>
                        {" · "}
                        {copy.revised}{" "}
                        <time dateTime={article.revisedAt}>
                          {formatInsightDate(article.revisedAt)}
                        </time>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="-mr-2 shrink-0 print:hidden">
                <ArticleShareControls
                  path={routes.insight(article.id)}
                  title={article.title}
                  canonical={canonical}
                />
              </div>
            </div>
          }
        />
        <ReadingExperience contents={contents} practices={article.practices}>
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
            className="text-primary mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm/6 underline-offset-4 hover:underline print:hidden"
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
