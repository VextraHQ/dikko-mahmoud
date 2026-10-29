import { FirmAtAGlanceSection } from "@/components/home/firm-at-a-glance-section";
import { FirmStorySection } from "@/components/home/firm-story-section";
import { SelectedClientsSection } from "@/components/home/selected-clients-section";
import { Hero } from "@/components/home/hero-section";
import { PracticeAreasSection } from "@/components/home/practice-areas-section";
import { SelectedMattersSection } from "@/components/home/selected-matters-section";
import { PeopleSection } from "@/components/home/people-section";
import { ClientPerspectivesSection } from "@/components/home/client-perspectives-section";
import { InsightsSection } from "@/components/home/insights-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { FaqSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FirmAtAGlanceSection />
      <FirmStorySection />
      <SelectedClientsSection />
      <PracticeAreasSection />
      <SelectedMattersSection />
      <PeopleSection />
      <ClientPerspectivesSection />
      <InsightsSection />
      <FaqSection />
      <EnquiryCta />
    </>
  );
}
