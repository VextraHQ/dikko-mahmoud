import { routes } from "@/lib/routes";

type NavigationItem = {
  label: string;
  mobileLabel?: string;
  href: string;
};

// Availability comes from `launchedRoutes` in lib/routes.ts.
export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: routes.home },
  { label: "The firm", href: routes.firm },
  { label: "Practice areas", href: routes.practiceAreas },
  { label: "Our People", href: routes.people },
  { label: "Insights", href: routes.insights },
  { label: "Careers", href: routes.careers },
  { label: "Contact", mobileLabel: "Contact us", href: routes.contact },
];

// Mobile menu sign-off; the cities come from the canonical contact offices.
export const mobileMenuFooter = {
  eyebrow: "Our offices",
};

export const previewNotice = {
  title: "Our new website is taking shape.",
  description:
    "This page is being prepared. Please check back soon to explore more of Dikko & Mahmoud.",
};
