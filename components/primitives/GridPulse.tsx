"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Target cell edge in CSS pixels. Grid auto-fits as many squares
   *  of this size as fit in the container. */
  cellSize?: number;
  /** Number of cells lit at any moment. */
  count?: number;
  /** Time between cell swaps (one cell out, one in). Lower = faster. */
  swapMs?: number;
  /** Fade in/out duration in ms. */
  fadeMs?: number;
  /** Lit cell opacity at peak. */
  peakOpacity?: number;
  className?: string;
};

/**
 * Invisible grid of square cells. A small subset is lit at any moment;
 * the lit set evolves one cell at a time — every `swapMs` ms one
 * random lit cell fades out and one random unlit cell fades in. Feels
 * organic rather than synchronised.
 */
export function GridPulse({
  cellSize = 130,
  count = 6,
  swapMs = 320,
  fadeMs = 800,
  peakOpacity = 0.22,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [{ cols, rows, size }, setLayout] = useState({
    cols: 0,
    rows: 0,
    size: cellSize,
  });
  const [active, setActive] = useState<Set<number>>(() => new Set());

  // Measure container, compute square cell layout.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const c = Math.max(3, Math.round(w / cellSize));
      const s = w / c;
      const r = Math.ceil(h / s);
      setLayout({ cols: c, rows: r, size: s });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cellSize]);

  // Sequential lifecycle: 1 cell out, 1 cell in, every swapMs.
  useEffect(() => {
    if (cols === 0 || rows === 0) return;
    const total = cols * rows;

    // Seed initial state with `count` random cells, but ramp them in
    // gradually so they don't all flash on simultaneously.
    const seed = new Set<number>();
    setActive(seed); // start empty

    let cancelled = false;
    let pending: number[] = [];
    const seedCount = Math.min(count, total);
    while (pending.length < seedCount) {
      const c = Math.floor(Math.random() * total);
      if (!pending.includes(c)) pending.push(c);
    }

    // Ramp in: add one cell at a time
    const live: Set<number> = new Set();
    const rampStep = () => {
      if (cancelled) return;
      if (pending.length === 0) return;
      const next = pending.shift()!;
      live.add(next);
      setActive(new Set(live));
    };
    const rampId = window.setInterval(rampStep, swapMs);
    // when ramp finishes, switch to swap-mode
    const rampDoneAt = swapMs * seedCount;
    const swapStarter = window.setTimeout(() => {
      window.clearInterval(rampId);
      if (cancelled) return;
      // continuous swap
      const swap = () => {
        if (cancelled) return;
        const next = new Set(live);
        // remove a random active
        const arr = Array.from(next);
        if (arr.length > 0) {
          const dropIdx = arr[Math.floor(Math.random() * arr.length)];
          next.delete(dropIdx);
        }
        // add a random inactive
        let tries = 0;
        let candidate: number;
        do {
          candidate = Math.floor(Math.random() * total);
          tries++;
        } while (next.has(candidate) && tries < 50);
        next.add(candidate);
        live.clear();
        next.forEach((v) => live.add(v));
        setActive(new Set(live));
      };
      // run repeatedly
      const id = window.setInterval(swap, swapMs);
      // store for cleanup via closure
      (rampStep as unknown as { _id: number })._id = id as unknown as number;
    }, rampDoneAt);

    return () => {
      cancelled = true;
      window.clearInterval(rampId);
      window.clearTimeout(swapStarter);
      const ref = (rampStep as unknown as { _id?: number })._id;
      if (ref) window.clearInterval(ref);
    };
  }, [cols, rows, count, swapMs]);

  const total = cols * rows;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${size}px)`,
          gridAutoRows: `${size}px`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isOn = active.has(i);
          return (
            <div
              key={i}
              className="bg-ember"
              style={{
                width: size,
                height: size,
                opacity: isOn ? peakOpacity : 0,
                transition: `opacity ${fadeMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GridPulse;
