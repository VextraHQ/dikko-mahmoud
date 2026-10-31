"use client";

import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { SiteLink } from "@/components/layout/site-link";
import { navigation } from "@/content/navigation";
import { isActivePath } from "@/lib/navigation";
import { isRouteAvailable, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function SiteNavigation({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav
      aria-label={mobile ? "Mobile navigation" : "Main navigation"}
      className={
        mobile
          ? undefined
          : "site-navigation-surface relative isolate rounded-full p-1"
      }
    >
      <ul
        className={mobile ? "flex flex-col gap-4" : "flex items-center gap-1"}
      >
        {navigation.map((item) => {
          const active =
            isRouteAvailable(item.href) && isActivePath(pathname, item.href);
          const label =
            mobile && item.label === "Contact" ? "Contact us" : item.label;
          const className = cn(
            "rounded-full",
            mobile
              ? "block w-full px-3 py-2 text-left font-serif text-[28px]/9"
              : "flex h-11 items-center gap-1.5 px-3 text-sm font-semibold transition-colors motion-reduce:transition-none",
            active ? "bg-white text-secondary" : "hover:bg-white/12",
          );
          return (
            <li key={item.href}>
              <SiteLink
                href={item.href}
                aria-current={active ? "page" : undefined}
                onNavigate={onNavigate}
                className={className}
              >
                {label}
                {!mobile && item.href === routes.practiceAreas && (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.5}
                  />
                )}
              </SiteLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
