import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { firmBrand } from "@/content/firm";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  onClick,
}: Pick<ComponentProps<typeof Link>, "className" | "onClick">) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Dikko & Mahmoud — Home"
      className={cn(
        "flex h-15 w-45 shrink-0 items-center rounded-lg py-1.5 xl:h-18.5 xl:w-48",
        className,
      )}
    >
      <ImageWithFallback
        src="/brand/logo-white.png"
        alt="Dikko & Mahmoud, Solicitors and Advocates, established 1993"
        width={900}
        height={303}
        loading="eager"
        sizes="180px"
        className="h-full w-full object-contain object-left"
        fallback={
          <span className="text-white">
            <span className="block font-serif text-xl/6">{firmBrand.name}</span>
            <span className="mt-1 block text-[9px]/3 tracking-wide uppercase">
              {firmBrand.descriptor}
            </span>
          </span>
        }
      />
    </Link>
  );
}
