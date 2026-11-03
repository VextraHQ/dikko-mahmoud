"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};

/** Native server form first; themed controls enhance it after hydration. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
