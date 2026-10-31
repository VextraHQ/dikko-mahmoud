"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { routes } from "@/lib/routes";
import { headerTone } from "@/lib/navigation";
import { useScrolledPast } from "@/hooks/use-scrolled-past";

export function StickyHeader({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const light = headerTone(pathname) === "light";
  // `null` keeps the readable no-JS shell until scroll tracking is ready.
  const { markerRef, scrolled } = useScrolledPast<HTMLDivElement>();
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-22 lg:hidden",
          light
            ? "bg-white"
            : pathname === routes.firm || pathname === routes.practiceAreas
              ? "bg-navy-deep"
              : "bg-primary",
        )}
      />
      <div
        ref={markerRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 h-px w-px"
      />
      <header
        data-site-header
        data-tone={light ? "light" : "dark"}
        data-scrolled={scrolled ?? undefined}
        className={cn(
          "group/site-header sticky top-0 z-40 lg:h-0",
          light ? "text-primary" : "text-white",
        )}
      >
        <div className="mx-auto w-full max-w-360 px-4 pt-3 sm:px-8 xl:px-20 xl:pt-5">
          <div className="site-header-surface relative isolate rounded-full">
            {children}
          </div>
        </div>
      </header>
    </>
  );
}
