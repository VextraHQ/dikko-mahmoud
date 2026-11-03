"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PracticeFilter } from "@/components/people/practice-filter";
import { peopleDirectory as copy } from "@/content/people";
import type { PeopleDirectoryData } from "@/content/people-directory";
import { filterParams, type DirectoryFilters } from "@/lib/people-directory";
import { cn } from "@/lib/utils";

export const peopleSearchInputId = "people-search";

/**
 * Search, practice and role controls as one plain form. The fields are
 * uncontrolled for search/role and controlled for the themed practice select.
 * A hidden field keeps practice in FormData when search or role changes. The
 * same markup works in the server fallback. Controls with no useful data
 * (one role, no confirmed practices) are left out.
 */
export function DirectoryToolbar({
  data,
  filters,
  onChange,
  onClearQuery,
  onPracticeChange,
}: {
  data: PeopleDirectoryData;
  filters: DirectoryFilters;
  onChange?: (form: FormData) => void;
  onClearQuery?: () => void;
  onPracticeChange?: (practice: string) => void;
}) {
  const roleOptions = [{ id: "", label: copy.allRoles }, ...data.roles];
  return (
    <form
      role="search"
      aria-label={copy.toolbarLabel}
      onChange={(event) => {
        // Radix Select emits a change from its hidden native select inside
        // forms. Practice already has a callback; only read the text/radio
        // fields here so that event cannot restore a stale practice value.
        const target = event.target;
        if (
          target instanceof HTMLInputElement &&
          (target.name === filterParams.query ||
            target.name === filterParams.role)
        ) {
          onChange?.(new FormData(event.currentTarget));
        }
      }}
      onSubmit={(event) => event.preventDefault()}
      className="grid gap-4"
    >
      {/* Search takes the full width unless the practice dropdown sits beside it. */}
      <div
        className={cn(
          "grid min-w-0 gap-4",
          data.practices.length > 0 &&
            "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
        )}
      >
        <div className="group/search relative min-w-0">
          <Search
            aria-hidden="true"
            strokeWidth={1.5}
            className="text-muted-foreground group-focus-within/search:text-primary pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 transition-colors duration-200 motion-reduce:transition-none"
          />
          <Input
            id={peopleSearchInputId}
            type="search"
            name={filterParams.query}
            defaultValue={filters.query}
            placeholder={
              data.practices.length ? copy.searchPlaceholder : copy.searchHint
            }
            autoComplete="off"
            maxLength={100}
            className="hover:border-primary/60 focus:border-primary focus-visible:border-primary h-12 rounded-none border-0 border-b border-slate-300 bg-transparent pr-14 pl-7 shadow-none transition-[border-color,box-shadow] duration-200 placeholder:text-slate-500 focus:shadow-[inset_0_-2px_0_var(--primary)] focus-visible:ring-0 focus-visible:outline-none! forced-colors:focus-visible:outline-2! [&::-webkit-search-cancel-button]:appearance-none"
          />
          {filters.query && onClearQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClearQuery}
              aria-label={copy.empty.clearSearch}
              title={copy.empty.clearSearch}
              className="text-primary absolute top-1/2 right-1 -translate-y-1/2 rounded-lg hover:bg-slate-200/70"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </Button>
          )}
        </div>
        {data.practices.length > 0 && (
          <div className="min-w-0">
            <label htmlFor="people-practice" className="sr-only">
              {copy.practiceLabel}
            </label>
            <input
              type="hidden"
              name={filterParams.practice}
              value={filters.practice}
            />
            <PracticeFilter
              practices={data.practices}
              value={filters.practice}
              onChange={onPracticeChange}
            />
          </div>
        )}
      </div>

      {data.roles.length > 1 && (
        <fieldset className="max-w-full min-w-0">
          <legend className="sr-only">{copy.roleLabel}</legend>
          {/* Phones scroll the pills sideways instead of wrapping. */}
          <div className="-mx-4 flex scrollbar-none gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {roleOptions.map((option) => (
              <label
                key={option.id}
                className="has-checked:border-primary has-checked:bg-primary has-focus-visible:ring-primary relative shrink-0 cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm/5 whitespace-nowrap text-slate-700 transition-colors duration-180 hover:border-slate-400 has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                <input
                  type="radio"
                  name={filterParams.role}
                  value={option.id}
                  defaultChecked={filters.role === option.id}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </form>
  );
}
