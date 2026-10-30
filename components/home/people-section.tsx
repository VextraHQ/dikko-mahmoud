import { PersonCard } from "@/components/shared/person-card";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { RevealGroup } from "@/components/shared/reveal-group";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { homePeople as people, peopleHome as content } from "@/content/people";

export function PeopleSection() {
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
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
