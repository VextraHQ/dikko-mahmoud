import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { firmBrand } from "@/content/firm";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

const logos = [
  {
    src: "/brand/logo-white.png",
    width: 900,
    height: 303,
    className: "block group-data-[tone=light]/site-header:hidden",
  },
  {
    src: "/brand/navy-logo.png",
    width: 352,
    height: 116,
    className: "hidden group-data-[tone=light]/site-header:block",
  },
];

export function BrandLogo({
  className,
  onClick,
}: Pick<ComponentProps<typeof Link>, "className" | "onClick">) {
  return (
    <Link
      href={routes.home}
      onClick={onClick}
      aria-label="Dikko & Mahmoud — Home"
      className={cn(
        "flex h-15 w-45 shrink-0 items-center rounded-lg py-1.5 xl:h-18.5 xl:w-48",
        className,
      )}
    >
      {/* The header tone picks the file; the hidden one leaves the a11y tree. */}
      {logos.map((logo) => (
        <span key={logo.src} className={cn("h-full w-full", logo.className)}>
          <ImageWithFallback
            src={logo.src}
            alt="Dikko & Mahmoud, Solicitors and Advocates, established 1993"
            width={logo.width}
            height={logo.height}
            loading="eager"
            sizes="180px"
            className="h-full w-full object-contain object-left"
            fallback={
              <span className="group-data-[tone=light]/site-header:text-primary text-white">
                <span className="block font-serif text-xl/6">
                  {firmBrand.name}
                </span>
                <span className="mt-1 block text-[9px]/3 tracking-wide uppercase">
                  {firmBrand.descriptor}
                </span>
              </span>
            }
          />
        </span>
      ))}
    </Link>
  );
}
