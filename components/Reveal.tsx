"use client";
import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/**
 * Fades a block in once when it scrolls into view. Content is visible by
 * default: only blocks that are below the fold when the page loads are hidden
 * and then revealed, so nothing can ever stay invisible if scripts fail.
 * Reduced motion is honoured in CSS.
 */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen
    el.classList.add("reveal");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={className} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</Tag>;
}
