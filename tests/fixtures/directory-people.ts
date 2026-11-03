// Synthetic directory records for tests and performance checks only. The
// names are obviously fake and must never be rendered on the real site.
import { seniorityGroups } from "@/content/people";
import { practiceIndex } from "@/content/practice-index";
import type { DirectoryPerson } from "@/lib/people-directory";

// Roughly a mid-sized firm's shape: few partners, more associates.
const seniorityMix = [
  ...Array(6).fill("partner"),
  ...Array(6).fill("counsel"),
  ...Array(18).fill("senior-associate"),
  ...Array(30).fill("associate"),
] as DirectoryPerson["seniority"][];

export function makeDirectoryPeople(count = 60): DirectoryPerson[] {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const seniority = seniorityMix[index % seniorityMix.length];
    const practice = practiceIndex[index % practiceIndex.length];
    const label = seniorityGroups.find(
      (group) => group.id === seniority,
    )?.label;
    return {
      id: `test-person-${number}`,
      slug: `test-person-${number}`,
      name: `Test Person ${number}`,
      role: label?.replace(/s$/, "") ?? "Associate",
      initials: `T${number}`,
      portrait: null,
      seniority,
      practices: [{ id: practice.slug, title: practice.title }],
    };
  });
}
