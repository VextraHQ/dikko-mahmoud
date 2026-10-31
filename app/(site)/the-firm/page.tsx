import type { Metadata } from "next";
import { FirmHeroSection } from "@/components/firm/hero-section";
import { FirmStorySection } from "@/components/firm/story-section";
import { JourneySection } from "@/components/firm/journey-section";
import { ValuesSection } from "@/components/firm/values-section";
import { ProcessSection } from "@/components/firm/process-section";
import { FirmPeopleSection } from "@/components/firm/people-section";
import { PresenceSection } from "@/components/firm/presence-section";
import { FirmFactsSection } from "@/components/shared/firm-facts-section";
import { FaqSection } from "@/components/shared/faq-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { firmFaqIntro, firmFaqs } from "@/content/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: "The Firm",
  description:
    "Built on experience. Guided by principles. Discover the story, people and approach of Dikko & Mahmoud.",
  path: routes.firm,
});

export default function TheFirmPage() {
  return (
    <>
      <FirmHeroSection />
      <FirmStorySection />
      <FirmFactsSection surface="pale" />
      <JourneySection />
      <ValuesSection />
      <ProcessSection />
      <FirmPeopleSection />
      <PresenceSection />
      <FaqSection
        intro={firmFaqIntro}
        items={firmFaqs}
        headingClassName="text-[32px]/10"
      />
      <EnquiryCta />
    </>
  );
}
