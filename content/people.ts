import { hasText } from "@/lib/content";

/**
 * Directory groups, in display order. A person's group is set explicitly
 * rather than guessed from their role title ("Managing Partner" and "Partner"
 * are both partners). Empty groups are never shown. Group names beyond
 * Partners await the firm's roster.
 */
export const seniorityGroups = [
  { id: "partner", label: "Partners" },
  { id: "counsel", label: "Counsel" },
  { id: "senior-associate", label: "Senior associates" },
  { id: "associate", label: "Associates" },
] as const;

export type SeniorityId = (typeof seniorityGroups)[number]["id"];

export type Person = {
  slug: string;
  id: string;
  name: string;
  role: string;
  seniority: SeniorityId;
  /** Practice slugs from content/practice-index.ts, only once confirmed. */
  practiceIds?: readonly string[];
  initials: string;
  biography?: string;
  milestones?: readonly { year: string; description: string }[];
  portrait: { src: string; alt: string; position?: string } | null;
};

export const peopleHome = {
  eyebrow: "Our people",
  heading: "Experienced minds. A personal commitment.",
  description:
    "Meet the four partners featured in this preview. Further team profiles will follow once confirmed by the firm.",
  action: "Meet our lawyers",
};

// The /people directory. The heading comes from the designer's frame; the
// description is a draft for firm confirmation and names only the partners
// (no wider-team claims, per client feedback) until the full roster is
// supplied.
export const peopleDirectory = {
  eyebrow: "Our People",
  heading: ["Experienced minds.", "A personal commitment."],
  description:
    "Meet the partners behind our advice. Explore their experience, areas of focus and qualifications.",
  leadership: {
    personId: "ab-mahmoud",
    // Distinct from The Firm's founder section, which uses
    // "Founded on experience. Led with purpose." Draft for firm confirmation.
    eyebrow: "Leadership",
    heading: ["Meet our co-founder", "and managing partner."],
    action: "View profile",
    reviewNote: "Profile details awaiting confirmation by the firm.",
  },
  /** Search and filters appear once the directory lists this many people. */
  toolbarMinPeople: 9,
  toolbarLabel: "Find a person",
  searchLabel: "Search our people",
  searchHint: "Search by name or role",
  searchPlaceholder: "Search by name, role or practice",
  practiceLabel: "Practice area",
  closePractices: "Close practice areas",
  allPractices: "All practice areas",
  roleLabel: "Role",
  allRoles: "All",
  clearFilters: "Clear filters",
  resultsLabel: "Matching people",
  count: (shown: number, total: number) =>
    shown === total
      ? `${total} ${total === 1 ? "person" : "people"}`
      : `${shown} of ${total} people`,
  empty: {
    title: "No matching profiles",
    description: "Try another name or clear your search.",
    filteredDescription: "Try another name or adjust your filters.",
    clearSearch: "Clear search",
    contactAction: "Contact the firm",
  },
};

// Names and roles supplied in the user's design references. Final portraits
// and publication approval remain pending; this is not the full team roster.
export const people: Person[] = [
  {
    id: "ab-mahmoud",
    biography:
      "Managing Partner and co-founder A.B. Mahmoud, SAN, brings a career spanning public service, legal practice and professional leadership.",
    milestones: [
      { year: "2001", description: "Became a Senior Advocate of Nigeria" },
      {
        year: "2016",
        description: "Elected 33rd President of the Nigerian Bar Association",
      },
    ],
    slug: "ab-mahmoud",
    name: "A.B. Mahmoud, SAN",
    role: "Co-founder & Managing Partner",
    seniority: "partner",
    initials: "ABM",
    portrait: null,
  },
  {
    id: "bello-aminu-abdullahi",
    slug: "bello-aminu-abdullahi",
    name: "Bello Aminu Abdullahi",
    role: "Senior Partner",
    seniority: "partner",
    initials: "BAA",
    portrait: null,
  },
  {
    id: "aminu-sadauki",
    slug: "aminu-sadauki",
    name: "Aminu Sadauki",
    role: "Partner",
    seniority: "partner",
    initials: "AS",
    portrait: null,
  },
  {
    id: "sefiullahi-oseni",
    slug: "sefiullahi-oseni",
    name: "Sefiullahi Oseni",
    role: "Partner",
    seniority: "partner",
    initials: "SO",
    portrait: null,
  },
];

// Curated page selections reference canonical IDs; this is not a directory.
const featuredPersonIds = [
  "ab-mahmoud",
  "bello-aminu-abdullahi",
  "aminu-sadauki",
  "sefiullahi-oseni",
] as const;

export function getPerson(id: string) {
  return people.find((person) => person.id === id);
}

// For records the site cannot render without; fails the build if removed.
export function requirePerson(id: string) {
  const person = getPerson(id);
  if (!person) throw new Error(`Missing person record: ${id}`);
  return person;
}

const featuredPeople = featuredPersonIds.flatMap((id) => {
  const person = getPerson(id);
  return person ? [person] : [];
});

/** The homepage People preview: named records only, capped at four. */
export const homePeople = featuredPeople
  .filter((person) => hasText(person.name))
  .slice(0, 4);

// Screenshot repetition is not evidence of advisory membership.
export const advisoryGroups: {
  id: string;
  name: string;
  personIds: string[];
  pendingSlots: number;
}[] = [
  {
    id: "corporate-commercial",
    name: "Corporate & Commercial Advisory",
    personIds: [],
    pendingSlots: 3,
  },
  {
    id: "government-policy",
    name: "Government & Policy Advisory",
    personIds: [],
    pendingSlots: 3,
  },
  { id: "energy", name: "Energy, Oil & Gas", personIds: [], pendingSlots: 3 },
];
