import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { experienceCopy as copy, type Experience } from "@/content/experience";
import { routes } from "@/lib/routes";

export function ExperienceListingSection({
  items,
}: {
  items: readonly Experience[];
}) {
  return (
    <section
      aria-labelledby="experience-listing-heading"
      className="mx-auto w-full max-w-360 px-4 pt-12 pb-4 sm:px-8 lg:pt-20 lg:pb-0 xl:px-20"
    >
      <Eyebrow>{copy.title}</Eyebrow>
      <h2
        id="experience-listing-heading"
        className="mt-5 font-serif text-4xl/[1.15] sm:text-5xl/[1.1]"
      >
        {copy.listingHeading}
      </h2>
      {items.some((item) => item.preview) && (
        <p className="text-muted-foreground mt-6 border-l-2 border-sky-200 pl-4 text-xs/6">
          {copy.previewNote}
        </p>
      )}
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:mt-10 lg:gap-8">
        {items.map((item) => (
          <li key={item.matterId}>
            <SiteLink
              href={routes.matter(item.matterId)}
              className="group/experience border-border ease-editorial hover:border-primary hover:bg-primary focus-visible:border-primary focus-visible:bg-primary focus-visible:outline-primary flex h-full flex-col rounded-xl border bg-slate-50 p-6 transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none sm:p-8"
            >
              <span className="text-primary text-[11px]/5 font-bold tracking-widest uppercase group-hover/experience:text-sky-200 group-focus-visible/experience:text-sky-200">
                {item.category}
              </span>
              <h3 className="mt-5 font-serif text-3xl/[1.2] lg:text-4xl/[1.15]">
                {item.organisation}
              </h3>
              <p className="text-muted-foreground mt-5 text-sm/7 group-hover/experience:text-white/85 group-focus-visible/experience:text-white/85 sm:text-base/7">
                {item.summary}
              </p>
              <span className="text-muted-foreground mt-6 text-xs/6 group-hover/experience:text-sky-200 group-focus-visible/experience:text-sky-200">
                {item.involvement}
              </span>
              <span className="text-primary mt-auto flex items-center gap-3 pt-6 text-sm/6 font-semibold group-hover/experience:text-white group-focus-visible/experience:text-white">
                {copy.action}
                <span className="sr-only">: {item.organisation}</span>
                <span className="text-primary flex size-7 items-center justify-center rounded-full bg-sky-100">
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/experience:translate-x-0.5 motion-safe:group-hover/experience:-translate-y-0.5"
                  />
                </span>
              </span>
            </SiteLink>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground mt-8 max-w-4xl text-xs/6 sm:text-sm/7">
        {copy.qualification}
      </p>
    </section>
  );
}
