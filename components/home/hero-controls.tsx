"use client";

import { Pause, Play } from "lucide-react";
import type { ComponentProps, CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { heroSlides } from "@/content/home";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { cn } from "@/lib/utils";
import { formatCount, formatIndex } from "@/lib/format";

type Autoplay = ReturnType<typeof useCarouselAutoplay>;

// A slide line. While autoplay is on, the active line fills as a countdown and
// freezes in place while held (control hover, off-screen); otherwise it is solid when
// `active`. Remounting per cycle keeps the fill in step with the timer.
function ProgressLine({
  active,
  autoplay,
  className,
}: {
  active: boolean;
  autoplay: Autoplay;
  className?: string;
}) {
  const counting = active && autoplay.enabled;
  return (
    <span
      className={cn(
        "relative h-0.5 overflow-hidden rounded-full bg-white/50 transition-colors duration-300",
        active && !counting && "bg-white",
        className,
      )}
    >
      {counting && (
        <span
          key={autoplay.cycle}
          style={
            {
              "--duration": `${autoplay.delay}ms`,
              animationPlayState: autoplay.running ? "running" : "paused",
            } as CSSProperties
          }
          className="animate-slide-progress absolute inset-0 origin-left bg-white"
        />
      )}
    </span>
  );
}

function AutoplayToggle({
  autoplay,
  ...props
}: { autoplay: Autoplay } & ComponentProps<typeof Button>) {
  const Icon = autoplay.enabled ? Pause : Play;
  return (
    <Button
      data-autoplay-toggle
      aria-label={autoplay.enabled ? "Pause slideshow" : "Play slideshow"}
      onClick={autoplay.toggle}
      {...props}
    >
      <Icon strokeWidth={1.5} />
    </Button>
  );
}

export function HeroControls() {
  const { scrollTo, selectedIndex, isPreparing } = useCarousel();
  const autoplay = useCarouselAutoplay();
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-360 items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-12 lg:flex-col lg:items-end lg:gap-4 lg:py-0 xl:px-20">
      {/* Mobile status: pause, position and countdown grouped on the left. */}
      <div className="flex items-center gap-1 lg:hidden">
        {autoplay.available && (
          <AutoplayToggle
            autoplay={autoplay}
            variant="ghost"
            size="icon"
            className="-ml-2.5 size-11"
          />
        )}
        <p
          aria-hidden="true"
          className="flex items-center gap-2.5 font-serif text-sm/5 font-semibold"
        >
          <span>{formatIndex(selectedIndex)}</span>
          <ProgressLine active autoplay={autoplay} className="w-12" />
          <span className="text-white/60">
            {formatCount(heroSlides.length)}
          </span>
        </p>
      </div>
      <div data-autoplay-hold className="flex gap-3 lg:pointer-events-auto">
        {autoplay.available && (
          <AutoplayToggle
            autoplay={autoplay}
            variant="muted"
            size="icon"
            className="hidden lg:inline-flex"
          />
        )}
        <CarouselPrevious />
        <CarouselNext className="lg:bg-primary lg:hover:bg-secondary lg:text-white" />
      </div>
      <fieldset
        data-autoplay-hold
        className="hidden min-w-0 gap-2.5 lg:pointer-events-auto lg:flex lg:w-[43%]"
      >
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
            <ProgressLine
              active={index === selectedIndex}
              autoplay={autoplay}
              // The counting line keeps its track so the frozen fill stays readable.
              className={cn(
                "w-full",
                !(index === selectedIndex && autoplay.enabled) &&
                  "group-hover:bg-white",
              )}
            />
          </button>
        ))}
      </fieldset>
      {/* Silent while rotating so screen readers aren't interrupted every slide. */}
      <p
        className="sr-only"
        aria-live={autoplay.running ? "off" : "polite"}
        aria-atomic="true"
      >
        {isPreparing
          ? "Preparing photograph…"
          : `Slide ${selectedIndex + 1} of ${heroSlides.length}: ${heroSlides[selectedIndex].practice}. ${heroSlides[selectedIndex].title.join(" ")}`}
      </p>
    </div>
  );
}
