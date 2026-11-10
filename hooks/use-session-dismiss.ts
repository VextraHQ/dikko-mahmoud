"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
// Also kept in memory, so dismissing works even when storage is blocked.
const dismissedKeys = new Set<string>();

function read(key: string): boolean {
  if (dismissedKeys.has(key)) return true;
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

/**
 * Remembers that something was dismissed for this browser tab's session.
 * Reports "dismissed" on the server, so the item appears only after
 * hydration and never flashes in for someone who already closed it.
 */
export function useSessionDismiss(key: string): {
  dismissed: boolean;
  dismiss: () => void;
} {
  const dismissed = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => read(key),
    () => true,
  );

  function dismiss(): void {
    dismissedKeys.add(key);
    try {
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked: the in-memory flag hides it until the page reloads.
    }
    listeners.forEach((listener) => listener());
  }

  return { dismissed, dismiss };
}
