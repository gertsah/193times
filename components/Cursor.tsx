"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number; // 1 → 0
  ttl: number; // total ms
};

const POOL_SIZE = 80;

/**
 * Custom cursor: ember-orange plus sign that follows the pointer with
 * small square particles spraying from it as it moves. Disabled on
 * coarse-pointer devices (mobile / touch).
 *
 * Rendered DOM-only with a recycled pool of <div>s updated inside one
 * requestAnimationFrame loop — no React re-renders per frame.
 */
export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Skip on touch / coarse pointer.
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    let prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const last = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lastTime = performance.now();

    // Apply `cursor: none` globally only while this is mounted, so
    // touch/mobile keep their native cursor.
    document.documentElement.classList.add("cursor-none");

    const onMove = (e: PointerEvent) => {
      const plus = plusRef.current;
      if (plus) {
        plus.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
        plus.style.opacity = "1";
      }

      if (prefersReduced) {
        last.x = e.clientX;
        last.y = e.clientY;
        return;
      }

      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 2) {
        const n = Math.min(3, 1 + Math.floor(dist / 14));
        for (let i = 0; i < n; i++) {
          // Spread particles around the cursor centre with a
          // perpendicular kick relative to motion so they look
          // sprayed off the leading edge.
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI;
          const speed = 0.04 + Math.random() * 0.12;
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed + 0.02,
            size: 2 + Math.random() * 3,
            life: 1,
            ttl: 500 + Math.random() * 500,
          });
        }
        // Cap pool — drop oldest if we exceed pool size.
        if (particlesRef.current.length > POOL_SIZE) {
          particlesRef.current.splice(
            0,
            particlesRef.current.length - POOL_SIZE,
          );
        }
      }
      last.x = e.clientX;
      last.y = e.clientY;
    };

    const onLeave = () => {
      const plus = plusRef.current;
      if (plus) plus.style.opacity = "0";
    };
    const onEnter = () => {
      const plus = plusRef.current;
      if (plus) plus.style.opacity = "1";
    };

    // Grow cursor on interactive hover
    const onDown = () => {
      const plus = plusRef.current;
      if (plus) plus.style.transform += " scale(0.85)";
    };
    const onUp = () => {
      const plus = plusRef.current;
      if (plus)
        plus.style.transform = plus.style.transform.replace(
          / scale\([^)]+\)/,
          "",
        );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    const tick = (t: number) => {
      const dt = Math.min(40, t - lastTime); // clamp dt on tab refocus
      lastTime = t;

      const arr = particlesRef.current;
      // advance physics
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.0002 * dt; // tiny gravity
        p.life -= dt / p.ttl;
        if (p.life <= 0) arr.splice(i, 1);
      }

      // paint pool
      for (let i = 0; i < POOL_SIZE; i++) {
        const el = poolRef.current[i];
        if (!el) continue;
        const p = arr[i];
        if (p) {
          el.style.display = "block";
          el.style.transform = `translate3d(${p.x - p.size / 2}px, ${p.y - p.size / 2}px, 0)`;
          el.style.width = `${p.size}px`;
          el.style.height = `${p.size}px`;
          el.style.opacity = String(Math.max(0, p.life * 0.95));
        } else if (el.style.display !== "none") {
          el.style.display = "none";
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{ contain: "layout style paint" }}
    >
      {/* The plus cursor */}
      <div
        ref={plusRef}
        className="absolute left-0 top-0 transition-opacity duration-200"
        style={{
          width: 24,
          height: 24,
          willChange: "transform",
          opacity: 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={24}
          height={24}
          style={{ display: "block" }}
        >
          {/* glow */}
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="22"
            stroke="#FF3B1F"
            strokeOpacity="0.4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="12"
            x2="22"
            y2="12"
            stroke="#FF3B1F"
            strokeOpacity="0.4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* solid cross */}
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            stroke="#FF3B1F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="#FF3B1F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Particle pool */}
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            poolRef.current[i] = el;
          }}
          className="absolute left-0 top-0 bg-ember"
          style={{ display: "none", willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
}
