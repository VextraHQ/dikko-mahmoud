import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import type { Person } from "@/content/people";
import { cn } from "@/lib/utils";

/** Portrait with the initials fallback used until approved photographs exist. */
export function ProfilePortrait({
  person,
  sizes,
  className,
}: {
  person: Person;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-xl bg-slate-200",
        className,
      )}
    >
      <ImageWithFallback
        src={person.portrait?.src}
        alt={person.portrait?.alt ?? ""}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: person.portrait?.position ?? "top" }}
        fallback={
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-white to-slate-100"
          >
            <span className="text-primary/65 font-serif text-6xl">
              {person.initials}
            </span>
          </span>
        }
      />
    </div>
  );
}
