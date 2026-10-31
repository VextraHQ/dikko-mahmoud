import { routes } from "@/lib/routes";

export type SocialPlatform = "facebook" | "linkedin" | "instagram" | "x";

type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string | null;
};

export const footer = {
  description:
    "A full service Nigerian law firm advising clients from Abuja and Kano since 1993.",
  officesHeading: "Offices",
  socialHeading: "Follow us",
  contactHeading: "Speak with our team",
  consultationAction: "Book a consultation",
  locations: "Abuja · Kano · Lagos liaison",
  linkGroups: [
    {
      title: "Firm",
      links: [
        { label: "About us", href: routes.firm },
        { label: "Our team", href: routes.people },
        { label: "Careers", href: routes.careers },
        { label: "Resources", href: routes.insights },
      ],
    },
    {
      title: "Practice",
      links: [
        {
          label: "Corporate",
          href: routes.practiceArea("corporate-secretarial"),
        },
        {
          label: "Litigation",
          href: routes.practiceArea("dispute-resolution"),
        },
        {
          label: "Capital market",
          href: routes.practiceArea("capital-markets-commercial"),
        },
        {
          label: "Energy",
          href: routes.practiceArea("energy-natural-resources"),
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: routes.privacy },
        { label: "Terms of use", href: routes.terms },
      ],
    },
  ],
  // The screenshots establish platforms, but provide no approved profile URLs.
  socialLinks: [
    { label: "Facebook", platform: "facebook", href: null },
    { label: "LinkedIn", platform: "linkedin", href: null },
    { label: "Instagram", platform: "instagram", href: null },
    { label: "X (formerly Twitter)", platform: "x", href: null },
  ] as SocialLink[],
};
