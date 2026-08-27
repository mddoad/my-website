"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { ok: false };

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
        className="rounded-md border border-ink-200 bg-ink-50 p-6 text-sm text-ink-900"
      >
        <p className="font-serif text-lg font-semibold">Thanks — we&rsquo;ll be in touch.</p>
        <p className="mt-2 text-steel-700">
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
          className="block text-sm font-medium text-ink-900"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1.5 block w-full rounded-md border border-steel-300 bg-paper px-3 py-2 text-sm text-steel-900 placeholder:text-steel-400 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ink-900"
        >
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 block w-full rounded-md border border-steel-300 bg-paper px-3 py-2 text-sm text-steel-900 placeholder:text-steel-400 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-ink-900"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className="mt-1.5 block w-full rounded-md border border-steel-300 bg-paper px-3 py-2 text-sm text-steel-900 placeholder:text-steel-400 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink-900"
        >
          Tell us about your program
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Part description, annual volume, target SOP, key tolerances or certifications…"
          className="mt-1.5 block w-full rounded-md border border-steel-300 bg-paper px-3 py-2 text-sm text-steel-900 placeholder:text-steel-400 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-md border border-accent-200 bg-accent-100 px-3 py-2 text-sm text-accent-700"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-md bg-ink-900 px-5 text-sm font-medium text-paper transition-colors hover:bg-ink-700 disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
