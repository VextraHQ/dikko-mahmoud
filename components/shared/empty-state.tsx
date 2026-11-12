import { SearchX, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A calm "nothing here" panel for a search or listing with no results: the
 * surrounding section (heading, toolbar) stays in place and only the results
 * area swaps for this. Used by the People directory; Insights search can use
 * it too. Copy lives in the caller's content module.
 *
 * It is not a live region: the caller's result count already announces "no
 * results", so this would repeat it.
 */
export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  actions,
  headingLevel: Heading = "h2",
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  /** Buttons or links, for example "Clear filters" and an enquiry action. */
  actions?: ReactNode;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl bg-sky-50 px-6 py-8 text-center sm:px-10 sm:py-10",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="text-primary flex size-10 items-center justify-center rounded-full bg-white"
      >
        <Icon strokeWidth={1.5} className="size-5" />
      </span>
      <Heading className="type-subsection mt-4 font-serif text-balance">
        {title}
      </Heading>
      <p className="text-muted-foreground mt-2 max-w-md text-sm/6 text-pretty">
        {description}
      </p>
      {actions && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {actions}
        </div>
      )}
    </div>
  );
}
