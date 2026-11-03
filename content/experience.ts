// SERVER ONLY: instruction bodies awaiting publication approval. Render them
// through resolveExperience (lib/experience.ts), never from a client module.

export const experienceCopy = {
  title: "Selected matters",
  heading: ["Experience where", "the stakes are high."],
  introduction:
    "Explore selected disputes and advisory instructions entrusted to Dikko & Mahmoud, and take a closer look at our role in each matter.",
  listingHeading: "A closer look at our work.",
  action: "Explore experience",
  previewNote:
    "Visual preview · named experience and descriptions await publication approval.",
  qualification:
    "These summaries describe representative experience. The nature and scope of every instruction are considered individually.",
  home: "Home",
  instructionsEyebrow: "Selected instructions",
  instructionsHeading: "Our involvement.",
  glance: "At a glance",
  role: "Our role",
  practices: "Related practices",
  suggestedPractices: "Suggested practice links · for review",
  back: "Back to selected matters",
} as const;

type Instruction = { title: string; description: string; role: string };
export type ExperienceRecord = {
  matterId: string;
  category: string;
  summary: string;
  involvement: string;
  instructions: readonly Instruction[];
  practiceSlugs: readonly string[];
  claim?: { value: string; label: string; qualification: string };
};

// Supplied firm brochure, PDF pages 18–21. Separate instructions are not
// merged into a single case or presented as successful outcomes.
export const experienceRecords: readonly ExperienceRecord[] = [
  {
    matterId: "bureau-public-enterprises",
    category: "International arbitration & project advisory",
    summary:
      "Selected arbitration and advisory instructions involving the Bureau of Public Enterprises.",
    involvement: "Lead counsel and legal advisory work",
    instructions: [
      {
        title: "UNCITRAL arbitration",
        description:
          "The Managing Partner acted as lead counsel for the Federal Government of Nigeria / Bureau of Public Enterprises in a UNCITRAL arbitration involving a claim of $1.37bn.",
        role: "Managing Partner · lead counsel",
      },
      {
        title: "Enron Power Project, Lagos",
        description:
          "The firm advised the Bureau of Public Enterprises on the Enron Power Project and reviewed the power purchase agreement and other transaction documents.",
        role: "Firm · legal advisory and document review",
      },
    ],
    claim: {
      value: "$1.37bn",
      label: "Arbitration claim value",
      qualification: "Claim value, not an award or recovery.",
    },
    practiceSlugs: [
      "litigation-dispute-resolution",
      "projects-joint-ventures-finance",
    ],
  },
  {
    matterId: "central-bank-nigeria",
    category: "Public-sector advisory",
    summary:
      "Legal advice concerning revenue due to the Federal Government under oil-industry Production Sharing Contracts.",
    involvement: "Legal advisers",
    instructions: [
      {
        title: "Revenue under Production Sharing Contracts",
        description:
          "The firm advised the Central Bank of Nigeria on revenue due to the Federal Government of Nigeria under Production Sharing Contracts in the oil industry.",
        role: "Firm · legal advisers to CBN",
      },
    ],
    practiceSlugs: ["government-policy-advisory", "energy-oil-gas"],
  },
  {
    matterId: "kano-state-government",
    category: "Settlement & government advisory",
    summary:
      "Separate instructions concerning settlement negotiations and electricity-sector privatisation.",
    involvement: "Counsel in negotiations and disputes",
    instructions: [
      {
        title: "Pfizer Trovan clinical trial",
        description:
          "The firm acted as counsel to the Kano State Government in negotiation and mediation for the settlement of affected individuals in the Pfizer Trovan clinical trial.",
        role: "Firm · counsel in negotiation and mediation",
      },
      {
        title: "Kano Electricity Distribution Company",
        description:
          "The firm represented the Kano State Government in disputes and negotiations concerning the privatisation of the Kano Electricity Distribution Company.",
        role: "Firm · representation in disputes and negotiations",
      },
    ],
    practiceSlugs: [
      "litigation-dispute-resolution",
      "government-policy-advisory",
    ],
  },
  {
    matterId: "nnpc-npdc",
    category: "Energy & commercial contracts",
    summary:
      "Separate instructions concerning OML 12 and gas-sector contract novation.",
    involvement: "Representation and contract novation",
    instructions: [
      {
        title: "OML 12",
        description:
          "The firm represented NNPC and NPDC in a matter concerning the resizing and reallocation of OML 12.",
        role: "Firm · representation",
      },
      {
        title: "Gas-sector contract novation",
        description:
          "The firm carried out the novation of contracts and agreements of Nigerian Gas Production & Transportation Company Ltd in connection with a company spin-out within the NNPCL group.",
        role: "Firm · contract novation",
      },
    ],
    practiceSlugs: ["energy-oil-gas", "corporate-commercial-advisory"],
  },
];
