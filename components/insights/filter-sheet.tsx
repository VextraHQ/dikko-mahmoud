"use client";
import { eyebrowClass } from "@/components/ui/eyebrow";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { FilterOption } from "@/components/shared/filter-select";
import { insightsCopy as copy } from "@/content/insight-copy";
import { cn } from "@/lib/utils";
import type { InsightFacets, InsightQuery } from "@/types/insights";

type Draft = Pick<InsightQuery, "practice" | "type" | "sort">;
type Key = keyof Draft;

/**
 * Phones only: one "Filters" button beside the search, opening a bottom
 * sheet with practice area, type and sort as plain choices. Each pick
 * applies at once; the footer button shows the result count and closes.
 */
export function InsightFilterSheet({
  draft,
  facets,
  count,
  onChange,
  className,
}: {
  draft: Draft;
  facets: InsightFacets;
  count: number;
  onChange: (key: Key, value: string) => void;
  className?: string;
}) {
  const active = [draft.practice, draft.type].filter(Boolean).length;
  const groups: {
    key: Key;
    label: string;
    options: readonly FilterOption[];
  }[] = [
    ...(facets.practices.length > 0
      ? [
          {
            key: "practice" as const,
            label: copy.practiceLabel,
            options: [
              { value: "", label: copy.allPractices },
              ...facets.practices,
            ],
          },
        ]
      : []),
    ...(facets.types.length > 1
      ? [
          {
            key: "type" as const,
            label: copy.typeLabel,
            options: [{ value: "", label: copy.allTypes }, ...facets.types],
          },
        ]
      : []),
    {
      key: "sort" as const,
      label: copy.sortLabel,
      options: [
        { value: "newest", label: copy.newest },
        { value: "oldest", label: copy.oldest },
      ],
    },
  ];

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "text-primary inline-flex h-12 shrink-0 items-center gap-2 border-b border-slate-300 text-sm font-semibold",
          className,
        )}
      >
        <SlidersHorizontal
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4"
        />
        {copy.filters}
        {active > 0 && (
          <span className="bg-primary flex size-5 items-center justify-center rounded-full text-[11px] text-white">
            {active}
          </span>
        )}
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="text-foreground inset-x-0 top-auto bottom-0 max-h-[85svh] rounded-t-2xl bg-white px-0 pt-0 pb-[max(1rem,env(safe-area-inset-bottom))] sm:left-0 sm:w-auto"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
          <SheetTitle className="font-serif text-xl/8">
            {copy.filters}
          </SheetTitle>
          <SheetClose
            aria-label={copy.closeOptions}
            className="text-primary -mr-2 flex size-11 items-center justify-center rounded-full hover:bg-slate-100"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </SheetClose>
        </div>
        {groups.map((group) => (
          <fieldset key={group.key} className="px-5 pt-6">
            {/* Floated so the legend sits inside the padding like any heading. */}
            <legend
              className={cn(
                eyebrowClass,
                "text-muted-foreground float-left w-full",
              )}
            >
              {group.label}
            </legend>
            <div className="divide-border clear-both divide-y pt-1">
              {group.options.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-12 cursor-pointer items-center justify-between gap-4 text-base/6"
                >
                  {option.label}
                  <input
                    type="radio"
                    name={`sheet-${group.key}`}
                    value={option.value}
                    checked={draft[group.key] === option.value}
                    onChange={() => onChange(group.key, option.value)}
                    className="accent-primary size-5 shrink-0"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="sticky bottom-0 mt-6 border-t border-slate-200 bg-white px-5 pt-4">
          <SheetClose className="bg-primary min-h-12 w-full rounded-full text-sm font-semibold text-white">
            {copy.showResults(count)}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
