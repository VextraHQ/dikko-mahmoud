export type PersonPreview = {
  id: string;
  name: string;
  role: string;
  initials: string;
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
export const featuredPeople: PersonPreview[] = [
  {
    id: "ab-mahmoud",
    name: "A.B. Mahmoud, SAN",
    role: "Managing Partner",
    initials: "ABM",
    portrait: null,
  },
  {
    id: "bello-aminu-abdullahi",
    name: "Bello Aminu Abdullahi",
    role: "Senior Partner",
    initials: "BAA",
    portrait: null,
  },
  {
    id: "aminu-sadauki",
    name: "Aminu Sadauki",
    role: "Partner",
    initials: "AS",
    portrait: null,
  },
  {
    id: "sefiullahi-oseni",
    name: "Sefiullahi Oseni",
    role: "Partner",
    initials: "SO",
    portrait: null,
  },
];
