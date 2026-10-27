import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Dikko & Mahmoud — Home"
      className={cn(
        "flex h-15 w-45 shrink-0 items-center rounded-lg p-1.5 xl:h-18.5 xl:w-48",
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
        className="h-full w-full object-contain"
      />
    </Link>
  );
}
