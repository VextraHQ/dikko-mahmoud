import { Building2, UserRound } from "lucide-react";
import Image from "next/image";

export function FirmImage({
  media,
  kind,
}: {
  media: { src: string | null; alt: string; placeholder: string };
  kind: "office" | "portrait";
}) {
  if (media.src)
    return (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={
          kind === "office"
            ? "(min-width: 1280px) 44vw, (min-width: 768px) 90vw, 100vw"
            : "(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
        }
        className="object-cover"
      />
    );
  const Icon = kind === "office" ? Building2 : UserRound;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-300">
      <Icon
        aria-hidden="true"
        strokeWidth={0.8}
        className="text-primary/20 size-24 -translate-y-6"
      />
      <span className="text-primary absolute top-4 left-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs/5 font-medium">
        {media.placeholder}
      </span>
    </div>
  );
}
