import { Fragment } from "react";
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
 * - From `md` up: the whole trail, as the designer drew it. Links are
 *   underlined on hover; the current page is plain text that truncates.
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
  const [home] = items;
  const section = items.length > 2 ? items[1] : home;
  const group = items.length > 3 ? items[items.length - 2] : undefined;

  return (
    <div className={cn("print:hidden", className)}>
      <Breadcrumb className="max-md:hidden">
        <BreadcrumbList>
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <Fragment key={item.label}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
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
              </Fragment>
            );
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
