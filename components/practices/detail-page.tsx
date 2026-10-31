import { ArrowUpRight } from "lucide-react";
import { SiteLink } from "@/components/layout/site-link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { PersonCard } from "@/components/shared/person-card";
import { FaqSection } from "@/components/shared/faq-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { ServicesSection } from "@/components/practices/services-section";
import { ExperienceSection } from "@/components/practices/experience-section";
import {
  practiceCopy as copy,
  getPracticeSections,
  type Practice,
} from "@/content/practice-catalogue";
import { workingWithUs } from "@/content/firm";
import { faqIntro } from "@/content/faqs";
import { getPerson } from "@/content/people";
import { contact } from "@/content/contact";
import { routes } from "@/lib/routes";
import { formatIndex } from "@/lib/format";

export function PracticeDetailPage({ practice }: { practice: Practice }) {
  const detail = practice.detail;
  const person = detail?.contactId ? getPerson(detail.contactId) : undefined;
  const sections = getPracticeSections(practice);
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
              className="mt-6 max-w-3xl font-serif text-[40px]/[1.08] sm:text-6xl/[1.08] xl:text-7xl/[1.08]"
            >
              {practice.title}
            </h1>
            <p className="text-muted-foreground mt-8 max-w-2xl text-base/7 lg:text-lg/8">
              {detail?.introduction ?? practice.summary}
            </p>
            <ArrowButton asChild className="mt-7">
              <a href={`mailto:${contact.email}`}>{copy.enquiryAction}</a>
            </ArrowButton>
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
          <aside className="border-border rounded-xl border bg-slate-50 p-5 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto">
            <nav aria-label="In this practice">
              <Eyebrow>{copy.sidebarHeading}</Eyebrow>
              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 lg:grid-cols-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-primary inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-sm/6 underline-offset-4 hover:underline"
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
            {person && (
              <div className="border-border mt-6 border-t pt-6">
                <Eyebrow>{copy.contactHeading}</Eyebrow>
                <div className="mt-5">
                  <PersonCard
                    person={person}
                    portraitClassName="aspect-square"
                    imageHoverOnly
                    sizes="(min-width: 1024px) 246px, 40vw"
                  />
                </div>
                <p className="text-muted-foreground mt-4 text-sm/6">
                  {copy.contactDescription}
                </p>
                <ArrowButton asChild size="sm" className="mt-4">
                  <a href={`mailto:${contact.email}`}>Make an enquiry</a>
                </ArrowButton>
              </div>
            )}
          </aside>
          <div className="min-w-0">
            <section
              id="needs"
              aria-labelledby="needs-heading"
              className="pb-12 lg:pb-16"
            >
              <Eyebrow>{detail ? copy.needsEyebrow : copy.hubLabel}</Eyebrow>
              <h2
                id="needs-heading"
                className="mt-6 font-serif text-[32px]/10 sm:text-5xl/13"
              >
                {detail ? detail.needsHeading : practice.title}
              </h2>
              <p className="text-muted-foreground mt-7 text-sm/6 sm:text-base/7">
                {detail ? detail.needsDescription : practice.summary}
              </p>
              {detail ? (
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
              ) : (
                <p className="text-muted-foreground mt-6 border-l-2 border-sky-200 pl-4 text-sm/6">
                  {copy.detailPending}
                </p>
              )}
            </section>
            {detail && <ServicesSection services={detail.services} />}
            {detail && <ExperienceSection items={detail.experience} />}
            {detail?.peopleIds?.length ? (
              <section
                id="practice-people"
                aria-labelledby="practice-people-heading"
                className="border-border border-t py-12 lg:py-16"
              >
                <Eyebrow>{copy.contactHeading}</Eyebrow>
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
              <ArrowButton asChild className="mt-8">
                <a href={`mailto:${contact.email}`}>Make an enquiry</a>
              </ArrowButton>
            </section>
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
