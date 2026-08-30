"use server";

import { sendContactEmail } from "./email";

/**
 * Server action invoked by the contact form. Validates the input,
 * then forwards via `sendContactEmail` to the destination inbox.
 * The user always sees the success state when validation passes —
 * a misconfigured email delivery does not break the form, it just
 * logs a warning server-side (see `app/contact/email.ts`).
 *
 * On success we redirect back to `/contact?sent=1` so the page
 * renders its confirmation state without any client JS.
 */

export type ContactFormState = {
  ok: boolean;
  error?: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }

  // Very light email shape check; full validation lives elsewhere in a
  // real implementation.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  // Forward to the sales inbox. A misconfigured delivery logs a
  // warning server-side but does not fail the user — the form
  // returns `{ ok: true }` either way so the success state still
  // shows.
  await sendContactEmail({ name, email, company, message });

  return { ok: true };
}
