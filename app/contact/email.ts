/**
 * Resend email delivery for the /contact form.
 *
 * The form's server action calls `sendContactEmail({ name, email,
 * company, message })` after validation. All delivery concerns
 * (env-var lookup, the SDK call, error handling) live here so
 * the action stays a thin orchestrator.
 *
 * Three env vars are required (see `.env.example`):
 *   - `RESEND_API_KEY`         the Resend API key
 *   - `CONTACT_EMAIL_TO`       destination address (e.g. sales@…)
 *   - `CONTACT_EMAIL_FROM`     verified sender (e.g. "Meridian
 *                              Manufacturing <no-reply@…>")
 *
 * If any of them is missing, the form still succeeds (validation
 * passed, the user sees the success state) but the email is
 * dropped with a server-side console warning. This is the right
 * failure mode: a misconfigured deployment should not break the
 * form for the user, but it should be loud in the server logs.
 */

type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type SendResult = { ok: true } | { ok: false; reason: string };

export async function sendContactEmail(
  submission: ContactSubmission,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] email delivery skipped — missing one of " +
        "RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM. " +
        "Submission accepted but not delivered.",
      { name: submission.name, email: submission.email },
    );
    return { ok: false, reason: "delivery-not-configured" };
  }

  // Plain-text body. Keeping it plain (no HTML) means it renders
  // correctly in every email client without sanitization worries
  // and is small enough to read in a notification.
  const subject = `New contact form submission from ${submission.name}`;
  const text = [
    `Name:    ${submission.name}`,
    `Email:   ${submission.email}`,
    `Company: ${submission.company || "(not provided)"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  // Use fetch against the Resend HTTP API rather than the SDK
  // so we don't pay the cost of an extra dependency for one
  // endpoint. The Resend API is documented at
  // https://resend.com/docs/api-reference/emails/send-email.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        "[contact] Resend returned non-2xx",
        res.status,
        body.slice(0, 500),
      );
      return { ok: false, reason: `resend-${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] email delivery threw", err);
    return { ok: false, reason: "delivery-exception" };
  }
}
