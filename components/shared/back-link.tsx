import { ArrowLeft } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { cn } from "@/lib/utils";

type Trail = { label: string; href?: string };

/**
 * One-line page navigation for detail pages: "← All practice areas / Advisory".
 * Replaces a full breadcrumb trail, since the page title sits right below it.
 * The optional trail names where this page belongs and may link there.
 */
export function BackLink({
  href,
  label,
  trail,
  navLabel = "Page navigation",
  className,
}: {
  href: string;
  label: string;
  trail?: Trail;
  navLabel?: string;
  className?: string;
}) {
  return (
    <nav
      aria-label={navLabel}
      className={cn("flex min-w-0 items-center gap-3 text-sm/6", className)}
    >
      <SiteLink
        href={href}
        className="text-primary group/back inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm font-semibold underline-offset-4 hover:underline"
      >
        <ArrowLeft
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/back:-translate-x-0.5"
        />
        {label}
      </SiteLink>
      {trail && (
        <>
          <span aria-hidden="true" className="text-slate-300">
            /
          </span>
          {trail.href ? (
            <SiteLink
              href={trail.href}
              className="text-muted-foreground hover:text-primary min-w-0 truncate rounded-sm underline-offset-4 hover:underline"
            >
              {trail.label}
            </SiteLink>
          ) : (
            <span className="text-muted-foreground min-w-0 truncate">
              {trail.label}
            </span>
          )}
        </>
      )}
    </nav>
  );
}
