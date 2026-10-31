import { practiceHubFaq } from "@/content/practice-faqs";
import { PracticesHeroSection } from "@/components/practices/hero-section";
import { CatalogueSection } from "@/components/practices/catalogue-section";
import { FaqSection } from "@/components/shared/faq-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { getPracticeFilter, practiceCopy } from "@/content/practice-catalogue";
import { faqIntro } from "@/content/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
export const metadata = createPageMetadata({
  title: "Practice areas",
  description: practiceCopy.heroDescription,
  path: routes.practiceAreas,
});
export default async function PracticesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <>
      <PracticesHeroSection />
      <CatalogueSection filter={getPracticeFilter(category)} />
      <FaqSection
        intro={{ ...faqIntro, ...practiceHubFaq }}
        items={practiceHubFaq.items}
        headingClassName="text-[32px]/10"
      />
      <EnquiryCta />
    </>
  );
}
