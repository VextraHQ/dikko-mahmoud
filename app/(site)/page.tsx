import type { Metadata } from "next";
import { FirmAtAGlanceSection } from "@/components/home/firm-at-a-glance-section";
import { FirmStorySection } from "@/components/home/firm-story-section";
import { SelectedClientsSection } from "@/components/home/selected-clients-section";
import { Hero } from "@/components/home/hero-section";
import { PracticeAreasSection } from "@/components/home/practice-areas-section";
import { SelectedMattersSection } from "@/components/home/selected-matters-section";
import { PeopleSection } from "@/components/home/people-section";
import { InsightsSection } from "@/components/home/insights-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { FaqSection } from "@/components/home/faq-section";
import { siteConfig } from "@/content/site";
import { createPageMetadata, getSiteUrl } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import { firmStructuredData, jsonLdString } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  description: siteConfig.description,
  path: routes.home,
});

export default function Home() {
  const structured = firmStructuredData(getSiteUrl());
  return (
    <>
      {structured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(structured) }}
        />
      )}
      <Hero />
      <FirmAtAGlanceSection />
      <FirmStorySection />
      <SelectedClientsSection />
      <PracticeAreasSection />
      <SelectedMattersSection />
      <PeopleSection />
      <InsightsSection />
      <FaqSection />
      {/* Home has not been reviewed against the type scale yet, so its
          closing band keeps the earlier 30px phone heading. */}
      <div className="contents max-sm:[&_#enquiry-heading]:text-3xl/9">
        <EnquiryCta />
      </div>
    </>
  );
}
