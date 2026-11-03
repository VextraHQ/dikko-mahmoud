import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { imagePosition } from "@/lib/insights/article";
import type { InsightImage } from "@/types/insights";

export function ArticleImage({
  image,
  title,
  eager = false,
  sizes,
  className,
}: {
  image: InsightImage | null | undefined;
  title: string;
  eager?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <ImageWithFallback
      src={image?.src}
      alt={image?.alt ?? ""}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={`object-cover ${className ?? ""}`}
      style={{ objectPosition: imagePosition(image) }}
      fallback={<EditorialCover label={title} />}
    />
  );
}
