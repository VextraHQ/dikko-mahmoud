import { cn } from "@/lib/utils";
import { firmBrand } from "@/content/firm";

// Decorative typography, not substitute photography. Content/geometry belong
// to the surrounding card, including its accessible name and reserved crop.
export function EditorialCover({
  label,
  mark = firmBrand.initials,
  markClassName,
}: {
  label?: string;
  mark?: string;
  markClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="from-primary via-secondary to-navy-deep absolute inset-0 overflow-hidden bg-linear-135 text-white"
    >
      <span className="absolute -top-12 -right-24 size-96 rounded-full border border-white/10" />
      <span className="absolute -top-4 -right-16 size-80 rounded-full border border-white/10" />
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center pb-24 font-serif text-8xl text-white/15 sm:text-9xl",
          markClassName,
        )}
      >
        {mark}
      </span>
      {label && (
        <span className="absolute top-6 left-6 max-w-[70%] text-[10px]/5 font-semibold tracking-widest text-white/70 uppercase">
          {label}
        </span>
      )}
    </span>
  );
}
