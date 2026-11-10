"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { defaultInsightView, insightQueryString } from "@/lib/insights/query";
import { routes } from "@/lib/routes";
import type { InsightQuery } from "@/types/insights";

/** URL navigation drives server results. Draft state prevents stale debounce/filter
 * combinations; own URL echoes do not overwrite newer typing. Back/Forward do. */
export function useInsightFilters(query: InsightQuery): {
  draft: InsightQuery;
  pending: boolean;
  update: (patch: Partial<InsightQuery>, typing?: boolean) => void;
  submit: () => void;
  clearQuery: () => void;
  clearFilters: () => void;
} {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState(query);
  const current = useRef(query);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const sent = useRef<string[]>([]);
  const previousQuery = useRef(query);
  const serverKey = insightQueryString(query);
  useEffect(() => {
    const previous = previousQuery.current;
    const changedPage =
      previous.page !== query.page &&
      previous.q === query.q &&
      previous.type === query.type &&
      previous.practice === query.practice &&
      previous.sort === query.sort;
    previousQuery.current = query;
    // Removing/restoring the feature changes the archive's vertical position.
    // Keep the toolbar in view, preserving input focus while typing.
    const changedFeature =
      defaultInsightView(previous) !== defaultInsightView(query);
    if (changedPage || changedFeature) {
      const heading = document.getElementById("insight-archive-heading");
      if (changedPage) heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: "start", behavior: "instant" });
    }
    const own = sent.current.indexOf(serverKey);
    if (own >= 0) {
      sent.current.splice(0, own + 1);
      return;
    }
    clearTimeout(timer.current);
    // External navigation (including Back/Forward) updates the input without
    // remounting it or stealing focus. Own responses keep newer draft typing.
    const frame = requestAnimationFrame(() => {
      current.current = query;
      setDraft(query);
    });
    return () => cancelAnimationFrame(frame);
  }, [serverKey, query]);
  useEffect(() => {
    const onPopState = () => {
      sent.current = [];
      clearTimeout(timer.current);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  function navigate(next: InsightQuery, replace: boolean): void {
    const key = insightQueryString(next);
    sent.current.push(key);
    startTransition(() =>
      router[replace ? "replace" : "push"](`${routes.insights}${key}`, {
        scroll: false,
      }),
    );
  }

  function update(patch: Partial<InsightQuery>, typing = false): void {
    clearTimeout(timer.current);
    const next = { ...current.current, ...patch, page: 1 };
    current.current = next;
    setDraft(next);
    if (typing) timer.current = setTimeout(() => navigate(next, true), 300);
    else navigate(next, false);
  }

  function submit(): void {
    clearTimeout(timer.current);
    navigate(current.current, true);
  }

  function clearQuery(): void {
    update({ q: "" });
    requestAnimationFrame(() =>
      document.getElementById("insights-search")?.focus(),
    );
  }

  function clearFilters(): void {
    update({ q: "", type: "", practice: "" });
    requestAnimationFrame(() =>
      document.getElementById("insights-search")?.focus(),
    );
  }

  return { draft, pending, update, submit, clearQuery, clearFilters };
}
