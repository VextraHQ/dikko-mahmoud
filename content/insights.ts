import { insightsCopy } from "@/content/insight-copy";
import { getPerson } from "@/content/people";

export const insightsHome = {
  eyebrow: "Legal Insights Series",
  // Same two lines as the Insights page hero, so both read as one series.
  heading: insightsCopy.heading,
  description:
    "Explore ideas on business, disputes and the changing legal landscape.",
  action: "Explore all insights",
  featuredLabel: "Featured perspective",
};

/** Finds an article's author in the People records. */
export function getInsightAuthor(article: { authorId?: string | null }) {
  return article.authorId ? getPerson(article.authorId) : undefined;
}

export const insightAuthorPending = "Author awaiting firm confirmation";
