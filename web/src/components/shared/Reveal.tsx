"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The ONE sitewide scroll reveal (motion system beat 2, spec §Motion).
 * fade + translateY 8px, ~0.6s, small optional stagger via `delay`.
 * prefers-reduced-motion → renders content with no animation.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "footer";
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
