import type { ProfileLink } from "@/lib/people/profile-links";

// SERVER ONLY. Import from route pages, server components and tests; never from
// lib/routes.ts, navigation or a "use client" module, so draft biographies stay
// out of client bundles. Availability comes from content/profile-manifest.ts;
// the selection rules (resolveProfile and friends) live in lib/people/profiles.ts.
//
// Drafted from the firm's company profile brochure (PDF pp. 27–30) and the
// profile of A.B. Mahmoud the client supplied. Uncertain items are left out
// here and listed in content/people-review.ts for firm confirmation.
export type PersonProfile = {
  personId: string;
  fullName: string;
  /** How the page addresses them, e.g. "Enquire about Bello". */
  shortName?: string;
  postnominals?: readonly string[];
  summary?: string;
  biography: readonly string[];
  qualifications?: readonly string[];
  focus?: readonly string[];
  /**
   * Supplied personal contact links only (LinkedIn, email, phone, website).
   * Never inferred; without an email the profile offers the firm enquiry.
   * Shape matches the future Sanity `links[]` field; see lib/people/profile-links.ts.
   */
  links?: readonly ProfileLink[];
};

export const profileCopy = {
  reviewNote:
    "Preview profile. Prepared from the firm’s company profile and awaiting confirmation by Dikko & Mahmoud before publication.",
  homeLabel: "Home",
  peopleLabel: "Our People",
  contentsLabel: "On this page",
  overviewLabel: "Overview",
  milestonesLabel: "Career milestones",
  overviewHeading: ["Experience. Perspective.", "Personal commitment."],
  focusLabel: "Areas of focus",
  qualificationsLabel: "Qualifications & memberships",
  qualificationsShortLabel: "Qualifications",
  workingEyebrow: "Working together",
  workingWith: (name: string) => `Working with ${name}`,
  contactHeading: "Start with a conversation.",
  contactDescription:
    "Share a brief overview of your matter and any relevant timing. The firm will coordinate the appropriate next step with your nominated team.",
  enquireAbout: (name: string) => `Enquire about ${name}`,
  directEmail: (name: string) => `Or email ${name} directly:`,
  contactLinksLabel: (name: string) => `Contact ${name}`,
  morePeopleHeading: "Meet more of our people",
  /** Plain strings only: passed to the client dialog shell. */
  dialog: {
    close: "Close profile",
    copyLink: "Copy link to this profile",
    copiedLink: "Link copied",
    copyFailed: "Couldn’t copy the link",
    copyFailedHint: "Copy it from your browser’s address bar instead.",
    openPage: "Open full profile page",
  },
  unavailableTitle: "This profile isn’t available.",
};

/** Raw bodies. Render through resolveProfile (lib/people/profiles.ts). */
export const profiles: readonly PersonProfile[] = [
  {
    personId: "ab-mahmoud",
    fullName: "Abubakar Balarabe Mahmoud",
    shortName: "A.B. Mahmoud",
    postnominals: ["SAN", "OON", "FCIArb (UK)"],
    summary:
      "Public service experience. A wider perspective on legal practice.",
    biography: [
      "Abubakar Balarabe Mahmoud co-founded Dikko & Mahmoud in 1993 after a career at the Kano State Ministry of Justice, where he rose from State Counsel to Attorney General and Commissioner for Justice.",
      "His practice includes advocacy, transactions and arbitration. He was elevated to Senior Advocate of Nigeria in 2001 and elected the 33rd President of the Nigerian Bar Association in 2016.",
      "His professional experience includes corporate governance and public policy, alongside engagement with civil society, academia and public-interest organisations.",
      "He has served on the boards of the Institute of Advanced Legal Studies and the Centre for Democratic Research and Training (Mambayya House), Bayero University Kano, and chaired the national committee that reviewed Nigeria’s Code of Corporate Governance for public companies.",
      "He served two terms as Pro-Chancellor and Chairman of the Governing Council of Kano State University of Science and Technology, now Aliko Dangote University. A former member of the Governing Council of the Nigerian Stock Exchange, he became Chairman of the Board of Nigerian Exchange Ltd (NGX) following demutualisation in 2022.",
      "He is a life member of the Body of Benchers and holds the national honour of Officer of the Order of the Niger (OON).",
    ],
    qualifications: [
      "LL.B and LL.M · Ahmadu Bello University, Zaria",
      "Fellow · Chartered Institute of Arbitrators, UK",
      "Diploma in Sociology · Oñati Institute, Spain",
      "Training in privatisation · Harvard University",
      "Law and Development · International Development Law Institute, Rome",
      "Corporate Law and Business · Northwestern University",
      "Senior Fellow · Nigeria Leadership Initiative",
    ],
    focus: [
      "Dispute resolution & arbitration",
      "Corporate governance",
      "Public policy & government advisory",
    ],
    links: [{ platform: "email", value: "abmahmoud@dikkoandmahmoud.com" }],
  },
  {
    personId: "bello-aminu-abdullahi",
    fullName: "Bello Aminu Abdullahi",
    shortName: "Bello",
    summary:
      "Commercial perspective shaped by private practice and in-house legal experience.",
    biography: [
      "Bello Aminu Abdullahi was called to the Nigerian Bar in 1988 and has worked in public, corporate and private legal practice since then.",
      "His experience includes serving as company secretary and legal adviser to private and public limited companies in the financial, manufacturing and aviation sectors. He analyses an organisation’s legal and regulatory requirements, identifies gaps and develops practical, cost-effective ways to manage legal risk and strengthen corporate governance.",
      "His knowledge extends to arbitration, taxation, pensions, securities and investment regulation, and board and company secretarial services.",
    ],
    qualifications: [
      "LL.B · Ahmadu Bello University, Zaria",
      "MBA · Bayero University Kano",
      "Member · Nigerian Bar Association",
      "Member · Chartered Institute of Arbitrators, UK",
      "Member · Institute of Chartered Secretaries and Administrators of Nigeria",
      "Member · Chartered Institute of Taxation of Nigeria",
      "Member · Chartered Institute of Directors",
      "Member · Institute of Management (Chartered)",
    ],
    focus: [
      "Corporate & commercial",
      "Corporate governance & company secretarial",
      "Arbitration",
      "Securities & investment regulation",
    ],
  },
  {
    personId: "aminu-sadauki",
    fullName: "Aminu Sadauki",
    shortName: "Aminu",
    postnominals: ["MCIArb"],
    summary: "Litigation experience across trial and appellate courts.",
    biography: [
      "Aminu Sadauki heads the Litigation Department at Dikko & Mahmoud.",
      "He has been involved in some of the firm’s major litigation and appears regularly before the courts, including the appellate courts.",
    ],
    qualifications: ["Member · Chartered Institute of Arbitrators"],
    focus: ["Litigation", "Appellate advocacy"],
  },
  {
    personId: "sefiullahi-oseni",
    fullName: "Sefiullahi Oseni",
    shortName: "Sefiullahi",
    postnominals: ["MCIArb"],
    summary: "Commercial litigation and advisory practice from Kano.",
    biography: [
      "Sefiullahi Oseni heads the commercial litigation practice of the firm’s Kano office. He joined Dikko & Mahmoud in 2010 and became a partner in 2021.",
      "In practice he has handled matters relating to intellectual property rights, debt recovery, tax, election petitions, matrimonial causes, land disputes, judgment enforcement, labour matters and general litigation.",
      "He advises on diverse areas of Nigerian law, including power and mining, licensing, labour and employment, real estate and land-related disputes, and insurance. He litigates at trial and appellate levels and represents clients before government agencies, legislative bodies, panels of investigation and law enforcement.",
    ],
    qualifications: ["Member · Chartered Institute of Arbitrators"],
    focus: [
      "Commercial litigation",
      "Intellectual property",
      "Debt recovery & judgment enforcement",
      "Labour & employment",
      "Power, mining & licensing",
    ],
  },
];
