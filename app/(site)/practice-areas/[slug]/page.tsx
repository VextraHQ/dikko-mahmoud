import { notFound } from "next/navigation";
import { PracticeDetailPage } from "@/components/practices/detail-page";
import { practiceCatalogue, getPractice } from "@/content/practice-catalogue";
import { createPageMetadata } from "@/lib/metadata";
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
  return <PracticeDetailPage practice={practice} />;
}
