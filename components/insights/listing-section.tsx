import { SiteLink } from "@/components/layout/site-link";
import { ArchiveCard } from "@/components/insights/article-card";
import { InsightsToolbar } from "@/components/insights/toolbar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RevealGroup } from "@/components/shared/reveal-group";
import { EmptyState } from "@/components/shared/empty-state";
import { EnquiryLink } from "@/components/shared/enquiry-button";
import { insightsCopy as copy } from "@/content/insight-copy";
import { insightPageNumbers, insightQueryString } from "@/lib/insights/query";
import { routes } from "@/lib/routes";
import type { InsightPage } from "@/types/insights";

export function InsightListingSection({ data }: { data: InsightPage }) {
  const pageHref = (page: number) =>
    `${routes.insights}${insightQueryString({ ...data.query, page })}#insight-archive-heading`;
  return (
    <section
      aria-labelledby="insight-archive-heading"
      className="mx-auto w-full max-w-360 px-4 py-12 sm:px-8 lg:py-20 xl:px-20"
    >
      <h2
        id="insight-archive-heading"
        tabIndex={-1}
        className="scroll-mt-28 font-serif text-4xl/[1.15] sm:text-5xl/[1.1]"
      >
        {copy.archiveHeading}
      </h2>
      {data.catalogueTotal ? (
        <>
          <InsightsToolbar
            query={data.query}
            facets={data.facets}
            count={data.total}
          />
          {data.items.length ? (
            <RevealGroup>
              <ul className="mt-8 grid items-stretch gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                {data.items.map((article, index) => (
                  <li
                    key={article.id}
                    data-reveal
                    data-reveal-order={index % 3}
                    className="min-w-0"
                  >
                    <ArchiveCard article={article} />
                  </li>
                ))}
              </ul>
            </RevealGroup>
          ) : (
            <EmptyState
              title={copy.noMatches}
              description={copy.noMatchesDescription}
              headingLevel="h3"
              className="mt-8"
              actions={
                <SiteLink
                  href={`${routes.insights}${insightQueryString({ ...data.query, q: "", type: "", practice: "", page: 1 })}#insight-archive-heading`}
                  className="text-primary inline-flex min-h-11 items-center rounded-sm font-semibold underline underline-offset-4"
                >
                  {copy.clearFilters}
                </SiteLink>
              }
            />
          )}
          {data.totalPages > 1 && (
            <div className="border-border mt-8 flex flex-wrap items-center justify-between gap-5 border-t pt-6">
              <p className="text-muted-foreground text-xs/6">
                {copy.showing(
                  (data.page - 1) * data.pageSize + 1,
                  Math.min(data.page * data.pageSize, data.total),
                  data.total,
                )}
              </p>
              <Pagination aria-label={copy.pagination} className="justify-end">
                <PaginationContent>
                  {data.page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        label={copy.previous}
                        href={pageHref(data.page - 1)}
                      />
                    </PaginationItem>
                  )}
                  {insightPageNumbers(data.page, data.totalPages).map(
                    (page) => (
                      <PaginationItem key={page}>
                        {typeof page === "number" ? (
                          <PaginationLink
                            href={pageHref(page)}
                            isActive={page === data.page}
                            aria-label={`Page ${page}`}
                          >
                            {page}
                          </PaginationLink>
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    ),
                  )}
                  {data.page < data.totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        label={copy.next}
                        href={pageHref(data.page + 1)}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title={copy.emptyTitle}
          description={copy.emptyDescription}
          headingLevel="h3"
          className="mt-8"
          actions={
            <>
              <SiteLink
                href={routes.practiceAreas}
                className="text-primary inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Explore practice areas
              </SiteLink>
              <EnquiryLink className="text-primary inline-flex min-h-11 items-center underline underline-offset-4">
                Contact the firm
              </EnquiryLink>
            </>
          }
        />
      )}
    </section>
  );
}
