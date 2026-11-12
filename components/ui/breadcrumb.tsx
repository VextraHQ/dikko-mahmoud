import { ChevronRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Breadcrumb(props: ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" data-slot="breadcrumb" {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        // One line at every width: links keep their size and the current page
        // (already shown as the heading below) truncates when space runs out.
        "flex min-w-0 items-center gap-x-2.5 text-sm/6",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "inline-flex shrink-0 items-center last:min-w-0 last:shrink",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbLink({
  asChild = false,
  ...props
}: ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className="hover:text-primary inline-flex min-h-11 items-center rounded-sm font-medium text-slate-700 decoration-1 underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none"
      {...props}
    />
  );
}

export function BreadcrumbPage({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("truncate text-slate-500", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator() {
  return (
    <li role="presentation" aria-hidden="true" className="shrink-0">
      <ChevronRight className="size-4 text-slate-500" strokeWidth={1.5} />
    </li>
  );
}
