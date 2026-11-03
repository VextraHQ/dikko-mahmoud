"use client";

import { FilterSelect } from "@/components/shared/filter-select";
import { peopleDirectory as copy } from "@/content/people";
import type { PeopleDirectoryData } from "@/lib/people/directory-data";

export function PracticeFilter({
  practices,
  value,
  onChange,
}: {
  practices: PeopleDirectoryData["practices"];
  value: string;
  onChange?: (practice: string) => void;
}) {
  return (
    <FilterSelect
      id="people-practice"
      label={copy.practiceLabel}
      closeLabel={copy.closePractices}
      value={value}
      options={[
        { value: "", label: copy.allPractices },
        ...practices.map((practice) => ({
          value: practice.id,
          label: practice.title,
        })),
      ]}
      onChange={onChange}
      sheet
    />
  );
}
