import { practiceIndex as practiceCatalogue } from "@/content/practice-index";
import { hasText } from "@/lib/content";

export type PracticeArea = {
  id: string;
  title: string;
  /** One line shown under the title when the area is selected. */
  summary: string;
  image: { src: string; alt: string } | null;
};

export const practiceAreasIntro = {
  eyebrow: "Practice areas",
  title: "Our areas of expertise",
  description:
    "Explore the legal services relevant to your business, institution or individual matter.",
  action: "View all practice areas",
  detailAction: "Explore this area",
};

// Home projects the canonical catalogue rather than owning a second list.
export const practiceAreas: PracticeArea[] = practiceCatalogue.map(
  (practice) => ({
    id: practice.slug,
    title: practice.title,
    summary: practice.summary,
    image: practice.image ?? null,
  }),
);

/** Areas ready to render (a title is required). */
export const visiblePracticeAreas = practiceAreas.filter((area) =>
  hasText(area.title),
);
