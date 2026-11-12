import type { Person } from "@/content/people";
import { cn } from "@/lib/utils";

/**
 * Career milestones as a short timeline: a thin rule with a navy dot per
 * entry, the year above its line. Reads the same in the popup, the page hero
 * and on phones, and any length fits.
 */
export function MilestoneList({
  milestones,
  label,
  className,
}: {
  milestones: NonNullable<Person["milestones"]>;
  label: string;
  className?: string;
}) {
  return (
    <dl
      aria-label={label}
      className={cn("grid gap-5 border-l border-sky-200 pl-6", className)}
    >
      {milestones.map((milestone) => (
        <div key={milestone.year} className="relative">
          <span
            aria-hidden="true"
            className="bg-primary absolute top-[5px] -left-[29.5px] size-2.5 rounded-full"
          />
          <dt className="text-primary text-sm/5 font-semibold tracking-wide tabular-nums">
            {milestone.year}
          </dt>
          <dd className="mt-1 text-[15px]/6 text-slate-700">
            {milestone.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
