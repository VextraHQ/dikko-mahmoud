import { ArrowRight, ArrowUpRight } from "lucide-react";
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
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { PersonCard } from "@/components/shared/person-card";
import { FaqSection } from "@/components/shared/faq-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { ServicesSection } from "@/components/practices/services-section";
// import { ExperienceSection } from "@/components/practices/experience-section";
import { EnquiryButton } from "@/components/practices/enquiry-button";
import {
  practiceCopy as copy,
  getPracticeSections,
  // getPracticeExperience,
  type Practice,
} from "@/content/practice-catalogue";
import { getNextPractice } from "@/content/practice-index";
import { workingWithUs } from "@/content/firm";
import { faqIntro } from "@/content/faqs";
import { getPerson, type Person } from "@/content/people";
// import { siteConfig } from "@/content/site";
import { routes } from "@/lib/routes";
import { formatIndex } from "@/lib/format";

export function PracticeDetailPage({ practice }: { practice: Practice }) {
  const detail = practice.detail;
  const person = detail?.contactId ? getPerson(detail.contactId) : undefined;
  // Experience carousel is hidden until clients consent to named matters.
  // It was shown only for design review. To bring the preview back, uncomment
  // the imports, these two lines and the <ExperienceSection> block below, and
  // pass `experienceOptions` to getPracticeSections. Without options, only
  // approved records count, so no "Selected experience" link appears.
  // const experienceOptions = { includePending: !siteConfig.indexable };
  // const experience = getPracticeExperience(practice, experienceOptions);
  const sections = getPracticeSections(practice);
  const next = getNextPractice(practice.slug);
  return (
    <>
      <div className="mx-auto w-full max-w-360 px-4 pt-10 sm:px-8 lg:pt-36 xl:px-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <SiteLink href={routes.home}>{copy.homeLabel}</SiteLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <SiteLink href={routes.practiceAreas}>{copy.hubLabel}</SiteLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{practice.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section
          aria-labelledby="practice-heading"
          className="grid items-center gap-8 pt-10 pb-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-12 lg:pb-20"
        >
          <div>
            <Eyebrow>{practice.category}</Eyebrow>
            <h1
              id="practice-heading"
              className="mt-6 max-w-3xl font-serif text-[36px]/[1.1] text-balance sm:text-5xl/[1.08] xl:text-6xl/[1.06]"
            >
              {practice.title}
            </h1>
            <p className="text-muted-foreground mt-8 max-w-2xl text-base/7 lg:text-lg/8">
              {detail?.introduction ?? practice.summary}
            </p>
            <EnquiryButton className="mt-7" />
          </div>
          <div className="relative isolate aspect-4/3 overflow-hidden rounded-xl">
            <ImageWithFallback
              src={practice.image?.src}
              alt={practice.image?.alt ?? ""}
              fill
              sizes="(min-width: 1440px) 540px, (min-width: 1024px) 43vw, 100vw"
              className="object-cover"
              fallback={
                <EditorialCover label={practice.title} markClassName="pb-0" />
              }
            />
          </div>
        </section>
        <div className="grid items-start gap-10 pb-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16">
          <aside className="lg:border-border lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:rounded-xl lg:border lg:bg-slate-50 lg:p-4">
            <nav aria-label="In this practice">
              <Eyebrow>{copy.sidebarHeading}</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-x-6 lg:grid lg:gap-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-primary inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-sm/6 underline-offset-4 hover:underline lg:min-h-9 lg:py-1.5"
                    >
                      {section.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0"
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Desktop keeps the contact in the sticky sidebar; mobile shows
                it after the experience instead (see below). */}
            {person && (
              <div className="border-border mt-5 hidden border-t pt-5 lg:block">
                <PracticeContact person={person} />
              </div>
            )}
          </aside>
          <div className="min-w-0">
            <section
              id="needs"
              aria-labelledby="needs-heading"
              className="pb-12 lg:pb-16"
            >
              {detail ? (
                <>
                  <Eyebrow>{copy.needsEyebrow}</Eyebrow>
                  <h2
                    id="needs-heading"
                    className="mt-6 font-serif text-[32px]/10 sm:text-5xl/13"
                  >
                    {detail.needsHeading}
                  </h2>
                  <p className="text-muted-foreground mt-7 text-sm/6 sm:text-base/7">
                    {detail.needsDescription}
                  </p>
                  <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {detail.needs.map((need, index) => (
                      <li key={need} className="border-border border-t pt-5">
                        <p className="text-primary text-xs/5 font-bold">
                          {formatIndex(index)}
                        </p>
                        <h3 className="mt-4 font-serif text-2xl/8">{need}</h3>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // The hero already shows the title and summary; only say
                // what is still to come.
                <>
                  <Eyebrow as="h2" id="needs-heading">
                    {copy.overviewHeading}
                  </Eyebrow>
                  <p className="text-muted-foreground mt-6 border-l-2 border-sky-200 pl-4 text-sm/6">
                    {copy.detailPending}
                  </p>
                </>
              )}
            </section>
            {detail && <ServicesSection services={detail.services} />}
            {/* Hidden pending client consent; see the note at the top.
            {detail && (
              <ExperienceSection
                items={experience}
                preview={experience.some(
                  (item) => item.publicationStatus === "pending",
                )}
              />
            )} */}
            {person && (
              <div className="border-border mb-12 rounded-xl border bg-slate-50 p-5 lg:hidden">
                <PracticeContact person={person} />
              </div>
            )}
            {detail?.peopleIds?.length ? (
              <section
                id="practice-people"
                aria-labelledby="practice-people-heading"
                className="border-border border-t py-12 lg:py-16"
              >
                <Eyebrow>{copy.peopleEyebrow}</Eyebrow>
                <h2
                  id="practice-people-heading"
                  className="mt-6 font-serif text-[32px]/10 sm:text-5xl/13"
                >
                  {copy.peopleHeading}
                </h2>
                <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {detail.peopleIds.map((id) => {
                    const member = getPerson(id);
                    return member ? (
                      <li key={id}>
                        <PersonCard
                          person={member}
                          portraitClassName="aspect-square"
                          imageHoverOnly
                          sizes="(min-width: 1024px) 240px, 40vw"
                        />
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            ) : null}
            <section
              id="working-together"
              aria-labelledby="working-heading"
              className="border-border border-t py-12 lg:py-16"
            >
              <div>
                <Eyebrow>{copy.workingEyebrow}</Eyebrow>
                <h2
                  id="working-heading"
                  className="mt-6 font-serif text-[32px]/10 sm:text-5xl/13"
                >
                  {workingWithUs.heading.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="mt-7 text-base/7">{copy.workingDescription}</p>
                <p className="text-muted-foreground mt-4 text-sm/6">
                  {workingWithUs.description}
                </p>
              </div>
              <ol className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {workingWithUs.steps.map((step, index) => (
                  <li key={step.title} className="border-border border-t pt-5">
                    <p className="text-primary text-[10px]/5 font-bold tracking-wider uppercase">
                      {formatIndex(index)} / {step.label}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl/8">{step.title}</h3>
                    <p className="text-muted-foreground mt-4 text-sm/6">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
              <EnquiryButton className="mt-8" />
            </section>
            {next && (
              <nav
                aria-label={copy.nextPracticeLabel}
                className="border-border border-t py-8 lg:py-10"
              >
                <SiteLink
                  href={routes.practiceArea(next.practice.slug)}
                  className="group/next ease-editorial -mx-4 flex items-center justify-between gap-6 rounded-xl px-4 py-4 transition-colors duration-300 hover:bg-slate-50 motion-reduce:transition-none"
                >
                  <span className="min-w-0">
                    <span className="text-primary block text-[11px]/5 font-bold tracking-[0.14em] uppercase">
                      {copy.nextPracticeLabel} · {formatIndex(next.index)}
                    </span>
                    <span className="mt-2 block font-serif text-2xl/8 sm:text-3xl/10">
                      {next.practice.title}
                    </span>
                  </span>
                  <span className="bg-secondary flex size-11 shrink-0 items-center justify-center rounded-full text-white">
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-5 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/next:translate-x-0.5"
                    />
                  </span>
                </SiteLink>
              </nav>
            )}
          </div>
        </div>
      </div>
      {detail?.faqs?.items.length ? (
        <FaqSection
          items={detail.faqs.items}
          intro={{ ...faqIntro, ...detail.faqs }}
          headingClassName="text-[32px]/10"
        />
      ) : null}
      <EnquiryCta />
    </>
  );
}

function PracticeContact({ person }: { person: Person }) {
  return (
    <>
      <Eyebrow>{copy.contactHeading}</Eyebrow>
      <div className="mt-5 lg:mt-4">
        {/* Shorter on desktop so the sticky card fits the screen. */}
        <PersonCard
          person={person}
          portraitClassName="aspect-square lg:aspect-16/10"
          imageHoverOnly
          sizes="(min-width: 1024px) 246px, 90vw"
        />
      </div>
      <p className="text-muted-foreground mt-4 text-sm/6 lg:mt-3">
        {copy.contactDescription}
      </p>
      <EnquiryButton size="sm" className="mt-4 lg:mt-3" />
    </>
  );
}
