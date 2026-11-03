"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { peopleDirectory as copy } from "@/content/people";
import type { PeopleDirectoryData } from "@/content/people-directory";
import { usePracticeFilter } from "@/hooks/use-practice-filter";
import { cn } from "@/lib/utils";

const triggerClass =
  "hover:border-primary/60 focus:border-primary focus-visible:border-primary data-[state=open]:border-primary flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-none border-0 border-b border-slate-300 bg-transparent px-0 text-left text-base shadow-none transition-[border-color,box-shadow] duration-200 focus:shadow-[inset_0_-2px_0_var(--primary)] focus-visible:outline-none! data-[state=open]:shadow-[inset_0_-2px_0_var(--primary)] motion-reduce:transition-none forced-colors:focus-visible:outline-2!";

export function PracticeFilter({
  practices,
  value,
  onChange,
}: {
  practices: PeopleDirectoryData["practices"];
  value: string;
  onChange?: (practice: string) => void;
}) {
  const { desktop, open, setOpen, select } = usePracticeFilter(onChange);
  const options = [{ id: "", title: copy.allPractices }, ...practices];

  if (desktop) {
    return (
      <Select
        value={value || "all-practices"}
        open={open}
        onOpenChange={setOpen}
        onValueChange={(next) => select(next === "all-practices" ? "" : next)}
      >
        <SelectTrigger id="people-practice" className={triggerClass}>
          <SelectValue placeholder={copy.allPractices} />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          avoidCollisions={false}
          className="max-h-[min(18rem,var(--radix-select-content-available-height))]"
        >
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id || "all-practices"}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button id="people-practice" type="button" className={triggerClass}>
          <span className="min-w-0 truncate">
            {options.find((option) => option.id === value)?.title ||
              copy.allPractices}
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
            {copy.practiceLabel}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={copy.closePractices}
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </Button>
          </DialogClose>
        </div>
        <ul
          aria-label={copy.practiceLabel}
          className="min-h-0 overflow-y-auto overscroll-contain px-3 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                aria-pressed={value === option.id}
                onClick={() => select(option.id)}
                className={cn(
                  "text-foreground focus-visible:ring-primary/50 flex min-h-12 w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left text-sm/6 transition-colors duration-150 hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:outline-none! focus-visible:ring-inset motion-reduce:transition-none forced-colors:focus-visible:outline-2!",
                  value === option.id && "text-primary bg-sky-50 font-medium",
                )}
              >
                <span>{option.title}</span>
                {value === option.id && (
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
