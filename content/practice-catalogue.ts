import type { Faq } from "@/content/faqs";

export type PracticeCategory = "Contentious" | "Transactional" | "Advisory";
export type PracticeDetail = {
  introduction: string;
  needsHeading: string;
  needsDescription: string;
  needs: string[];
  services: { title: string; description: string | null }[];
  contactId?: string;
  peopleIds?: string[];
  experience?: {
    id: string;
    organisation: string;
    category: string;
    matter: string;
    role: string;
    services: string[];
  }[];
  faqs?: { heading: string[]; description: string; items: Faq[] };
};
export type Practice = {
  slug: string;
  title: string;
  category: PracticeCategory;
  summary: string;
  image?: { src: string; alt: string };
  detail?: PracticeDetail;
};

// Nine titles/categories/summaries supplied in the 30 Oct design screenshots.
// Detail copy is intentionally optional; do not fabricate the other eight pages.
export const practiceCatalogue: Practice[] = [
  {
    slug: "corporate-commercial-advisory",
    title: "Corporate & Commercial Advisory",
    category: "Advisory",
    summary:
      "Strategic legal guidance for businesses navigating contracts, commercial relationships and complex legal decisions.",
    detail: {
      introduction:
        "Practical legal guidance for everyday business decisions and complex commercial matters.",
      needsHeading: "Clarity for the decisions ahead.",
      needsDescription:
        "Businesses operate within constantly changing legal, contractual and commercial environments. Our Corporate & Commercial Advisory practice provides clients with clear, practical and commercially focused legal guidance to support informed decision-making and reduce legal risk.",
      needs: [
        "You are negotiating a commercial agreement",
        "You need clarity on contractual rights or obligations",
        "You want legal input before a business decision",
      ],
      services: [
        {
          title: "Legal Advisory",
          description:
            "Providing practical legal guidance on commercial, operational and strategic matters.",
        },
        {
          title: "Expert Legal Opinions",
          description:
            "Preparing considered legal opinions to help clients understand their legal position and make informed decisions.",
        },
        { title: "Contract Drafting & Reviewing", description: null },
      ],
      contactId: "bello-aminu-abdullahi",
      peopleIds: ["bello-aminu-abdullahi"],
      experience: [
        {
          id: "cavendish",
          organisation: "Cavendish Petroleum Nigeria Ltd",
          category: "Contract negotiations",
          matter: "Commercial contract negotiations in the oil and gas sector.",
          role: "Provided legal advisory services and represented the company in contract negotiations.",
          services: ["Commercial Advisory", "Contract Negotiation"],
        },
        // The organisation heading is cropped in the supplied reference.
        {
          id: "gas-restructuring",
          organisation: "Gas-company restructuring",
          category: "Contract novation",
          matter:
            "Contractual arrangements connected with a gas-company restructuring.",
          role: "Carried out the novation of contracts and agreements in connection with a company restructuring.",
          services: ["Contract Novation", "Transaction Documentation"],
        },
      ],
    },
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
export const practiceFilters = [
  "All areas",
  "Contentious",
  "Transactional",
  "Advisory",
] as const;
export type PracticeFilter = (typeof practiceFilters)[number];
export function filterPractices(filter: string) {
  return practiceCatalogue.filter(
    (practice) => filter === "All areas" || practice.category === filter,
  );
}
export function getPractice(slug: string) {
  return practiceCatalogue.find((practice) => practice.slug === slug);
}

// Home's approved six-area presentation stays intact; only its destinations map
// to the new catalogue. The broader Capital Markets item leads to the hub.
export const homePracticeDestinations: Record<string, string | null> = {
  "dispute-resolution": "litigation-dispute-resolution",
  "corporate-secretarial": "corporate-governance-compliance-secretarial",
  "capital-markets-commercial": null,
  "energy-natural-resources": "energy-oil-gas",
  "intellectual-property-technology": "intellectual-property-technology",
  "policy-government-advisory": "government-policy-advisory",
};
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
  enquiryAction: "Discuss your matter",
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
  servicesDescription:
    "Explore the services within this practice, then speak with us about the support your matter requires.",
  experienceEyebrow: "Selected experience",
  experienceHeading: "Relevant work. Practical perspective.",
  experienceDescription:
    "A selection of matters showing the work we have undertaken and the legal services involved.",
  peopleHeading: "Our people",
  workingEyebrow: "Working together",
  workingDescription:
    "Our process is adapted to the matter, its complexity and your priorities.",
  sidebarHeading: "In this practice",
  contactHeading: "Your contact",
  contactDescription: "Speak with our team about your matter.",
  overviewHeading: "About this practice",
  homeLabel: "Home",
  hubLabel: "Practice areas",
};

export function getPracticeFilter(value: unknown): PracticeFilter {
  return (
    practiceFilters.find(
      (filter) => filter.toLowerCase() === String(value).toLowerCase(),
    ) ?? "All areas"
  );
}

export function getPracticeSections(practice: Practice) {
  const detail = practice.detail;
  return [
    {
      id: "needs",
      label: detail ? "Your needs" : practiceCopy.overviewHeading,
    },
    ...(detail?.services.length
      ? [{ id: "services", label: practiceCopy.servicesHeading }]
      : []),
    ...(detail?.experience?.length
      ? [{ id: "experience", label: practiceCopy.experienceEyebrow }]
      : []),
    ...(detail?.peopleIds?.length
      ? [{ id: "practice-people", label: practiceCopy.peopleHeading }]
      : []),
    { id: "working-together", label: practiceCopy.workingEyebrow },
    ...(detail?.faqs?.items.length
      ? [{ id: "faqs", label: "Frequently asked questions" }]
      : []),
  ];
}
