/**
 * The confidence markers printed in the book's margins: a clean strong
 * heartbeat for replicated evidence, an irregular lower one for suggestive
 * evidence, a near-flatline for a plausible hypothesis.
 */
const PATHS = {
  high: "M2 20 H14 L18 16 L22 20 H30 L35 4 L41 36 L47 20 H58 L62 17 L66 20 H76 L81 6 L87 34 L92 20 H118",
  medium: "M2 20 H16 L20 17 L24 20 H32 L36 10 L41 30 L46 20 H60 L64 18 L68 20 H78 L82 12 L87 28 L91 20 H118",
  low: "M2 20 H40 L46 18 L52 22 L58 20 H118",
} as const;

const COLOURS = {
  high: "var(--grade-high)",
  medium: "var(--grade-medium)",
  low: "var(--grade-low)",
} as const;

export function EvidencePulse({ grade, className = "" }: { grade: "high" | "medium" | "low"; className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden="true" focusable="false">
      <path
        d={PATHS[grade]}
        fill="none"
        stroke={COLOURS[grade]}
        strokeWidth={grade === "low" ? 1.8 : 2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
