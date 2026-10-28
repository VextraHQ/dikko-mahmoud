"use client";

import {
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { heroSlides } from "@/content/home";
import { cn } from "@/lib/utils";

export function HeroControls() {
  const { scrollTo, selectedIndex, isPreparing } = useCarousel();
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-360 items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-12 lg:flex-col lg:items-end lg:gap-4 lg:py-0 xl:px-20">
      <p
        aria-hidden="true"
        className="font-serif text-sm/5 font-semibold lg:hidden"
      >
        {String(selectedIndex + 1).padStart(2, "0")} /{" "}
        {String(heroSlides.length).padStart(2, "0")}
      </p>
      <div className="flex gap-3 lg:pointer-events-auto">
        <CarouselPrevious />
        <CarouselNext className="lg:bg-primary lg:hover:bg-secondary lg:text-white" />
      </div>
      <fieldset className="hidden min-w-0 gap-2.5 lg:pointer-events-auto lg:flex lg:w-[43%]">
        <legend className="sr-only">Choose slide</legend>
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show slide ${index + 1}: ${slide.practice}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            onClick={() => scrollTo(index)}
            className="group flex h-11 min-w-0 flex-1 items-center"
          >
            <span
              className={cn(
                "h-0.5 w-full rounded-full bg-white/50 transition-colors duration-300 group-hover:bg-white",
                index === selectedIndex && "bg-white",
              )}
            />
          </button>
        ))}
      </fieldset>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {isPreparing
          ? "Preparing photograph…"
          : `Slide ${selectedIndex + 1} of ${heroSlides.length}: ${heroSlides[selectedIndex].practice}. ${heroSlides[selectedIndex].title.join(" ")}`}
      </p>
    </div>
  );
}
