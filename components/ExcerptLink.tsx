"use client";
import Link from "next/link";
import { track } from "@/lib/analytics";

export function ExcerptLink({ href, label, locale, className = "btn" }: { href: string; label: string; locale: string; className?: string }) {
  return (
    <Link href={href} className={className} onClick={() => track("excerpt_open", { locale })}>
      {label}
    </Link>
  );
}
