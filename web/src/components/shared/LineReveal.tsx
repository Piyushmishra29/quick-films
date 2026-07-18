"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Masked line-rise reveal — the hero wordmark's signature move (y 108% → 0
 * inside an overflow-hidden mask), triggered when scrolled into view. Wrap a
 * single visual line (or a short block that reads as one) with it; the outer
 * span clips, the inner span rises. Renders static under
 * prefers-reduced-motion.
 *
 * Visibility is observed on the OUTER mask, not the rising span — the span
 * starts fully clipped, so an observer on it would report 0% intersection
 * forever and the reveal would never fire.
 */
export default function LineReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  if (reduce) {
    return (
      <span className={className ? `block ${className}` : "block"}>
        {children}
      </span>
    );
  }

  return (
    <span ref={ref} className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={inView ? { y: "0%" } : { y: "108%" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
