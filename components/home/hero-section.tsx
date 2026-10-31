import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HeroControls } from "@/components/home/hero-controls";
import { HeroCopy } from "@/components/home/hero-copy";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { heroAction, heroSlides } from "@/content/home";
import { SiteLink } from "@/components/layout/site-link";
import { routes } from "@/lib/routes";

export function Hero() {
  if (!heroSlides.length) return null;
  return (
    <HeroCarousel
      aria-label="Our expertise"
      className="bg-primary relative isolate grid text-white lg:min-h-[clamp(44rem,100svh,58.4375rem)]"
    >
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-360 flex-col items-start px-4 pt-10 pb-8 sm:px-8 sm:pt-16 sm:pb-12 lg:col-start-1 lg:row-start-1 lg:justify-end lg:pt-36 lg:pb-20 xl:px-20 xl:pt-48">
        <div className="grid w-full lg:max-w-[43%] lg:pr-6">
          {heroSlides.map((slide, index) => (
            <HeroCopy
              key={slide.id}
              index={index}
              label={`${index + 1} of ${heroSlides.length}: ${slide.practice}`}
            >
              <Eyebrow className="text-inherit sm:text-sm/5 lg:text-base/6 xl:text-xl/7">
                {slide.practice}
              </Eyebrow>
              <h1 className="mt-6 font-serif text-[44px]/[50px] font-bold sm:text-6xl/16 lg:mt-3.5 lg:text-[clamp(3.5rem,5vw,4.5rem)]/[1.11]">
                {slide.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-xl text-base/6 font-medium text-white/75 lg:max-w-md xl:text-lg/7">
                {slide.description}
              </p>
            </HeroCopy>
          ))}
        </div>
        <ArrowButton
          asChild
          variant="glass"
          data-autoplay-hold
          className="pointer-events-auto mt-6 lg:mt-[clamp(2.5rem,10svh,6rem)] xl:mt-[clamp(3rem,14svh,8rem)]"
        >
          <SiteLink href={routes.practiceAreas}>{heroAction}</SiteLink>
        </ArrowButton>
      </div>
      <CarouselContent
        viewportClassName="bg-navy-deep relative h-75 sm:h-96 lg:absolute lg:inset-0 lg:z-0 lg:h-auto"
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
            <ImageWithFallback
              src={slide.image}
              fallback={
                <span className="absolute inset-0 lg:left-[43%]">
                  <EditorialCover />
                </span>
              }
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
        className="bg-navy-deep/25 pointer-events-none absolute inset-y-0 left-0 z-1 hidden w-[47%] blur-xl lg:block"
      />
      <div
        aria-hidden="true"
        className="bg-primary/90 pointer-events-none absolute inset-y-0 left-0 z-1 hidden w-[43%] lg:block"
      />
      <HeroControls />
    </HeroCarousel>
  );
}
