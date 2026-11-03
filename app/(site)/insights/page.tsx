import { redirect } from "next/navigation";
import { InsightsHeroSection } from "@/components/insights/hero-section";
import { InsightListingSection } from "@/components/insights/listing-section";
import { FaqSection } from "@/components/shared/faq-section";
import { EnquiryCta } from "@/components/shared/enquiry-cta";
import { insightsFaqs, insightsFaqIntro } from "@/content/insight-copy";
import {
  normalizeInsightQuery,
  insightQueryString,
  type RawInsightQuery,
} from "@/lib/insights/query";
import { getInsightPage } from "@/lib/insights/repository";
import { insightListingMetadata } from "@/lib/insights/metadata";
import { routes } from "@/lib/routes";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<RawInsightQuery>;
}) {
  return insightListingMetadata(normalizeInsightQuery(await searchParams));
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<RawInsightQuery>;
}) {
  const query = normalizeInsightQuery(await searchParams);
  const data = await getInsightPage(query);
  if (data.page !== query.page)
    redirect(
      `${routes.insights}${insightQueryString(data.query)}#insight-archive-heading`,
    );
  return (
    <>
      <InsightsHeroSection featured={data.featured} />
      <InsightListingSection data={data} />
      <FaqSection items={insightsFaqs} intro={insightsFaqIntro} />
      <EnquiryCta />
    </>
  );
}
