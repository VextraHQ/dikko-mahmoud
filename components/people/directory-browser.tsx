"use client";

import type { ReactNode } from "react";

import { DirectoryView } from "@/components/people/directory-view";
import { peopleSearchInputId } from "@/components/people/directory-toolbar";
import type { PeopleDirectoryData } from "@/lib/people/directory-data";
import { usePeopleFilters } from "@/hooks/use-people-filters";
import { readFilters } from "@/lib/people/directory";

/** The live directory: the same view, with filters from the URL and toolbar. */
export function DirectoryBrowser({
  data,
  leadership,
  featuredPersonId,
}: {
  data: PeopleDirectoryData;
  leadership?: ReactNode;
  featuredPersonId?: string;
}) {
  const valid = {
    practices: data.practices.map((practice) => practice.id),
    roles: data.roles.map((role) => role.id),
  };
  const { filters, setFilters, resetKey, clear, clearQuery } = usePeopleFilters(
    valid,
    peopleSearchInputId,
  );
  return (
    <DirectoryView
      data={data}
      leadership={leadership}
      featuredPersonId={featuredPersonId}
      filters={filters}
      onFormChange={(form) => setFilters(readFilters(form, valid))}
      onClear={clear}
      onClearQuery={clearQuery}
      onPracticeChange={(practice) => setFilters({ ...filters, practice })}
      resetKey={resetKey}
    />
  );
}
