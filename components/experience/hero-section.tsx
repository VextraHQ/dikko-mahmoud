import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Eyebrow } from "@/components/ui/eyebrow";
import { experienceCopy as copy } from "@/content/experience";
import { firmHero } from "@/content/firm";

export function ExperienceHeroSection() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="bg-navy-deep relative isolate overflow-hidden text-white"
    >
      {/* Temporary shared concept: replace final sources before WebP export.
          Mobile follows the supplied solid-navy reference. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
      >
        <ImageWithFallback
          src={firmHero.poster.src}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
          fallback={<div className="bg-navy-deep absolute inset-0" />}
        />
        <div className="bg-navy-deep/80 absolute inset-0" />
      </div>
      <div className="mx-auto w-full max-w-360 px-4 pt-10 pb-12 sm:px-8 sm:pb-16 lg:pt-52 lg:pb-20 xl:px-20">
        <Eyebrow className="text-white/90">{copy.title}</Eyebrow>
        <h1
          id="experience-heading"
          className="mt-6 max-w-4xl font-serif text-[40px]/[1.08] text-balance sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
        >
          {copy.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-7 max-w-3xl text-base/7 text-white/85 lg:mt-8 lg:text-lg/8">
          {copy.introduction}
        </p>
      </div>
    </section>
  );
}
