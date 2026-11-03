import {
  getPerson,
  peopleDirectory,
  seniorityGroups,
  type Person,
} from "@/content/people";
import { practiceIndex } from "@/content/practice-index";
import { hasText } from "@/lib/content";
import type { DirectoryPerson } from "@/lib/people/directory";
import { resolveProfile } from "@/lib/people/profiles";
import { directoryPeople } from "@/lib/people/roster";
import type { PreviewOptions } from "@/lib/publication";

/** Card fields plus confirmed practice titles; unknown practice IDs drop. */
export function toDirectoryPerson(person: Person): DirectoryPerson {
  const { id, slug, name, role, initials, portrait, seniority } = person;
  const practices = (person.practiceIds ?? []).flatMap((practiceId) => {
    const practice = practiceIndex.find((item) => item.slug === practiceId);
    return practice ? [{ id: practice.slug, title: practice.title }] : [];
  });
  return { id, slug, name, role, initials, portrait, seniority, practices };
}

/**
 * Everything the /people page needs, decided on the server: the listed people
 * (slim records) and only the filter options that actually narrow the list.
 * A role or practice nobody holds is never offered.
 */
export function peopleDirectoryData(
  options: PreviewOptions,
  people: readonly DirectoryPerson[] = directoryPeople(options).map(
    toDirectoryPerson,
  ),
) {
  const roles = seniorityGroups.filter((group) =>
    people.some((person) => person.seniority === group.id),
  );
  const practices = practiceIndex
    .filter((practice) =>
      people.some((person) =>
        person.practices.some((item) => item.id === practice.slug),
      ),
    )
    .map((practice) => ({ id: practice.slug, title: practice.title }));
  // The toolbar also shows during the no-index preview (see showDirectoryToolbar).
  return { people, roles, practices, preview: options.allowPreview };
}

export type PeopleDirectoryData = ReturnType<typeof peopleDirectoryData>;

/** Server-selected feature: the profile and the directory must both allow it. */
export function peopleDirectoryLeadership(
  options: PreviewOptions,
  listedPeople: readonly DirectoryPerson[],
) {
  const id = peopleDirectory.leadership.personId;
  if (!listedPeople.some((person) => person.id === id)) return null;
  const person = getPerson(id);
  if (!person || !hasText(person.biography)) return null;
  const profile = resolveProfile(person.slug, options);
  return profile ? { person, preview: profile.preview } : null;
}
