"use server";

/**
 * Server action invoked by the contact form. For v1 the action does not
 * deliver mail — it just records the submission server-side. A real
 * implementation would forward to the sales inbox or a CRM.
 *
 * On success we redirect back to `/contact?sent=1` so the page renders
 * its confirmation state without any client JS.
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

  // For v1 we just log. A real implementation would forward this to
  // the sales inbox or a CRM.
  // eslint-disable-next-line no-console
  console.log("[contact] submission", { name, email, company, message });

  return { ok: true };
}
