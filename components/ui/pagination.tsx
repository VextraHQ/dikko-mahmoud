import type { ComponentProps } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { cn } from "@/lib/utils";

// shadcn/ui Pagination, with links rendered through SiteLink so they follow
// the site's routing rules.
export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem(props: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

const linkClass =
  "text-primary inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-full px-3 text-sm/6 font-medium transition-colors duration-180 hover:bg-slate-100 motion-reduce:transition-none";

export function PaginationLink({
  className,
  isActive,
  ...props
}: ComponentProps<typeof SiteLink> & { isActive?: boolean }) {
  return (
    <SiteLink
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        linkClass,
        isActive && "bg-primary hover:bg-primary text-white",
        className,
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  label = "Previous",
  ...props
}: Omit<ComponentProps<typeof PaginationLink>, "children"> & {
  label?: string;
}) {
  return (
    <PaginationLink aria-label={`Go to previous page`} {...props}>
      <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-4" />
      <span className="hidden sm:inline">{label}</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  label = "Next",
  ...props
}: Omit<ComponentProps<typeof PaginationLink>, "children"> & {
  label?: string;
}) {
  return (
    <PaginationLink aria-label={`Go to next page`} {...props}>
      <span className="hidden sm:inline">{label}</span>
      <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={cn(
        "text-muted-foreground flex size-11 items-center justify-center",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
