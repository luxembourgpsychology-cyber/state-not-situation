import Link from "next/link";
import { effectiveStatus, formatEventWhen, reserveLink, type EventRecord } from "@/lib/extension/rules";
import { ext } from "@/lib/extension";

/**
 * What every event shows, in the same order everywhere: the date with its
 * year, the time with its zone, the place, the language, and the price only
 * when it is verified. The state is said in words, never in colour alone.
 */
export function eventFacts(e: EventRecord, now: Date) {
  const x = ext().events;
  const when = formatEventWhen(e);
  const state = effectiveStatus(e, now);
  const priced = e.isFree || Boolean(e.priceDisplay);
  const showPrice = state === "bookable" || ((state === "sold_out" || state === "past" || state === "cancelled") && priced);
  const price = e.isFree ? x.free : e.priceDisplay ?? null;
  const reserve = reserveLink(e, now);
  return {
    reserve,
    state,
    rows: [
      [x.rows.date, when.date],
      [x.rows.time, when.time],
      [x.rows.place, e.venueOrOnline],
      [x.rows.language, e.language],
      [reserve ? x.reserve.row : x.rows.price, showPrice && price ? price : reserve ? x.reserve.status : x.statusLine.announced],
    ] as [string, string][],
    bookLine: e.bookIncluded === true ? x.bookIncluded.yes : e.bookIncluded === false ? x.bookIncluded.no : x.bookIncluded.unknown,
  };
}

/** One row of the listing. A date, a title, a state, and one link. */
export function EventRow({ e, href, now }: { e: EventRecord; href: string; now: Date }) {
  const x = ext().events;
  const { state, rows, reserve } = eventFacts(e, now);
  return (
    <li className="py-[var(--space-block)] border-b border-[var(--rule)]">
      <p className="t-mono text-ink">{rows[0][1]} · {rows[1][1]}</p>
      <h3 className="t-lead mt-2">{e.title}</h3>
      {e.inDialogue ? <p className="t-body mt-1 text-ink-soft">{x.inDialogue.with} {e.inDialogue.name}</p> : null}
      <p className="t-mono mt-2">{e.format} · {e.venueOrOnline} · {e.language}</p>
      <p className="t-mono mt-2 text-ink">{reserve ? x.reserve.status : x.status[state]}</p>
      <p className="mt-4"><Link href={href} className="btn">{x.detailLink}<span className="sr-only">: {e.title}</span></Link></p>
    </li>
  );
}
