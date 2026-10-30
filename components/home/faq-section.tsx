import { FaqSection as SharedFaqSection } from "@/components/shared/faq-section";
import { faqs, faqIntro, type Faq } from "@/content/faqs";

export function FaqSection({ items = faqs }: { items?: readonly Faq[] } = {}) {
  return <SharedFaqSection items={items} intro={faqIntro} />;
}
