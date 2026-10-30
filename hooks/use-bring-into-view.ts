"use client";

import { useCallback, useRef } from "react";
import { matchesMedia, mediaQueries } from "@/lib/media-queries";

/**
 * Focuses an element and scrolls it to the top of the viewport on the next
 * frame (after React has rendered the new state). Respects reduced motion.
 */
export function useBringIntoView<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const bringIntoView = useCallback(() => {
    requestAnimationFrame(() => {
      ref.current?.focus({ preventScroll: true });
      ref.current?.scrollIntoView({
        block: "start",
        behavior: matchesMedia(mediaQueries.reducedMotion)
          ? "instant"
          : "smooth",
      });
    });
  }, []);

  return { ref, bringIntoView };
}
