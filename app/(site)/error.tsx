"use client";

import { ErrorView, type ErrorViewProps } from "@/components/system/error-view";

// A page crashed: the (site) layout survives, so header and footer stay.
export default function SiteError(props: ErrorViewProps) {
  return <ErrorView {...props} />;
}
