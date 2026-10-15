"use client";
import { track } from "@/lib/analytics";

export function AmazonButton({ href, label, locale, store, className = "btn btn-solid" }: { href: string; label: string; locale: string; store?: string; className?: string }) {
  return (
    <a href={href} className={className} rel="noopener" target="_blank" onClick={() => track("amazon_click", store ? { locale, store } : { locale })}>
      {label}
    </a>
  );
}
