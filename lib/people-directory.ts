// Pure rules for the /people directory: what a listed person looks like in the
// browser, how search and filters match, and how filters map to the URL.
// No React here, so every rule is unit-tested in tests/people-directory.test.ts.
import type { Person, SeniorityId } from "@/content/people";

/** The slim record sent to the browser: card fields only, no biographies. */
export type DirectoryPerson = Pick<
  Person,
  "id" | "slug" | "name" | "role" | "initials" | "portrait" | "seniority"
> & { practices: readonly { id: string; title: string }[] };

export type DirectoryGroup = { id: SeniorityId; label: string };

export type DirectoryFilters = {
  query: string;
  practice: string;
  role: string;
};

export const emptyFilters: DirectoryFilters = {
  query: "",
  practice: "",
  role: "",
};

/** Field names shared by the URL (`?q=&practice=&role=`) and the toolbar form. */
export const filterParams = {
  query: "q",
  practice: "practice",
  role: "role",
} as const;

export function hasActiveFilters(filters: DirectoryFilters) {
  return Boolean(filters.query.trim() || filters.practice || filters.role);
}

/**
 * Text ready for matching: lower case, accents removed, "A.B." read as "ab",
 * other punctuation (such as "&") read as a space.
 */
export function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/**
 * People matching every active filter. Each search word must appear somewhere
 * in the person's name, role or practice titles, in any order.
 */
export function filterPeople(
  people: readonly DirectoryPerson[],
  filters: DirectoryFilters,
) {
  const words = normalizeText(filters.query).split(" ").filter(Boolean);
  return people.filter((person) => {
    if (filters.role && person.seniority !== filters.role) return false;
    if (
      filters.practice &&
      !person.practices.some((practice) => practice.id === filters.practice)
    ) {
      return false;
    }
    const text = normalizeText(
      [person.name, person.role, ...person.practices.map((p) => p.title)].join(
        " ",
      ),
    );
    return words.every((word) => text.includes(word));
  });
}

/**
 * Feature the selected person once at rest; active filters search everyone.
 * An unavailable feature never removes a card or creates an empty selection.
 */
export function directoryPresentation(
  people: readonly DirectoryPerson[],
  filters: DirectoryFilters,
  featuredPersonId?: string,
) {
  const active = hasActiveFilters(filters);
  const showFeatured =
    !active &&
    Boolean(featuredPersonId && people.some((p) => p.id === featuredPersonId));
  const results = active
    ? filterPeople(people, filters)
    : showFeatured
      ? people.filter((person) => person.id !== featuredPersonId)
      : people;
  return { active, showFeatured, results };
}

/** People under their seniority headings, in group order; empty groups drop. */
export function groupPeople(
  people: readonly DirectoryPerson[],
  groups: readonly DirectoryGroup[],
) {
  return groups
    .map((group) => ({
      ...group,
      people: people.filter((person) => person.seniority === group.id),
    }))
    .filter((group) => group.people.length > 0);
}

/**
 * Filters read from the URL or the toolbar form (both have `.get(name)`).
 * Unknown practice or role values are ignored, so an old or edited link
 * never leaves the page stuck on an empty result.
 */
export function readFilters(
  source: { get(name: string): unknown },
  valid: { practices: readonly string[]; roles: readonly string[] },
): DirectoryFilters {
  const text = (name: string) => {
    const value = source.get(name);
    return typeof value === "string" ? value : "";
  };
  const practice = text(filterParams.practice);
  const role = text(filterParams.role);
  return {
    query: text(filterParams.query).slice(0, 100),
    practice: valid.practices.includes(practice) ? practice : "",
    role: valid.roles.includes(role) ? role : "",
  };
}

/** The `?…` part of the URL for these filters, or "" when none are active. */
export function filtersToSearch(filters: DirectoryFilters) {
  const params = new URLSearchParams();
  if (filters.query.trim())
    params.set(filterParams.query, filters.query.trim());
  if (filters.practice) params.set(filterParams.practice, filters.practice);
  if (filters.role) params.set(filterParams.role, filters.role);
  const search = params.toString();
  return search ? `?${search}` : "";
}

/**
 * When the toolbar shows:
 * - during the no-index preview, so the firm can review it with any roster;
 * - at launch, once the full list (never the filtered results) reaches
 *   `minPeople`;
 * - always while a filter is active, so it can be cleared.
 */
export function showDirectoryToolbar({
  total,
  minPeople,
  filters,
  preview,
}: {
  total: number;
  minPeople: number;
  filters: DirectoryFilters;
  preview: boolean;
}) {
  return preview || total >= minPeople || hasActiveFilters(filters);
}
