import { VideoPoster } from "@/components/shared/video-poster";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmHero as content } from "@/content/firm";

export function FirmHeroSection() {
  return (
    <section
      id="firm-hero"
      aria-labelledby="firm-heading"
      className="bg-navy-deep pb-12 text-white lg:pt-40 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-360 px-4 pt-8 sm:px-8 lg:pt-0 xl:px-20">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow className="text-white">{content.eyebrow}</Eyebrow>
            <h1
              id="firm-heading"
              className="mt-6 font-serif text-4xl/[42px] sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
            >
              {content.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <p className="max-w-xl text-base/6 text-white/90 lg:text-lg/7">
            {content.description}
          </p>
        </div>
        <VideoPoster
          poster={content.poster}
          title="About Dikko & Mahmoud"
          className="ease-editorial mt-8 h-60 ring-1 ring-white/0 transition-shadow duration-550 hover:ring-white/20 motion-reduce:transition-none sm:h-80 lg:mt-16 lg:h-90"
          sizes="(min-width: 1440px) 1280px, (min-width: 1280px) calc(100vw - 160px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
        />
      </div>
    </section>
  );
}
