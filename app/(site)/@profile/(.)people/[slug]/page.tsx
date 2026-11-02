import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileBody } from "@/components/people/profile-body";
import { ProfileDialog } from "@/components/people/profile-dialog";
import { profileCopy, profileSlugs, resolveProfile } from "@/content/profiles";
import { previewOptions } from "@/lib/preview";
import { profileDocumentMeta, profileMetadata } from "@/lib/profile-metadata";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return profileSlugs(previewOptions).map((slug) => ({ slug }));
}

// Same title/canonical as the standalone page. Next 16 doesn't yet apply it on
// soft navigation, so ProfileDialog also syncs the document while open.
export function generateMetadata({ params }: Props): Promise<Metadata> {
  return profileMetadata(params);
}

// Client-side card navigation opens the profile over the origin page. Direct
// loads, refreshes and no-JS visits get app/(site)/people/[slug] instead.
export default async function ProfileOverlay({ params }: Props) {
  const { slug } = await params;
  const resolved = resolveProfile(slug, previewOptions);
  if (!resolved) notFound();
  return (
    <ProfileDialog
      href={routes.person(slug)}
      name={resolved.profile.fullName}
      role={resolved.title}
      metadata={profileDocumentMeta(resolved)}
      labels={profileCopy.dialog}
    >
      <ProfileBody resolved={resolved} variant="dialog" />
    </ProfileDialog>
  );
}
