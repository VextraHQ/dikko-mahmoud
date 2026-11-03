import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { experienceCopy as copy, type Experience } from "@/content/experience";
import { formatIndex } from "@/lib/format";
import { routes } from "@/lib/routes";

export function ExperienceDetailPage({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <>
      <div className="mx-auto w-full max-w-360 px-4 pt-10 sm:px-8 lg:pt-36 xl:px-20">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap gap-y-1 [&>li]:shrink-0 [&>li:last-child]:shrink">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <SiteLink href={routes.home}>{copy.home}</SiteLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <SiteLink href={routes.experience}>{copy.title}</SiteLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="whitespace-normal">
                {experience.organisation}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section
          aria-labelledby="matter-heading"
          className="border-border border-b pt-10 pb-10 lg:pt-14 lg:pb-14"
        >
          <Eyebrow>{experience.category}</Eyebrow>
          <h1
            id="matter-heading"
            className="mt-6 max-w-5xl font-serif text-[40px]/[1.08] text-balance sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
          >
            {experience.organisation}
          </h1>
          <p className="text-muted-foreground mt-7 max-w-3xl text-base/7 lg:text-lg/8">
            {experience.summary}
          </p>
          {experience.preview && (
            <p className="text-muted-foreground mt-6 border-l-2 border-sky-200 pl-4 text-xs/6">
              {copy.previewNote}
            </p>
          )}
        </section>
        <div className="grid items-start gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:pt-14">
          <section aria-labelledby="instructions-heading" className="min-w-0">
            <Eyebrow>{copy.instructionsEyebrow}</Eyebrow>
            <h2
              id="instructions-heading"
              className="mt-5 font-serif text-4xl/[1.15] sm:text-5xl/[1.1]"
            >
              {copy.instructionsHeading}
            </h2>
            <ol className="mt-8">
              {experience.instructions.map((instruction, index) => (
                <li
                  key={instruction.title}
                  className="border-border border-t py-7 sm:py-8"
                >
                  <span className="text-primary text-xs/5 font-semibold">
                    {formatIndex(index)}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl/[1.2]">
                    {instruction.title}
                  </h3>
                  <p className="text-muted-foreground mt-5 max-w-3xl text-base/8">
                    {instruction.description}
                  </p>
                  <p className="text-primary mt-5 text-xs/6 font-semibold">
                    {instruction.role}
                  </p>
                </li>
              ))}
            </ol>
            <p className="text-muted-foreground border-border border-t pt-6 text-sm/7">
              {copy.qualification}
            </p>
          </section>
          <aside
            aria-labelledby="matter-glance-heading"
            className="border-border rounded-xl border bg-slate-50 p-6 lg:sticky lg:top-28 lg:p-7"
          >
            <Eyebrow as="h2" id="matter-glance-heading">
              {copy.glance}
            </Eyebrow>
            <dl className="mt-6">
              <dt className="text-muted-foreground text-xs/6">{copy.role}</dt>
              <dd className="mt-2 text-sm/7">{experience.involvement}</dd>
              {experience.claim && (
                <>
                  <dt className="text-muted-foreground border-border mt-6 border-t pt-6 text-xs/6">
                    {experience.claim.label}
                  </dt>
                  <dd className="mt-2">
                    <span className="text-primary block font-serif text-4xl/12">
                      {experience.claim.value}
                    </span>
                    <span className="text-muted-foreground mt-1 block text-xs/6">
                      {experience.claim.qualification}
                    </span>
                  </dd>
                </>
              )}
            </dl>
            {experience.practices.length > 0 && (
              <nav
                aria-label={copy.practices}
                className="border-border mt-6 border-t pt-6"
              >
                <p className="text-muted-foreground text-xs/6">
                  {experience.preview
                    ? copy.suggestedPractices
                    : copy.practices}
                </p>
                <ul className="mt-3 space-y-2">
                  {experience.practices.map((practice) => (
                    <li key={practice.slug}>
                      <SiteLink
                        href={routes.practiceArea(practice.slug)}
                        className="text-primary inline-flex min-h-11 items-center justify-between gap-4 rounded-sm py-2 text-sm/6 underline-offset-4 hover:underline"
                      >
                        <span>{practice.title}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 shrink-0"
                          strokeWidth={1.5}
                        />
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
        <SiteLink
          href={routes.experience}
          className="text-primary mt-10 inline-flex min-h-11 items-center gap-3 rounded-sm py-2 text-sm/6 font-semibold underline-offset-4 hover:underline lg:mt-12"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
          {copy.back}
        </SiteLink>
      </div>
      <EnquiryCta />
    </>
  );
}
