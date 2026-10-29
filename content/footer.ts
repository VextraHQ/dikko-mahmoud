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
        { label: "About us", href: "/the-firm" },
        { label: "Our team", href: "/people" },
        { label: "Careers", href: "/careers" },
        { label: "Resources", href: "/insights" },
      ],
    },
    {
      title: "Practice",
      links: [
        {
          label: "Corporate",
          href: "/practice-areas/corporate-secretarial",
          available: false,
        },
        {
          label: "Litigation",
          href: "/practice-areas/dispute-resolution",
          available: false,
        },
        {
          label: "Capital market",
          href: "/practice-areas/capital-markets-commercial",
          available: false,
        },
        {
          label: "Energy",
          href: "/practice-areas/energy-natural-resources",
          available: false,
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy-policy", available: false },
        { label: "Terms of use", href: "/terms-of-use", available: false },
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
