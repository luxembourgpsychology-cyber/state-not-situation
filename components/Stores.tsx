import type { EditionSettings, Locale } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { isPrimary, priceLine, storeLinks } from "@/lib/stores";
import { AmazonButton } from "./AmazonButton";

/**
 * "Get the book" (15 October 2026): every store page the book is sold on,
 * each format named, the first store of each format as a solid button and
 * any further store for that format as a plain action, then a quiet mono
 * note: the list price and where it applies, the other stores, and, when
 * set, one line for readers in the author's own country. Nothing mentions
 * a reseller: the list price, printed once, lets a reader judge any offer
 * for themselves.
 */
export function Stores({ locale, content, edition }: { locale: Locale; content: SiteContent; edition: EditionSettings }) {
  const links = storeLinks(edition);
  if (links.length === 0) return null;
  const s = content.status;
  const price = priceLine(s.listPrice, edition.listPrice);
  return (
    <div className="w-full">
      <p className="t-mono text-ink">{s.getTheBook}</p>
      <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3" role="list">
        {links.map((l, i) => (
          <li key={`${l.store}-${l.format}`}>
            <AmazonButton
              href={l.href}
              label={`${s.formats[l.format]} · ${l.store}`}
              locale={locale}
              store={l.store}
              className={isPrimary(links, i) ? "btn btn-solid" : "btn"}
            />
          </li>
        ))}
      </ul>
      {/* Quieter since 16 October 2026: the quiet colour, the list price first
          and where it applies, then the other stores, then the local line. */}
      <p className="t-mono text-quiet mt-3">
        {price ? `${price} ` : null}
        {s.pricesVary}
      </p>
      {s.localNote ? <p className="t-mono text-ink mt-2">{s.localNote}</p> : null}
    </div>
  );
}
