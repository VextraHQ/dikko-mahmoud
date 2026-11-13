"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * An office map that loads only when the visitor asks for it. An embedded
 * Google map is heavy, and most visitors only need the address and the
 * directions link beside it.
 */
export function OfficeMap({
  src,
  title,
  showLabel,
  showAction,
}: {
  src: string;
  title: string;
  /** Full label for screen readers, e.g. "Show map of the Abuja office". */
  showLabel: string;
  /** Short visible label, e.g. "Show map". */
  showAction: string;
}) {
  const [shown, setShown] = useState(false);
  const frame = "aspect-16/10 w-full bg-sky-50";

  if (shown)
    return (
      <iframe
        // Focus moves to the map, since the button that had it is gone.
        ref={(node) => node?.focus()}
        title={title}
        src={src}
        referrerPolicy="no-referrer-when-downgrade"
        className={`${frame} border-0`}
      />
    );

  return (
    <button
      type="button"
      aria-label={showLabel}
      onClick={() => setShown(true)}
      className={`${frame} group/map text-primary grid place-items-center transition-colors hover:bg-sky-100 focus-visible:-outline-offset-4`}
    >
      <span className="border-border inline-flex min-h-11 items-center gap-2 rounded-full border bg-white px-4 text-sm font-semibold shadow-xs">
        <MapPin aria-hidden="true" className="size-4" strokeWidth={1.5} />
        {showAction}
      </span>
    </button>
  );
}
