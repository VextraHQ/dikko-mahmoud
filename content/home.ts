// Verbatim copy from the supplied Figma hero component's five slide records.
// Original image fills were recovered from the native Figma local-copy export.
const sourceHeroSlides = [
  {
    id: "dispute-resolution",
    practice: "Dispute resolution",
    title: ["Clarity in", "complexity."],
    description:
      "Clear advice and determined representation when a dispute puts your business, reputation or interests at stake.",
    image: "/images/hero/dispute-resolution.png",
    darkenImage: true,
  },
  {
    id: "corporate-secretarial",
    practice: "Corporate & secretarial",
    title: ["Counsel for", "business."],
    description:
      "Practical legal support for the decisions, structures and obligations that keep your organisation moving forward.",
    image: "/images/hero/corporate-secretarial.png",
    darkenImage: true,
  },
  {
    id: "capital-markets-commercial",
    practice: "Capital markets & commercial",
    title: ["Confidence in", "transactions."],
    description:
      "Commercially informed advice to help you assess risk, structure agreements and pursue opportunities with confidence.",
    image: "/images/hero/capital-markets-commercial.png",
    darkenImage: true,
  },
  {
    id: "energy-natural-resources",
    practice: "Energy & natural resources",
    title: ["Supporting", "our power"],
    description:
      "Legal guidance for projects, investment and regulatory questions across the energy and natural resources sectors.",
    image: "/images/hero/energy-natural-resources.png",
    darkenImage: false,
  },
  {
    id: "policy-government-advisory",
    practice: "Policy & government advisory",
    title: ["Insight that", "shapes policy."],
    description:
      "Grounded legal analysis for public institutions and organisations navigating policy, regulation and government.",
    image: "/images/hero/policy-government-advisory.png",
    darkenImage: true,
  },
] as const;
export const heroSlides = sourceHeroSlides.filter(
  (slide) => slide.practice.trim() && slide.title.some((line) => line.trim()),
);
export const heroAction = "Explore our expertise";
