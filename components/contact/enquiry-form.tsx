"use client";

import type { ReactNode } from "react";
import { Controller, useWatch } from "react-hook-form";
import { SiteLink } from "@/components/layout/site-link";
import { ChoiceTiles } from "@/components/contact/choice-tiles";
import { underlineFieldClass } from "@/components/shared/filter-select";
import { EnquiryReceived } from "@/components/contact/enquiry-received";
import { ArrowButton } from "@/components/ui/arrow-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEnquiryForm } from "@/hooks/use-enquiry-form";
import { contact } from "@/content/contact";
import {
  enquiryForm as copy,
  enquiryReasons,
  organisationRecommendedFor,
  reasonCopy,
} from "@/content/contact-page";
import { practiceEnquiryOptions } from "@/content/practice-index";
import { messageLimits, type EnquiryResult } from "@/lib/enquiry";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const label = "text-secondary text-sm/6 font-semibold";
const quiet = "text-muted-foreground font-normal";

const reasonChoices = enquiryReasons.map((reason) => ({
  value: reason.id,
  label: reason.label,
  note: reason.note,
}));

/**
 * The Contact enquiry form. The reason comes first and decides the rest: the
 * area of law appears only for legal matters, and the message label follows
 * the reason. After sending, the form gives way to the confirmation.
 */
export function EnquiryForm({
  practice,
  arrivalLabel,
  submitAction,
}: {
  practice: string;
  arrivalLabel?: string;
  submitAction: (values: unknown) => Promise<EnquiryResult>;
}) {
  const {
    form,
    sending,
    failed,
    sent,
    confirmationRef,
    onSubmit,
    chooseReason,
    startAgain,
  } = useEnquiryForm({ practice, submit: submitAction });
  const [reason, chosenPractice, message] = useWatch({
    control: form.control,
    name: ["reason", "practice", "message"],
  });
  const reasonText = reasonCopy(reason);

  if (sent) {
    return (
      <EnquiryReceived
        ref={confirmationRef}
        enquiry={sent}
        onStartAgain={startAgain}
      />
    );
  }

  return (
    <Form {...form}>
      {arrivalLabel && chosenPractice === practice && (
        <p className="text-secondary mt-5 rounded-lg bg-sky-50 px-4 py-3 text-sm/6">
          {copy.arrival(arrivalLabel)}
        </p>
      )}
      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-7">
        <Controller
          control={form.control}
          name="reason"
          render={({ field, fieldState }) => (
            <ChoiceTiles
              name="reason"
              label={copy.reasonLegend}
              required
              legend={
                <>
                  {copy.reasonLegend} <Required />
                </>
              }
              choices={reasonChoices}
              value={field.value}
              onChange={chooseReason}
              onBlur={field.onBlur}
              placeholder={copy.reasonPlaceholder}
              variant="band"
              error={fieldState.error?.message}
              fieldsetRef={field.ref}
            />
          )}
        />

        {reason === "legal" && (
          <Controller
            control={form.control}
            name="practice"
            render={({ field }) => (
              <div className="border-border motion-safe:animate-in motion-safe:fade-in border-t pt-6">
                <ChoiceTiles
                  name="practice"
                  label={copy.practiceLegend}
                  legend={
                    <span className="flex items-baseline justify-between gap-4">
                      <span>
                        {copy.practiceLegend}{" "}
                        <span className={quiet}>{copy.optional}</span>
                      </span>
                      {field.value && (
                        <button
                          type="button"
                          onClick={() => field.onChange("")}
                          className="text-primary min-h-8 text-[13px] font-semibold underline underline-offset-4"
                        >
                          {copy.clearChoice}
                        </button>
                      )}
                    </span>
                  }
                  choices={practiceEnquiryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={copy.practicePlaceholder}
                  variant="index"
                />
                <p className="text-muted-foreground mt-3 text-[13px]/5">
                  {copy.practiceHint}
                </p>
              </div>
            )}
          />
        )}

        {reason === "other" && (
          <div className="border-border motion-safe:animate-in motion-safe:fade-in border-t pt-6">
            <TextField name="topic" autoComplete="off" required />
          </div>
        )}

        <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
          <TextField name="name" autoComplete="name" required />
          <TextField name="email" type="email" autoComplete="email" required />
          <TextField name="phone" type="tel" autoComplete="tel" />
          <TextField
            name="organisation"
            autoComplete="organization"
            note={
              organisationRecommendedFor.some((id) => id === reason)
                ? copy.recommended
                : copy.optional
            }
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="gap-1">
              <div className="flex items-baseline justify-between gap-4">
                <FormLabel className={label}>
                  {reasonText.messageLabel} <Required />
                </FormLabel>
                <span className="text-muted-foreground text-xs/5 tabular-nums">
                  {message.length} / {messageLimits.max}
                </span>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={messageLimits.max}
                  aria-required
                  placeholder={reasonText.placeholder}
                  className={cn(underlineFieldClass, "min-h-32 px-0 py-3")}
                />
              </FormControl>
              <p className="text-muted-foreground mt-1 text-[13px]/5">
                {copy.messageHint}
              </p>
              <FormMessage className="text-[13px]/5 font-medium" />
            </FormItem>
          )}
        />

        {/* Honeypot: hidden from people and screen readers, filled by bots. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] size-px overflow-hidden"
        >
          <label>
            Website
            <input
              {...form.register("website")}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {failed && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm/6 text-red-900"
          >
            <p className="text-destructive font-semibold">
              {copy.failedHeading}
            </p>
            <p>
              {copy.failedText}{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline underline-offset-4"
              >
                {contact.email}
              </a>
              .
            </p>
          </div>
        )}

        <p className="text-muted-foreground text-[13px]/5">
          {copy.notice.split(copy.privacyLink)[0]}
          <SiteLink
            href={routes.privacy}
            className="text-primary underline underline-offset-4"
          >
            {copy.privacyLink}
          </SiteLink>
          {copy.notice.split(copy.privacyLink)[1]}
        </p>

        <div>
          <ArrowButton
            type="submit"
            size="lg"
            disabled={sending}
            aria-busy={sending}
          >
            {sending ? copy.sending : failed ? copy.retry : copy.send}
          </ArrowButton>
        </div>
      </form>
    </Form>
  );
}

function Required() {
  return (
    <span aria-hidden="true" className="text-primary">
      *
    </span>
  );
}

/** A labelled, underlined text field with its own error line. */
function TextField({
  name,
  type = "text",
  autoComplete,
  required,
  note,
}: {
  name: "topic" | "name" | "email" | "phone" | "organisation";
  type?: string;
  autoComplete: string;
  required?: boolean;
  note?: ReactNode;
}) {
  const field = copy[name];
  return (
    <FormField
      name={name}
      render={({ field: input }) => (
        <FormItem className="gap-1">
          <FormLabel className={label}>
            {field.label}{" "}
            {required ? (
              <Required />
            ) : (
              <span className={quiet}>{note ?? copy.optional}</span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              {...input}
              type={type}
              autoComplete={autoComplete}
              aria-required={required}
              placeholder={field.placeholder}
              className={cn(underlineFieldClass, "px-0")}
            />
          </FormControl>
          <FormMessage className="text-[13px]/5 font-medium" />
        </FormItem>
      )}
    />
  );
}
