"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * A shared link such as /en/invite#teams arrives with that offer already
 * open: the element with the id in the address has its first <details>
 * opened. Opening an offer by hand counts as offer_viewed (its id and the
 * language, nothing else). Without a script the anchor still scrolls and
 * the offer opens with one tap.
 */
export function OpenOnHash({ locale }: { locale: string }) {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      const d = el?.querySelector("details");
      if (d && !d.open) d.open = true;
    };
    const onToggle = (e: Event) => {
      const d = e.target as HTMLElement;
      const offer = d instanceof HTMLDetailsElement && d.open ? d.dataset.offer : undefined;
      if (offer) track("offer_viewed", { offer, locale });
    };
    open();
    window.addEventListener("hashchange", open);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      window.removeEventListener("hashchange", open);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, [locale]);
  return null;
}
