import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactHeroSection } from "@/components/contact/hero-section";
import { ContactPanel } from "@/components/contact/contact-panel";
import { EnquiryArrival } from "@/components/contact/enquiry-arrival";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { ContactOfficesSection } from "@/components/contact/offices-section";
import { FaqSection } from "@/components/shared/faq-section";
import { enquiryForm as copy } from "@/content/contact-page";
import { contactFaqIntro, contactFaqs } from "@/content/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { submitEnquiry } from "./actions";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Dikko & Mahmoud. Send an enquiry, call our Abuja or Kano office, or find our Lagos liaison office.",
  path: routes.contact,
});

export default function ContactPage() {
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
            {/* The page is pre-built, so the address is read in the browser:
                the plain form shows first, then `EnquiryArrival` preselects
                the practice a visitor came from. */}
            <Suspense
              fallback={
                <EnquiryForm practice="" submitAction={submitEnquiry} />
              }
            >
              <EnquiryArrival submitAction={submitEnquiry} />
            </Suspense>
          </div>
          <ContactPanel />
        </div>
      </section>
      <ContactOfficesSection />
      <FaqSection intro={contactFaqIntro} items={contactFaqs} />
    </>
  );
}
