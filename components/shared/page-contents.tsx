"use client";

import {
  ContentsList,
  type ContentsItem,
} from "@/components/shared/contents-list";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useActiveSection } from "@/hooks/use-active-section";

/**
 * "On this page" navigation that highlights the section being read.
 * Desktop shows the list under a heading; phones fold it into a tap-to-open
 * row, like the Insights article contents, so it doesn't push the page down.
 */
export function PageContents({
  label,
  items,
}: {
  label: string;
  items: readonly ContentsItem[];
}) {
  const { active, select } = useActiveSection(items.map((item) => item.id));
  const list = (
    <ContentsList
      items={items}
      active={active}
      onNavigate={select}
      className="mt-4"
    />
  );

  return (
    <>
      <nav aria-label={label} className="max-lg:hidden">
        <Eyebrow>{label}</Eyebrow>
        {list}
      </nav>
      <details className="lg:hidden">
        <summary className="text-primary min-h-11 cursor-pointer rounded-sm py-2 text-sm/6 font-semibold">
          {label}
        </summary>
        <nav aria-label={label}>{list}</nav>
      </details>
    </>
  );
}
