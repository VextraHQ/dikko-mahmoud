import {
  JourneyExplorer,
  type JourneyItem,
} from "@/components/firm/journey-explorer";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmJourney, journeyIntro as content } from "@/content/firm";
import { getPerson } from "@/content/people";

export function JourneySection() {
  const items: JourneyItem[] = firmJourney.map((item) => {
    const person = item.personId ? getPerson(item.personId) : undefined;
    const milestone = person?.milestones?.find(
      (m) => m.year === item.personMilestoneYear,
    );
    return {
      ...item,
      description:
        item.description ??
        (milestone && person
          ? `${person.name}: ${milestone.description}.`
          : content.pendingCopy),
      media: item.media ?? person?.portrait ?? undefined,
      caption:
        item.caption ??
        (person
          ? {
              title: person.name,
              description: person.founderRole ?? person.role,
            }
          : { title: item.year, description: content.pendingMedia }),
    };
  });
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-12 lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="journey-heading"
              className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
            >
              {content.heading}
            </h2>
          </div>
          <p className="text-primary text-sm/6 sm:text-base/7">
            {content.description}
          </p>
        </div>
        <JourneyExplorer items={items} />
      </div>
    </section>
  );
}
