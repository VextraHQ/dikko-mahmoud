"use client";

import { SectionLink } from "@/components/shared/section-link";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Desktop "On this page" list for the standalone profile. Sticky alongside the
 * reading column, like the practice sidebar, and marks the section in view.
 */
export function ProfileContents({
  label,
  sections,
}: {
  label: string;
  sections: readonly { id: string; label: string }[];
}) {
  const { active, select } = useActiveSection(
    sections.map((section) => section.id),
  );
  return (
    <nav
      aria-labelledby="profile-contents-heading"
      className="sticky top-28 rounded-xl bg-sky-50 p-5"
    >
      <p
        id="profile-contents-heading"
        className="text-primary text-[11px]/4 font-bold tracking-widest uppercase"
      >
        {label}
      </p>
      <ul className="mt-3 grid">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <SectionLink
                sectionId={section.id}
                onNavigate={select}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "text-primary -ml-3 flex min-h-9 items-center border-l-2 py-1.5 pl-3 text-sm/6 underline-offset-4 transition-colors hover:underline motion-reduce:transition-none",
                  current
                    ? "border-primary font-semibold"
                    : "border-transparent",
                )}
              >
                {section.label}
              </SectionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
