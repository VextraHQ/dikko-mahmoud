import { cn } from "@/lib/utils";

/**
 * The stand-in shown until an approved photograph exists: initials on the same
 * soft slate wash everywhere, so cards, profiles and features match.
 * `className` sizes the initials or adds hover motion; `initialsClassName`
 * overrides the default size.
 */
export function PortraitFallback({
  initials,
  className,
  initialsClassName = "text-4xl sm:text-5xl",
}: {
  initials: string;
  className?: string;
  initialsClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-2 text-center",
        className,
      )}
    >
      <span className={cn("text-primary/65 font-serif", initialsClassName)}>
        {initials}
      </span>
    </span>
  );
}
