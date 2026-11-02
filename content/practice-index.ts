// Public catalogue: safe for navigation, Home and future form client bundles.
type PracticeCategory = "Contentious" | "Transactional" | "Advisory";
export type PracticeSummary = {
  slug: string;
  title: string;
  category: PracticeCategory;
  summary: string;
  image?: { src: string; alt: string };
};
export const practiceIndex: PracticeSummary[] = [
  {
    slug: "corporate-commercial-advisory",
    title: "Corporate & Commercial Advisory",
    category: "Advisory",
    summary:
      "Strategic legal guidance for businesses navigating contracts, commercial relationships and complex legal decisions.",
  },
  {
    slug: "corporate-governance-compliance-secretarial",
    title: "Corporate Governance, Compliance & Secretarial Services",
    category: "Advisory",
    summary:
      "Helping organisations strengthen governance, meet regulatory requirements and manage their statutory and corporate responsibilities.",
  },
  {
    slug: "mergers-acquisitions-due-diligence",
    title: "Mergers, Acquisitions & Due Diligence",
    category: "Transactional",
    summary:
      "Legal support for acquisitions, investments, business combinations and strategic transactions.",
  },
  {
    slug: "projects-joint-ventures-finance",
    title: "Projects, Joint Ventures & Finance",
    category: "Advisory",
    summary:
      "Structuring projects, partnerships and financing arrangements from initial negotiation through documentation.",
  },
  {
    slug: "litigation-dispute-resolution",
    title: "Litigation & Dispute Resolution",
    category: "Contentious",
    summary:
      "Resolving disputes through litigation, arbitration, negotiation and alternative dispute resolution.",
  },
  {
    slug: "energy-oil-gas",
    title: "Energy & Oil & Gas",
    category: "Transactional",
    summary:
      "Legal advisory for businesses operating within energy, petroleum and related industries.",
  },
  {
    slug: "intellectual-property-technology",
    title: "Intellectual Property & Technology",
    category: "Advisory",
    summary:
      "Protecting intellectual property and advising clients on legal matters arising from technology and innovation.",
  },
  {
    slug: "real-estate-asset-protection",
    title: "Real Estate & Asset Protection",
    category: "Transactional",
    summary:
      "Legal guidance concerning property interests, transactions and the protection of valuable assets.",
  },
  {
    slug: "government-policy-advisory",
    title: "Government & Policy Advisory",
    category: "Advisory",
    summary:
      "Advising organisations on government policy, regulatory developments and public-sector engagement.",
  },
];
export const practiceCopy = {
  heroEyebrow: "Our expertise",
  heroHeading: ["Legal expertise.", "Built around your needs."],
  heroDescription:
    "Explore our connected practice areas. Find clear guidance on the work we do, the services available and how we can help with your matter.",
  eyebrow: "Our practices",
  heading: ["Find the support you", "need."],
  introduction:
    "Whether you are building a business, protecting an investment or resolving a dispute, we provide clear legal guidance to help you understand your options and take the next step.",
  description:
    "Our practice areas support businesses, individuals, investors and public institutions. Explore the services below to find the expertise relevant to your needs.",
  servicesAction: "Services in this practice",
  exploreAction: "Explore this practice",
  enquiryAction: "Make an enquiry",
  menuEyebrow: "Our expertise",
  menuHeading: ["Our practice", "areas."],
  menuDescription:
    "Browse our nine areas of practice and the services within each.",
  menuAction: "View all practice areas",
  servicePending:
    "Service detail is awaiting editorial confirmation for this preview.",
  detailPending:
    "Detailed services, experience and practice-specific content are being prepared for this preview.",
  needsEyebrow: "Your needs",
  servicesEyebrow: "Legal support",
  servicesHeading: "How we can help.",
  servicesLabel: "How we can help",
  servicesDescription:
    "Explore the services within this practice, then speak with us about the support your matter requires.",
  experienceEyebrow: "Selected experience",
  experiencePreviewNote: "Visual preview · client consent pending",
  experienceHeading: "Relevant work. Practical perspective.",
  experienceDescription:
    "A selection of matters showing the work we have undertaken and the legal services involved.",
  peopleHeading: "Our people",
  peopleEyebrow: "The team",
  nextPracticeLabel: "Next practice",
  workingEyebrow: "Working together",
  workingDescription:
    "Our process is adapted to the matter, its complexity and your priorities.",
  smeHeading: "SME retainer",
  smeDescription: "Explore the Advisory and Secretarial retainer tracks.",
  smeAction: "Explore SME retainer",
  sidebarHeading: "In this practice",
  contactHeading: "Your contact",
  contactDescription: "Speak with our team about your matter.",
  overviewHeading: "About this practice",
  homeLabel: "Home",
  hubLabel: "Practice areas",
};

/** The practice after `slug` in index order, wrapping from the last to the first. */
export function getNextPractice(slug: string) {
  const index = practiceIndex.findIndex((practice) => practice.slug === slug);
  if (index === -1) return undefined;
  const nextIndex = (index + 1) % practiceIndex.length;
  return { practice: practiceIndex[nextIndex], index: nextIndex };
}

/** Uncertainty is an enquiry choice, not a tenth practice. */
export const practiceEnquiryOptions = [
  ...practiceIndex.map((practice) => ({
    value: practice.slug,
    label: practice.title,
  })),
  { value: "not-sure", label: "Not sure yet" },
];
