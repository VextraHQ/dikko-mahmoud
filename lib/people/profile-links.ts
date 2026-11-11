// Per-person contact links. One platform list for the future Sanity schema
// (`options.list`) and for defensive filtering of fetched data, since Studio
// validation can be bypassed by a direct API write. Professional channels only:
// firm-wide social accounts belong in the footer, not on lawyer profiles.
const profileLinkPlatforms = [
  { value: "linkedin", title: "LinkedIn" },
  { value: "email", title: "Email" },
  { value: "phone", title: "Phone" },
  { value: "website", title: "Website" },
] as const;

export type ProfileLinkPlatform =
  (typeof profileLinkPlatforms)[number]["value"];

export type ProfileLink = {
  platform: ProfileLinkPlatform;
  /** URL for linkedin/website, an address for email, a number for phone. */
  value: string;
  /** Optional accessible label override. */
  label?: string;
};

const order = profileLinkPlatforms.map((platform) => platform.value);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{6,}$/;

/** Absolute http(s) URLs only, so a bare domain never becomes a site path. */
function isWebUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      url.hostname.length > 0
    );
  } catch {
    return false;
  }
}

export function isValidProfileLink(link: {
  platform: string;
  value: string;
}): link is ProfileLink {
  const value = link.value.trim();
  switch (link.platform) {
    case "email":
      return emailPattern.test(value);
    case "phone":
      return phonePattern.test(value);
    case "linkedin":
    case "website":
      return isWebUrl(value);
    default:
      return false;
  }
}

/** Valid links only, in a stable platform order, one per platform+value. */
export function normalizeProfileLinks(
  links: readonly { platform: string; value: string; label?: string }[] = [],
): ProfileLink[] {
  const seen = new Set<string>();
  return links
    .filter(isValidProfileLink)
    .filter((link) => {
      const key = `${link.platform}:${link.value.trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => order.indexOf(a.platform) - order.indexOf(b.platform));
}

export function profileLinkHref(link: ProfileLink) {
  const value = link.value.trim();
  if (link.platform === "email") return `mailto:${value}`;
  if (link.platform === "phone") return `tel:${value.replace(/[\s()-]/g, "")}`;
  return value;
}

export function profileLinkLabel(link: ProfileLink, name: string) {
  if (link.label?.trim()) return link.label;
  switch (link.platform) {
    case "linkedin":
      return `${name} on LinkedIn (opens in a new tab)`;
    case "website":
      return `${name}’s website (opens in a new tab)`;
    case "email":
      return `Email ${name} at ${link.value.trim()}`;
    case "phone":
      return `Call ${name} on ${link.value.trim()}`;
  }
}

export function isExternalProfileLink(link: ProfileLink) {
  return link.platform === "linkedin" || link.platform === "website";
}
