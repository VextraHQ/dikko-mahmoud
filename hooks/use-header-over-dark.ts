"use client";

import { useEffect, useState } from "react";

// Roughly the middle of the floating header, measured from the viewport top.
const headerLine = 44;

/**
 * Whether a dark section (`data-header-dark`) sits under the header right
 * now, so the header can match it. Returns `null` until measured, and for
 * pages with no dark sections, so the page's own tone stays the default.
 * `pageKey` (the pathname) re-scans the page after client navigation.
 */
export function useHeaderOverDark(pageKey: string): boolean | null {
  const [state, setState] = useState<{ key: string; dark: boolean } | null>(
    null,
  );

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = document.querySelectorAll("[data-header-dark]");
    const under = new Set<Element>();
    let observer: IntersectionObserver | undefined;

    // Watch a 1px line across the header instead of the whole viewport.
    const watch = () => {
      observer?.disconnect();
      under.clear();
      const bottom = Math.max(0, window.innerHeight - headerLine - 1);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) under.add(entry.target);
            else under.delete(entry.target);
          }
          setState({ key: pageKey, dark: under.size > 0 });
        },
        { rootMargin: `-${headerLine}px 0px -${bottom}px 0px` },
      );
      sections.forEach((section) => observer?.observe(section));
    };

    watch();
    window.addEventListener("resize", watch);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", watch);
    };
  }, [pageKey]);

  return state?.key === pageKey ? state.dark : null;
}
