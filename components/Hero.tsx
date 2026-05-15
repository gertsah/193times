"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./primitives/SectionLabel";
import SplitReveal from "./primitives/SplitReveal";

const TICKER = [
  "САЙТЫ",
  "ВИЗУАЛЫ",
  "АВТОМАТИЗАЦИИ",
  "AI WORKFLOWS",
  "ИНТЕРФЕЙСЫ",
  "БРЕНД-СИСТЕМЫ",
];

export default function Hero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLElement>(null);

  // cursor glow — sets CSS vars on the section root
  useEffect(() => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--cursor-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--cursor-y", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduce]);

  // scroll-linked parallax for code panels
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const yB = useTransform(scrollYProgress, [0, 1], [40, -180]);
  const yC = useTransform(scrollYProgress, [0, 1], [120, -60]);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative isolate overflow-hidden bg-bg pt-28 md:pt-36 shadow-[0_-30px_60px_-30px_rgba(255,59,31,0.45)]"
    >
      {/* Hairline that flashes ember as hero slides up over intro */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-ember/15 to-transparent blur-sm"
      />

      {/* Background image with a soft top mask */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/media/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.55] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_85%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/60 to-bg" />
        <div className="absolute inset-0 grid-overlay opacity-[0.35]" />
        <div className="cursor-glow absolute inset-0" />
      </div>

      {/* Top frame — issue + REC stamp */}
      <div className="container-x">
        <div className="flex items-center justify-between pb-8">
          <SectionLabel index="00">Выпуск №193 — весенний релиз</SectionLabel>
          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:flex">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              REC
            </span>
            <span>·</span>
            <span>44.7235° N · 37.7686° E · Новороссийск</span>
          </div>
        </div>

        <div className="hairline h-px w-full" aria-hidden />
      </div>

      {/* Headline + side column + code panels */}
      <div className="container-x relative grid grid-cols-12 gap-x-6 pt-10 pb-20 md:pt-16 md:pb-32">
        {/* Left mono kicker */}
        <div className="col-span-12 md:col-span-3 md:pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="marginalia">
              <span className="text-ember">A</span> code-driven creative studio
            </p>
            <p className="font-mono text-xs leading-relaxed text-muted">
              <span className="text-ink">193Times</span> — студия из Новороссийска.
              Делаем сайты, визуалы и бизнес-автоматизации через дизайн, код и
              AI-инструменты.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Est. <span className="text-ink">No.193</span> · Field Notes
            </p>
          </motion.div>
        </div>

        {/* Headline */}
        <div className="relative col-span-12 md:col-span-9 md:-mt-3">
          <h1 className="text-balance font-sans font-black tracking-[-0.045em] leading-[0.95] text-[14vw] md:text-[10.4vw] lg:text-[9rem] xl:text-[10.5rem]">
            <span className="block">
              <SplitReveal stagger={0.07} delay={0.1}>
                {"Сайты, "}
                <span className="font-display font-normal italic text-ember">визуалы</span>
                {" &"}
              </SplitReveal>
            </span>
            <span className="block">
              <SplitReveal stagger={0.07} delay={0.35}>
                автоматизации,
              </SplitReveal>
            </span>
            <span className="block">
              <SplitReveal stagger={0.07} delay={0.6}>
                <span className="text-muted">собранные </span>
                <span className="font-display font-normal italic text-ember">кодом.</span>
              </SplitReveal>
            </span>
          </h1>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-12 flex flex-col items-start gap-6 md:mt-14 md:flex-row md:items-center md:gap-8"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-transform hover:-translate-y-0.5"
            >
              Начать проект
              <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden>
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>

            <a
              href="#work"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80 transition-colors hover:text-ink"
            >
              <span className="inline-block h-px w-8 bg-ink/40 transition-all group-hover:w-12 group-hover:bg-ember" />
              Посмотреть работы
            </a>

            <div className="ml-auto hidden flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted lg:flex">
              <span>Бронь Q3 — Q4 / 2026</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                Осталось 2 слота
              </span>
            </div>
          </motion.div>
        </div>

        {/* Floating code panels — desktop only */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <motion.div
            style={{ y: yA }}
            className="pointer-events-auto absolute right-[6%] top-[8%] w-[320px]"
          >
            <CodePanel
              file="studio.config.ts"
              lines={[
                [{ s: "k", t: "const" }, { t: " " }, { s: "c", t: "studio" }, { t: " = {" }],
                [{ t: "  name: " }, { s: "s", t: "\"193Times\"" }, { t: "," }],
                [{ t: "  stack: " }, { s: "s", t: "[\"next\", \"motion\"]" }, { t: "," }],
                [{ t: "  region: " }, { s: "s", t: "\"RU-Новороссийск\"" }, { t: "," }],
                [{ t: "  mode: " }, { s: "s", t: "\"code-driven\"" }, { t: "," }],
                [{ t: "};" }],
              ]}
            />
          </motion.div>

          <motion.div
            style={{ y: yB }}
            className="pointer-events-auto absolute right-[2%] top-[46%] w-[280px]"
          >
            <CodePanel
              file="POST /brief"
              kind="api"
              lines={[
                [{ t: "{" }],
                [{ t: "  " }, { s: "k", t: "\"status\"" }, { t: ": " }, { s: "n", t: "201" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"reply\"" }, { t: ": " }, { s: "s", t: "\"≤ 24ч\"" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"slots\"" }, { t: ": " }, { s: "n", t: "2" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"queue\"" }, { t: ": " }, { s: "s", t: "\"Q3—Q4 / 2026\"" }],
                [{ t: "}" }],
              ]}
            />
          </motion.div>

          <motion.div
            style={{ y: yC }}
            className="pointer-events-auto absolute left-[2%] bottom-[8%] w-[290px]"
          >
            <CodePanel
              file="zsh"
              kind="term"
              lines={[
                [{ s: "p", t: "$ " }, { s: "c", t: "hf" }, { t: " deploy --prod" }],
                [{ s: "p", t: "› " }, { t: "build      " }, { s: "g", t: "ok" }],
                [{ s: "p", t: "› " }, { t: "visuals    " }, { s: "g", t: "ok" }],
                [{ s: "p", t: "› " }, { t: "automation " }, { s: "g", t: "ok" }],
                [{ s: "p", t: "› " }, { t: "ship       " }, { s: "e", t: "193ms ✓" }],
              ]}
            />
          </motion.div>
        </div>
      </div>

      {/* Lower marquee ticker */}
      <div className="relative border-y border-line bg-bg/60 backdrop-blur-sm">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee-slow whitespace-nowrap font-sans font-black tracking-[-0.04em] text-[6.5vw] md:text-[3.4vw]">
            {[...Array(2)].flatMap((_, dup) =>
              TICKER.map((word, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-10 px-8 leading-none"
                >
                  <span
                    className={
                      i % 2 === 0
                        ? "text-ink"
                        : "font-display font-normal italic text-ember/80 ember-stroke"
                    }
                  >
                    {word}
                  </span>
                  <Spark />
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Code panel ─────────────── */

type Seg = { s?: string; t: string };

/** Style codes:
 *   k - keyword (ember)        s - string (gold)
 *   n - number (ember dim)     p - punctuation (muted)
 *   c - constant (ink-bright)  g - success (mint via amber/gold)
 *   e - emphasis (ember bold)  default - ink/85
 */
function CodePanel({
  file,
  lines,
  kind = "code",
}: {
  file: string;
  lines: Seg[][];
  kind?: "code" | "api" | "term";
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line bg-card/95 font-mono text-[11px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,59,31,0.08)] backdrop-blur"
      role="figure"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-line bg-bg/60 px-3 py-2">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {file}
        </span>
        <span className="text-[10px] text-muted">
          {kind === "api" ? "200 OK" : kind === "term" ? "zsh" : "ts"}
        </span>
      </div>
      <pre className="m-0 p-3.5 leading-[1.55] text-ink">
        {lines.map((row, i) => (
          <div key={i} className="flex whitespace-pre">
            <span className="mr-3 w-4 select-none text-right text-muted/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">
              {row.map((seg, k) => (
                <span key={k} className={styleClass(seg.s)}>
                  {seg.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function styleClass(code: string | undefined) {
  switch (code) {
    case "k":
      return "text-ember";
    case "s":
      return "text-gold/90";
    case "n":
      return "text-ember/80";
    case "p":
      return "text-muted";
    case "c":
      return "text-ink font-semibold";
    case "g":
      return "text-gold";
    case "e":
      return "text-ember font-semibold";
    default:
      return "text-ink/85";
  }
}

function Spark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 text-ember/80"
      aria-hidden
    >
      <path
        d="M12 1l1.6 8.4L22 12l-8.4 1.6L12 22l-1.6-8.4L2 12l8.4-1.6z"
        fill="currentColor"
      />
    </svg>
  );
}
