import { notFound } from "next/navigation";
import { ExperienceHeroSection } from "@/components/experience/hero-section";
import { ExperienceListingSection } from "@/components/experience/listing-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { experienceCopy, getExperiences } from "@/content/experience";
import { previewOptions } from "@/lib/preview";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: experienceCopy.title,
  description: experienceCopy.introduction,
  path: routes.experience,
});

export default function ExperiencePage() {
  const items = getExperiences(previewOptions);
  if (!items.length) notFound();
  return (
    <>
      <ExperienceHeroSection />
      <ExperienceListingSection items={items} />
      <EnquiryCta />
    </>
  );
}
