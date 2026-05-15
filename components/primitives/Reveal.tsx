"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Distance to travel during the reveal (px). */
  y?: number;
  /** Trigger only once when 30% visible. */
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
