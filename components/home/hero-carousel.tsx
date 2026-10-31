"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useMemo, type ComponentProps } from "react";
import { Carousel } from "@/components/ui/carousel";
import { heroAutoplayDelay } from "@/content/home";
import {
  prepareSlidePhotograph,
  usePreloadAdjacentSlides,
} from "@/hooks/use-preload-adjacent-slides";

// Needs to sit inside <Carousel> to read its context.
function AdjacentPhotographs() {
  usePreloadAdjacentSlides();
  return null;
}

export function HeroCarousel({
  children,
  ...props
}: ComponentProps<"section">) {
  // Autoplay starts paused; useCarouselAutoplay (in HeroControls) decides
  // when it runs. Timing per slide lives in heroAutoplayDelay.
  const plugins = useMemo(
    () => [
      Fade(),
      Autoplay({
        delay: heroAutoplayDelay,
        playOnInit: false,
        stopOnFocusIn: false,
      }),
    ],
    [],
  );
  return (
    <Carousel
      {...props}
      opts={{
        loop: true,
        duration: 40,
        breakpoints: {
          "(prefers-reduced-motion: reduce)": { duration: 0, watchDrag: false },
        },
      }}
      plugins={plugins}
      beforeScroll={prepareSlidePhotograph}
    >
      <AdjacentPhotographs />
      {children}
    </Carousel>
  );
}
