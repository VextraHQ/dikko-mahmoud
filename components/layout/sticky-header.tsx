"use client";

import { useSitePathname } from "@/hooks/use-site-pathname";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { routes } from "@/lib/routes";
import { headerTone } from "@/lib/navigation";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { useHeaderOverDark } from "@/hooks/use-header-over-dark";
import { HeaderToneContext } from "@/hooks/use-header-tone";

export function StickyHeader({ children }: { children: ReactNode }) {
  const pathname = useSitePathname();
  const pageLight = headerTone(pathname) === "light";
  // Follows what's under it once measured: white over light content, dark
  // over dark heroes and the footer. Before that (and without JS) the page's
  // own tone applies.
  const overDark = useHeaderOverDark(pathname);
  const light = overDark === null ? pageLight : !overDark;
  // `null` keeps the readable no-JS shell until scroll tracking is ready.
  const { markerRef, scrolled } = useScrolledPast<HTMLDivElement>();
  return (
    <>
      <div
        data-site-header-backing
        aria-hidden="true"
        data-header-dark={pageLight ? undefined : ""}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-22 group-data-preview/site-shell:h-28 lg:hidden",
          pageLight
            ? "bg-white"
            : pathname === routes.firm ||
                pathname === routes.practiceAreas ||
                pathname === routes.people ||
                pathname === routes.experience ||
                pathname === routes.insights
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
          "group/site-header ease-editorial sticky top-0 z-40 transition-colors duration-400 motion-reduce:transition-none lg:h-0",
          light ? "text-primary" : "text-white",
        )}
      >
        <div className="mx-auto w-full max-w-360 px-4 pt-3 sm:px-8 xl:px-20 xl:pt-5">
          <div className="site-header-surface relative isolate rounded-full">
            <HeaderToneContext value={light ? "light" : "dark"}>
              {children}
            </HeaderToneContext>
          </div>
        </div>
      </header>
    </>
  );
}
