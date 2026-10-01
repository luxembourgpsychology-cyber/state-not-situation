/**
 * THE DAY, DRAWN. One line in the stroke of the cover's pulse mark, run across
 * the whole day: a jolt at 16:10, a jitter at 16:12, a low hum at 22:36, a
 * snap at 07:08. It is a motif, not a measurement — no axis, no values — and
 * it gives the eye something to land on before any paragraph.
 *
 * Each time under it is a link to its moment. It draws itself once when the
 * page opens, and not at all under reduced motion.
 */
const PATH =
  "M0 70 H85 L95 62 L105 70 L115 22 L125 108 L135 70 H300 L310 58 L318 74 L326 28 L334 104 L342 48 L350 96 L358 16 L366 112 L374 60 L382 70 " +
  "H560 Q575 58 590 70 T620 70 T650 70 T680 70 T710 70 H850 L860 66 L868 72 L880 8 L892 116 L902 70 H1000";

export type Station = { time: string; target: string; title: string; left: string; quiet?: boolean; reveal?: boolean };

export function DayLine({ stations, label, onSelect }: { stations: Station[]; label: string; onSelect?: (target: string, reveal?: boolean) => void }) {
  return (
    <figure className="ext-dayline" aria-label={label}>
      <svg viewBox="0 0 1000 124" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={PATH} pathLength={1} className="pulse-path ext-dayline__path" vectorEffect="non-scaling-stroke" />
      </svg>
      <ul className="ext-dayline__labels">
        {stations.map((s) => (
          <li key={s.time} style={{ left: s.left }} className="ext-dayline__label">
            <a
              href={`#scene-${s.target}`}
              className={`t-mono inline-flex min-h-11 hover:text-red ${s.quiet ? "" : "text-ink"}`}
              onClick={onSelect ? (e) => { e.preventDefault(); onSelect(s.target, s.reveal); } : undefined}
            >
              {s.time}<span className="sr-only">: {s.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </figure>
  );
}
