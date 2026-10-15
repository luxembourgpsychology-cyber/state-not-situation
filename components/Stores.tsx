import type { EditionSettings, Locale } from "@/site.config";
import type { SiteContent } from "@/content/types";
import { priceLine, storeLinks } from "@/lib/stores";
import { AmazonButton } from "./AmazonButton";

/**
 * "Get the book" (15 October 2026): every store page the book is sold on,
 * each format named, the first as the solid button and the rest as plain
 * actions, then one mono line about price. Nothing here says which store to
 * prefer and nothing mentions a reseller: the list price, printed once, lets
 * a reader judge any offer for themselves.
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
              className={i === 0 ? "btn btn-solid" : "btn"}
            />
          </li>
        ))}
      </ul>
      <p className="t-mono mt-3">
        {s.pricesVary}
        {price ? ` ${price}` : null}
      </p>
    </div>
  );
}
