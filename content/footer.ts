import { practiceIndex as practiceCatalogue } from "@/content/practice-index";
import { contact } from "@/content/contact";
import { routes } from "@/lib/routes";

export type SocialPlatform = "facebook" | "linkedin" | "instagram" | "x";

type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string | null;
};

export const footer = {
  description:
    "A full-service Nigerian law firm advising clients from Abuja and Kano since 1993.",
  officesHeading: "Offices",
  directions: "Directions",
  directionsTo: (city: string) => `to the ${city} office (opens Google Maps)`,
  socialHeading: "Follow us",
  contactHeading: "Speak with our team",
  consultationAction: "Contact the firm",
  locations: contact.officeSummary,
  linkGroups: [
    {
      title: "Firm",
      links: [
        { label: "The firm", href: routes.firm },
        { label: "Our People", href: routes.people },
        { label: "Selected matters", href: routes.experience },
        { label: "Careers", href: routes.careers },
        // The client's full series name; the header shortens it to "Insights".
        { label: "Legal Insights Series", href: routes.insights },
        { label: "SME retainer", href: routes.smeRetainer },
      ],
    },
    {
      title: "Practice areas",
      // Long names: on mobile this group runs full width below Firm and Legal.
      wide: true,
      links: practiceCatalogue.map((practice) => ({
        label: practice.title,
        href: routes.practiceArea(practice.slug),
      })),
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: routes.privacy },
        { label: "Terms of use", href: routes.terms },
      ],
    },
  ],
  socialLinks: [
    { label: "Facebook", platform: "facebook", href: null },
    { label: "LinkedIn", platform: "linkedin", href: null },
    { label: "Instagram", platform: "instagram", href: null },
    { label: "X (formerly Twitter)", platform: "x", href: null },
  ] as SocialLink[],
};
