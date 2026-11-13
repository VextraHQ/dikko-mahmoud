import { practiceIndex } from "@/content/practice-index";

// Hero headlines and images come from the client's Figma file. Practice labels
// come from the shared practice index.
const sourceHeroSlides = [
  {
    id: "dispute-resolution",
    practiceSlug: "litigation-dispute-resolution",
    title: ["Clarity in", "complexity."],
    description:
      "Clear advice and determined representation when a dispute puts your business, reputation or interests at stake.",
    image: "/images/hero/dispute-resolution.png",
    darkenImage: true,
  },
  {
    id: "corporate-secretarial",
    practiceSlug: "corporate-governance-compliance-secretarial",
    title: ["Counsel for", "business."],
    description:
      "Practical legal support for the decisions, structures and obligations that keep your organisation moving forward.",
    image: "/images/hero/corporate-secretarial.png",
    darkenImage: true,
  },
  {
    id: "capital-markets-commercial",
    practiceSlug: null,
    title: ["Confidence in", "transactions."],
    description:
      "Commercially informed advice to help you assess risk, structure agreements and pursue opportunities with confidence.",
    image: "/images/hero/capital-markets-commercial.png",
    darkenImage: true,
  },
  {
    id: "energy-natural-resources",
    practiceSlug: "energy-oil-gas",
    title: ["Supporting", "our power"],
    description:
      "Legal guidance for projects, investment and regulatory questions across the energy and natural resources sectors.",
    image: "/images/hero/energy-natural-resources.png",
    darkenImage: false,
  },
  {
    id: "policy-government-advisory",
    practiceSlug: "government-policy-advisory",
    title: ["Insight that", "shapes policy."],
    description:
      "Grounded legal analysis for public institutions and organisations navigating policy, regulation and government.",
    image: "/images/hero/policy-government-advisory.png",
    darkenImage: true,
  },
] as const;

// The transaction slide keeps a generic label until Capital Markets placement is confirmed.
export const heroSlides = sourceHeroSlides
  .map((slide) => ({
    ...slide,
    practice:
      practiceIndex.find((practice) => practice.slug === slide.practiceSlug)
        ?.title ?? "Our expertise",
  }))
  .filter((slide) => slide.title.some((line) => line.trim()));

export const heroAction = "Explore our expertise";

/** Time each hero slide stays before autoplay advances, in ms. */
export const heroAutoplayDelay = 7000;
