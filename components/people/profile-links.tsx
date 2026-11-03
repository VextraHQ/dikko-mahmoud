import { Globe, Mail, Phone, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
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
 * Round icon links for a person's supplied contact channels. Renders nothing
 * without links, so no placeholder or dead icon ever appears.
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
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
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
              className="text-primary border-border hover:border-primary/30 focus-visible:ring-ring flex size-11 items-center justify-center rounded-full border bg-white transition-colors hover:bg-sky-50 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
            >
              <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
