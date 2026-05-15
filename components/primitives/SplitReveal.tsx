"use client";

import { ReactNode, useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Token = {
  type: "word" | "space" | "node";
  value: string | ReactNode;
};

type Props = {
  /**
   * String (word-split automatically) or array of fragments. Strings
   * are word-split; React nodes are revealed as one unit so you can
   * embed inline `<em>` / `<span>` accents.
   */
  children: ReactNode | ReactNode[];
  className?: string;
  /** Per-word stagger, seconds. Default 0.05 (Revelo-fast). */
  stagger?: number;
  /** Delay before the first word, seconds. */
  delay?: number;
  /** Trigger once (default) or every time it enters the viewport. */
  once?: boolean;
};

/**
 * Revelo / darkroom.engineering-style reveal:
 *
 *   – Each word sits in an `overflow:hidden` mask shell.
 *   – Inner span animates from y:115%, opacity:0, blur(8px)
 *     to y:0, opacity:1, blur(0px).
 *   – Easing is easeOutQuint (the long-tail darkroom curve).
 *   – Duration 0.75s, stagger 0.05s — quicker than Revelo defaults.
 *
 * Usage:
 *   <SplitReveal>Сайты, визуалы и автоматизации</SplitReveal>
 *
 *   <SplitReveal>
 *     {"От идеи до "}
 *     <span className="italic text-ember">рабочей системы.</span>
 *   </SplitReveal>
 */
export function SplitReveal({
  children,
  className = "",
  stagger = 0.05,
  delay = 0,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const tokens = useMemo(() => tokenize(children), [children]);

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item: Variants = {
    hidden: { y: "115%", opacity: 0, filter: "blur(8px)" },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={container}
    >
      {tokens.map((t, i) => {
        if (t.type === "space") return <span key={i}>&nbsp;</span>;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
          >
            <motion.span
              variants={item}
              className="inline-block will-change-transform"
            >
              {t.value}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

function tokenize(children: ReactNode | ReactNode[]): Token[] {
  const arr: ReactNode[] = Array.isArray(children) ? children : [children];
  const out: Token[] = [];

  arr.forEach((node) => {
    if (typeof node === "string" || typeof node === "number") {
      const parts = String(node).split(/(\s+)/);
      for (const p of parts) {
        if (!p) continue;
        if (/^\s+$/.test(p)) {
          out.push({ type: "space", value: p });
        } else {
          out.push({ type: "word", value: p });
        }
      }
    } else if (node) {
      out.push({ type: "node", value: node });
    }
  });
  return out;
}

export default SplitReveal;
