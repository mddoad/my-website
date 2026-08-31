"use client";

import { useActionState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { ok: false };

const inputClasses =
  "mt-1.5 block w-full h-11 rounded-md border border-hairline-strong bg-canvas px-3 text-sm text-ink placeholder:text-slate focus:border-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green-dark";

/**
 * Client form for /contact. Uses a server action so the form works
 * without JavaScript (server returns the state, page re-renders), and
 * progressively enhances with `useActionState` to show inline errors.
 *
 * Motion: when the form successfully submits, the form slides up and
 * fades out while the success card slides in from below. The
 * transition is wrapped in `<AnimatePresence mode="wait">` so the
 * form fully unmounts before the success card enters — there is no
 * overlap, no layout shift, and the eye is led through the change
 * rather than seeing two states at once.
 *
 * The transition timings (150 ms exit, 250 ms enter) are below the
 * 1-second "felt as instant" threshold and are matched by the
 * `useReducedMotion` short-circuit: when the user prefers reduced
 * motion, the same `<AnimatePresence>` runs but the inner `motion`
 * elements render with `transition={{ duration: 0 }}` so the swap
 * is instant. This is the fourth layer of the reduced-motion
 * defense (CSS in globals.css, per-component useReducedMotion in
 * Reveal/Stagger/Counter, MotionConfig reducedMotion="user" in
 * MotionProvider, and this per-component check).
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const reduced = useReducedMotion();

  // When reduced motion is on, the transition is instant — the
  // form simply unmounts and the success card mounts in its place.
  // Using `transition={{ duration: 0 }}` is the documented way to
  // disable the AnimatePresence animation while keeping the
  // presence bookkeeping correct (so React doesn't warn about
  // missing keys on the way out).
  const enterDuration = reduced ? 0 : 0.25;
  const exitDuration = reduced ? 0 : 0.15;
  const enterY = reduced ? 0 : 8;
  const exitY = reduced ? 0 : -8;

  // The error message lives in a `role="alert"` region. We
  // reference it from every input so screen readers announce
  // the error in the field's description when the user tabs
  // back to it.
  const errorId = "contact-form-error";
  const hasError = Boolean(state.error);
  const errorProps = hasError
    ? { "aria-invalid": true, "aria-describedby": errorId }
    : {};

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.ok ? (
        <motion.div
          key="success"
          role="status"
          aria-live="polite"
          className="rounded-md border border-brand-green-soft bg-surface-feature p-6 text-sm text-ink"
          initial={{ opacity: 0, y: enterY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -enterY }}
          transition={{ duration: enterDuration, ease: "easeOut" }}
        >
          <p className="text-lg font-semibold">Thanks — we&rsquo;ll be in touch.</p>
          <p className="mt-2 text-slate">
            Your note is in. A member of our engineering team will come back
            to you within one business day. If your program is time-sensitive,
            call us at the number on this page.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={formAction}
          className="space-y-5"
          noValidate
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: exitY }}
          transition={{ duration: exitDuration, ease: "easeIn" }}
        >
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
              aria-required="true"
              className={inputClasses}
              {...errorProps}
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
              aria-required="true"
              className={inputClasses}
              {...errorProps}
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
              {...errorProps}
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
              aria-required="true"
              placeholder="Part description, annual volume, target SOP, key tolerances or certifications…"
              className={`${inputClasses} h-auto py-2`}
              {...errorProps}
            />
          </div>

          {state.error && (
            <p
              id={errorId}
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
        </motion.form>
      )}
    </AnimatePresence>
  );
}
