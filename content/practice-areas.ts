export type PracticeArea = {
  id: string;
  title: string;
  image: { src: string; alt: string } | null;
};

export const practiceAreasIntro = {
  eyebrow: "Practice areas",
  title: "Our areas of expertise",
  description:
    "Explore the legal services relevant to your business, institution or individual matter.",
  action: "View all practice areas",
  detailAction: "Explore this area",
};

// Source labels are retained; approved practice photographs are still needed.
export const practiceAreas: PracticeArea[] = [
  { id: "dispute-resolution", title: "Dispute Resolution", image: null },
  {
    id: "corporate-secretarial",
    title: "Corporate & Secretarial",
    image: null,
  },
  {
    id: "capital-markets-commercial",
    title: "Capital Markets & Commercial",
    image: null,
  },
  {
    id: "energy-natural-resources",
    title: "Energy & Natural Resources",
    image: null,
  },
  {
    id: "intellectual-property-technology",
    title: "Intellectual Property & Technology",
    image: null,
  },
  {
    id: "policy-government-advisory",
    title: "Policy & Government Advisory",
    image: null,
  },
];
