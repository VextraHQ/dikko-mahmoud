"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function ClientLogoMarquee({
  children,
  note,
  animate = true,
}: {
  children: ReactNode;
  note?: string;
  animate?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element || !animate) return;
    element.dataset.motionReady = "true";
    return () => {
      delete element.dataset.motionReady;
    };
  }, [animate]);
  return (
    <div ref={root} className="client-logo-marquee mt-8" data-paused={paused}>
      {(note || animate) && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          {note && <p className="text-muted-foreground text-xs/5">{note}</p>}
          <div data-motion-controls className="motion-reduce:hidden">
            <Button
              variant="muted"
              onClick={() => setPaused((current) => !current)}
              className="text-sm"
              aria-label={paused ? "Play logo movement" : "Pause logo movement"}
            >
              {paused ? (
                <Play className="size-4" />
              ) : (
                <Pause className="size-4" />
              )}
              {paused ? "Play motion" : "Pause motion"}
            </Button>
          </div>
        </div>
      )}
      <div className="client-logo-window relative overflow-hidden">
        {children}
        <div
          data-marquee-edge
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r to-transparent sm:w-24"
        />
        <div
          data-marquee-edge
          aria-hidden="true"
          className="from-background pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l to-transparent sm:w-24"
        />
      </div>
    </div>
  );
}
