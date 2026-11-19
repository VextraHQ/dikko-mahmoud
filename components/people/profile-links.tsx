import {
  ArrowUpRight,
  Globe,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { drawnUnderlineClass } from "@/components/layout/site-link";
import { profileCopy } from "@/content/profiles";
import {
  isExternalProfileLink,
  profileLinkHref,
  profileLinkLabel,
  type ProfileLink,
  type ProfileLinkPlatform,
} from "@/lib/people/profile-links";
import { cn } from "@/lib/utils";

const icons = {
  linkedin: FaLinkedinIn,
  email: Mail,
  phone: Phone,
  website: Globe,
} satisfies Record<ProfileLinkPlatform, IconType | LucideIcon>;

/**
 * A person's supplied contact channels as quiet text links ("Email",
 * "LinkedIn") beside the enquiry button, underlined on hover like the
 * footer links. External links carry a small arrow. Renders nothing without
 * links, so no placeholder or dead icon ever appears.
 */
export function ProfileLinks({
  links,
  name,
  label,
  className,
}: {
  links: readonly ProfileLink[];
  name: string;
  label: string;
  className?: string;
}) {
  if (!links.length) return null;
  return (
    <ul
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-x-6", className)}
    >
      {links.map((link) => {
        const Icon = icons[link.platform];
        const external = isExternalProfileLink(link);
        return (
          <li key={`${link.platform}:${link.value}`}>
            <a
              href={profileLinkHref(link)}
              aria-label={profileLinkLabel(link, name)}
              title={external ? undefined : link.value}
              {...(external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="group/underline text-primary focus-visible:ring-ring inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
            >
              <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <span className={drawnUnderlineClass}>
                {profileCopy.linkNames[link.platform]}
              </span>
              {external && (
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
