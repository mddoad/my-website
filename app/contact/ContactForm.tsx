"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { ok: false };

const inputClasses =
  "mt-1.5 block w-full h-11 rounded-md border border-hairline-strong bg-canvas px-3 text-sm text-ink placeholder:text-muted focus:border-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green-dark";

/**
 * Client form for /contact. Uses a server action so the form works
 * without JavaScript (server returns the state, page re-renders), and
 * progressively enhances with `useActionState` to show inline errors.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-md border border-brand-green-soft bg-surface-feature p-6 text-sm text-ink"
      >
        <p className="text-lg font-semibold">Thanks — we&rsquo;ll be in touch.</p>
        <p className="mt-2 text-slate">
          Your note is in. A member of our engineering team will come back
          to you within one business day. If your program is time-sensitive,
          call us at the number on this page.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-ink"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ink"
        >
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-ink"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink"
        >
          Tell us about your program
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Part description, annual volume, target SOP, key tolerances or certifications…"
          className={`${inputClasses} h-auto py-2`}
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-md border border-warning bg-warning-bg px-3 py-2 text-sm text-warning-text"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-full bg-brand-green px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-deep disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
