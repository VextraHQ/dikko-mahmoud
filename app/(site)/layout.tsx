import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";

// `profile` is the parallel slot for intercepted /people/[slug] overlays. It is
// null everywhere else, so an overlay never outlives its route.
export default function SiteLayout({
  children,
  profile,
}: {
  children: ReactNode;
  profile: ReactNode;
}) {
  return (
    <>
      <SiteShell>{children}</SiteShell>
      {profile}
    </>
  );
}
