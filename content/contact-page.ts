// Contact page copy. Spec: docs/routes/contact.md. The notice, confirmation
// and FAQ wording are drafts until the firm approves them.

export const contactHero = {
  eyebrow: "Contact Dikko & Mahmoud",
  heading: ["Let’s make law work.", "Start with a conversation."],
  description:
    "Tell us what you need help with. Our team will help identify the appropriate next step.",
  // Temporary: The Firm photo until the photoshoot.
  image: { src: "/images/firm/the-firm-hero.png", alt: "" },
};

export const contactPanel = {
  heading: "Contact our team",
  emailLabel: "General enquiries",
  copy: "Copy",
  copied: "Email address copied",
  copyFailed: "Couldn’t copy the email address",
  copyFailedHint: "Select the address and copy it instead.",
  officeLabel: (city: string) => `${city} office`,
  hoursLabel: "Office hours",
  presenceLabel: "Our presence",
  socialHeading: "Social media",
  beforeHeading: "Before you send",
  beforeText:
    "Please share a brief overview. Keep confidential documents and sensitive details for a later conversation with our team.",
};

export const enquiryReasons = [
  {
    id: "legal",
    label: "A legal matter",
    note: "Advice or help with an issue",
    messageLabel: "Brief summary of your matter",
    placeholder: "A short overview of the matter and any relevant timing.",
  },
  {
    id: "partnership",
    label: "A partnership or referral",
    note: "Working with the firm",
    messageLabel: "About the partnership",
    placeholder: "Tell us about your organisation and what you have in mind.",
  },
  {
    id: "media",
    label: "Media or speaking",
    note: "Press, interviews or events",
    messageLabel: "About your request",
    placeholder: "Your outlet or event, the topic, and any deadline.",
  },
  {
    id: "other",
    label: "Something else",
    note: "Any other question",
    messageLabel: "Your message",
    placeholder: "How can we help?",
  },
] as const;

export type EnquiryReasonId = (typeof enquiryReasons)[number]["id"];

/** The copy for a reason; the legal wording until one is chosen. */
export function reasonCopy(id: string) {
  return enquiryReasons.find((reason) => reason.id === id) ?? enquiryReasons[0];
}

/** Reasons where the sender's organisation matters most. */
export const organisationRecommendedFor: readonly EnquiryReasonId[] = [
  "partnership",
  "media",
];

export const enquiryForm = {
  heading: "Need legal expertise? Let’s talk.",
  intro: "Tell us what brings you here and how to reach you.",
  requiredNote: "Fields marked * are required.",
  arrival: (practice: string) =>
    `You came from ${practice}. We picked it for you; you can change it.`,
  reasonLegend: "What brings you to us?",
  reasonPlaceholder: "Choose one",
  practiceLegend: "Which area of law?",
  practicePlaceholder: "Not sure / leave to the team",
  practiceHint:
    "Not sure? Leave this blank and the team will match you with the right practice.",
  clearChoice: "Clear choice",
  optional: "(optional)",
  recommended: "(recommended)",
  topic: {
    label: "What is it about?",
    placeholder: "A few words, e.g. a document request",
  },
  name: { label: "Full name", placeholder: "Enter your full name" },
  email: { label: "Email address", placeholder: "Enter your email address" },
  phone: {
    label: "Phone number",
    placeholder: "Include your country code, e.g. +234",
  },
  organisation: {
    label: "Organisation",
    placeholder: "Company or institution",
  },
  messageHint:
    "Please keep confidential information, documents and detailed evidence for a later conversation.",
  notice:
    "By sending, you acknowledge our privacy policy. Sending an enquiry does not create a lawyer–client relationship.",
  privacyLink: "privacy policy",
  send: "Send enquiry",
  sending: "Sending…",
  failedHeading: "We couldn’t send your enquiry.",
  failedText: "Your details are still here. Try again, or email",
  retry: "Try again",
  // Shown instead of the form after a preview submission.
  received: {
    heading: "Enquiry received",
    previewBadge: "Preview only: nothing was sent",
    thanks: (firstName: string) =>
      `Thank you, ${firstName}. On the live site this confirms your enquiry reached the firm.`,
    about: "About",
    topic: "Topic",
    practice: "Area of law",
    practiceNone: "Left to the team",
    email: "Email",
    message: "Message",
    nextHeading: "What happens next.",
    nextText:
      // Draft: no reply promise until the firm confirms its process.
      "The team will review your enquiry and get in touch if we can help. For anything urgent, call one of our offices.",
    again: "Send another enquiry",
    toast: "Enquiry received (preview)",
  },
};

export const contactOffices = {
  heading: "Find us. Let’s talk.",
  description:
    "Abuja, Kano and our Lagos liaison office. Contact our team to arrange a meeting before your visit.",
  officeLabel: "Office",
  directions: "Get directions",
  mapTitle: (city: string) => `Map of the ${city} office`,
  showMap: "Show map",
  showMapLabel: (city: string) => `Show map of the ${city} office`,
};
