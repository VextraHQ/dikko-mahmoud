import { Eyebrow } from "@/components/ui/eyebrow";
import { ReviewNote } from "@/components/shared/review-note";
import { practiceCopy } from "@/content/practice-index";
import { ArrowButton } from "@/components/ui/arrow-button";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { smeRetainer as copy } from "@/content/sme";
import { contact } from "@/content/contact";
import { routes } from "@/lib/routes";
import { formatIndex } from "@/lib/format";
import { PageTrail } from "@/components/shared/page-trail";

export function RetainerSection() {
  return (
    <>
      <section
        aria-labelledby="sme-heading"
        className="mx-auto max-w-360 px-4 pt-8 pb-12 sm:px-8 lg:pt-36 lg:pb-20 xl:px-20"
      >
        <PageTrail
          items={[
            { label: practiceCopy.homeLabel, href: routes.home },
            { label: practiceCopy.hubLabel, href: routes.practiceAreas },
            { label: copy.eyebrow },
          ]}
          className="mb-8"
        />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1
              id="sme-heading"
              className="mt-6 max-w-3xl font-serif text-4xl/11 sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
            >
              {copy.title}
            </h1>
          </div>
          <div>
            <p className="text-muted-foreground text-base/8 lg:text-lg/8">
              {copy.description}
            </p>
            <ArrowButton asChild className="mt-7">
              <a href={`mailto:${contact.email}`}>{copy.action}</a>
            </ArrowButton>
          </div>
        </div>
        <ReviewNote className="mt-8">{copy.reviewNote}</ReviewNote>
      </section>
      <section
        aria-labelledby="sme-tracks-heading"
        className="mx-auto max-w-360 px-4 pb-12 sm:px-8 lg:pb-20 xl:px-20"
      >
        <h2
          id="sme-tracks-heading"
          className="font-serif text-3xl/10 sm:text-4xl/11"
        >
          {copy.tracksHeading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {copy.tracks.map((track, index) => (
            <article
              id={track.id}
              key={track.id}
              className="border-border rounded-xl border bg-slate-50 p-6 sm:p-8 lg:p-10"
            >
              <p aria-hidden="true" className="text-primary text-sm/6">
                {formatIndex(index)}
              </p>
              <h3 className="mt-5 font-serif text-3xl/10 sm:text-4xl/11">
                {track.title}
              </h3>
              {track.description ? (
                <p className="text-muted-foreground mt-6 text-base/7">
                  {track.description}
                </p>
              ) : (
                <div className="mt-6">
                  <p className="text-sm/6 font-semibold">
                    {copy.pendingHeading}
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm/7">
                    {copy.pendingDescription}
                  </p>
                </div>
              )}
              {track.services.length ? (
                <ul className="text-muted-foreground mt-5 list-disc space-y-2 pl-5 text-sm/7">
                  {track.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              ) : null}
              <ArrowButton asChild size="sm" className="mt-8">
                <a href={`mailto:${contact.email}`}>
                  {copy.action}
                  <span className="sr-only">: {track.title}</span>
                </a>
              </ArrowButton>
            </article>
          ))}
        </div>
      </section>
      <EnquiryCta />
    </>
  );
}
