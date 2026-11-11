import { ArrowUpRight } from "lucide-react";
import { keepTogether } from "@/lib/typography";
import { ReviewNote } from "@/components/shared/review-note";
import { PortraitFallback } from "@/components/shared/portrait-fallback";
import { SiteLink } from "@/components/layout/site-link";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Eyebrow } from "@/components/ui/eyebrow";
import { peopleDirectory as copy } from "@/content/people";
import type { peopleDirectoryLeadership } from "@/lib/people/directory-data";
import { routes } from "@/lib/routes";

/** Server-rendered feature, passed through the browser directory as a slot. */
export function DirectoryLeadershipSection({
  person,
  preview,
}: NonNullable<ReturnType<typeof peopleDirectoryLeadership>>) {
  return (
    <section
      aria-labelledby="people-leadership-heading"
      data-directory-leadership
      className="grid gap-8 border-b border-slate-200 py-10 sm:gap-10 lg:grid-cols-[.75fr_1.6fr] lg:gap-20 lg:py-12"
    >
      <SiteLink
        href={routes.person(person.slug)}
        scroll={false}
        aria-label={`${person.name}, ${person.founderRole ?? person.role}`}
        className="group block self-start rounded-xl"
      >
        <figure>
          <div className="group/portrait relative isolate aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-100 sm:max-w-sm lg:max-w-none">
            <ImageWithFallback
              src={person.portrait?.src}
              alt={person.portrait?.alt ?? ""}
              loading="eager"
              fill
              sizes="(min-width: 1440px) 360px, (min-width: 1024px) 28vw, (min-width: 640px) 384px, 92vw"
              style={{ objectPosition: person.portrait?.position }}
              className="motion-safe:ease-editorial object-cover motion-safe:transition-transform motion-safe:duration-550 motion-safe:group-hover/portrait:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]"
              fallback={
                <PortraitFallback
                  initials={person.initials}
                  initialsClassName="text-6xl"
                />
              }
            />
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="text-primary absolute top-3 right-3 size-4"
            />
          </div>
          <figcaption className="mt-4">
            <p className="decoration-primary/40 font-serif text-lg/6 underline-offset-4 group-hover:underline sm:text-xl/7">
              {keepTogether(person.name)}
            </p>
            <p className="text-muted-foreground mt-2 text-xs/5 sm:text-sm/6">
              {person.founderRole ?? person.role}
            </p>
          </figcaption>
        </figure>
      </SiteLink>
      <div>
        <Eyebrow>{copy.leadership.eyebrow}</Eyebrow>
        <h2
          id="people-leadership-heading"
          className="mt-4 font-serif text-[32px]/[1.12] sm:text-4xl/[1.12] xl:text-[42px]/[1.1]"
        >
          {copy.leadership.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="text-muted-foreground mt-5 max-w-2xl text-sm/7 sm:text-base/7">
          {person.biography && keepTogether(person.biography)}
        </p>
        {!!person.milestones?.length && (
          <dl className="mt-6 grid grid-cols-[1fr_1.5fr] gap-5 border-y border-slate-200 py-4 sm:gap-8">
            {person.milestones.map((milestone) => (
              <div key={milestone.year}>
                <dt className="text-primary font-serif text-3xl/9 sm:text-4xl/10">
                  {milestone.year}
                </dt>
                <dd className="text-muted-foreground mt-2 text-xs/5 sm:text-sm/6">
                  {milestone.description}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
          <SiteLink
            href={routes.person(person.slug)}
            scroll={false}
            className="text-primary decoration-primary/40 hover:decoration-primary inline-flex min-h-11 items-center gap-3 text-sm underline underline-offset-4"
          >
            {copy.leadership.action}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4"
            />
          </SiteLink>
          {preview && <ReviewNote>{copy.leadership.reviewNote}</ReviewNote>}
        </div>
      </div>
    </section>
  );
}
