import { people, type Person } from "@/content/people";
import { profileManifest } from "@/content/profile-manifest";
import { profileCopy, profiles, type PersonProfile } from "@/content/profiles";
import { hasText } from "@/lib/content";
import { directoryPeople, profileStatus } from "@/lib/people/roster";
import {
  normalizeProfileLinks,
  type ProfileLink,
} from "@/lib/people/profile-links";
import { isPublishable, type PreviewOptions } from "@/lib/publication";

// SERVER ONLY: this module reads the draft biographies in content/profiles.ts.
// Import it from route pages, server components and tests, never from a
// "use client" module or lib/routes.ts.

/** A body that can stand on its own: a name and at least one paragraph. */
export function isCompleteProfile(profile: PersonProfile | undefined) {
  return Boolean(
    profile &&
    hasText(profile.fullName) &&
    profile.biography.length > 0 &&
    profile.biography.every(hasText),
  );
}

export type ResolvedProfile = {
  person: Person;
  profile: PersonProfile;
  /** Pending source-backed draft shown only in the no-index preview. */
  preview: boolean;
  title: string;
  /** Short form for actions and labels; falls back to the full name. */
  shortName: string;
  /** Valid, ordered personal links; empty when none were supplied. */
  links: ProfileLink[];
  /** First personal email, shown in full in the contact panel. */
  personalEmail?: string;
};

/**
 * The one selection used by both the popup and the standalone page. Returns
 * null for unknown, withheld, unapproved (outside preview) or incomplete
 * profiles, so neither presentation can leak a draft the other would hide.
 */
export function resolveProfile(
  slug: string,
  options: PreviewOptions,
  records = { profiles, manifest: profileManifest },
): ResolvedProfile | null {
  const person = people.find((item) => item.slug === slug);
  if (!person) return null;
  const status = profileStatus(person.id, records.manifest);
  if (!isPublishable(status, options)) return null;
  const profile = records.profiles.find((item) => item.personId === person.id);
  if (!profile || !isCompleteProfile(profile)) return null;
  const links = normalizeProfileLinks(profile.links);
  return {
    person,
    profile,
    preview: status !== "approved",
    title: person.role,
    shortName: profile.shortName?.trim() || profile.fullName,
    links,
    personalEmail: links.find((link) => link.platform === "email")?.value,
  };
}

/** Static params for both presentations: only profiles that resolve. */
export function profileSlugs(options: PreviewOptions) {
  return people
    .filter((person) => resolveProfile(person.slug, options))
    .map((person) => person.slug);
}

/** Anchor ids, prefixed so a popup never collides with its origin page. */
export const profileSectionIds = {
  overview: "profile-overview",
  focus: "profile-focus",
  qualifications: "profile-qualifications",
  contact: "profile-contact",
} as const;

/**
 * The page hero shows career milestones when supplied; without them it shows
 * the areas of focus instead, so the hero never has an empty gap. Those focus
 * areas then leave the page body, so they never appear twice.
 */
export function focusInHero({ person, profile }: ResolvedProfile) {
  return !person.milestones?.length && Boolean(profile.focus?.length);
}

/** "On this page" entries: only sections the page actually renders. */
export function profileSectionLinks(resolved: ResolvedProfile) {
  const { profile, shortName } = resolved;
  return [
    { id: profileSectionIds.overview, label: profileCopy.overviewLabel },
    ...(profile.focus?.length && !focusInHero(resolved)
      ? [{ id: profileSectionIds.focus, label: profileCopy.focusLabel }]
      : []),
    ...(profile.qualifications?.length
      ? [
          {
            id: profileSectionIds.qualifications,
            label: profileCopy.qualificationsShortLabel,
          },
        ]
      : []),
    {
      id: profileSectionIds.contact,
      label: profileCopy.workingWith(shortName),
    },
  ];
}

/** "Meet more of our people": the directory without the current person. */
export function relatedProfiles(slug: string, options: PreviewOptions) {
  return directoryPeople(options).filter((person) => person.slug !== slug);
}
