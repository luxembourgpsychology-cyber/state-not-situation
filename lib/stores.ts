import type { EditionSettings, StoreLink } from "@/site.config";

/**
 * The store links the page may show: only while the edition is published,
 * only those switched on in site.config.ts, only https. The order is the
 * file's order; the first one is the solid button.
 */
export function storeLinks(edition: Pick<EditionSettings, "publicationStatus" | "stores">): StoreLink[] {
  if (edition.publicationStatus !== "published") return [];
  return (edition.stores ?? []).filter((s) => s.show && /^https:\/\/\S+$/.test(s.href));
}

/**
 * The solid button is the first shown store of each format (16 October 2026:
 * Kindle and paperback side by side, each as plain to find as the other);
 * a further store for the same format is a plain action after it.
 */
export function isPrimary(links: StoreLink[], i: number): boolean {
  return links.findIndex((l) => l.format === links[i].format) === i;
}

/** The price line with the figure from site.config.ts, or nothing when no figure is set. */
export function priceLine(template: string, listPrice: string | null | undefined): string | null {
  if (!listPrice) return null;
  return template.replace("{price}", listPrice);
}
