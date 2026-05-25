"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Small square cursor that trails the pointer with a touch of lag.
 * Uses mix-blend-difference so it stays visible on dark and light.
 * Skips coarse-pointer (touch) devices entirely.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(-100, { stiffness: 380, damping: 30, mass: 0.45 });
  const y = useSpring(-100, { stiffness: 380, damping: 30, mass: 0.45 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: x, top: y }}
      className="pointer-events-none fixed z-[200] h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference"
    />
  );
}
