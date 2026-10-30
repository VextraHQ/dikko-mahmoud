"use client";

import { useEffect, useRef } from "react";

/** Calls `onChange` whenever the query starts or stops matching. */
export function useMediaQueryChange(
  query: string,
  onChange: (matches: boolean) => void,
) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const list = window.matchMedia(query);
    const handle = () => onChangeRef.current(list.matches);
    list.addEventListener("change", handle);
    return () => list.removeEventListener("change", handle);
  }, [query]);
}
