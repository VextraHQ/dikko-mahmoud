import { routes } from "@/lib/routes";

// Availability comes from `launchedRoutes` in lib/routes.ts.
export const navigation = [
  { label: "Home", href: routes.home },
  { label: "The firm", href: routes.firm },
  { label: "Practice areas", href: routes.practiceAreas },
  { label: "People", href: routes.people },
  { label: "Insights", href: routes.insights },
  { label: "Careers", href: routes.careers },
  { label: "Contact", href: routes.contact },
] as const;

export const previewNotice = {
  title: "Our new website is taking shape.",
  description:
    "This page is being prepared. Please check back soon to explore more of Dikko & Mahmoud.",
};
