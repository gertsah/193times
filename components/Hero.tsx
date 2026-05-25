"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const COLS = 12;
const ROWS = 7;
const ease = [0.16, 1, 0.3, 1] as const;
const PROMPT = "193t@studio ~ %";

// Hand-drawn 8-bit up arrow built from pixel cells
function PixelArrowUp({ className = "" }: { className?: string }) {
  const cells = [
    [3, 0],
    [2, 1], [3, 1], [4, 1],
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ];
  return (
    <svg
      viewBox="0 0 21 21"
      width="16"
      height="16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      {cells.map(([c, r], i) => (
        <rect key={i} x={c * 3} y={r * 3} width="3" height="3" />
      ))}
    </svg>
  );
}

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setT(
        new Date().toLocaleTimeString("ru-RU", {
          hour12: false,
          timeZone: "Europe/Moscow",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums text-ink">{t}</span>;
}

function ConsoleGroup({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-faint">{title}</p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-1.5 h-px w-full origin-left bg-line"
      />
      <div className="mt-2.5 space-y-1.5">{children}</div>
    </motion.div>
  );
}

function Row({
  k,
  v,
  accent = false,
}: {
  k: string;
  v: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-faint">{k}</span>
      <span className={accent ? "text-ember" : "text-ink/90"}>{v}</span>
    </div>
  );
}

export default function Hero({ onEnter }: { onEnter: () => void }) {
  const reduce = useReducedMotion();
  const measureRef = useRef<HTMLSpanElement>(null);
  const [dims, setDims] = useState({ side: 150, wide: 540, glyph: 50 });
  const [ready, setReady] = useState(false);
  const [light, setLight] = useState(false);
  const [cover, setCover] = useState<"in" | "out" | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const mobile = window.innerWidth < 640;
      const side = mobile ? 96 : 150;
      const textW = measureRef.current?.offsetWidth ?? 360;
      setDims({
        side,
        wide: textW + (mobile ? 34 : 64),
        glyph: Math.round(side * 0.34),
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Always start the intro at the very top, even on refresh-while-scrolled
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // Lock scroll until the hero flips to light
  useEffect(() => {
    if (light) return;
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [light]);

  // Logo becomes clickable after the fall + morph timeline
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), reduce ? 150 : 2950);
    return () => window.clearTimeout(t);
  }, [reduce]);

  function handleEnter() {
    if (!ready || cover || light) return;
    setCover("in");
    window.setTimeout(() => {
      setLight(true);
      onEnter();
      setCover("out");
    }, 820);
    window.setTimeout(() => setCover(null), 1650);
  }

  const tiles = Array.from({ length: COLS * ROWS });

  return (
    <section
      id="top"
      className={`relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden ${light ? "" : "theme-dark"}`}
      style={{ background: light ? "rgb(var(--c-bg))" : "#020202" }}
    >
      {/* Grain only while dark */}
      {!light && (
        <div
          aria-hidden
          className="grain-anim pointer-events-none absolute inset-[-8%] h-[116%] w-[116%] opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: "180px 180px",
          }}
        />
      )}

      {/* hidden measurer */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute whitespace-nowrap font-sans text-[28px] font-medium uppercase tracking-[0.14em] sm:text-[46px]"
      >
        193TIMES
      </span>

      {/* Full-screen console — light phase. Panels frame the centered logo. */}
      <AnimatePresence>
        {light && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="pointer-events-none absolute inset-0 z-0 hidden flex-col font-mono text-[11.5px] leading-relaxed text-ink/85 lg:flex"
          >
            {/* status bar */}
            <div className="edge flex items-center justify-between border-b border-line py-3 pt-24">
              <span className="text-faint">TERMINAL_01 · 193TIMES CONSOLE</span>
              <span className="text-faint">
                USER: GUEST&nbsp;&nbsp;|&nbsp;&nbsp;MODE: READONLY&nbsp;&nbsp;|&nbsp;&nbsp;
                <Clock />
              </span>
            </div>

            {/* body */}
            <div className="edge grid flex-1 grid-cols-12 gap-x-8 py-10">
              {/* left panel */}
              <div className="col-span-3 space-y-7">
                <ConsoleGroup title="WELCOME" delay={0.55}>
                  <p className="text-muted">WELCOME TO 193TIMES CONSOLE</p>
                  <p className="text-faint">
                    TYPE &apos;HELP&apos; TO SEE COMMANDS
                    <span className="ml-1 inline-block h-[1em] w-[6px] -mb-[2px] animate-pulse bg-ember align-baseline" />
                  </p>
                </ConsoleGroup>
                <ConsoleGroup title="> STATUS" delay={0.7}>
                  <Row k="MODE" v="LIVE" accent />
                  <Row k="CONNECTION" v="SECURE" />
                  <Row k="UPTIME" v="193 DAYS" />
                  <Row k="VERSION" v="1.0.0" />
                </ConsoleGroup>
                <ConsoleGroup title="> SERVICES" delay={0.85}>
                  <Row k="[01]" v="САЙТЫ" />
                  <Row k="[02]" v="ВИЗУАЛЫ" />
                  <Row k="[03]" v="АВТОМАТИЗАЦИИ" />
                </ConsoleGroup>
              </div>

              {/* center — logo overlays here */}
              <div className="col-span-6" />

              {/* right panel */}
              <div className="col-span-3 space-y-7">
                <ConsoleGroup title="SYSTEM_OVERVIEW" delay={0.6}>
                  <Row k="DATE" v="2026-05-25" />
                  <Row k="TIME" v={<Clock />} />
                  <Row k="TIMEZONE" v="UTC+03 · MSK" />
                </ConsoleGroup>
                <ConsoleGroup title="LOAD" delay={0.75}>
                  <Row k="STUDIO" v="ONLINE" accent />
                  <Row k="RESPONSE" v="≤24H" />
                  <Row k="SLOTS" v="2 / QUARTER" />
                </ConsoleGroup>
                <ConsoleGroup title="SESSION" delay={0.9}>
                  <Row k="LOCATION" v="НОВОРОССИЙСК" />
                  <Row k="PORT" v="19300" />
                  <Row k="PERMS" v="GUEST" />
                </ConsoleGroup>
              </div>
            </div>

            {/* bottom bar */}
            <div className="edge flex items-center justify-between border-t border-line py-3 pb-6">
              <span className="text-faint">
                193TIMES CONSOLE · SECURE · MINIMAL · TIMELESS
              </span>
              <span className="text-faint">© 2026 193TIMES · ВСЕ ПРАВА</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo + hint group */}
      <div className="relative z-10 flex items-center justify-center text-ink">
        <motion.div
          role={ready && !light ? "button" : undefined}
          tabIndex={ready && !light ? 0 : -1}
          aria-label={ready && !light ? "Войти на сайт" : undefined}
          onClick={handleEnter}
          onKeyDown={(e) => {
            if (ready && !light && (e.key === "Enter" || e.key === " "))
              handleEnter();
          }}
          initial={
            reduce
              ? { width: dims.wide, opacity: 1 }
              : { y: -540, rotate: -12, opacity: 0, width: dims.side }
          }
          animate={
            reduce
              ? { width: dims.wide, opacity: 1 }
              : {
                  y: [-540, 0, -150, 0, -64, 0, -22, 0],
                  rotate: [-12, 6, -5, 4, -2, 1, 0, 0],
                  opacity: 1,
                  width: dims.wide,
                }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  y: {
                    duration: 1.5,
                    times: [0, 0.32, 0.46, 0.6, 0.72, 0.84, 0.93, 1],
                    ease: "easeOut",
                  },
                  rotate: {
                    duration: 1.5,
                    times: [0, 0.32, 0.46, 0.6, 0.72, 0.84, 0.93, 1],
                    ease: "easeOut",
                  },
                  opacity: { duration: 0.4 },
                  width: { duration: 0.7, delay: 1.95, ease },
                }
          }
          whileHover={ready && !light ? { scale: 1.035 } : undefined}
          whileTap={ready && !light ? { scale: 0.97 } : undefined}
          style={{ height: dims.side }}
          className={`relative flex items-center justify-center overflow-hidden border-[2.5px] border-current outline-none transition-colors duration-300 ${
            ready && !light
              ? "cursor-pointer hover:text-ember focus-visible:text-ember"
              : ""
          }`}
        >
          <motion.div
            initial={{ opacity: reduce ? 0 : 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 1.75 }}
            style={{ fontSize: dims.glyph }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-2 place-items-center font-sans font-extrabold leading-none tracking-tight"
          >
            <span>9</span>
            <span>3</span>
            <span>1</span>
            <span>T</span>
          </motion.div>

          <motion.span
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 2.5 }}
            className="whitespace-nowrap font-sans text-[28px] font-medium uppercase tracking-[0.14em] sm:text-[46px]"
          >
            193TIMES
          </motion.span>
        </motion.div>

        {/* Click hint (dark phase only) */}
        <div className="absolute left-1/2 top-full mt-7 -translate-x-1/2">
          <AnimatePresence>
            {ready && !light && !cover && (
              <motion.button
                type="button"
                onClick={handleEnter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                className="group flex flex-col items-center gap-1.5 text-muted transition-colors hover:text-ember"
              >
                <PixelArrowUp className="animate-bounce" />
                <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em]">
                  Нажмите на лого
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll hint (light phase) */}
      <AnimatePresence>
        {light && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted"
          >
            Листай ↓
          </motion.span>
        )}
      </AnimatePresence>

      {/* Grid flip — covers dark, then retracts to reveal the light hero */}
      {cover && (
        <div
          className="pointer-events-none absolute inset-0 z-[60] grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {tiles.map((_, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const delay = (col + row) * 0.024;
            return (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: cover === "out" ? 0 : 1 }}
                transition={{ duration: 0.32, delay, ease }}
                style={{
                  transformOrigin: cover === "in" ? "top" : "bottom",
                  background: "rgb(244 242 236)",
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
