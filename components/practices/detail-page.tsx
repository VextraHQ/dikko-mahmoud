import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import { Eyebrow, eyebrowClass } from "@/components/ui/eyebrow";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { PersonCard } from "@/components/shared/person-card";
import { FaqSection } from "@/components/shared/faq-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { ServicesSection } from "@/components/practices/services-section";
import { PracticeInsightsSection } from "@/components/practices/insights-section";
// import { ExperienceSection } from "@/components/practices/experience-section";
import { EnquiryButton } from "@/components/shared/enquiry-button";
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
import type { InsightCard } from "@/types/insights";
import { PageTrail } from "@/components/shared/page-trail";
import { PageContents } from "@/components/shared/page-contents";
import { DetailHero } from "@/components/shared/detail-hero";

export function PracticeDetailPage({
  practice,
  insights,
}: {
  practice: Practice;
  insights: InsightCard[];
}) {
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
      <div className="mx-auto w-full max-w-360 px-4 pt-6 sm:px-8 sm:pt-10 lg:pt-36 xl:px-20">
        <PageTrail
          items={[
            { label: copy.homeLabel, href: routes.home },
            { label: copy.hubLabel, href: routes.practiceAreas },
            {
              label: practice.category,
              href: `${routes.practiceAreas}?category=${encodeURIComponent(practice.category)}`,
            },
            { label: practice.title },
          ]}
        />
        <DetailHero
          headingId="practice-heading"
          title={practice.title}
          lead={detail?.introduction ?? practice.summary}
          media={
            <ImageWithFallback
              src={practice.image?.src}
              alt={practice.image?.alt ?? ""}
              loading="eager"
              fill
              sizes="(min-width: 1440px) 680px, (min-width: 1024px) 48vw, 100vw"
              className="object-cover"
              fallback={<EditorialCover markClassName="pb-0" />}
            />
          }
          footer={
            <EnquiryButton practice={practice.slug}>
              {copy.enquiryAction}
            </EnquiryButton>
          }
        />
        <div className="grid items-start gap-10 pb-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-16">
          <aside className="border-border rounded-xl border bg-slate-50 p-5 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:p-6">
            <PageContents
              label={copy.sidebarHeading}
              items={sections.map((section) => ({
                id: section.id,
                text: section.label,
              }))}
            />
            {/* Desktop keeps the contact in the sticky sidebar; mobile shows
                it after the experience instead (see below). */}
            {person && (
              <div className="border-border mt-5 hidden border-t pt-5 lg:block">
                <PracticeContact person={person} practice={practice.slug} />
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
                    className="type-section mt-6 font-serif"
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
                        <h3 className="type-card mt-4 font-serif">{need}</h3>
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
                <PracticeContact person={person} practice={practice.slug} />
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
                  className="type-section mt-6 font-serif"
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
                  className="type-section mt-6 font-serif"
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
                    <p className={eyebrowClass}>
                      {formatIndex(index)} / {step.label}
                    </p>
                    <h3 className="type-card mt-4 font-serif">{step.title}</h3>
                    <p className="text-muted-foreground mt-4 text-sm/6">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
            <PracticeInsightsSection practice={practice} insights={insights} />
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
                    <span className={cn(eyebrowClass, "block")}>
                      {copy.nextPracticeLabel} · {formatIndex(next.index)}
                    </span>
                    <span className="type-subsection mt-2 block font-serif">
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
        />
      ) : null}
      <EnquiryCta />
    </>
  );
}

function PracticeContact({
  person,
  practice,
}: {
  person: Person;
  practice: string;
}) {
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
      <EnquiryButton practice={practice} size="sm" className="mt-4 lg:mt-3">
        {copy.enquiryAction}
      </EnquiryButton>
    </>
  );
}
