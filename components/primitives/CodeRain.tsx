"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Matrix-style code rain on a canvas, tinted ember.
 * Sits as a background layer behind the hero text. Cheap: a single
 * 2D canvas with a translucent fill each frame for the trailing fade.
 */
export default function CodeRain({
  className = "",
  fontSize = 16,
  speed = 1,
}: {
  className?: string;
  fontSize?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GLYPHS =
      "01{}[]()<>/\\=+*-;:.#$%&|193Timesアカサタナабвгдеж";
    let raf = 0;
    let cols = 0;
    let drops: number[] = [];
    let bright: number[] = [];
    let dpr = 1;
    let running = true;

    function setup() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () =>
        Math.floor((Math.random() * h) / fontSize),
      );
      bright = Array.from({ length: cols }, () => Math.random());
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      ctx.textBaseline = "top";
    }

    function frame() {
      if (!ctx || !canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Trailing fade — translucent black wash over the previous frame.
      ctx.fillStyle = "rgba(5, 5, 5, 0.10)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading glyph brighter; trailing glyphs ember/dim.
        if (Math.random() > 0.985) bright[i] = 1;
        if (bright[i] > 0.7) {
          ctx.fillStyle = "rgba(255, 120, 90, 0.95)";
        } else {
          ctx.fillStyle = `rgba(255, 59, 31, ${0.20 + bright[i] * 0.35})`;
        }
        ctx.fillText(ch, x, y);
        bright[i] *= 0.92;

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
          bright[i] = Math.random() * 0.4;
        }
        drops[i] += speed;
      }
      raf = requestAnimationFrame(frame);
    }

    setup();
    if (reduce) {
      // Static single pass for reduced-motion users.
      if (ctx) {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        for (let i = 0; i < cols; i++) {
          ctx.fillStyle = `rgba(255, 59, 31, ${0.12 + Math.random() * 0.2})`;
          ctx.fillText(
            GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            i * fontSize,
            Math.random() * (canvas.height / dpr),
          );
        }
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      if (!running) return;
      setup();
    };
    window.addEventListener("resize", onResize);

    // Pause when the section scrolls out of view to save CPU.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !raf && !reduce) {
          raf = requestAnimationFrame(frame);
        } else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    if (canvas.parentElement) io.observe(canvas.parentElement);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [fontSize, speed, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none block ${className}`}
    />
  );
}
