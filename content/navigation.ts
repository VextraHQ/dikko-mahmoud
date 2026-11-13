import { routes } from "@/lib/routes";

type NavigationItem = {
  label: string;
  mobileLabel?: string;
  href: string;
};

// Availability comes from `launchedRoutes` in lib/routes.ts.
export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: routes.home },
  // Selected matters (built) and Careers (not built yet) are left out of the
  // menus until the firm consents and they are ready. Re-add their links here
  // and in the footer.
  { label: "The firm", href: routes.firm },
  { label: "Practice areas", href: routes.practiceAreas },
  { label: "Our People", href: routes.people },
  { label: "Insights", href: routes.insights },
  { label: "Contact", mobileLabel: "Contact us", href: routes.contact },
];

/**
 * The header's button. On the Contact page "Make an enquiry" would link to
 * the page the visitor is on, so it offers the way home instead.
 */
export const headerAction = {
  enquiry: { label: "Make an enquiry", href: routes.contact },
  home: { label: "Back to homepage", href: routes.home },
};

// Mobile menu sign-off; the cities come from the canonical contact offices.
export const mobileMenuFooter = {
  eyebrow: "Our offices",
};

export const previewNotice = {
  title: "Our new website is taking shape.",
  description:
    "This page is being prepared. Please check back soon to explore more of Dikko & Mahmoud.",
};
