import { PersonCard } from "@/components/shared/person-card";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { Eyebrow } from "@/components/ui/eyebrow";
import { firmPeople as content } from "@/content/firm";
import { advisoryGroups, getPerson } from "@/content/people";
import { formatIndex } from "@/lib/format";

// Stable ids per placeholder, so keys don't depend on render position.
function pendingSlots(groupId: string, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const mark = formatIndex(i);
    return { id: `${groupId}-pending-${mark}`, mark };
  });
}

export function FirmPeopleSection() {
  const founder = getPerson(content.founderId);
  return (
    <section
      id="firm-people"
      aria-labelledby="firm-people-heading"
      className="bg-slate-50 py-12 lg:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.4fr] lg:gap-24">
          {founder && (
            <div className="max-w-md">
              <PersonCard
                person={founder}
                role={founder.founderRole}
                sizes="(min-width: 1440px) 440px, (min-width: 1024px) 35vw, (min-width: 640px) 448px, calc(100vw - 32px)"
                imageHoverOnly
                portraitClassName="aspect-square shadow-primary/5 transition-shadow duration-550 ease-editorial hover:shadow-lg group-focus-visible:shadow-lg motion-reduce:transition-none"
              />
            </div>
          )}
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="firm-people-heading"
              className="mt-6 font-serif text-[32px]/10 sm:text-5xl/[1.08]"
            >
              {content.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {founder?.biography && (
              <p className="text-muted-foreground mt-8 text-base/7">
                {founder.biography}
              </p>
            )}
            {founder?.milestones && (
              <dl className="border-border my-6 grid grid-cols-2 gap-6 border-y py-6">
                {founder.milestones.map((milestone) => (
                  <div key={milestone.year}>
                    <dt className="text-primary font-serif text-4xl/10">
                      {milestone.year}
                    </dt>
                    <dd className="text-muted-foreground mt-3 text-sm/6">
                      {milestone.description}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="text-muted-foreground text-sm/6 sm:text-base/7">
              {content.closing}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground mt-12 max-w-3xl text-sm/6">
          {content.assignmentNote}
        </p>
        <div className="mt-8 space-y-12">
          {advisoryGroups.map((group) => (
            <div key={group.id}>
              <h3 className="font-serif text-2xl/8 sm:text-3xl/9">
                {group.name}
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10">
                {group.personIds.flatMap((id) => {
                  const person = getPerson(id);
                  return person
                    ? [
                        <li key={id} className="min-w-0">
                          <PersonCard
                            person={person}
                            imageHoverOnly
                            portraitClassName="aspect-square shadow-primary/5 transition-shadow duration-550 ease-editorial hover:shadow-lg group-focus-visible:shadow-lg motion-reduce:transition-none"
                            sizes="(min-width: 1440px) 400px, (min-width: 1024px) 30vw, 46vw"
                          />
                        </li>,
                      ]
                    : [];
                })}
                {pendingSlots(group.id, group.pendingSlots).map((slot) => (
                  <li key={slot.id} className="min-w-0">
                    <div className="group/portrait shadow-primary/5 hover:ring-primary/20 ease-editorial relative isolate aspect-square overflow-hidden rounded-xl ring-1 ring-transparent transition-shadow duration-550 hover:shadow-lg motion-reduce:transition-none">
                      <div className="motion-safe:ease-editorial absolute inset-0 motion-safe:transition-transform motion-safe:duration-550 motion-safe:group-hover/portrait:scale-[1.02]">
                        <EditorialCover
                          mark={slot.mark}
                          markClassName="pb-0 text-6xl sm:text-8xl"
                        />
                      </div>
                    </div>
                    <p className="mt-4 font-serif text-lg/6 sm:text-xl/7">
                      {content.pendingPerson}
                    </p>
                    <p className="text-muted-foreground mt-2 text-xs/5 sm:text-sm/6">
                      {content.pendingRole}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
