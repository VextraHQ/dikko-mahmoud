"use client";

import type { ReactNode } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterSelect } from "@/hooks/use-filter-select";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export type FilterOption = { value: string; label: string };

// Radix Select cannot hold an empty value, so "All …" uses this stand-in.
const allValue = "__all";

/**
 * Underlined field shared by search inputs, filter triggers and the Contact
 * form. Focus is the navy rule under the field (not the site-wide outline
 * box); `aria-invalid` turns the rule red for form errors.
 */
export const underlineFieldClass =
  "aria-invalid:border-destructive aria-invalid:shadow-[inset_0_-2px_0_var(--destructive)] aria-invalid:ring-0 hover:border-primary/60 focus:border-primary focus-visible:border-primary data-[state=open]:border-primary h-12 rounded-none border-0 border-b border-slate-300 bg-transparent shadow-none transition-[border-color,box-shadow] duration-200 focus:shadow-[inset_0_-2px_0_var(--primary)] focus-visible:ring-0 focus-visible:outline-none! data-[state=open]:shadow-[inset_0_-2px_0_var(--primary)] motion-reduce:transition-none forced-colors:focus-visible:outline-2!";

const triggerClass = cn(
  underlineFieldClass,
  "flex w-full min-w-0 items-center justify-between gap-3 px-0 text-left text-base",
);

/**
 * One filter dropdown: a themed menu on desktop and, with `sheet`, a bottom
 * sheet with large touch targets on phones. A named form field starts as a
 * native select, so GET forms work without JavaScript; hydration enhances it.
 * The two enhanced controls use CSS breakpoints without swapping on resize.
 */
export function FilterSelect({
  id,
  name,
  label,
  value,
  options,
  onChange,
  sheet = false,
  closeLabel = "Close options",
  icon,
  className,
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  options: readonly FilterOption[];
  onChange?: (value: string) => void;
  sheet?: boolean;
  closeLabel?: string;
  icon?: ReactNode;
  className?: string;
}) {
  const { menuOpen, setMenuOpen, sheetOpen, setSheetOpen, select } =
    useFilterSelect(onChange);
  const current = options.find((option) => option.value === value);
  const hydrated = useHydrated();

  if (name && !hydrated)
    return (
      <div className={cn("min-w-0", className)}>
        <NativeSelect
          id={id}
          name={name}
          aria-label={label}
          defaultValue={value}
          className={cn(underlineFieldClass, "px-0 pr-9")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </div>
    );

  return (
    <div className={cn("min-w-0", className)}>
      {name && <input type="hidden" name={name} value={value} />}
      <div className={cn(sheet && "hidden lg:block")}>
        <Select
          value={value || allValue}
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onValueChange={(next) => select(next === allValue ? "" : next)}
        >
          <SelectTrigger id={id} aria-label={label} className={triggerClass}>
            <span className="flex min-w-0 items-center gap-2">
              {icon}
              <SelectValue />
            </span>
          </SelectTrigger>
          <SelectContent
            side="bottom"
            avoidCollisions={false}
            className="max-h-[min(18rem,var(--radix-select-content-available-height))]"
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value || allValue}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sheet && (
        <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
          <DialogTrigger asChild>
            <button
              id={`${id}-sheet`}
              type="button"
              className={cn(triggerClass, "lg:hidden")}
            >
              <span className="flex min-w-0 items-center gap-2">
                {icon}
                <span className="truncate">
                  <span className="sr-only">{label}: </span>
                  {current?.label ?? options[0]?.label}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.5}
                className="text-muted-foreground size-4 shrink-0"
              />
            </button>
          </DialogTrigger>
          <DialogContent
            aria-describedby={undefined}
            className="bg-background inset-x-0 bottom-0 flex max-h-[85svh] flex-col rounded-t-2xl border-t border-slate-200 shadow-xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 py-3 pr-3 pl-5">
              <DialogTitle className="font-serif text-2xl/8">
                {label}
              </DialogTitle>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={closeLabel}
                >
                  <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </Button>
              </DialogClose>
            </div>
            <ul
              aria-label={label}
              className="min-h-0 overflow-y-auto overscroll-contain px-3 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]"
            >
              {options.map((option) => {
                const selected = option.value === value;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => select(option.value)}
                      className={cn(
                        "text-foreground focus-visible:ring-primary/50 flex min-h-12 w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left text-sm/6 transition-colors duration-150 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:outline-none! focus-visible:ring-inset motion-reduce:transition-none forced-colors:focus-visible:outline-2!",
                        selected && "text-primary bg-sky-50 font-medium",
                      )}
                    >
                      <span>{option.label}</span>
                      {selected && (
                        <Check
                          aria-hidden="true"
                          className="size-4 shrink-0"
                          strokeWidth={1.5}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
