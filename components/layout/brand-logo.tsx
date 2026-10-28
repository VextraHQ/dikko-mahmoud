import Image from "next/image";
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
      <Image
        src="/brand/logo-white.png"
        alt="Dikko & Mahmoud, Solicitors and Advocates, established 1993"
        width={900}
        height={303}
        loading="eager"
        sizes="180px"
        className="h-full w-full object-contain object-left"
      />
    </Link>
  );
}
