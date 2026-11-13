"use client";

import { ErrorView, type ErrorViewProps } from "@/components/system/error-view";

// The shared header or footer itself crashed, so render without them.
export default function RootError(props: ErrorViewProps) {
  return <ErrorView {...props} fill />;
}
