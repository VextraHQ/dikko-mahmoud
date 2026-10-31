import { Eyebrow } from "@/components/ui/eyebrow";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { practiceCopy as copy } from "@/content/practice-catalogue";

export function PracticesHeroSection() {
  return (
    <section
      aria-labelledby="practices-heading"
      className="bg-navy-deep pb-12 text-white lg:pt-40 lg:pb-20"
    >
      <div className="mx-auto max-w-360 px-4 pt-8 sm:px-8 lg:pt-0 xl:px-20">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow className="text-white">{copy.heroEyebrow}</Eyebrow>
            <h1
              id="practices-heading"
              className="mt-6 font-serif text-4xl/11 sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
            >
              {copy.heroHeading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <p className="max-w-xl text-base/7 text-white/85">
            {copy.heroDescription}
          </p>
        </div>
        <div className="relative isolate mt-8 h-60 overflow-hidden rounded-xl sm:h-80 lg:mt-16 lg:h-90">
          <EditorialCover label={copy.heroEyebrow} />
        </div>
      </div>
    </section>
  );
}
