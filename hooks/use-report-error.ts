"use client";

import { useEffect } from "react";

/**
 * Logs a caught render error in development. Production reporting is a later
 * decision: forward `error.digest` here once a monitoring tool is chosen.
 */
export function useReportError(error: Error & { digest?: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[error boundary]", error);
    }
  }, [error]);
}
