import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { RevealGroup } from "@/components/shared/reveal-group";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { featuredPeople, peopleHome as content } from "@/content/people";

export function PeopleSection() {
  const people = featuredPeople
    .filter((person) => person.name.trim())
    .slice(0, 4);
  if (!people.length) return null;

  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className="bg-slate-50 py-12 lg:py-24"
    >
      <RevealGroup className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div data-reveal className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="people-heading"
              className="mt-4 max-w-xl font-serif text-4xl/[1.08] sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
            >
              {content.heading}
            </h2>
          </div>
          <div className="lg:max-w-lg lg:justify-self-end">
            <p className="text-muted-foreground text-sm/6 sm:text-base/7">
              {content.description}
            </p>
            <PreviewDestination>
              <ArrowButton size="sm" className="mt-6">
                {content.action}
              </ArrowButton>
            </PreviewDestination>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:mt-12 lg:grid-cols-4">
          {people.map((person, index) => (
            <li
              key={person.id}
              data-reveal
              data-reveal-order={index % 3}
              className="min-w-0"
            >
              <PreviewDestination>
                <button
                  type="button"
                  className="group flex h-full w-full flex-col rounded-xl text-left"
                >
                  <span className="relative isolate block aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-200">
                    <ImageWithFallback
                      src={person.portrait?.src}
                      alt={person.portrait?.alt ?? ""}
                      fill
                      sizes="(min-width: 1440px) 302px, (min-width: 1024px) 23vw, 46vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
                      style={{ objectPosition: person.portrait?.position }}
                      fallback={
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-2 text-center"
                        >
                          <span
                            aria-hidden="true"
                            className="text-primary/65 font-serif text-4xl sm:text-5xl"
                          >
                            {person.initials}
                          </span>
                        </span>
                      }
                    />
                    <span
                      aria-hidden="true"
                      className="text-primary absolute top-2 right-2 flex size-8 items-center justify-center rounded-full border border-white/70 bg-white/85 transition-colors group-hover:bg-white sm:top-3 sm:right-3 sm:size-9"
                    >
                      <ArrowUpRight
                        strokeWidth={1.5}
                        className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </span>
                  </span>
                  <span className="decoration-primary/40 mt-4 font-serif text-lg/6 underline-offset-4 group-hover:underline sm:text-xl/7">
                    {person.name}
                  </span>
                  {person.role.trim() && (
                    <span className="text-muted-foreground mt-auto pt-2 text-xs/5 sm:pt-3 sm:text-sm/6">
                      {person.role}
                    </span>
                  )}
                </button>
              </PreviewDestination>
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
