"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type ImageWithFallbackProps = Omit<ImageProps, "src" | "onError" | "onLoad"> & {
  src: string | null | undefined;
  fallback: ReactNode;
};

// The section reserves space and supplies its own server-rendered fallback.
// A changed URL gets a fresh attempt without an effect or a retry loop.
export function ImageWithFallback({
  src,
  alt,
  fallback,
  ...props
}: ImageWithFallbackProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!src?.trim() || failedSource === src) return fallback;
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setFailedSource(src)}
      onLoad={() => setFailedSource(null)}
    />
  );
}
