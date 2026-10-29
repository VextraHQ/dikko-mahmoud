"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];
type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  selectedIndex: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isPreparing: boolean;
  scrollTo: (index: number) => void;
};
const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel controls require a Carousel parent.");
  return context;
}

// Horizontal shadcn/Embla composition, with native slide groups and focus isolation.
export function Carousel({
  opts,
  plugins,
  beforeScroll,
  "aria-label": label,
  className,
  children,
  ...props
}: ComponentProps<"section"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  beforeScroll?: (
    index: number,
    api: NonNullable<CarouselApi>,
  ) => Promise<void>;
}) {
  const [carouselRef, api] = useEmblaCarousel(opts, plugins);
  const request = useRef(0);
  const [selection, setSelection] = useState({
    selectedIndex: 0,
    canScrollPrev: false,
    canScrollNext: false,
    isPreparing: false,
  });
  const scrollTo = useCallback(
    (index: number) => {
      if (!api) return;
      const currentRequest = ++request.current;
      const count = api.scrollSnapList().length;
      const target = opts?.loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(index, count - 1));
      const select = () => {
        if (currentRequest !== request.current) return;
        setSelection((current) => ({ ...current, isPreparing: false }));
        api.scrollTo(target);
      };
      if (beforeScroll) {
        setSelection((current) => ({ ...current, isPreparing: true }));
        void beforeScroll(target, api).then(select, () => {
          if (currentRequest === request.current)
            setSelection((current) => ({ ...current, isPreparing: false }));
        });
      } else select();
    },
    [api, beforeScroll, opts?.loop],
  );

  useEffect(() => {
    if (!api) return;
    const cancelPending = () => {
      request.current += 1;
      setSelection((current) => ({ ...current, isPreparing: false }));
    };
    const sync = () => {
      request.current += 1;
      setSelection({
        selectedIndex: api.selectedScrollSnap(),
        canScrollPrev: api.canScrollPrev(),
        canScrollNext: api.canScrollNext(),
        isPreparing: false,
      });
    };
    sync();
    api.on("select", sync).on("reInit", sync).on("pointerDown", cancelPending);
    return () => {
      request.current += 1;
      api
        .off("select", sync)
        .off("reInit", sync)
        .off("pointerDown", cancelPending);
    };
  }, [api]);

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, scrollTo, ...selection }}
    >
      <section
        aria-label={label}
        aria-roledescription="carousel"
        aria-busy={selection.isPreparing}
        data-slot="carousel"
        className={cn("relative", className)}
        onKeyDown={(event) => {
          // Dialog portals bubble through React, but are outside this carousel.
          if (!event.currentTarget.contains(event.target as Node)) return;
          // Keep focus on persistent controls, never on a newly inert slide CTA.
          if (
            (event.target as Element).closest('[data-slot="carousel-content"]')
          )
            return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            scrollTo(
              (api?.selectedScrollSnap() ?? 0) +
                (event.key === "ArrowLeft" ? -1 : 1),
            );
          }
        }}
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  viewportClassName,
  ...props
}: ComponentProps<"div"> & { viewportClassName?: string }) {
  const { carouselRef } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden", viewportClassName)}
      data-slot="carousel-content"
    >
      <div className={cn("flex touch-pan-y", className)} {...props} />
    </div>
  );
}

export function CarouselItem({
  index,
  label,
  className,
  children,
  ...props
}: ComponentProps<"fieldset"> & { index: number; label: string }) {
  const { selectedIndex } = useCarousel();
  const inactive = index !== selectedIndex;
  return (
    <fieldset
      data-slot="carousel-item"
      aria-roledescription="slide"
      aria-hidden={inactive}
      inert={inactive}
      className={cn("relative min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    >
      <legend className="sr-only">{label}</legend>
      {children}
    </fieldset>
  );
}

export function CarouselPrevious(props: ComponentProps<typeof Button>) {
  const { api, scrollTo, canScrollPrev } = useCarousel();
  return (
    <Button
      variant="muted"
      size="icon"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={() => scrollTo((api?.selectedScrollSnap() ?? 0) - 1)}
      {...props}
    >
      <ChevronLeft strokeWidth={1.5} />
    </Button>
  );
}
export function CarouselNext(props: ComponentProps<typeof Button>) {
  const { api, scrollTo, canScrollNext } = useCarousel();
  return (
    <Button
      variant="muted"
      size="icon"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={() => scrollTo((api?.selectedScrollSnap() ?? 0) + 1)}
      {...props}
    >
      <ChevronRight strokeWidth={1.5} />
    </Button>
  );
}
