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
 *
 * With samplePdfUrl set, the form is an offer rather than a notice: the
 * book's first 16 pages for an email, handed over the moment the form is
 * sent. Nobody subscribes to be told about a book; they subscribe to get
 * something. Before the offer, 1 visitor in 26 signed up.
 *
 * The post is no-cors, so its answer is opaque and success is assumed. The
 * sample is handed over either way: the same pages are public on Amazon's
 * Look Inside from publication day, so nothing is lost if a subscription
 * fails, and a reader is never left with nothing.
 *
 * On 7 October 2026 the form also opened in the hero, where its link used to
 * jump a reader eight thousand pixels down the page: in the first week 50 of
 * 53 visitors opened no page but the home page, and none took the pages.
 * `compact` sets the offer's name at LABEL, in the face the link had, so the
 * hero keeps its weight; `idBase` keeps the two forms' ids apart; `place`
 * tells the two apart in analytics.
 */
export function Notify({
  content,
  edition,
  pressEmail,
  locale,
  compact = false,
  idBase = "notify",
  place = "closing",
}: {
  content: SiteContent["status"];
  edition: EditionSettings;
  pressEmail: string;
  locale: string;
  compact?: boolean;
  idBase?: string;
  place?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [email, setEmail] = useState("");
  const sample = edition.samplePdfUrl ?? null;
  const o = content.offer;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edition.newsletterUrl) return;
    setState("sending");
    try {
      const body = new FormData();
      body.set(edition.newsletterEmailField, email);
      for (const [k, v] of Object.entries(edition.newsletterExtraFields ?? {})) body.set(k, v);
      const res = await fetch(edition.newsletterUrl, { method: "POST", body, mode: "no-cors" });
      // no-cors responses are opaque; treat a completed request as success.
      if (res.type === "opaque" || res.ok) { setState("done"); track("notify_submit", { locale, place }); }
      else setState("error");
    } catch {
      setState("error");
    }
  };

  const mailto = `mailto:${pressEmail}?subject=${encodeURIComponent(content.mailtoSubject)}&body=${encodeURIComponent(content.mailtoBody)}`;

  return (
    <div className="max-w-xl">
      {compact ? (
        <p id={`${idBase}-title`} className="t-label">{sample ? o.cta : content.notifyCta}</p>
      ) : (
        <h3 id={`${idBase}-title`} className="t-head">{sample ? o.cta : content.notifyCta}</h3>
      )}
      {sample && state !== "done" ? <p className={compact ? "t-body mt-2 text-ink-soft" : "t-body mt-[var(--space-tight)]"}>{o.line}</p> : null}

      {edition.newsletterUrl ? (
        state === "done" ? (
          sample ? (
            <div className="mt-[var(--space-block)]" role="status">
              <p className="t-body">{o.success}</p>
              <p className="mt-[var(--space-block)]">
                <a
                  href={sample}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-red"
                  onClick={() => track("opening_pages_downloaded", { locale, place })}
                >
                  {o.download}
                </a>
              </p>
            </div>
          ) : (
            <p className="mt-[var(--space-block)] t-mono text-red normal-case" role="status">{content.success}</p>
          )
        ) : (
          <form onSubmit={onSubmit} className={compact ? "mt-[var(--space-tight)]" : "mt-[var(--space-block)]"} aria-labelledby={`${idBase}-title`}>
            <label htmlFor={`${idBase}-email`} className="t-mono block mb-2">{content.emailLabel}</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <input
                id={`${idBase}-email`} type="email" name={edition.newsletterEmailField} required autoComplete="email" inputMode="email"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder={content.emailPlaceholder}
                className="flex-1 min-h-12 bg-transparent border-b-[1.5px] border-ink px-0 py-2 font-mono text-base placeholder:text-quiet focus:outline-none focus:border-red"
              />
              <button type="submit" className="btn btn-solid min-h-12" disabled={state === "sending"}>{sample ? o.submit : content.submit}</button>
            </div>
            {state === "error" ? <p className="mt-4 t-mono normal-case text-red" role="alert">{content.error}</p> : null}
            <p className="mt-4 text-sm text-quiet">{sample ? o.privacy : content.privacyNote}</p>
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
