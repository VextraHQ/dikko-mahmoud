"use client";

import type { CSSProperties } from "react";
import {
  CircleAlert,
  CircleCheck,
  Info,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * The site's one toast region (shadcn `sonner` wrapper, as in iproduce-africa),
 * themed to the firm: white surface, slate hairline, navy text and icons, the
 * site font and a soft navy shadow. Sonner injects unlayered CSS that outranks
 * Tailwind utilities, so the theme goes through its CSS variables and inline
 * styles rather than classes. No rich colours: status shows in the icon only.
 *
 * Call `toast.success(...)` / `toast.error(...)` from "sonner" in client code.
 * Inside a modal Radix dialog the region is hidden from assistive technology,
 * so dialogs keep their own `role="status"` text and use toasts as the visual.
 */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      offset={24}
      mobileOffset={16}
      gap={10}
      icons={{
        success: <CircleCheck className="text-primary size-4.5" />,
        info: <Info className="text-primary size-4.5" />,
        warning: <TriangleAlert className="size-4.5 text-amber-700" />,
        error: <CircleAlert className="text-destructive size-4.5" />,
        loading: (
          <LoaderCircle className="text-primary size-4.5 motion-safe:animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "0.75rem",
          "--width": "380px",
          fontFamily: "var(--font-sans)",
        } as CSSProperties
      }
      toastOptions={{
        style: {
          padding: "0.875rem 1rem",
          gap: "0.625rem",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          boxShadow:
            "0 16px 32px -12px rgb(6 26 46 / 0.22), 0 2px 6px rgb(6 26 46 / 0.06)",
        },
        classNames: {
          title: "font-semibold!",
          description: "text-muted-foreground! text-[13px]/5!",
        },
      }}
      {...props}
    />
  );
}
