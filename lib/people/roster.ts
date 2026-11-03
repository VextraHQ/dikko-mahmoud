import { getPerson, people } from "@/content/people";
import {
  profileManifest,
  type ProfileManifestEntry,
} from "@/content/profile-manifest";
import { hasText } from "@/lib/content";
import { isPublishable, type PreviewOptions } from "@/lib/publication";

// Who may be listed and linked. Client-safe: reads IDs and review status only,
// never biographies, so lib/routes.ts and navigation can import it.

export function profileStatus(
  personId: string,
  manifest: readonly ProfileManifestEntry[] = profileManifest,
) {
  return manifest.find((entry) => entry.personId === personId)
    ?.publicationStatus;
}

/** Slugs whose profile may be linked and routed under the given preview rule. */
export function availableProfileSlugs(
  options: PreviewOptions,
  manifest: readonly ProfileManifestEntry[] = profileManifest,
) {
  return manifest.flatMap((entry) => {
    const person = getPerson(entry.personId);
    return person && isPublishable(entry.publicationStatus, options)
      ? [person.slug]
      : [];
  });
}

/**
 * Who the /people directory lists: every named person whose profile may be
 * linked under the preview rule, in roster order. The same list decides
 * whether /people launches, so the directory is never an empty page.
 */
export function directoryPeople(
  options: PreviewOptions,
  manifest: readonly ProfileManifestEntry[] = profileManifest,
) {
  const linkable = new Set(availableProfileSlugs(options, manifest));
  return people.filter(
    (person) => hasText(person.name) && linkable.has(person.slug),
  );
}
