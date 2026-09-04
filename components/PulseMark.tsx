/** The pulse mark from the cover and spine, drawn as a path so it can animate. */
export function PulseMark({ className = "", label, playing = false }: { className?: string; label?: string; playing?: boolean }) {
  return (
    <svg viewBox="0 0 120 34" className={`${className} ${playing ? "pulse-playing" : ""}`} aria-hidden={label ? undefined : true} role={label ? "img" : undefined} focusable="false">
      {label ? <title>{label}</title> : null}
      <path className="pulse-path" d="M2 21 H16 L22 17 L28 21 H36 L42 6 L48 30 L54 21 H64 L70 18 L76 21 H86 L92 10 L98 28 L104 21 H118" style={playing ? undefined : { strokeDasharray: "none" }} />
    </svg>
  );
}
