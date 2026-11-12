import { hasText } from "@/lib/content";
import { contact } from "@/content/contact";
import { firmHomePreview } from "@/content/firm";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  media?: { src: string | null; alt: string };
};

export const faqIntro = {
  eyebrow: "Frequently asked questions",
  heading: ["Clarity before", "your next step."],
  description:
    "Practical answers to help you understand our services and start a conversation with the right team.",
  supportHeading: "Still have questions?",
  supportDescription:
    "Can’t find the answer you’re looking for? Contact the firm.",
  supportAction: "Get in touch",
};

// Sanity can later supply this same ordered record shape.
// Avoid unconfirmed fees, turnaround times and engagement promises.
export const faqs: Faq[] = [
  {
    id: "services",
    question: "What legal services does the firm offer?",
    answer:
      "Explore our nine practice areas for the services relevant to your business, institution or individual matter.",
    media: firmHomePreview.media.office,
  },
  {
    id: "enquiry",
    question: "What should I include in my enquiry?",
    answer:
      "A short summary of your matter, the people or organisations involved, any important dates and your preferred contact details are a helpful starting point. You can share an overview first and ask which supporting documents would be useful.",
  },
  {
    id: "practice-area",
    question: "Do I need to know which practice area I need?",
    answer:
      "You can describe what you need help with in your own words. Our practice areas provide a useful starting point if you would like to explore the firm’s services before getting in touch.",
  },
  {
    id: "fees",
    question: "How are legal fees discussed?",
    answer:
      "Fees are best discussed in the context of your particular matter. When making an enquiry, ask about the scope of work, the basis of charging and any anticipated additional costs so you can understand the proposed arrangement.",
  },
  {
    id: "clients",
    question: "Do you work with corporate and institutional clients?",
    answer:
      "Yes. Our practice supports businesses and institutions as well as individuals, with experience across both public and private sectors. Tell us about your organisation and the matter you would like to discuss.",
  },
];

export type FaqIntro = typeof faqIntro;

/** FAQs ready to render (question and answer are both required). */
export function visibleFaqs(items: readonly Faq[]) {
  return items.filter((item) => hasText(item.question) && hasText(item.answer));
}

export const firmFaqIntro: FaqIntro = {
  ...faqIntro,
  heading: ["Get to know", "the firm."],
  description:
    "Our origins, our approach and the people behind more than three decades of legal practice.",
};

// Only the first expanded answer is supplied. The remaining source questions
// stay explicit review slots until the client supplies/approves their answers.
export const firmFaqs: Faq[] = [
  {
    id: "firm-established",
    question: "When was Dikko & Mahmoud established?",
    answer:
      "The firm was founded in 1993 by A.B. Mahmoud and the late A.B. Dikko, former Attorneys General of Kano and Kebbi States respectively. Their public service experience forms part of the foundation of the practice.",
    media: firmHomePreview.media.office,
  },
  {
    id: "firm-principles",
    question: "What principles guide the firm?",
    answer: "Answer awaiting editorial confirmation for this preview.",
  },
  {
    id: "firm-clients",
    question: "Who does the firm advise?",
    answer: "Answer awaiting editorial confirmation for this preview.",
  },
  {
    id: "firm-offices",
    question: "Where does the firm have offices?",
    answer: "Answer awaiting editorial confirmation for this preview.",
  },
  {
    id: "firm-lawyers",
    question: "How can I learn more about your lawyers?",
    answer: "Answer awaiting editorial confirmation for this preview.",
  },
];

export const contactFaqIntro: FaqIntro = {
  ...faqIntro,
  heading: ["Before you", "get in touch."],
  description:
    "A few practical details to help you prepare your enquiry or arrange a visit.",
};

// Drafts from the approved Contact wireframe; the firm still has to approve
// the wording.
export const contactFaqs: Faq[] = [
  {
    id: "contact-include",
    question: "What should I include in my initial enquiry?",
    answer:
      "Share your contact details, a brief summary of your matter, the parties involved and any important dates. Keep confidential documents and sensitive information for a later conversation with our team.",
    media: firmHomePreview.media.office,
  },
  {
    id: "contact-documents",
    question: "Should I send confidential documents through the form?",
    answer:
      "No. Keep documents and sensitive details for a later conversation with the team.",
  },
  {
    id: "contact-meeting",
    question: "How do I arrange an office meeting?",
    answer: "Contact our team to arrange a meeting before your visit.",
  },
  {
    id: "contact-email",
    question: "Can I email the firm directly?",
    answer: `Yes. Send general enquiries to ${contact.email}.`,
  },
  {
    id: "contact-practice",
    question: "Do I need to choose a practice area?",
    answer:
      "No. Choose “A legal matter” and leave the area of law blank if you are unsure. The team will match you with the right practice.",
  },
];
