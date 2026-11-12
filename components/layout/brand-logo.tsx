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
    className: "group-data-[tone=light]/site-header:opacity-0",
  },
  {
    src: "/brand/navy-logo.png",
    width: 352,
    height: 116,
    className: "opacity-0 group-data-[tone=light]/site-header:opacity-100",
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
        "grid h-15 w-45 shrink-0 grid-rows-1 items-center rounded-lg py-1.5 xl:h-18.5 xl:w-48",
        className,
      )}
    >
      {/* Both files stack in one grid cell and crossfade with the header
          tone. The link's label names the firm, so the images are decorative. */}
      {logos.map((logo) => (
        <span
          key={logo.src}
          className={cn(
            "ease-editorial col-start-1 row-start-1 h-full w-full transition-opacity duration-400 motion-reduce:transition-none",
            logo.className,
          )}
        >
          <ImageWithFallback
            src={logo.src}
            alt=""
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
