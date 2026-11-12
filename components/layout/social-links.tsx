import { PreviewDestination } from "@/components/layout/preview-destination";
import { SocialIcon } from "@/components/layout/social-icon";
import { footer } from "@/content/footer";
import { cn } from "@/lib/utils";

/**
 * The firm's social profiles as round icon links. Profiles without a
 * confirmed address show the "being prepared" notice instead. Used by the
 * footer and the Contact panel; `itemClassName` sets the circle's colours.
 */
export function SocialLinks({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName?: string;
}) {
  const item = cn(
    "flex size-11 items-center justify-center rounded-full text-sm font-bold transition-colors",
    itemClassName,
  );
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {footer.socialLinks.map((social) => (
        <li key={social.label}>
          {social.href ? (
            <a href={social.href} aria-label={social.label} className={item}>
              <SocialIcon platform={social.platform} />
            </a>
          ) : (
            <PreviewDestination>
              <button
                type="button"
                aria-label={`${social.label} — profile being prepared`}
                className={item}
              >
                <SocialIcon platform={social.platform} />
              </button>
            </PreviewDestination>
          )}
        </li>
      ))}
    </ul>
  );
}
