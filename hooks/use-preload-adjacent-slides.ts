"use client";

import { useEffect } from "react";
import { useCarousel } from "@/components/ui/carousel";

export type CarouselApi = NonNullable<ReturnType<typeof useCarousel>["api"]>;

/**
 * Loads and decodes one slide's photograph. Failures resolve quietly so a
 * missing photo never blocks navigation; the slide shows its own fallback.
 */
export async function prepareSlidePhotograph(index: number, api: CarouselApi) {
  const image = api.slideNodes()[index]?.querySelector("img");
  if (!image) return;
  image.loading = "eager";
  await image.decode().catch(() => {});
}

/** After each change, prepares the current slide, then its two neighbours. */
export function usePreloadAdjacentSlides() {
  const { api, selectedIndex } = useCarousel();

  useEffect(() => {
    if (!api) return;
    let cancelled = false;
    void prepareSlidePhotograph(selectedIndex, api).then(() => {
      if (cancelled) return;
      const count = api.slideNodes().length;
      for (const index of [
        (selectedIndex + 1) % count,
        (selectedIndex + count - 1) % count,
      ]) {
        void prepareSlidePhotograph(index, api);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [api, selectedIndex]);
}
