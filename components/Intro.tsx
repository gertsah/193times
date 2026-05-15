"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Wordmark, { Mark } from "./Wordmark";
import GridPulse from "./primitives/GridPulse";

/**
 * Full-screen intro. Sits behind the main content via the sticky
 * wrapper in page.tsx — `main` then scrolls up over this panel.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? 193 : 0);
  const [scrolled, setScrolled] = useState(0);

  // Counter 000 → 193
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now() + 350;
    const end = start + 2000;
    const tick = (t: number) => {
      if (t < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, (t - start) / (end - start));
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 193));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Fade slightly as user scrolls into the hand-off zone.
  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      setScrolled(Math.min(1, window.scrollY / (h * 0.9)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDone = count >= 193;
  const opacity = 1 - scrolled * 0.55;
  const blur = scrolled * 6;
  const scale = 1 - scrolled * 0.02;

  return (
    <div
      className="relative grid h-screen w-full place-items-center overflow-hidden"
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
      }}
    >
      {/* Background video — full bleed, soft blur, muted */}
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/media/hero.png"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ filter: "blur(6px) saturate(1.05) brightness(0.7)" }}
      >
        <source src="/media/intro.mp4" type="video/mp4" />
      </video>

      {/* Backdrop ornaments + readability overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/35 to-bg/80" />
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/12 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px hairline" />
        <div className="absolute inset-x-0 bottom-0 h-px hairline" />
      </div>

      {/* Invisible grid — square cells light up sequentially in ember */}
      <GridPulse cellSize={130} count={7} swapMs={320} fadeMs={800} peakOpacity={0.22} />

      {/* Top strip — issue + location */}
      <div className="absolute inset-x-0 top-0 px-6 py-5 md:px-10 md:py-7">
        <div className="flex items-center justify-between marginalia">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            Выпуск № <span className="text-ember">193</span> · весна 2026
          </span>
          <span className="hidden md:inline">
            193Times Studio · <span className="text-ink">Новороссийск, RU</span>
          </span>
        </div>
      </div>

      {/* Mark + wordmark + counter, centered.
          Wordmark sized to roughly match the embedded video text. */}
      <div className="relative flex flex-col items-center gap-6 px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Mark size={44} />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <Wordmark className="text-[14vw] tracking-[-0.04em] leading-none md:text-[11vw] lg:text-[9.4vw]" overlap="-0.02em" />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex w-full max-w-[460px] items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-6 bg-muted/50" />
            Digital Studio · Новороссийск
          </span>
          <span className="tabular-nums text-ink">
            {String(count).padStart(3, "0")} / 193
          </span>
        </motion.div>
      </div>

      {/* Bottom — scroll cue */}
      <div className="absolute inset-x-0 bottom-0 px-6 py-5 md:px-10 md:py-7">
        <div className="flex items-center justify-between marginalia">
          <span>Сайты · Визуалы · Автоматизации</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isDone ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2"
          >
            Прокрутите вниз
            <motion.span
              aria-hidden
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="inline-block text-ember"
            >
              ↓
            </motion.span>
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export default Intro;
