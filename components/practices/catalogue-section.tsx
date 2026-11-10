import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { smeRetainer } from "@/content/sme";
import {
  filterPractices,
  practiceFilters,
  practiceCopy as copy,
  type PracticeFilter,
} from "@/content/practice-catalogue";
import { routes } from "@/lib/routes";
import { formatIndex } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CatalogueSection({ filter }: { filter: PracticeFilter }) {
  const practices = filterPractices(filter);
  return (
    <section
      id="practices"
      aria-labelledby="catalogue-heading"
      className="py-12 lg:py-24"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2
              id="catalogue-heading"
              className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
            >
              {copy.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div>
            <p className="text-base/7">{copy.introduction}</p>
            <p className="text-muted-foreground mt-6 text-sm/6">
              {copy.description}
            </p>
          </div>
        </div>
        <nav aria-label="Filter practice areas" className="mt-10">
          {/* Phones scroll the tabs sideways instead of wrapping. */}
          <ul className="-mx-4 flex scrollbar-none gap-3 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {practiceFilters.map((item) => (
              <li key={item} className="shrink-0">
                <SiteLink
                  href={
                    item === "All areas"
                      ? routes.practiceAreas
                      : routes.practiceFilter(item.toLowerCase())
                  }
                  aria-current={filter === item ? "page" : undefined}
                  className={cn(
                    "ease-editorial inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
                    item === filter
                      ? "bg-primary border-primary text-white"
                      : "text-primary border-border hover:bg-sky-50",
                  )}
                >
                  {item}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Cards share four row tracks (number, title, summary, footer) via
            subgrid: closed cards line up, and opening one card's services
            adds space below its neighbours without moving their content. */}
        <ul className="mt-8 grid gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {practices.map((practice) => (
            <li
              key={practice.slug}
              className="row-span-4 grid min-w-0 grid-rows-subgrid pb-6"
            >
              <article className="border-border hover:border-primary/50 ease-editorial row-span-4 grid grid-rows-subgrid rounded-xl border p-6 transition-colors duration-500">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif text-3xl/9">
                    {formatIndex(
                      filterPractices("All areas").indexOf(practice),
                    )}
                  </span>
                  <span className="text-muted-foreground text-[10px]/5 font-bold tracking-wider">
                    {practice.category}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl/7">{practice.title}</h3>
                <p className="text-muted-foreground mt-5 text-sm/6">
                  {practice.summary}
                </p>
                <div className="self-start pt-6">
                  <details className="group/services border-border border-t">
                    <summary className="text-primary flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm/6 font-semibold [&::-webkit-details-marker]:hidden">
                      {copy.servicesAction}
                      <span aria-hidden="true">
                        <Plus className="size-4 group-open/services:hidden" />
                        <Minus className="hidden size-4 group-open/services:block" />
                      </span>
                    </summary>
                    {practice.detail?.services.length ? (
                      <ul className="text-muted-foreground space-y-2 pb-5 text-sm/6">
                        {practice.detail.services.map((service) => (
                          <li key={service.title}>{service.title}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground pb-5 text-sm/6">
                        {copy.servicePending}
                      </p>
                    )}
                  </details>
                  <SiteLink
                    href={routes.practiceArea(practice.slug)}
                    className="text-primary group/explore mt-1 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    {copy.exploreAction}
                    <span className="bg-secondary flex size-6 items-center justify-center rounded-full text-white">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/explore:translate-x-0.5 motion-safe:group-hover/explore:-translate-y-0.5"
                      />
                    </span>
                    <span className="sr-only">: {practice.title}</span>
                  </SiteLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
        {/* An offering alongside the nine practices, not a tenth card: it
            reuses the section's editorial two-column rhythm. */}
        <aside
          aria-labelledby="sme-heading"
          className="border-border mt-12 grid gap-8 border-t pt-10 lg:mt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pt-14"
        >
          <div>
            <Eyebrow>{copy.smeHeading}</Eyebrow>
            <h3
              id="sme-heading"
              className="mt-5 font-serif text-[28px]/9 sm:text-4xl/11"
            >
              {smeRetainer.title}
            </h3>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-muted-foreground text-base/7">
              {copy.smeDescription}
            </p>
            <ol className="mt-6 grid w-full gap-x-6 sm:grid-cols-2">
              {smeRetainer.tracks.map((track, index) => (
                <li
                  key={track.id}
                  className="border-border flex items-baseline gap-3 border-t py-4"
                >
                  <span className="text-primary text-xs/5 font-bold">
                    {formatIndex(index)}
                  </span>
                  <span className="font-serif text-xl/7">{track.title}</span>
                </li>
              ))}
            </ol>
            <ArrowButton asChild className="mt-6">
              <SiteLink href={routes.smeRetainer}>{copy.smeAction}</SiteLink>
            </ArrowButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
