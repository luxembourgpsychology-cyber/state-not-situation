"use client";
import { useState } from "react";
import type { SiteContent } from "@/content/types";
import type { EditionSettings } from "@/site.config";
import { track } from "@/lib/analytics";

/**
 * The one form on the site, and the one solid button. With newsletterUrl set
 * it posts there (Buttondown, Mailchimp, MailerLite and similar all accept a
 * plain form post). Without one it offers a pre-filled email instead of
 * pretending to collect anything.
 */
export function Notify({ content, edition, pressEmail, locale }: { content: SiteContent["status"]; edition: EditionSettings; pressEmail: string; locale: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edition.newsletterUrl) return;
    setState("sending");
    try {
      const body = new FormData();
      body.set(edition.newsletterEmailField, email);
      const res = await fetch(edition.newsletterUrl, { method: "POST", body, mode: "no-cors" });
      // no-cors responses are opaque; treat a completed request as success.
      if (res.type === "opaque" || res.ok) { setState("done"); track("notify_submit", { locale }); }
      else setState("error");
    } catch {
      setState("error");
    }
  };

  const mailto = `mailto:${pressEmail}?subject=${encodeURIComponent(content.mailtoSubject)}&body=${encodeURIComponent(content.mailtoBody)}`;

  return (
    <div className="max-w-xl">
      <h3 id="notify-title" className="t-head">{content.notifyCta}</h3>
      {edition.newsletterUrl ? (
        state === "done" ? (
          <p className="mt-[var(--space-block)] t-mono text-red normal-case" role="status">{content.success}</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-[var(--space-block)]">
            <label htmlFor="notify-email" className="t-mono block mb-2">{content.emailLabel}</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <input
                id="notify-email" type="email" name={edition.newsletterEmailField} required autoComplete="email" inputMode="email"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder={content.emailPlaceholder}
                className="flex-1 min-h-12 bg-transparent border-b-[1.5px] border-ink px-0 py-2 font-mono text-base placeholder:text-quiet focus:outline-none focus:border-red"
              />
              <button type="submit" className="btn btn-solid min-h-12" disabled={state === "sending"}>{content.submit}</button>
            </div>
            {state === "error" ? <p className="mt-4 t-mono normal-case text-red" role="alert">{content.error}</p> : null}
            <p className="mt-4 text-sm text-quiet">{content.privacyNote}</p>
          </form>
        )
      ) : (
        <div className="mt-[var(--space-block)]">
          <a href={mailto} className="btn btn-solid">{content.submit}</a>
          <p className="mt-4 text-sm text-quiet">{content.privacyNote}</p>
        </div>
      )}
    </div>
  );
}
