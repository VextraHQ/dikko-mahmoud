import Image from "next/image";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HeroControls } from "@/components/home/hero-controls";
import { HeroCopy } from "@/components/home/hero-copy";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { Button, ButtonArrow } from "@/components/ui/button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { heroAction, heroSlides } from "@/content/home";

export function Hero() {
  return (
    <HeroCarousel
      aria-label="Our expertise"
      className="bg-primary relative isolate grid text-white xl:min-h-[clamp(44rem,100svh,58.4375rem)]"
    >
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-360 flex-col items-start px-4 pt-10 pb-8 sm:px-8 sm:pt-16 sm:pb-12 xl:col-start-1 xl:row-start-1 xl:justify-end xl:px-20 xl:pt-48 xl:pb-20">
        <div className="grid w-full xl:max-w-[43%] xl:pr-6">
          {heroSlides.map((slide, index) => (
            <HeroCopy
              key={slide.id}
              index={index}
              label={`${index + 1} of ${heroSlides.length}: ${slide.practice}`}
            >
              <p className="text-[11px]/4 font-bold tracking-widest uppercase sm:text-sm/5 xl:text-xl/7">
                {slide.practice}
              </p>
              <h1 className="mt-6 font-serif text-[44px]/[50px] font-bold sm:text-6xl/16 xl:mt-3.5 xl:text-[clamp(3.5rem,5vw,4.5rem)]/[1.11]">
                {slide.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-xl text-base/6 font-medium text-white/75 xl:max-w-md xl:text-lg/7">
                {slide.description}
              </p>
            </HeroCopy>
          ))}
        </div>
        <PreviewDestination>
          <Button
            variant="glass"
            trailingArrow
            className="pointer-events-auto mt-6 xl:mt-[clamp(3rem,14svh,8rem)] motion-safe:[&_svg]:transition-transform motion-safe:[&_svg]:duration-200 motion-safe:hover:[&_svg]:translate-x-0.5 motion-safe:hover:[&_svg]:-translate-y-0.5"
          >
            {heroAction} <ButtonArrow />
          </Button>
        </PreviewDestination>
      </div>
      <CarouselContent
        viewportClassName="bg-navy-deep relative h-75 sm:h-96 xl:absolute xl:inset-0 xl:z-0 xl:h-auto"
        className="h-full"
      >
        {heroSlides.map((slide, index) => (
          <CarouselItem
            key={slide.id}
            index={index}
            label={`Photograph ${index + 1}`}
            aria-hidden="true"
            className="relative h-full"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              preload={index === 0}
              sizes="(max-width: 449px) 450px, 100vw"
              quality={85}
              className="object-cover"
            />
            {slide.darkenImage && (
              <div className="absolute inset-0 bg-black/20" />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        aria-hidden="true"
        className="bg-navy-deep/25 pointer-events-none absolute inset-y-0 left-0 z-1 hidden w-[47%] blur-xl xl:block"
      />
      <div
        aria-hidden="true"
        className="bg-primary/90 pointer-events-none absolute inset-y-0 left-0 z-1 hidden w-[43%] xl:block"
      />
      <HeroControls />
    </HeroCarousel>
  );
}
