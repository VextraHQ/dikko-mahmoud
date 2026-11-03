"use client";
import { ArrowDownUp, LoaderCircle, RotateCcw, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FilterSelect,
  underlineFieldClass,
} from "@/components/shared/filter-select";
import { useDelayedFlag } from "@/hooks/use-delayed-flag";
import { useInsightFilters } from "@/hooks/use-insight-filters";
import { insightsCopy as copy } from "@/content/insight-copy";
import { SiteLink } from "@/components/layout/site-link";
import { insightQueryString, hasInsightFilters } from "@/lib/insights/query";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { InsightFacets, InsightQuery } from "@/types/insights";

// Types only appear once an article uses them. Up to this many read best as
// pills; a longer list becomes a dropdown so the row never sprawls.
const maxTypePills = 5;

export function InsightsToolbar({
  query,
  facets,
  count,
}: {
  query: InsightQuery;
  facets: InsightFacets;
  count: number;
}) {
  const { draft, pending, update, submit, clearQuery, clearFilters } =
    useInsightFilters(query);
  // Most updates finish in a blink; only a slow one shows "Updating…".
  const slow = useDelayedFlag(pending);
  return (
    <form
      action={routes.insights}
      method="get"
      role="search"
      aria-label={copy.searchLabel}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="mt-8"
      aria-busy={pending}
    >
      <div
        className={cn(
          "grid min-w-0 gap-4 lg:gap-8",
          facets.practices.length > 0 &&
            "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
        )}
      >
        <div className="group/search relative min-w-0">
          <label htmlFor="insights-search" className="sr-only">
            {copy.searchLabel}
          </label>
          <Search
            aria-hidden="true"
            strokeWidth={1.5}
            className="text-muted-foreground group-focus-within/search:text-primary pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 transition-colors duration-200 motion-reduce:transition-none"
          />
          <Input
            id="insights-search"
            type="search"
            name="q"
            value={draft.q}
            onChange={(event) => update({ q: event.target.value }, true)}
            placeholder={copy.searchPlaceholder}
            maxLength={120}
            autoComplete="off"
            className={cn(
              underlineFieldClass,
              "pr-14 pl-7 placeholder:text-slate-500 [&::-webkit-search-cancel-button]:appearance-none",
            )}
          />
          {draft.q && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearQuery}
              aria-label={copy.clearSearch}
              title={copy.clearSearch}
              className="text-primary absolute top-1/2 right-1 -translate-y-1/2 rounded-lg hover:bg-slate-200/70"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </Button>
          )}
        </div>
        {facets.practices.length > 0 && (
          <>
            <input type="hidden" name="practice" value={draft.practice} />
            <FilterSelect
              id="insights-practice"
              label={copy.practiceLabel}
              closeLabel={copy.closeOptions}
              value={draft.practice}
              options={[
                { value: "", label: copy.allPractices },
                ...facets.practices,
              ]}
              onChange={(practice) => update({ practice })}
              sheet
            />
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        {facets.types.length > 1 && facets.types.length <= maxTypePills && (
          <fieldset className="max-w-full min-w-0">
            <legend className="sr-only">{copy.typeLabel}</legend>
            {/* Phones scroll the pills sideways instead of wrapping. */}
            <div className="-mx-4 flex scrollbar-none gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {[{ value: "", label: copy.allTypes }, ...facets.types].map(
                (option) => (
                  <label
                    key={option.value}
                    className="has-checked:border-primary has-checked:bg-primary has-focus-visible:ring-primary relative shrink-0 cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm/5 whitespace-nowrap text-slate-700 transition-colors duration-180 hover:border-slate-400 has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-offset-2 motion-reduce:transition-none"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={draft.type === option.value}
                      onChange={() => update({ type: option.value })}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ),
              )}
            </div>
          </fieldset>
        )}
        {facets.types.length > maxTypePills && (
          <>
            <input type="hidden" name="type" value={draft.type} />
            <FilterSelect
              id="insights-type"
              label={copy.typeLabel}
              closeLabel={copy.closeOptions}
              value={draft.type}
              options={[{ value: "", label: copy.allTypes }, ...facets.types]}
              onChange={(type) => update({ type })}
              sheet
              className="w-full sm:w-64"
            />
          </>
        )}
        <FilterSelect
          id="insights-sort"
          label={copy.sortLabel}
          value={draft.sort}
          options={[
            { value: "newest", label: copy.newest },
            { value: "oldest", label: copy.oldest },
          ]}
          onChange={(sort) =>
            update({ sort: sort === "oldest" ? "oldest" : "newest" })
          }
          icon={
            <ArrowDownUp
              aria-hidden="true"
              strokeWidth={1.5}
              className="text-muted-foreground size-4 shrink-0"
            />
          }
          className="ml-auto w-44"
        />
        <input type="hidden" name="sort" value={draft.sort} />
      </div>

      <div className="border-border mt-5 flex min-h-12 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t pt-4 text-sm/6">
        {/* Announces the settled count only; "updating" is visual, so
            screen readers aren't interrupted on every pause in typing. */}
        <p className="text-muted-foreground flex items-center gap-2">
          {slow && (
            <LoaderCircle
              aria-hidden="true"
              strokeWidth={1.5}
              className="text-primary size-4 motion-safe:animate-spin"
            />
          )}
          <span aria-hidden="true">
            {slow ? copy.updating : copy.count(count)}
          </span>
          <span role="status" aria-atomic="true" className="sr-only">
            {pending ? "" : copy.count(count)}
          </span>
        </p>
        {hasInsightFilters(draft) && (
          <SiteLink
            href={`${routes.insights}${insightQueryString({ ...draft, q: "", type: "", practice: "", page: 1 })}`}
            onClick={(event) => {
              event.preventDefault();
              clearFilters();
            }}
            className="text-primary inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline-offset-4 hover:underline"
          >
            <RotateCcw
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4"
            />
            {copy.clearFilters}
          </SiteLink>
        )}
      </div>
      <noscript>
        <Button type="submit" className="mt-4">
          {copy.searchAction}
        </Button>
      </noscript>
    </form>
  );
}
