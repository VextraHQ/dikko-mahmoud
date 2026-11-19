import type { ReactNode, Ref } from "react";
import { Check } from "lucide-react";
import { underlineFieldClass } from "@/components/shared/filter-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatIndex } from "@/lib/format";
import { cn } from "@/lib/utils";

type Choice = { value: string; label: string; note?: string };

/**
 * The two looks, both numbered like the practice catalogue and both quiet:
 * hairline rules, and the chosen option gets a light tint, a navy number and
 * a filled check.
 * - band: a ruled strip of cells, for a few choices with notes.
 * - index: a contents-page list of ruled rows, for longer lists.
 * Borders name their colour: Tailwind 4 otherwise draws them in the text
 * colour, which turns them black or navy.
 */
const looks = {
  band: {
    list: "gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4",
    item: "flex-col bg-white p-5 has-focus-visible:-outline-offset-4",
    number: "text-base/none",
    label: "mt-5 font-serif text-lg/6",
    note: "mt-1 text-[13px]/5 text-muted-foreground",
  },
  index: {
    list: "border-t border-border sm:grid-cols-2 sm:gap-x-10",
    item: "min-h-14 items-center gap-4 border-b border-border px-3 has-focus-visible:-outline-offset-2",
    number: "w-6 shrink-0 text-base/none",
    label: "py-3 text-[15px]/5",
    note: "",
  },
};

/**
 * One single-choice question shown two ways: numbered choices from small
 * tablets up, and a numbered dropdown on phones, where a tall stack of
 * choices would push the rest of the form far down. Both drive the same
 * value. The fieldset takes focus when the form points the visitor at it.
 */
export function ChoiceTiles({
  name,
  label,
  legend,
  legendAction,
  hint,
  choices,
  value,
  onChange,
  onBlur,
  placeholder,
  variant,
  required = false,
  error,
  fieldsetRef,
  className,
}: {
  name: string;
  /** Plain-text question, for the phone dropdown's accessible name. */
  label: string;
  legend: ReactNode;
  /** A control beside the legend (such as "Clear choice"). It is kept out of
   * the group's name so screen readers hear the question, not the action. */
  legendAction?: ReactNode;
  /** A note under the choices, read as part of the group's description. */
  hint?: ReactNode;
  choices: readonly Choice[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  variant: keyof typeof looks;
  /** Marks the question as required for screen readers (the legend's
   * asterisk is visual only). */
  required?: boolean;
  error?: string;
  fieldsetRef?: Ref<HTMLFieldSetElement>;
  className?: string;
}) {
  const look = looks[variant];
  const labelId = `${name}-legend-text`;
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;
  return (
    <fieldset
      ref={fieldsetRef}
      tabIndex={-1}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      aria-labelledby={labelId}
      className={cn(
        "min-w-0 outline-none",
        // The form focuses this fieldset when the question is the first
        // error. It is not in the tab order, so the ring is shown here rather
        // than through the global tab-focus rule.
        "focus:outline-ring focus:outline-2 focus:outline-offset-4 focus:outline-solid",
        className,
      )}
    >
      <legend
        id={`${name}-legend`}
        className="text-secondary w-full text-sm/6 font-semibold"
      >
        <span className="flex items-baseline justify-between gap-4">
          <span id={labelId}>{legend}</span>
          {legendAction}
        </span>
      </legend>
      <div
        className={cn(
          "mt-3 hidden sm:grid",
          look.list,
          error && "border-destructive/60",
        )}
      >
        {choices.map((choice, index) => (
          <label
            key={choice.value}
            htmlFor={`${name}-tile-${choice.value}`}
            className={cn(
              "group/choice ease-editorial relative flex cursor-pointer transition-colors duration-300 motion-reduce:transition-none",
              "has-focus-visible:outline-ring has-focus-visible:outline-2",
              "has-checked:text-primary hover:bg-slate-50 has-checked:bg-sky-50/70",
              look.item,
            )}
          >
            <input
              type="radio"
              required={required}
              name={`${name}-tile`}
              id={`${name}-tile-${choice.value}`}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
              onBlur={onBlur}
              className="sr-only"
            />
            {variant === "band" ? (
              <span className="flex items-start justify-between">
                <ChoiceNumber className={look.number} index={index} />
                <Tick />
              </span>
            ) : (
              <ChoiceNumber className={look.number} index={index} />
            )}
            <span className={look.label}>
              {choice.label}
              {choice.note && (
                <span className={cn("block font-sans", look.note)}>
                  {choice.note}
                </span>
              )}
            </span>
            {variant === "index" && <Tick className="ml-auto" />}
          </label>
        ))}
      </div>
      <div className="mt-2 sm:hidden">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            aria-label={label}
            aria-required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onBlur={onBlur}
            className={cn(
              underlineFieldClass,
              "data-placeholder:text-muted-foreground px-0",
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {choices.map((choice, index) => (
              <SelectItem
                key={choice.value}
                value={choice.value}
                description={
                  choice.note && (
                    <span className="block pl-7">{choice.note}</span>
                  )
                }
              >
                {/* Fixed width so labels and notes line up under each other. */}
                <ChoiceNumber
                  index={index}
                  className="group-data-[state=checked]/item:text-primary inline-block w-7 text-sm/none"
                />
                {choice.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {hint && (
        <p id={hintId} className="text-muted-foreground mt-3 text-[13px]/5">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-destructive motion-safe:animate-message-in mt-2 text-[13px]/5 font-medium"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** The editorial "01" number in front of each choice. */
function ChoiceNumber({
  index,
  className,
}: {
  index: number;
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-muted-foreground group-has-checked/choice:text-primary font-serif tabular-nums transition-colors",
        className,
      )}
    >
      {formatIndex(index)}
    </span>
  );
}

/** An empty ring that fills with a check once its choice is picked. */
function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "group-has-checked/choice:border-primary group-has-checked/choice:bg-primary grid size-5 shrink-0 place-items-center rounded-full border border-slate-300 text-white transition-colors duration-300 ease-in-out motion-reduce:transition-none",
        className,
      )}
    >
      <Check
        strokeWidth={2.5}
        className="size-3 scale-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-has-checked/choice:scale-100 motion-reduce:transition-none"
      />
    </span>
  );
}
