import type { ReactNode } from "react";

/** The line that keeps a real problem real. An ink rule beside it, no box. */
export function ScopeNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`t-body pl-5 border-l-[1.5px] border-[var(--rule-strong)] ${className}`}>{children}</p>;
}
