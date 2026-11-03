import type { ReactNode } from "react";
import { DirectoryToolbar } from "@/components/people/directory-toolbar";
import { EmptyState } from "@/components/shared/empty-state";
import { EnquiryLink } from "@/components/shared/enquiry-button";
import { PersonCard } from "@/components/shared/person-card";
import { Button } from "@/components/ui/button";
import { peopleDirectory as copy } from "@/content/people";
import type { PeopleDirectoryData } from "@/content/people-directory";
import {
  directoryPresentation,
  groupPeople,
  showDirectoryToolbar,
  type DirectoryFilters,
  type DirectoryPerson,
} from "@/lib/people-directory";
import { cn } from "@/lib/utils";

/**
 * The directory below the introduction: toolbar, count and results.
 *
 * - No filters: people under seniority headings (Partners first).
 * - Filters: one flat grid with a live count, or the empty state.
 *
 * Markup only. It renders twice: on the server with no filters (the static
 * HTML everyone gets first, readable without JavaScript) and in the browser
 * with live filters, where the handlers are passed in.
 */
export function DirectoryView({
  data,
  leadership,
  featuredPersonId,
  filters,
  onFormChange,
  onClear,
  onClearQuery,
  onPracticeChange,
  resetKey = 0,
}: {
  data: PeopleDirectoryData;
  leadership?: ReactNode;
  featuredPersonId?: string;
  filters: DirectoryFilters;
  onFormChange?: (form: FormData) => void;
  onClear?: () => void;
  onClearQuery?: () => void;
  onPracticeChange?: (practice: string) => void;
  resetKey?: number;
}) {
  const total = data.people.length;
  const { active, results, showFeatured } = directoryPresentation(
    data.people,
    filters,
    leadership ? featuredPersonId : undefined,
  );
  const showToolbar = showDirectoryToolbar({
    total,
    minPeople: copy.toolbarMinPeople,
    filters,
    preview: data.preview,
  });

  return (
    <div className="relative mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
      {showFeatured && leadership}
      {showToolbar && (
        // Hidden without JavaScript (see DirectorySection), where it can't filter.
        <div data-directory-toolbar className="mb-8 pt-6 sm:mb-10 sm:pt-8">
          <div className="mb-1 flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <label
              htmlFor="people-search"
              className="text-muted-foreground text-xs/5"
            >
              {copy.searchLabel}
            </label>
            <div className="ml-auto flex items-center gap-4">
              <p
                role="status"
                aria-atomic="true"
                className="text-muted-foreground text-xs/5 tabular-nums sm:text-sm/6"
              >
                {copy.count(active ? results.length : total, total)}
              </p>
              {(filters.practice || filters.role) && onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-primary decoration-primary/40 hover:decoration-primary inline-flex min-h-11 items-center text-xs/5 underline underline-offset-4 sm:text-sm/6"
                >
                  {copy.clearFilters}
                </button>
              )}
            </div>
          </div>
          <DirectoryToolbar
            key={resetKey}
            data={data}
            filters={filters}
            onChange={onFormChange}
            onClearQuery={onClearQuery}
            onPracticeChange={onPracticeChange}
          />
        </div>
      )}

      {!active ? (
        <div
          data-directory-results
          className={
            showToolbar
              ? "space-y-12 lg:space-y-16"
              : "space-y-12 pt-10 lg:space-y-16 lg:pt-16"
          }
        >
          {groupPeople(results, data.roles).map((group) => (
            <section
              key={group.id}
              aria-labelledby={`people-group-${group.id}`}
            >
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2
                  id={`people-group-${group.id}`}
                  className="font-serif text-2xl/8 sm:text-3xl/9"
                >
                  {group.label}
                </h2>
                {data.roles.length > 1 && (
                  <span className="text-muted-foreground text-sm/6 tabular-nums">
                    {group.people.length}
                  </span>
                )}
              </div>
              <PeopleGrid people={group.people} />
            </section>
          ))}
        </div>
      ) : (
        <section
          aria-labelledby={
            results.length ? "people-results-heading" : undefined
          }
        >
          {results.length > 0 && (
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2
                id="people-results-heading"
                className="font-serif text-2xl/8 sm:text-3xl/9"
              >
                {copy.resultsLabel}
              </h2>
            </div>
          )}
          {results.length ? (
            <PeopleGrid people={results} label={copy.resultsLabel} />
          ) : (
            <EmptyState
              headingLevel="h2"
              title={copy.empty.title}
              description={
                filters.role || filters.practice
                  ? copy.empty.filteredDescription
                  : copy.empty.description
              }
              actions={
                <>
                  {onClear && (
                    <Button onClick={onClear}>
                      {filters.role || filters.practice
                        ? copy.clearFilters
                        : copy.empty.clearSearch}
                    </Button>
                  )}
                  <EnquiryLink className="text-primary decoration-primary/40 hover:decoration-primary inline-flex min-h-11 items-center text-sm underline underline-offset-4">
                    {copy.empty.contactAction}
                  </EnquiryLink>
                </>
              }
            />
          )}
        </section>
      )}
    </div>
  );
}

/**
 * One column on narrow phones (wide portrait so the page stays short), two
 * from 28rem, four from `lg`. Portrait-only hover keeps the zoom on the
 * picture, never on the name.
 */
function PeopleGrid({
  people,
  label,
}: {
  people: readonly DirectoryPerson[];
  label?: string;
}) {
  return (
    <ul
      aria-label={label}
      className={cn(
        "grid grid-cols-1 gap-x-5 gap-y-10 min-[28rem]:grid-cols-2 sm:gap-x-6",
        people.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
      )}
    >
      {people.map((person) => (
        <li key={person.id} className="min-w-0">
          <PersonCard
            person={person}
            detail={person.practices[0]?.title}
            imageHoverOnly
            portraitClassName="aspect-4/3 min-[28rem]:aspect-square"
            sizes={
              people.length === 3
                ? "(min-width: 1440px) 411px, (min-width: 1024px) 31vw, (min-width: 448px) 46vw, 100vw"
                : "(min-width: 1440px) 302px, (min-width: 1024px) 23vw, (min-width: 448px) 46vw, 100vw"
            }
          />
        </li>
      ))}
    </ul>
  );
}
