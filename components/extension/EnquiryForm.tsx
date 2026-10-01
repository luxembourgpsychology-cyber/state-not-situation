"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ExtensionContent } from "@/content/extension-types";
import { track } from "@/lib/analytics";
import {
  composeEnquiry, mailtoHref, parseFormat, parseSource, validateEnquiry,
  ENQUIRY_LIMITS, type EnquiryError, type EnquiryField, type EnquiryFields, type EnquirySource,
} from "@/lib/extension/rules";

type Copy = ExtensionContent["enquiry"];

const EMPTY: EnquiryFields = {
  name: "", email: "", organisation: "", format: "not_sure", groupSize: "",
  location: "", dateRange: "", language: "", purpose: "", budget: "",
};

/** Field order: the order the error summary lists them in. */
const ORDER: EnquiryField[] = ["name", "email", "organisation", "format", "groupSize", "location", "dateRange", "language", "purpose", "budget"];

/**
 * THE ENQUIRY, as an email draft. The site has no backend, so it does not
 * pretend to have one: the button opens a draft in the visitor's own email
 * app, addressed to the one fixed public address, and says plainly that it
 * still has to be sent. If no email app opens, the same text is here to copy.
 * Nothing is stored, logged or sent to analytics except which format and
 * which page the visitor came from.
 *
 * It never says "received". Fields are kept as they are, because nothing has
 * been accepted by anyone yet.
 */
export function EnquiryForm({ copy, recipient, formats, locale }: { copy: Copy; recipient: string; formats: string[]; locale: string }) {
  const [f, setF] = useState<EnquiryFields>(EMPTY);
  const [source, setSource] = useState<EnquirySource>("direct");
  const [errors, setErrors] = useState<Partial<Record<EnquiryField, EnquiryError>>>({});
  const [drafted, setDrafted] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "done" | "failed">("idle");
  const summary = useRef<HTMLDivElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);

  // The page is static; the format and source in the address are read here,
  // allow-listed, and anything unknown becomes "Not sure yet" / "direct".
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setF((cur) => ({ ...cur, format: parseFormat(q.get("format"), formats) }));
    setSource(parseSource(q.get("source")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draft = useMemo(
    () => composeEnquiry(f, { ...copy.draft, fields: copy.fields, formatNames: copy.formatNames, languageNames: copy.languageNames }),
    [f, copy],
  );
  const href = mailtoHref(recipient, draft.subject, draft.body);
  const plain = `To: ${recipient}\nSubject: ${draft.subject}\n\n${draft.body}`;

  const set = (k: EnquiryField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setF((cur) => ({ ...cur, [k]: v }));
    if (errors[k]) setErrors((cur) => ({ ...cur, [k]: undefined }));
    setCopyState("idle");
  };

  const message = (k: EnquiryField, e: EnquiryError) =>
    e === "required" ? copy.errors.required[k] ?? copy.errors.required.name
      : e === "email" ? copy.errors.email
      : e === "tooLong" ? copy.errors.tooLong.replace("{max}", ENQUIRY_LIMITS[k].toLocaleString("en-GB"))
      : copy.errors.invalidChoice;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateEnquiry(f, formats);
    setErrors(found);
    if (Object.keys(found).length) {
      setDrafted(false);
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    track("enquiry_email_draft_opened", { offer: f.format, source });
    setDrafted(true);
    window.location.href = href;
    requestAnimationFrame(() => sentHeading.current?.focus());
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plain);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
  };

  const errorList = ORDER.filter((k) => errors[k]);
  const describedBy = (k: EnquiryField, hint?: boolean) =>
    [hint ? `enq-${k}-hint` : "", errors[k] ? `enq-${k}-error` : ""].filter(Boolean).join(" ") || undefined;

  const text = (k: EnquiryField, opts: { required?: boolean; type?: string; autoComplete?: string; inputMode?: "email" | "text" } = {}) => (
    <div className="mt-[var(--space-block)]">
      <label htmlFor={`enq-${k}`} className="t-mono block mb-1">
        {copy.fields[k]}{opts.required ? null : <span className="normal-case tracking-normal"> ({copy.optional})</span>}
      </label>
      <input
        id={`enq-${k}`}
        name={k}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        required={opts.required}
        aria-required={opts.required || undefined}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={describedBy(k)}
        value={f[k]}
        onChange={set(k)}
        className="ext-input"
      />
      {errors[k] ? <p id={`enq-${k}-error`} className="mt-2 t-mono normal-case tracking-normal text-red">{message(k, errors[k]!)}</p> : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      {errorList.length ? (
        <div ref={summary} tabIndex={-1} aria-labelledby="enq-errors-title" className="mb-[var(--space-block)] pl-5 border-l-[1.5px] border-red">
          <h2 id="enq-errors-title" className="t-label t-label-red">{copy.errorsTitle}</h2>
          <ul className="mt-3 t-body">
            {errorList.map((k) => (
              <li key={k}><a href={`#enq-${k === "format" || k === "language" ? `${k}-0` : k}`} className="underline underline-offset-4 hover:text-red">{copy.fields[k]}: {message(k, errors[k]!)}</a></li>
            ))}
          </ul>
        </div>
      ) : null}

      {text("name", { required: true, autoComplete: "name" })}
      {text("email", { required: true, type: "email", autoComplete: "email", inputMode: "email" })}
      {text("organisation", { autoComplete: "organization" })}

      <fieldset className="mt-[var(--space-block)]" aria-describedby={errors.format ? "enq-format-error" : undefined}>
        <legend className="t-mono mb-2">{copy.fields.format}</legend>
        {formats.map((id, i) => (
          <label key={id} className="flex items-start gap-3 py-2 min-h-11 cursor-pointer">
            <input id={`enq-format-${i}`} type="radio" name="format" value={id} checked={f.format === id} onChange={set("format")} className="ext-choice" />
            <span className="t-body">{copy.formatNames[id]}</span>
          </label>
        ))}
        {errors.format ? <p id="enq-format-error" className="mt-2 t-mono normal-case tracking-normal text-red">{message("format", errors.format)}</p> : null}
      </fieldset>

      {text("groupSize")}
      {text("location")}
      {text("dateRange")}

      <fieldset className="mt-[var(--space-block)]">
        <legend className="t-mono mb-2">{copy.fields.language} <span className="normal-case tracking-normal">({copy.optional})</span></legend>
        {(["en", "fr", "discuss"] as const).map((id, i) => (
          <label key={id} className="flex items-start gap-3 py-2 min-h-11 cursor-pointer">
            <input id={`enq-language-${i}`} type="radio" name="language" value={id} checked={f.language === id} onChange={set("language")} className="ext-choice" />
            <span className="t-body">{copy.languageNames[id]}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-[var(--space-block)]">
        <label htmlFor="enq-purpose" className="t-mono block mb-1">{copy.fields.purpose}</label>
        <p id="enq-purpose-hint" className="text-sm text-quiet mb-3">{copy.purposeHint}</p>
        <textarea
          id="enq-purpose"
          name="purpose"
          required
          aria-required
          aria-invalid={errors.purpose ? true : undefined}
          aria-describedby={describedBy("purpose", true)}
          value={f.purpose}
          onChange={set("purpose")}
          rows={7}
          className="ext-textarea"
        />
        <p className="t-mono mt-1 text-right" aria-hidden="true">{f.purpose.length.toLocaleString("en-GB")} / {ENQUIRY_LIMITS.purpose.toLocaleString("en-GB")}</p>
        {errors.purpose ? <p id="enq-purpose-error" className="mt-2 t-mono normal-case tracking-normal text-red">{message("purpose", errors.purpose)}</p> : null}
      </div>

      {text("budget")}

      <div className="mt-[var(--space-section)]">
        <p className="t-body">{copy.boundary}</p>
        <p className="mt-2 text-sm text-quiet">{copy.privacy}</p>
        <button type="submit" className="btn btn-solid mt-[var(--space-block)]">{copy.action}</button>
      </div>

      {drafted ? (
        <div className="mt-[var(--space-block)] pt-[var(--space-block)] border-t border-[var(--rule)]" role="status">
          <h2 ref={sentHeading} tabIndex={-1} className="t-head">{copy.sentTitle}</h2>
          <p className="t-body mt-[var(--space-tight)]">{copy.sentBody}</p>
          <p className="t-body mt-[var(--space-block)]">
            {copy.fallbackIntro} <span className="font-mono text-[0.95em] break-all select-all">{recipient}</span>.
          </p>
          <label htmlFor="enq-plain" className="sr-only">{copy.copyLabel}</label>
          <textarea id="enq-plain" readOnly value={plain} rows={12} className="ext-textarea mt-4 font-mono text-sm" onFocus={(e) => e.currentTarget.select()} />
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            <button type="button" className="btn" onClick={copyText}>{copyState === "done" ? copy.copied : copyState === "failed" ? copy.copyFailed : copy.copyLabel}</button>
            <a href={href} className="btn">{copy.againLabel}</a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
