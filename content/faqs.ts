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
