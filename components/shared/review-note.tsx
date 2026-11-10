import type { ReactNode } from "react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * An "awaiting confirmation" note for one section. Hidden unless
 * `siteConfig.reviewNotes` is on; the site-wide preview banner covers demos.
 */
export function ReviewNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  if (!siteConfig.reviewNotes) return null;

  return (
    <p
      className={cn(
        "text-muted-foreground border-l-2 border-sky-200 pl-4 text-xs/6",
        className,
      )}
    >
      {children}
    </p>
  );
}
