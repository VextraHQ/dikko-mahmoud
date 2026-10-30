"use client";

import { useEffect, useRef, type FocusEvent } from "react";
import { mediaQueries } from "@/lib/media-queries";

/**
 * Fades `[data-reveal]` children in as they scroll into view. Content stays
 * visible without JavaScript; only items that start offscreen are enhanced.
 * Keyboard focus reveals an item immediately.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const motion = window.matchMedia(mediaQueries.reducedMotion);
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const items =
      rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const item = entry.target as HTMLElement;
          if (item.dataset.revealState !== "complete")
            item.dataset.revealState = "visible";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    for (const item of items) {
      if (item.getBoundingClientRect().top < window.innerHeight) continue;
      item.dataset.revealState = "pending";
      observer.observe(item);
    }
    const finish = () => {
      if (!motion.matches) return;
      observer.disconnect();
      for (const item of items) item.dataset.revealState = "complete";
    };
    motion.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", finish);
      for (const item of items) delete item.dataset.revealState;
    };
  }, []);

  function onFocusCapture(event: FocusEvent<T>) {
    const item = (event.target as Element).closest<HTMLElement>(
      "[data-reveal]",
    );
    if (item && rootRef.current?.contains(item))
      item.dataset.revealState = "complete";
  }

  return { rootRef, onFocusCapture };
}
