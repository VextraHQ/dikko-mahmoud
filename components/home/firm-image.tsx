import { EditorialCover } from "@/components/shared/editorial-cover";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { firmBrand } from "@/content/firm";

export function FirmImage({
  media,
  kind,
}: {
  media: { src: string | null; alt: string; initials?: string };
  kind: "office" | "portrait";
}) {
  return (
    <ImageWithFallback
      src={media.src}
      alt={media.alt}
      fill
      sizes={
        kind === "office"
          ? "(min-width: 1280px) 44vw, (min-width: 768px) 90vw, 100vw"
          : "(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
      }
      className="object-cover"
      fallback={
        kind === "office" ? (
          <EditorialCover label={firmBrand.name} />
        ) : (
          <span
            aria-hidden="true"
            className="text-primary/55 absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-300 pb-16 font-serif text-7xl"
          >
            {media.initials ?? firmBrand.initials}
          </span>
        )
      }
    />
  );
}
