"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { enquiryForm as copy } from "@/content/contact-page";
import {
  emptyEnquiry,
  enquirySchema,
  type EnquiryResult,
  type EnquiryValues,
} from "@/lib/enquiry";
import type { z } from "zod";

type SentEnquiry = z.output<typeof enquirySchema>;

// The fields top to bottom, so a failed send focuses the first problem on
// screen (React Hook Form would use the order fields appeared, and the area
// of law and topic appear late).
const fieldOrder: (keyof EnquiryValues)[] = [
  "reason",
  "practice",
  "topic",
  "name",
  "email",
  "phone",
  "organisation",
  "message",
];

/**
 * State for the Contact form: field values and checks (React Hook Form with
 * the shared Zod schema), sending, the received confirmation and failure.
 * Checks run when a field is left, then as the visitor types. Entries stay
 * after a failure so a retry needs no retyping. `submit` is the Server
 * Action, passed in by the page.
 */
export function useEnquiryForm({
  practice,
  submit,
}: {
  practice: string;
  submit: (values: SentEnquiry) => Promise<EnquiryResult>;
}) {
  const form = useForm<EnquiryValues, unknown, SentEnquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: emptyEnquiry(practice),
    mode: "onTouched",
    shouldFocusError: false,
  });
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState<SentEnquiry | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen readers announce the outcome
  // and keyboard users are not left on a button that no longer exists.
  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  const onSubmit = form.handleSubmit(
    async (values) => {
      setFailed(false);
      try {
        const result = await submit(values);
        if (result.status !== "received") throw new Error(result.status);
        setSent(values);
        toast.success(copy.received.toast);
      } catch {
        setFailed(true);
      }
    },
    (errors) => {
      const first = fieldOrder.find((name) => errors[name]);
      if (first) form.setFocus(first);
    },
  );

  /** An area of law only applies to legal matters, so other reasons clear it. */
  function chooseReason(reason: string) {
    form.setValue("reason", reason as EnquiryValues["reason"], {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (reason !== "legal") form.setValue("practice", "");
    if (reason !== "other") form.setValue("topic", "");
  }

  function startAgain() {
    form.reset(emptyEnquiry());
    setSent(null);
    setFailed(false);
  }

  return {
    form,
    sending: form.formState.isSubmitting,
    failed,
    sent,
    confirmationRef,
    onSubmit,
    chooseReason,
    startAgain,
  };
}
