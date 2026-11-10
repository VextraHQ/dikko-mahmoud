import { notFound } from "next/navigation";
import { PracticeDetailPage } from "@/components/practices/detail-page";
import { practiceCatalogue, getPractice } from "@/content/practice-catalogue";
import { getPracticeInsights } from "@/lib/insights/repository";
import { createPageMetadata, shareCardImage } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return practiceCatalogue.map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) notFound();
  return createPageMetadata({
    title: practice.title,
    description: practice.detail?.introduction ?? practice.summary,
    path: routes.practiceArea(practice.slug),
    image: shareCardImage(routes.practiceArea(practice.slug), practice.title),
  });
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) notFound();
  return (
    <PracticeDetailPage
      practice={practice}
      insights={getPracticeInsights(practice.slug)}
    />
  );
}
