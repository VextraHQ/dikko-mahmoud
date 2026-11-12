import type { FaqIntro, Faq } from "@/content/faqs";

export const insightsCopy = {
  series: "Dikko & Mahmoud Legal Insights Series",
  heading: ["Ideas. Context.", "A clearer perspective."],
  description:
    "Explore perspectives on business, disputes and the changing legal landscape, with context to help you ask informed questions.",
  archiveHeading: "Explore our insights.",
  searchLabel: "Search insights",
  searchPlaceholder: "Search by topic or keyword",
  searchAction: "Search",
  clearSearch: "Clear search",
  clearFilters: "Clear filters",
  typeLabel: "Type",
  practiceLabel: "Practice area",
  sortLabel: "Sort by",
  allTypes: "All types",
  allPractices: "All practice areas",
  newest: "Newest first",
  oldest: "Oldest first",
  readArticle: "Read article",
  featured: "Featured",
  minRead: "min read",
  updating: "Updating insights…",
  count: (count: number) => `${count} ${count === 1 ? "insight" : "insights"}`,
  showing: (from: number, to: number, total: number) =>
    `Showing ${from}–${to} of ${total} insights`,
  previous: "Previous",
  next: "Next",
  pagination: "Insights pagination",
  closeOptions: "Close options",
  emptyTitle: "Insights will appear here.",
  emptyDescription:
    "Explore our practice areas or contact the firm while we prepare our publications.",
  noMatches: "No insights match your search.",
  noMatchesDescription:
    "Try a different topic or clear your filters to explore all insights.",
  home: "Home",
  hub: "Insights",
  contents: "In this article",
  expertise: "Related expertise",
  references: "References",
  sources: "Sources & further reading",
  back: "Back to all insights",
  articleTop: "Back to article top",
  relatedEyebrow: "Further reading",
  relatedHeading: "Explore related articles.",
  relatedDescription:
    "More perspectives on business, disputes and the changing legal landscape.",
  allInsights: "Explore all insights",
  share: "Share article",
  print: "Print article",
  copied: "Article link copied",
  copy: "Copy article link",
  copyFailed: "Couldn’t copy the link",
  copyFailedHint: "Select and copy the address shown below instead.",
  shareFailed: "Couldn’t open sharing",
  manualCopy: "Article address",
  nativeShare: "Share via another app",
  shareLinkedIn: "Share on LinkedIn",
  shareX: "Share on X",
  shareWhatsApp: "Share on WhatsApp",
  shareButton: "Share",
  filters: "Filters",
  showResults: (count: number) =>
    `Show ${count} ${count === 1 ? "insight" : "insights"}`,
  shareEnd: "Share this article",
  revised: "Revised",
  practiceStrip: {
    eyebrow: "Insights",
    heading: (practice: string) => `Latest on ${practice}`,
    all: "All insights in this area",
  },
  notFound: {
    eyebrow: "404 · Article not found",
    title: "We couldn’t find that article.",
    description:
      "It may have been moved or retired, or the link may be incomplete. Browse the archive or start with one of our latest insights.",
    browse: "Browse all insights",
    home: "Return home",
    latest: "Latest insights",
  },
  disclaimer:
    "This article is for general information only and does not constitute legal advice. The appropriate approach will depend on your circumstances and the law and regulatory requirements applicable at the time.",
};

export const insightsFaqIntro: FaqIntro = {
  eyebrow: "Frequently asked questions",
  heading: ["Understanding our", "legal insights."],
  description:
    "Helpful answers about our publications, their relevance to your needs and how to discuss an issue with our team.",
  supportHeading: "Still have questions?",
  supportDescription:
    "Can’t find the answer you’re looking for? Contact the firm.",
  supportAction: "Contact the firm",
};

export const insightsFaqs: Faq[] = [
  {
    id: "insight-context",
    question:
      "Can an insight help me assess a legal issue affecting my business?",
    answer:
      "Our publications introduce issues and considerations that may be relevant to your business. Their application depends on the facts, documents and circumstances of your matter. Contact the firm to discuss the questions raised by a publication.",
    media: {
      src: "/images/insights/working-papers.jpg",
      alt: "Working papers on a desk",
    },
  },
  {
    id: "specific-advice",
    question: "Do these publications replace advice on a specific matter?",
    answer:
      "No. Publications provide general information. Advice on a particular matter requires an understanding of its facts and circumstances.",
  },
  {
    id: "older-insights",
    question: "How should I approach an older publication?",
    answer:
      "Check its publication and revision dates and the sources it cites. Laws and circumstances can change; contact the firm if you need guidance on a current matter.",
  },
  {
    id: "practice-experience",
    question: "Where can I learn about the firm’s practice areas?",
    answer:
      "The Practice areas section introduces our nine areas of practice and the services within each.",
  },
  {
    id: "discuss-publication",
    question: "How can I discuss an issue raised in a publication?",
    answer:
      "Contact the firm with a short outline of your question and the title or link of the publication you have been reading.",
  },
];
