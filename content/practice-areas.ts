import { hasText } from "@/lib/content";

export type PracticeArea = {
  id: string;
  title: string;
  /** One line shown under the title when the area is selected. */
  summary: string;
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
// Summaries condense the firm's published practice descriptions:
// https://dikkoandmahmoud.com/practice-areas/
export const practiceAreas: PracticeArea[] = [
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    summary: "Litigation, arbitration, negotiation and mediation.",
    image: null,
  },
  {
    id: "corporate-secretarial",
    title: "Corporate & Secretarial",
    summary:
      "Corporate governance, regulatory compliance and company secretarial support.",
    image: null,
  },
  {
    id: "capital-markets-commercial",
    title: "Capital Markets & Commercial",
    summary:
      "Public offerings, private placements, rights issues, M&A and investment funds.",
    image: null,
  },
  {
    id: "energy-natural-resources",
    title: "Energy & Natural Resources",
    summary:
      "Legal, regulatory and commercial advice across oil and gas, power, mining and renewables.",
    image: null,
  },
  {
    id: "intellectual-property-technology",
    title: "Intellectual Property & Technology",
    summary:
      "Registration, renewal and opposition of trademarks, patents and designs.",
    image: null,
  },
  {
    id: "policy-government-advisory",
    title: "Policy & Government Advisory",
    summary:
      "Helping public institutions develop and shape their policy frameworks.",
    image: null,
  },
];

/** Areas ready to render (a title is required). */
export const visiblePracticeAreas = practiceAreas.filter((area) =>
  hasText(area.title),
);
