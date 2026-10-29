import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import type { SocialPlatform } from "@/content/footer";
import { cn } from "@/lib/utils";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
} satisfies Record<SocialPlatform, typeof FaFacebookF>;

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = socialIcons[platform];
  return (
    <Icon
      aria-hidden="true"
      focusable="false"
      className={cn("size-4", className)}
    />
  );
}
