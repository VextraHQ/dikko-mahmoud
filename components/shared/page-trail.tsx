import { Home } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { BackLink } from "@/components/shared/back-link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export type TrailItem = { label: string; href?: string };

/**
 * Where a detail page sits. Pass the full trail, Home first and the current
 * page last, e.g. Home › Practice areas › Advisory › Corporate…
 *
 * - From `md` up: a breadcrumb with a home icon; the current page truncates.
 * - On phones: one back link to the section (the second item) plus the
 *   group in between, when there is one: "← Practice areas / Advisory".
 */
export function PageTrail({
  items,
  className,
}: {
  items: readonly TrailItem[];
  className?: string;
}) {
  const [home, ...rest] = items;
  const section = items.length > 2 ? items[1] : home;
  const group = items.length > 3 ? items[items.length - 2] : undefined;

  return (
    <div className={cn("print:hidden", className)}>
      <Breadcrumb className="max-md:hidden">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <SiteLink href={home.href ?? "/"}>
                <Home aria-hidden="true" className="size-4" strokeWidth={1.5} />
                <span className="sr-only">{home.label}</span>
              </SiteLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {rest.map((item, index) => {
            const last = index === rest.length - 1;
            return <TrailStep key={item.label} item={item} current={last} />;
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <BackLink
        href={section.href ?? "/"}
        label={section.label}
        trail={group}
        className="md:hidden"
      />
    </div>
  );
}

function TrailStep({ item, current }: { item: TrailItem; current: boolean }) {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem className={cn(current && "min-w-0")}>
        {current || !item.href ? (
          <BreadcrumbPage aria-current={current ? "page" : undefined}>
            {item.label}
          </BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <SiteLink href={item.href}>{item.label}</SiteLink>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    </>
  );
}
