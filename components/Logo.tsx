"use client";

import { motion, useReducedMotion } from "framer-motion";

const CELLS = [
  { ch: "9", x: 32, y: 38 },
  { ch: "3", x: 68, y: 38 },
  { ch: "1", x: 32, y: 71 },
  { ch: "T", x: 68, y: 71 },
];

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * 193T brand mark — periodic-table square holding a 2×2 grid: 9 3 / 1 T.
 * Pure SVG, inherits color via currentColor. When `animated`, the frame
 * draws itself in and the glyphs stagger up; otherwise it renders static.
 */
export default function Logo({
  size = 40,
  animated = false,
  className = "",
  title = "193T",
}: {
  size?: number;
  animated?: boolean;
  className?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();
  const live = animated && !reduce;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
    >
      <motion.rect
        x="5"
        y="5"
        width="90"
        height="90"
        stroke="currentColor"
        strokeWidth="2.5"
        initial={live ? { pathLength: 0, opacity: 0 } : false}
        animate={live ? { pathLength: 1, opacity: 1 } : undefined}
        transition={live ? { duration: 1.1, ease } : undefined}
      />
      {CELLS.map((c, i) => (
        <motion.text
          key={c.ch + i}
          x={c.x}
          y={c.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: "-0.02em",
          }}
          initial={live ? { opacity: 0, y: 6 } : false}
          animate={live ? { opacity: 1, y: 0 } : undefined}
          transition={
            live ? { duration: 0.5, delay: 0.5 + i * 0.1, ease } : undefined
          }
        >
          {c.ch}
        </motion.text>
      ))}
    </svg>
  );
}
