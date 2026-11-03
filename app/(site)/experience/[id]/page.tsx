import { notFound } from "next/navigation";
import { ExperienceDetailPage } from "@/components/experience/detail-page";
import { getExperiences, resolveExperience } from "@/content/experience";
import { previewOptions } from "@/lib/preview";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return getExperiences(previewOptions).map((experience) => ({
    id: experience.matterId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = resolveExperience(id, previewOptions);
  if (!experience) notFound();
  return createPageMetadata({
    title: experience.organisation,
    description: experience.summary,
    path: routes.matter(id),
  });
}

export default async function MatterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = resolveExperience(id, previewOptions);
  if (!experience) notFound();
  return <ExperienceDetailPage experience={experience} />;
}
