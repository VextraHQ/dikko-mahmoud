import { hasText } from "@/lib/content";

export type Person = {
  slug: string;
  profileAvailable?: boolean;
  id: string;
  name: string;
  role: string;
  initials: string;
  founderRole?: string;
  biography?: string;
  milestones?: readonly { year: string; description: string }[];
  portrait: { src: string; alt: string; position?: string } | null;
};

export const peopleHome = {
  eyebrow: "Our people",
  heading: "Experienced minds. A personal commitment.",
  description:
    "Meet the people behind the advice. Discover their experience through individual profiles, or explore partners, senior counsel and a wider team across our offices.",
  action: "Meet our lawyers",
};

// Names and roles supplied in the user's design references. Final portraits
// and publication approval remain pending; this is not the full team roster.
export const people: Person[] = [
  {
    id: "ab-mahmoud",
    founderRole: "Co-founder & Managing Partner",
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
    role: "Managing Partner",
    initials: "ABM",
    portrait: null,
  },
  {
    id: "bello-aminu-abdullahi",
    slug: "bello-aminu-abdullahi",
    name: "Bello Aminu Abdullahi",
    role: "Senior Partner",
    initials: "BAA",
    portrait: null,
  },
  {
    id: "aminu-sadauki",
    slug: "aminu-sadauki",
    name: "Aminu Sadauki",
    role: "Partner",
    initials: "AS",
    portrait: null,
  },
  {
    id: "sefiullahi-oseni",
    slug: "sefiullahi-oseni",
    name: "Sefiullahi Oseni",
    role: "Partner",
    initials: "SO",
    portrait: null,
  },
];

// Curated page selections reference canonical IDs; this is not a directory.
export const featuredPersonIds = [
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
export const featuredPeople = featuredPersonIds.flatMap((id) => {
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
  { id: "energy", name: "Energy & Oil & Gas", personIds: [], pendingSlots: 3 },
];
