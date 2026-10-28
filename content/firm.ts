// Source-supplied preview copy. Office/portrait media await approved originals.
export const firmBrand = {
  name: "Dikko & Mahmoud",
  descriptor: "Solicitors and Advocates",
  initials: "D&M",
};

export const firmFacts = [
  {
    value: "1993",
    label: "Established",
    detail: "Founded in Nigeria",
    shortLabel: "Established",
  },
  {
    value: "30+",
    label: "Years of practice",
    detail: "Businesses, institutions & individuals",
    shortLabel: "Years of practice",
  },
  {
    value: "2 + 1",
    label: "Offices & liaison presence",
    detail: "Abuja & Kano · Lagos liaison",
    shortLabel: "Offices & liaison",
  },
  {
    value: "Public + Private",
    label: "Sector perspective",
    detail: "Experience across both sectors",
    shortLabel: "Sector perspective",
  },
] as const;

export const firmHomePreview = {
  factsHeading: "The firm at a glance",
  eyebrow: "Our firm’s story",
  title: ["Built on experience.", "Focused on your future."],
  introduction: [
    "Trusted legal guidance for businesses, institutions and individuals.",
    "Public-sector understanding. Commercial perspective. Personal commitment.",
  ],
  storyTitle: ["Experience, integrity", "and a clear way forward."],
  story:
    "Founded by A.B. Dikko and A.B. Mahmoud, our firm brings public-sector understanding and a commercial perspective to disputes, transactions and government advisory.",
  name: firmBrand.name,
  descriptor: "Solicitors and Advocates · Est. 1993",
  person: { name: "A.B. Mahmoud, SAN", role: "Co-founder & Managing Partner" },
  action: "Discover our story",
  media: {
    office: {
      src: null as string | null,
      alt: "",
    },
    portrait: {
      src: null as string | null,
      alt: "",
      initials: "ABM",
    },
  },
} as const;
