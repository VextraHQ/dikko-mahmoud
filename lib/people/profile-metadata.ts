import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { firmBrand } from "@/content/firm";
import { resolveProfile, type ResolvedProfile } from "@/content/profiles";
import { createPageMetadata, getSiteUrl, pageTitle } from "@/lib/metadata";
import { previewOptions } from "@/lib/preview";
import { routes } from "@/lib/routes";

/** Plain values shared by the page metadata and the popup's document sync. */
export function profileDocumentMeta(resolved: ResolvedProfile) {
  const { person, profile, title } = resolved;
  const path = routes.person(person.slug);
  return {
    name: profile.fullName,
    title: pageTitle(profile.fullName),
    description: `${profile.fullName}, ${title} at ${firmBrand.name}. ${profile.summary ?? profile.biography[0]}`,
    path,
    canonical: `${getSiteUrl()}${path}`,
  };
}

/**
 * One metadata source for the standalone profile and its intercepted popup.
 * Unknown or unavailable profiles 404, as on practice routes.
 */
export async function profileMetadata(
  params: Promise<{ slug: string }>,
): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveProfile(slug, previewOptions);
  if (!resolved) notFound();
  const meta = profileDocumentMeta(resolved);
  return createPageMetadata({
    title: meta.name,
    description: meta.description,
    path: meta.path,
  });
}
