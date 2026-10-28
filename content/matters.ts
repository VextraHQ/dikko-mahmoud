export type SelectedMatter = {
  id: string;
  category: string;
  organisation: string;
  topic: string;
  summary: string;
  qualifier: string;
};

// User-approved preview copy, drawn from the screenshots and the firm's
// published experience: https://dikkoandmahmoud.com/experiences/
export const selectedMatters = {
  eyebrow: "Selected matters",
  heading: ["Experience where", "the stakes are high."],
  description:
    "Explore a selection of disputes and advisory matters entrusted to our firm. Select a matter to read more.",
  action: "Explore our experience",
  selectorLabel: "Explore our selected matters",
  featureLabel: "Selected matter",
  defaultId: "bureau-public-enterprises",
};

export const matterRecords: SelectedMatter[] = [
  {
    id: "bureau-public-enterprises",
    category: "International arbitration",
    organisation: "Bureau of Public Enterprises",
    topic: "Telecommunications arbitration",
    summary:
      "The managing partner acted as lead counsel for the Federal Government and BPE in a telecommunications-related UNCITRAL arbitration.",
    qualifier: "Representative experience · arbitration",
  },
  {
    id: "central-bank-nigeria",
    category: "Public-sector advisory",
    organisation: "Central Bank of Nigeria",
    topic: "Federal Government revenue",
    summary:
      "Legal advisers on Federal Government revenue under oil-industry Production Sharing Contracts.",
    qualifier: "Representative experience · advisory",
  },
  {
    id: "kano-state-government",
    category: "Settlement & government advisory",
    organisation: "Kano State Government",
    topic: "Clinical-trial settlement",
    summary:
      "Represented the Kano State Government in negotiation and mediation concerning settlements arising from the Trovan clinical trial.",
    qualifier: "Representative experience · negotiation and mediation",
  },
  {
    id: "nnpc-npdc",
    category: "Energy-sector advisory",
    organisation: "NNPC / NPDC",
    topic: "Petroleum-interest transfer",
    summary:
      "Advised the Central Bank of Nigeria on the transfer of NNPC’s interests to the Nigerian Petroleum Development Company.",
    qualifier: "Representative experience · advisory",
  },
];
