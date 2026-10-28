import { FirmImage } from "@/components/home/firm-image";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { RevealGroup } from "@/components/shared/reveal-group";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmFacts, firmHomePreview as story } from "@/content/firm";

export function FirmStorySection() {
  return (
    <section
      aria-labelledby="firm-story-heading"
      className="bg-slate-50 py-12 xl:py-24"
    >
      <RevealGroup className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div data-reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <h2
            id="firm-story-heading"
            className="mt-4 font-serif text-[34px]/[38px] sm:text-5xl/13 xl:text-[64px]/[1.08]"
          >
            {story.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-sm/6 sm:text-base/6">
            {story.introduction.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:mt-12 xl:grid-cols-[2.25fr_1.2fr_1fr] xl:gap-8">
          <div
            data-reveal
            className="relative isolate aspect-[1/1.1] overflow-hidden rounded-2xl md:col-span-2 md:aspect-video xl:col-span-1 xl:aspect-auto xl:min-h-120"
          >
            <FirmImage kind="office" media={story.media.office} />
            <div
              aria-hidden="true"
              className="from-navy-deep/90 via-navy-deep/10 absolute inset-0 bg-linear-to-t to-transparent"
            />
            <dl className="absolute inset-x-3 bottom-4 grid grid-cols-3 gap-2 text-center text-white sm:inset-x-4 sm:gap-3">
              {firmFacts.slice(0, 3).map((fact) => (
                <div
                  key={fact.label}
                  className="flex min-w-0 flex-col rounded-xl border border-white/15 bg-white/12 px-1 py-3 backdrop-blur-sm sm:px-2"
                >
                  <dt className="mt-1.5 text-[10px]/[14px] font-medium text-white/80 sm:text-xs/4">
                    {fact.shortLabel}
                  </dt>
                  <dd className="order-first font-serif text-3xl/9 font-bold sm:text-4xl/10">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            data-reveal
            data-reveal-order="1"
            className="flex flex-col rounded-2xl bg-slate-100 p-6 xl:p-7"
          >
            <h3 className="font-serif text-2xl/7 xl:text-[26px]/8">
              {story.storyTitle.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <p className="text-muted-foreground mt-6 text-sm/5 xl:text-sm/6">
              {story.story}
            </p>
            <div className="mt-auto text-xs/5 xl:pt-12">
              <p className="font-semibold">{story.name}</p>
              <p className="text-muted-foreground mt-1">{story.descriptor}</p>
            </div>
          </div>
          <div
            data-reveal
            data-reveal-order="2"
            className="flex flex-col gap-8"
          >
            <figure className="relative isolate aspect-[.93] overflow-hidden rounded-2xl md:aspect-4/5 xl:aspect-auto xl:min-h-80 xl:flex-1">
              <FirmImage kind="portrait" media={story.media.portrait} />
              <div
                aria-hidden="true"
                className="from-navy-deep/90 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-4 bottom-4 text-white">
                <p className="font-serif text-xl/6 font-bold">
                  {story.person.name}
                </p>
                <p className="mt-1 text-xs/5 text-white/85">
                  {story.person.role}
                </p>
              </figcaption>
            </figure>
            <div className="self-start xl:self-center">
              <PreviewDestination>
                <ArrowButton>{story.action}</ArrowButton>
              </PreviewDestination>
            </div>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
