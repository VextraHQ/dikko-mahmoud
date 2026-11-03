import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileQuestion } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { insightsCopy } from "@/content/insight-copy";
import { formatInsightDate } from "@/lib/insights/article";
import { normalizeInsightQuery } from "@/lib/insights/query";
import { getInsightPage } from "@/lib/insights/repository";
import { routes } from "@/lib/routes";

const copy = insightsCopy.notFound;

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  robots: { index: false, follow: true },
};

// A missing or unpublished article stays inside the Insights area: a light
// page under the light article header, with a way back to real reading.
export default async function InsightNotFound() {
  const latest = (await getInsightPage(normalizeInsightQuery({}))).items.slice(
    0,
    3,
  );
  return (
    <section className="mx-auto w-full max-w-360 px-4 pt-10 pb-20 sm:px-8 lg:pt-36 lg:pb-28 xl:px-20">
      <div className="border-border mx-auto max-w-3xl rounded-2xl border bg-white p-6 sm:p-10 lg:p-12">
        <span className="text-primary flex size-12 items-center justify-center rounded-full bg-sky-50">
          <FileQuestion
            aria-hidden="true"
            className="size-6"
            strokeWidth={1.5}
          />
        </span>
        <Eyebrow className="mt-6">{copy.eyebrow}</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl/[1.1] sm:text-5xl/[1.05]">
          {copy.title}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-base/7">
          {copy.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ArrowButton asChild>
            <SiteLink href={routes.insights}>{copy.browse}</SiteLink>
          </ArrowButton>
          <Link
            href={routes.home}
            className="text-primary inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold hover:bg-sky-50"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.5}
            />
            {copy.home}
          </Link>
        </div>
        {latest.length > 0 && (
          <nav
            aria-labelledby="latest-insights"
            className="border-border mt-10 border-t pt-8"
          >
            <h2
              id="latest-insights"
              className="text-primary text-xs/5 font-semibold tracking-widest uppercase"
            >
              {copy.latest}
            </h2>
            <ul className="divide-border mt-3 divide-y">
              {latest.map((article) => (
                <li key={article.id}>
                  <SiteLink
                    href={routes.insight(article.id)}
                    className="group flex items-start justify-between gap-4 rounded-sm py-4"
                  >
                    <span>
                      <span className="text-foreground group-hover:text-primary block font-serif text-xl/7 transition-colors">
                        {article.title}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs/5">
                        {article.category} ·{" "}
                        <time dateTime={article.publishedAt}>
                          {formatInsightDate(article.publishedAt)}
                        </time>
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-primary mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      strokeWidth={1.5}
                    />
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
