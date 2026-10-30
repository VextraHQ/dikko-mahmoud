import { hasText } from "@/lib/content";
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
    "Can’t find the answer you’re looking for? Please chat to our friendly team.",
  supportAction: "Get in touch",
};

// Unsplash stock portraits (free licence) as decorative placeholders. They are
// deliberately not tied to named team members; swap for approved photos later.
export const faqSupportAvatars = [
  { id: "stock-01", src: "/images/stock/team-01.jpg" },
  { id: "stock-02", src: "/images/stock/team-02.jpg" },
  { id: "stock-03", src: "/images/stock/team-03.jpg" },
] as const;

// The first answer follows the screenshot; the user authorized practical starter
// copy for the others. Sanity can later supply this same ordered record shape.
// Avoid unconfirmed fees, turnaround times and engagement promises.
export const faqs: Faq[] = [
  {
    id: "services",
    question: "What legal services does the firm offer?",
    answer:
      "Our multidisciplinary practice advises businesses, institutions and individuals on disputes, corporate and commercial matters, capital markets, energy and resources, and policy and government matters.",
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
