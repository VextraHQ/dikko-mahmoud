import {
  practiceIndex,
  practiceCopy,
  type PracticeSummary,
} from "@/content/practice-index";
export { practiceCopy } from "@/content/practice-index";
import { hasText } from "@/lib/content";
import { approvedRecords, type PublicationStatus } from "@/lib/publication";
import type { Faq } from "@/content/faqs";

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
    publicationStatus: PublicationStatus;
    organisation: string;
    category: string;
    matter: string;
    role: string;
    services: string[];
  }[];
  faqs?: { heading: string[]; description: string; items: Faq[] };
};
export type Practice = PracticeSummary & { detail?: PracticeDetail };

// Nine titles/categories/summaries supplied in the 30 Oct design screenshots.
// Detail copy is intentionally optional; do not fabricate the other eight pages.
const corporateDetail: PracticeDetail = {
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
      publicationStatus: "pending",
      organisation: "Cavendish Petroleum Nigeria Ltd",
      category: "Contract negotiations",
      matter: "Commercial contract negotiations in the oil and gas sector.",
      role: "Provided legal advisory services and represented the company in contract negotiations.",
      services: ["Commercial Advisory", "Contract Negotiation"],
    },
    // Full organisation name supplied in the brochure, PDF page 20; consent pending.
    {
      id: "gas-restructuring",
      publicationStatus: "pending",
      organisation: "Nigerian Gas Production & Transportation Company Ltd",
      category: "Contract novation",
      matter:
        "Contractual arrangements connected with a gas company restructuring.",
      role: "Carried out the novation of contracts and agreements in connection with a company restructuring.",
      services: ["Contract Novation", "Transaction Documentation"],
    },
  ],
};
export const practiceCatalogue: Practice[] = practiceIndex.map((practice) => ({
  ...practice,
  detail:
    practice.slug === "corporate-commercial-advisory"
      ? corporateDetail
      : undefined,
}));

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

export function getPracticeFilter(value: unknown): PracticeFilter {
  return (
    practiceFilters.find(
      (filter) => filter.toLowerCase() === String(value).toLowerCase(),
    ) ?? "All areas"
  );
}

type ExperienceOptions = { includePending?: boolean };

export function getPracticeSections(
  practice: Practice,
  options?: ExperienceOptions,
) {
  const detail = practice.detail;
  return [
    {
      id: "needs",
      label: detail ? practiceCopy.needsEyebrow : practiceCopy.overviewHeading,
    },
    ...(detail?.services.length
      ? [{ id: "services", label: practiceCopy.servicesLabel }]
      : []),
    ...(getPracticeExperience(practice, options).length
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

/** Pending records may be explicitly previewed; withheld records never render. */
export function getPracticeExperience(
  practice: Practice,
  { includePending = false }: ExperienceOptions = {},
) {
  const records = practice.detail?.experience ?? [];
  const visible = includePending
    ? records.filter(
        (item) =>
          item.publicationStatus === "approved" ||
          item.publicationStatus === "pending",
      )
    : approvedRecords(records);
  return visible.filter(
    (item) =>
      hasText(item.organisation) && hasText(item.matter) && hasText(item.role),
  );
}
