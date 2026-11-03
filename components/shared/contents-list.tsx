"use client";

import { SectionLink } from "@/components/shared/section-link";
import { cn } from "@/lib/utils";

export type ContentsItem = { id: string; text: string; level?: number };

/**
 * "On this page" list with a left rule; the active section gets a navy
 * marker. Shared by article contents and practice pages.
 */
export function ContentsList({
  items,
  active,
  onNavigate,
  className,
}: {
  items: readonly ContentsItem[];
  active: string;
  onNavigate?: (id: string) => void;
  className?: string;
}) {
  return (
    <ol className={cn("border-l border-slate-200", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <SectionLink
            sectionId={item.id}
            onNavigate={onNavigate}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "text-muted-foreground hover:text-primary -ml-px flex min-h-10 items-center border-l-2 border-transparent py-2 pr-2 pl-4 text-sm/6 transition-colors duration-200 hover:border-slate-300 motion-reduce:transition-none",
              item.level === 3 && "pl-7 text-xs/6",
              active === item.id &&
                "text-primary border-primary hover:border-primary font-medium",
            )}
          >
            {item.text}
          </SectionLink>
        </li>
      ))}
    </ol>
  );
}
