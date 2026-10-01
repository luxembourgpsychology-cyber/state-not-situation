"use client";

import type { ReactNode } from "react";
import { track, type SiteEvent } from "@/lib/analytics";

/**
 * A link to another site (a ticket provider, the app). The click is counted
 * as an intention to leave, never as a purchase or a booking: confirmation
 * belongs to the provider. Opens in a new tab with the usual protections.
 */
export function OutboundLink({ href, event, props, className, children }: { href: string; event: SiteEvent; props: Record<string, string>; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track(event, props)}>
      {children}
    </a>
  );
}
