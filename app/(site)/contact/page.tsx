import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact/hero-section";
import { ContactPanel } from "@/components/contact/contact-panel";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { ContactOfficesSection } from "@/components/contact/offices-section";
import { FaqSection } from "@/components/shared/faq-section";
import { enquiryForm as copy } from "@/content/contact-page";
import { contactFaqIntro, contactFaqs } from "@/content/faqs";
import { practiceTitle } from "@/content/practice-index";
import { practiceFromQuery } from "@/lib/enquiry";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { submitEnquiry } from "./actions";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Dikko & Mahmoud. Send an enquiry, call our Abuja or Kano office, or find our Lagos liaison office.",
  path: routes.contact,
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // A practice page's enquiry button preselects its area of law.
  const practice = practiceFromQuery((await searchParams).practice);

  return (
    <>
      <ContactHeroSection />
      <section
        id="enquiry"
        aria-labelledby="enquiry-heading"
        className="scroll-mt-24 py-12 lg:py-24"
      >
        {/* The form comes first in reading order and on phones; from `lg` the
            panel fills the left column (dense flow puts it back beside it). */}
        <div className="mx-auto grid max-w-360 gap-12 px-4 sm:px-8 lg:grid-flow-dense lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:px-20">
          <div className="min-w-0 lg:col-start-2">
            <h2 id="enquiry-heading" className="type-section font-serif">
              {copy.heading}
            </h2>
            <p className="text-muted-foreground mt-4 text-[15px]/6">
              {copy.intro} {copy.requiredNote}
            </p>
            <EnquiryForm
              key={practice}
              practice={practice}
              arrivalLabel={practiceTitle(practice)}
              submitAction={submitEnquiry}
            />
          </div>
          <ContactPanel />
        </div>
      </section>
      <ContactOfficesSection />
      <FaqSection intro={contactFaqIntro} items={contactFaqs} />
    </>
  );
}
