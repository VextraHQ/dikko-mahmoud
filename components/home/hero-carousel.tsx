"use client";

import Fade from "embla-carousel-fade";
import { useEffect, useMemo, type ComponentProps } from "react";
import { Carousel, useCarousel } from "@/components/ui/carousel";

type CarouselApi = NonNullable<ReturnType<typeof useCarousel>["api"]>;

async function preparePhotograph(index: number, api: CarouselApi) {
  const image = api.slideNodes()[index]?.querySelector("img");
  if (!image) return;
  image.loading = "eager";
  // Keep the current frame while the browser fetches and decodes its replacement.
  // Missing/failed photos use the slide's own fallback. They must not trap
  // navigation or pair another slide's photograph with the new copy.
  await image.decode().catch(() => {});
}

function AdjacentPhotographs() {
  const { api, selectedIndex } = useCarousel();
  useEffect(() => {
    if (!api) return;
    let cancelled = false;
    void preparePhotograph(selectedIndex, api).then(
      () => {
        if (cancelled) return;
        const count = api.slideNodes().length;
        for (const index of [
          (selectedIndex + 1) % count,
          (selectedIndex + count - 1) % count,
        ]) {
          void preparePhotograph(index, api).catch(() => {});
        }
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [api, selectedIndex]);
  return null;
}

export function HeroCarousel({
  children,
  ...props
}: ComponentProps<"section">) {
  const plugins = useMemo(() => [Fade()], []);
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
      beforeScroll={preparePhotograph}
    >
      <AdjacentPhotographs />
      {children}
    </Carousel>
  );
}
