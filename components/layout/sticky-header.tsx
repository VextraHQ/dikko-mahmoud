"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useScrolledPast } from "@/hooks/use-scrolled-past";

export function StickyHeader({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // `null` keeps the readable no-JS shell until scroll tracking is ready.
  const { markerRef, scrolled } = useScrolledPast<HTMLDivElement>();
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-22 lg:hidden",
          pathname === "/the-firm" ? "bg-navy-deep" : "bg-primary",
        )}
      />
      <div
        ref={markerRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 h-px w-px"
      />
      <header
        data-site-header
        data-scrolled={scrolled ?? undefined}
        className="sticky top-0 z-40 text-white lg:h-0"
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
