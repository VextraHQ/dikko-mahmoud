"use client";
import type { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { mediaQueries } from "@/lib/media-queries";
import { formatIndex, formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

// One line per case (manual only, no autoplay), arrows on the right.
function Controls({ count }: { count: number }) {
  const { selectedIndex, scrollTo } = useCarousel();
  if (count < 2) return null;
  return (
    <div className="mt-6 flex items-center justify-between gap-6">
      <fieldset className="flex min-w-0 flex-1 gap-2.5 sm:max-w-md">
        <legend className="sr-only">Choose case</legend>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show case ${index + 1} of ${count}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            onClick={() => scrollTo(index)}
            className="group flex h-11 min-w-0 flex-1 items-center"
          >
            <span
              className={cn(
                "ease-editorial h-0.5 w-full rounded-full transition-colors duration-300 motion-reduce:transition-none",
                index === selectedIndex
                  ? "bg-primary"
                  : "bg-slate-200 group-hover:bg-slate-400",
              )}
            />
          </button>
        ))}
      </fieldset>
      <p className="sr-only" aria-live="polite">
        Case {formatIndex(selectedIndex)} of {formatCount(count)}
      </p>
      <div className="flex shrink-0 gap-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </div>
  );
}

export function ExperienceCarousel({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const reduce = useMediaQuery(mediaQueries.reducedMotion, true);
  return (
    <Carousel
      aria-label="Selected practice experience"
      opts={{ align: "start", loop: false, duration: reduce ? 0 : 35 }}
    >
      <CarouselContent className="-ml-6">{children}</CarouselContent>
      <Controls count={count} />
    </Carousel>
  );
}
