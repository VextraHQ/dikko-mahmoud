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
        "text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2 text-sm/6",
        className,
      )}
      {...props}
    />
  );
}
export function BreadcrumbItem(props: ComponentProps<"li">) {
  return <li className="inline-flex min-w-0 items-center" {...props} />;
}
export function BreadcrumbLink({
  asChild = false,
  ...props
}: ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className="text-primary rounded-sm underline-offset-4 hover:underline"
      {...props}
    />
  );
}
export function BreadcrumbPage(props: ComponentProps<"span">) {
  return <span aria-current="page" {...props} />;
}
export function BreadcrumbSeparator() {
  return (
    <li role="presentation" aria-hidden="true">
      <ChevronRight className="text-primary size-4" strokeWidth={1.5} />
    </li>
  );
}
