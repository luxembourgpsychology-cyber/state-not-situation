import Link from "next/link";

/**
 * MOCKUP ONLY (branch mockup/explore-ideas). Two directions for /explore,
 * shown side by side for the author to choose from. Not for main.
 */

/** The short lines a skimmer reads, one per moment. */
export const MOMENTS = [
  { id: "message", time: "16:10", line: "“Can we talk before you go?”", short: "You read it twice. You’re already having the conversation in your head." },
  { id: "starting", time: "16:12", line: "The title looked fine at lunch.", short: "Now it looks weak. You delete it, then type the same words back in." },
  { id: "evening", time: "22:36", line: "Just one more folder.", short: "You could go to bed. Instead you start sorting photos. Then you find another folder." },
] as const;

/**
 * The cover's pulse, drawn at four strengths: steady, a jolt, restless, a
 * low late-night hum, and the morning's snap. Not data — a motif, the same
 * stroke as the pulse mark.
 */
export const TRACES = {
  message: "M2 21 H30 L36 17 L42 21 H50 L56 4 L62 32 L68 21 H118",
  starting: "M2 21 H22 L27 12 L32 30 L37 6 L42 33 L47 14 L52 28 L57 3 L62 33 L67 18 L72 21 H118",
  evening: "M2 21 H20 Q30 15 40 21 T60 21 T80 21 T100 21 H118",
  morning: "M2 21 H50 L56 19 L62 21 L70 1 L78 34 L84 21 H118",
} as const;

export function Trace({ kind, className = "" }: { kind: keyof typeof TRACES; className?: string }) {
  return (
    <svg viewBox="0 0 120 36" className={className} aria-hidden="true" focusable="false">
      <path d={TRACES[kind]} className="pulse-path" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** One line across the whole day. Each station is a link to its moment. */
export function DayLine() {
  const d =
    "M0 70 H85 L95 62 L105 70 L115 22 L125 108 L135 70 H300 L310 58 L318 74 L326 28 L334 104 L342 48 L350 96 L358 16 L366 112 L374 60 L382 70 " +
    "H560 Q575 58 590 70 T620 70 T650 70 T680 70 T710 70 H850 L860 66 L868 72 L880 8 L892 116 L902 70 H1000";
  const stations = [
    { time: "16:10", left: "11.5%", href: "#m-message" },
    { time: "16:12", left: "34%", href: "#m-starting" },
    { time: "22:36", left: "63.5%", href: "#m-evening" },
    { time: "07:08", left: "88%", href: "#m-evening", quiet: true },
  ];
  return (
    <figure className="ext-dayline" aria-label="One day, from 16:10 to 07:08 the next morning">
      <svg viewBox="0 0 1000 124" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={d} pathLength={1} className="pulse-path ext-dayline__path" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="ext-dayline__labels">
        {stations.map((s) => (
          <a key={s.time} href={s.href} style={{ left: s.left }} className={`t-mono ext-dayline__label ${s.quiet ? "" : "text-ink"}`}>
            {s.time}
          </a>
        ))}
      </div>
    </figure>
  );
}

/** Which mockup this is, and the way to the other one. */
export function MockupBar({ n, title }: { n: 1 | 2; title: string }) {
  const other = n === 1 ? 2 : 1;
  return (
    <div className="border-b border-[var(--rule)] bg-page">
      <p className="container-book container-wide t-mono py-3 flex flex-wrap gap-x-6 gap-y-1">
        <span className="text-red">Mockup {n} of 2 · {title}</span>
        <Link href={`/en/explore/idea-${other}`} className="underline underline-offset-4 hover:text-red">See idea {other}</Link>
        <Link href="/en/explore" className="underline underline-offset-4 hover:text-red">Current version</Link>
      </p>
    </div>
  );
}
