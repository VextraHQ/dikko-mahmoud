"use client";

import Fade from "embla-carousel-fade";
import { useMemo, type ReactNode } from "react";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";

function TestimonialControls({ count }: { count: number }) {
  const { api, selectedIndex } = useCarousel();
  if (count < 2) return null;
  return (
    <div className="mb-6 flex items-center gap-3 lg:ml-80">
      <CarouselPrevious aria-label="Previous testimonial" disabled={!api} />
      <CarouselNext
        aria-label="Next testimonial"
        variant="default"
        disabled={!api}
      />
      <p
        role="status"
        aria-atomic="true"
        className="text-muted-foreground ml-2 text-xs/5 tabular-nums"
      >
        <span className="sr-only">Testimonial </span>
        {selectedIndex + 1} / {count}
      </p>
    </div>
  );
}

export function TestimonialCarousel({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const plugins = useMemo(() => [Fade()], []);
  return (
    <Carousel
      aria-label="Client testimonials"
      opts={{
        loop: count > 1,
        duration: 25,
        watchDrag: false,
        breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
      }}
      plugins={plugins}
      className="mt-10 lg:mt-12"
    >
      <TestimonialControls count={count} />
      {children}
    </Carousel>
  );
}
