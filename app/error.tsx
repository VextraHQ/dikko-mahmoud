"use client";

import { ErrorView, type ErrorViewProps } from "@/components/shared/error-view";

// The shared header or footer itself crashed, so render without them.
export default function RootError(props: ErrorViewProps) {
  return <ErrorView {...props} />;
}
