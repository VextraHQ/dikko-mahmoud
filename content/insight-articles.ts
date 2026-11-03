import type {
  InsightImage,
  InsightSource,
  InsightType,
} from "@/types/insights";

// SERVER DATA: user-authorised layout samples, not commissioned firm
// publications. The repository excludes every demoOnly record at launch.
// Article bodies live in content/insight-bodies.ts.

/** Unsplash photographs, credited separately from their alt text. */
function unsplash(
  file: string,
  alt: string,
  size: [number, number],
  credit: string,
  photoId: string,
  focalPoint = { x: 0.5, y: 0.5 },
): InsightImage {
  return {
    src: `/images/insights/${file}.jpg`,
    alt,
    width: size[0],
    height: size[1],
    credit: `${credit} / Unsplash`,
    sourceUrl: `https://unsplash.com/photos/${photoId}`,
    focalPoint,
  };
}

export const insightImages = {
  papers: unsplash(
    "working-papers",
    "A pencil and working papers beside a laptop on a desk",
    [1800, 1201],
    "Scott Graham",
    "5fNmWej4tAA",
    { x: 0.5, y: 0.48 },
  ),
  lagos: unsplash(
    "lagos",
    "Civic Towers and surrounding buildings in Lekki, Lagos",
    [1800, 3200],
    "Nupo Deyon Daniel",
    "9ySEZ-ugtJA",
    { x: 0.52, y: 0.42 },
  ),
  library: unsplash(
    "research-library",
    "Books arranged on wooden shelves in a library",
    [1800, 1200],
    "Courtney Baucom",
    "7CRHpP9j53U",
  ),
  signingDocument: unsplash(
    "signing-document",
    "A hand signing a printed agreement with a pen",
    [1800, 2688],
    "Jakub Żerdzicki",
    "QI6NLgN5XnM",
    { x: 0.5, y: 0.55 },
  ),
  documentReview: unsplash(
    "document-review",
    "Two people reviewing paperwork at a conference table",
    [1800, 1200],
    "Olena Kholina",
    "MhqUBTxQ3Hw",
  ),
  handshake: unsplash(
    "handshake",
    "Two people shaking hands across an office table",
    [1800, 1200],
    "Sebastian Herrmann",
    "NbtIDoFKGO8",
  ),
  lekkiAerial: unsplash(
    "lekki-aerial",
    "Aerial view of Civic Towers and Lekki, Lagos",
    [1800, 1012],
    "Nupo Deyon Daniel",
    "67ruAEYmp4c",
  ),
  lekkiBridge: unsplash(
    "lekki-ikoyi-bridge",
    "The Lekki–Ikoyi Link Bridge over the lagoon in Lagos",
    [1800, 2507],
    "Tunde Buremo",
    "kF0-RhpHhRA",
    { x: 0.5, y: 0.45 },
  ),
  victoriaIsland: unsplash(
    "victoria-island",
    "Boats crossing the lagoon beside Victoria Island, Lagos",
    [1800, 1350],
    "Malik Buraimoh",
    "EMjpo0YjHPw",
  ),
  pumpJack: unsplash(
    "pump-jack",
    "An oil pump jack silhouetted against a red sunset",
    [1800, 1231],
    "Zbynek Burival",
    "GrmwVnVSSdU",
    { x: 0.45, y: 0.6 },
  ),
  refinery: unsplash(
    "refinery",
    "Storage tanks and pipework at an industrial refinery",
    [1800, 1200],
    "Red Shuheart",
    "Wb4vcBqyGT8",
  ),
  boardroom: unsplash(
    "boardroom",
    "An empty boardroom with a long wooden table and chairs",
    [1800, 1200],
    "Benjamin Child",
    "GWe0dlVD9e0",
  ),
  meetingRoom: unsplash(
    "meeting-room",
    "A modern meeting room with a long table and screens",
    [1800, 1200],
    "Aakriti Raina",
    "HRsi-QzS3zw",
  ),
  solarField: unsplash(
    "solar-field",
    "Rows of solar panels on a green field",
    [1800, 1198],
    "American Public Power Association",
    "513dBrMJ_5w",
  ),
  gavel: unsplash(
    "gavel",
    "A wooden gavel resting on a table",
    [1800, 1200],
    "Wesley Tingey",
    "TdNLjGXVH3s",
  ),
  propertyKeys: unsplash(
    "property-keys",
    "A hand holding house keys above miniature model houses",
    [1800, 1201],
    "Jakub Żerdzicki",
    "t0CRdNl_mTg",
  ),
  serverRack: unsplash(
    "server-rack",
    "A rack of servers in a data room",
    [1800, 1200],
    "Kevin Ache",
    "2JJ3wBHu4_0",
  ),
  cranes: unsplash(
    "cranes",
    "Construction cranes above buildings at sunrise",
    [1800, 1202],
    "EJ Yao",
    "D46mXLsQRJw",
  ),
} satisfies Record<string, InsightImage>;

export const demoInsightAuthors = [
  { id: "sample-contributor", name: "Sample contributor" },
  { id: "sample-coauthor", name: "Sample co-author" },
];

export const insightSelection = {
  featuredId: "patent-registration-nigeria",
  homeIds: [
    "corporate-decisions",
    "dispute-strategy",
    "energy-projects",
    "technology-ip",
  ],
};

type Seed = {
  id: string;
  title: string;
  excerpt: string;
  /** Canonical practice slug, or null for firm news with no practice. */
  practice: string | null;
  image: keyof typeof insightImages | null;
  type?: InsightType;
};

// Newest first. Nothing here assigns a real partner to a practice.
const seeds: Seed[] = [
  {
    id: "patent-registration-nigeria",
    title: "Patent registration in Nigeria",
    excerpt:
      "A reading sample about organising the questions, documents and sources behind an introduction to patents.",
    practice: "intellectual-property-technology",
    image: "papers",
  },
  {
    id: "corporate-decisions",
    title: "Navigating corporate decisions in a changing market",
    excerpt:
      "A perspective on the legal considerations shaping corporate and commercial decisions.",
    practice: "corporate-commercial-advisory",
    image: "boardroom",
  },
  {
    id: "dispute-strategy",
    title: "Resolving disputes with a clear strategy",
    excerpt:
      "Preparing a useful chronology, organising the documents and identifying the questions that need attention.",
    practice: "litigation-dispute-resolution",
    image: "gavel",
  },
  {
    id: "energy-projects",
    title: "A legal perspective on energy projects",
    excerpt:
      "Organising the commercial, operational and documentation questions around an energy project.",
    practice: "energy-oil-gas",
    image: "pumpJack",
  },
  {
    id: "technology-ip",
    title: "Technology & intellectual property",
    excerpt:
      "A starting point for discussions about ideas, ownership and the records that support a technology business.",
    practice: "intellectual-property-technology",
    image: "serverRack",
  },
  {
    id: "board-meeting-preparation",
    title: "Preparing for a board meeting",
    excerpt:
      "A practical reading note on agendas, supporting papers and recording the questions that matter.",
    practice: "corporate-governance-compliance-secretarial",
    image: "meetingRoom",
  },
  {
    id: "transaction-document-review",
    title: "Making sense of transaction documents",
    excerpt:
      "An editorial sample about keeping a clear record of documents, assumptions and unanswered questions.",
    practice: "mergers-acquisitions-due-diligence",
    image: "documentReview",
  },
  {
    id: "project-documentation",
    title: "A clearer view of project documentation",
    excerpt:
      "Following a project from the first outline to a structured set of working documents.",
    practice: "projects-joint-ventures-finance",
    image: "cranes",
  },
  {
    id: "property-document-checklist",
    title: "Organising a property document review",
    excerpt:
      "Bringing documents and practical questions together before a detailed discussion.",
    practice: "real-estate-asset-protection",
    image: "propertyKeys",
  },
  {
    id: "policy-reading-notes",
    title: "Reading a policy update with context",
    excerpt:
      "Separating the source material, its date and the questions it raises for an organisation.",
    practice: "government-policy-advisory",
    image: "lekkiAerial",
  },
  {
    id: "commercial-agreement-notes",
    title: "Before the first draft of a commercial agreement",
    excerpt:
      "A structured note on the purpose, participants and working assumptions behind an agreement.",
    practice: "corporate-commercial-advisory",
    image: "signingDocument",
  },
  {
    id: "case-chronology",
    title: "Building a useful case chronology",
    excerpt:
      "A sample case-note layout showing how dates, events and supporting records can be organised.",
    practice: "litigation-dispute-resolution",
    image: "library",
  },
  {
    id: "energy-contract-records",
    title: "Keeping energy contract records connected",
    excerpt:
      "Following the relationships between project documents without losing their individual context.",
    practice: "energy-oil-gas",
    image: "refinery",
  },
  {
    id: "ip-record-keeping",
    title: "Keeping a record of an idea",
    excerpt:
      "A reading sample on organising descriptions, working versions and questions about intellectual property.",
    practice: "intellectual-property-technology",
    image: "papers",
  },
  {
    id: "governance-calendar",
    title: "A working calendar for governance discussions",
    excerpt:
      "Keeping meeting dates, decisions and document requests visible to the people involved.",
    practice: "corporate-governance-compliance-secretarial",
    image: "boardroom",
  },
  {
    id: "due-diligence-questions",
    title: "Asking better due diligence questions",
    excerpt:
      "Turning a broad review into a clear and traceable set of questions.",
    practice: "mergers-acquisitions-due-diligence",
    image: "documentReview",
  },
  {
    id: "joint-venture-preparation",
    title: "Preparing for a joint venture discussion",
    excerpt:
      "Setting out objectives, responsibilities and the information still to be gathered.",
    practice: "projects-joint-ventures-finance",
    image: "handshake",
  },
  {
    id: "property-records",
    title: "Connecting the records behind a property matter",
    excerpt:
      "A concise sample about document history and the questions a first conversation can reveal.",
    practice: "real-estate-asset-protection",
    image: "victoriaIsland",
  },
  {
    id: "public-policy-sources",
    title: "Finding the source behind a policy discussion",
    excerpt:
      "An editorial note on following references and distinguishing original material from commentary.",
    practice: "government-policy-advisory",
    image: "lagos",
  },
  {
    id: "commercial-review-notes",
    title: "Writing a clearer commercial review note",
    excerpt:
      "Keeping the question, the supporting material and the next action in one place.",
    practice: "corporate-commercial-advisory",
    image: "meetingRoom",
  },
  {
    id: "dispute-document-bundle",
    title: "Making a document bundle easier to navigate",
    excerpt:
      "A case-note sample about clear naming, useful cross-references and readable summaries.",
    practice: "litigation-dispute-resolution",
    image: "library",
  },
  {
    id: "energy-project-questions",
    title: "Questions at the start of an energy project",
    excerpt:
      "A short reading sample about preparing an informed project conversation.",
    practice: "energy-oil-gas",
    image: "solarField",
  },
  {
    id: "technology-collaboration",
    title: "Documenting a technology collaboration",
    excerpt:
      "Capturing the purpose, materials and open questions of a collaborative project.",
    practice: "intellectual-property-technology",
    image: "serverRack",
  },
  {
    id: "board-paper-structure",
    title: "What makes a board paper easier to read?",
    excerpt:
      "A sample about clear structure, supporting information and the decision being discussed.",
    practice: "corporate-governance-compliance-secretarial",
    image: "signingDocument",
  },
  {
    id: "transaction-data-room",
    title: "Giving a transaction data room a clear structure",
    excerpt:
      "Organising a growing collection of documents around a consistent index.",
    practice: "mergers-acquisitions-due-diligence",
    image: "papers",
  },
  {
    id: "project-information-flow",
    title: "Keeping project information in view",
    excerpt:
      "Following questions and document versions as a project conversation develops.",
    practice: "projects-joint-ventures-finance",
    image: "lekkiBridge",
  },
  {
    id: "introducing-legal-insights-series",
    title: "Introducing the Legal Insights Series",
    excerpt:
      "Why we are publishing short, practical reading on business, disputes and regulation, and what to expect from the series.",
    type: "firm-news",
    practice: null,
    image: null,
  },
];

const rotation: InsightType[] = ["article", "case-note", "regulatory-update"];

export const demoInsightIndex: InsightSource[] = seeds.map((seed, index) => ({
  id: seed.id,
  title: seed.title,
  excerpt: seed.excerpt,
  type: seed.type ?? rotation[index % 3],
  practiceIds: seed.practice ? [seed.practice] : [],
  authorIds:
    index === 0
      ? ["sample-contributor", "sample-coauthor"]
      : ["sample-contributor"],
  publishedAt: new Date(Date.UTC(2026, 8, 15 - index, 9)).toISOString(),
  image: seed.image ? insightImages[seed.image] : null,
  ...(index === 1 ? { revisedAt: "2026-09-17T09:00:00.000Z" } : {}),
  keywords: [seed.title, seed.practice ?? ""].filter(Boolean),
  demoOnly: true,
}));
