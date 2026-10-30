import { requirePerson } from "@/content/people";

const founder = requirePerson("ab-mahmoud");

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
  person: { name: founder.name, role: founder.founderRole ?? founder.role },
  action: "Discover our story",
  media: {
    office: {
      src: null as string | null,
      alt: "",
    },
    portrait: {
      src: founder.portrait?.src ?? null,
      alt: founder.portrait?.alt ?? "",
      initials: founder.initials,
    },
  },
} as const;

// Concept images and replacement portraits are not approved publication media.
export const firmHero = {
  eyebrow: "About the firm · Since 1993",
  heading: ["Built on experience.", "Guided by principles."],
  description:
    "A full-service Nigerian law firm bringing experience, perspective and personal commitment to the decisions that matter.",
  poster: { src: "/images/firm/the-firm-hero.png", alt: "hero image" },
} as const;

export const firmStory = {
  eyebrow: "Our story",
  heading: ["A firm built for", "decisions that matter."],
  // Retained source wording; repeated opening and the pronoun need editorial review.
  paragraphs: [
    "For more than three decades, Dikko & Mahmoud has advised businesses, institutions and individuals through decisions that matter.",
    "Their experience as Attorneys General of Kano and Kebbi States respectively informed the firm’s foundation: a practice with an understanding of public institutions and the legal questions facing private clients.",
    "For more than three decades, we have advised businesses, institutions and individuals. That experience continues to shape a full-service practice combining local knowledge with an international outlook.",
  ],
} as const;

export const journeyIntro = {
  eyebrow: "Our journey · Since 1993",
  heading: "Our story, through the years.",
  description:
    "Built on public service. Shaped by people. Explore the moments that continue to define Dikko & Mahmoud.",
  pagingHint: "Select a year to explore",
  pendingCopy: "This milestone’s story is awaiting editorial confirmation.",
  pendingMedia: "Milestone media and caption awaiting confirmation",
};

export type FirmMilestone = {
  id: string;
  year: string;
  title: string;
  description: string | null;
  personId?: string;
  personMilestoneYear?: string;
  media?: { src: string; alt: string };
  caption?: { title: string; description: string };
};
export const firmJourney: FirmMilestone[] = [
  {
    id: "founding",
    year: "1993",
    title: "Our story begins.",
    description:
      "A.B. Mahmoud and the late A.B. Dikko founded the firm, bringing their experience as Attorneys General of Kano and Kebbi States into private practice.",
    personId: "ab-mahmoud",
  },
  {
    id: "distinction",
    year: "2001",
    title: "A mark of distinction.",
    description: null,
    personId: "ab-mahmoud",
    personMilestoneYear: "2001",
  },
  {
    id: "leadership",
    year: "2016",
    title: "Leadership beyond the firm.",
    description: null,
    personId: "ab-mahmoud",
    personMilestoneYear: "2016",
  },
  {
    id: "next-generation",
    year: "2021",
    title: "The next generation of leadership.",
    description: null,
  },
  {
    id: "today",
    year: "Today",
    title: "Built on experience. Looking ahead.",
    description: null,
  },
];

export const coreValues = {
  eyebrow: "Our core values",
  heading: ["Experience that", "works for you."],
  description:
    "Transparency, accountability, efficiency and professionalism guide the way we work. Our mission is to deliver innovative legal services informed by international best practice.",
  action: "Make an enquiry",
  items: [
    {
      title: "Transparency",
      description:
        "A clear understanding of your needs, our advice and the progress of your engagement.",
    },
    {
      title: "Accountability",
      description:
        "A collaborative approach that keeps your nominated team involved in the delivery of the work.",
    },
    {
      title: "Efficiency",
      description:
        "Traditional legal expertise supported by technology and practical, cost-conscious ways of working.",
    },
    {
      title: "Professionalism",
      description:
        "Legal service grounded in professional standards, sound judgment and respect for client confidence.",
    },
  ],
};

export const workingWithUs = {
  eyebrow: "Working with us",
  heading: ["From the first brief", "to final delivery."],
  introduction: "A considered process, shaped around your matter.",
  description:
    "We work with your nominated team to understand the brief, develop the strategy and communicate delivery. Your information is held in confidence, subject to your authorisation and legal obligations.",
  action: "Make an enquiry",
  steps: [
    {
      label: "Begin",
      title: "Your brief",
      description:
        "Engagement, instructions and an initial briefing to understand what you need.",
    },
    {
      label: "Understand",
      title: "Gather the facts",
      description:
        "Collect the documents, data and background relevant to your matter.",
    },
    {
      label: "Consider",
      title: "Develop the strategy",
      description: "Analyse the information and identify a legal approach.",
    },
    {
      label: "Align",
      title: "Discuss the advice",
      description:
        "Present our legal opinion and proposed strategy before the work proceeds.",
    },
    {
      label: "Deliver",
      title: "Put the plan to work",
      description: "Execute the agreed work, involving your nominated team.",
    },
    {
      label: "Complete",
      title: "Close the engagement",
      description:
        "Conclude the engagement with you and bring the work to a clear close.",
    },
  ],
};

export const firmPeople = {
  eyebrow: "The people behind the practice",
  heading: ["Founded on experience.", "Led with purpose."],
  founderId: "ab-mahmoud",
  closing:
    "Alongside our partners and wider team, that experience supports a multidisciplinary approach to complex legal questions.",
  assignmentNote:
    "Advisory group selections are awaiting confirmation. These preview slots do not represent named lawyers or confirmed group membership.",
  pendingPerson: "Selection pending",
  pendingRole: "Advisory team preview",
};
export const firmPresence = {
  eyebrow: "Our presence",
  heading: ["Rooted in Nigeria.", "A wider outlook."],
  description:
    "Our practice works across offices in Abuja and Kano, with a liaison office in Lagos. Connect with the firm through the location most relevant to your enquiry.",
  media: { src: "/images/firm/our-presence.png", alt: "our presence" },
} as const;
