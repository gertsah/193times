"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./primitives/SectionLabel";
import SplitReveal from "./primitives/SplitReveal";
import CodeRain from "./primitives/CodeRain";

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

  // subtle scroll-linked parallax for each panel
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [70, -30]);
  const yC = useTransform(scrollYProgress, [0, 1], [10, -90]);

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

      {/* Background — black + matrix code rain */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-bg">
        <CodeRain
          className="absolute inset-0 h-full w-full opacity-[0.55] [mask-image:linear-gradient(to_bottom,black_55%,transparent_95%)]"
          fontSize={16}
          speed={1}
        />
        {/* Readability vignette behind the headline */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.8)_60%,var(--bg)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
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

      {/* Headline + side column */}
      <div className="container-x relative grid grid-cols-12 gap-x-6 pt-10 md:pt-16">
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
          <h1 className="text-balance font-sans font-black tracking-[-0.045em] leading-[0.95] text-[11.5vw] md:text-[10.4vw] lg:text-[9rem] xl:text-[10.5rem]">
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
      </div>

      {/* Code panels — full-width row below CTA, no overlap with headline */}
      <div className="container-x mt-16 pb-20 md:mt-24 md:pb-32">
        <div className="mb-6 flex items-center justify-between gap-3">
          <SectionLabel index="01">Live · код студии в реальном времени</SectionLabel>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:inline">
            <span className="text-ember">●</span>&nbsp; streaming · 3 sources
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-6">
          <motion.div style={{ y: yA }} className="lg:col-span-4">
            <CodePanel
              file="studio.config.ts"
              kind="code"
              statusRight="ts · v1.9.3"
              live
              lines={[
                [{ s: "p", t: "// brand · stack · capacity" }],
                [{ s: "k", t: "import" }, { t: " { Studio } " }, { s: "k", t: "from" }, { t: " " }, { s: "s", t: "\"@193t/core\"" }, { t: ";" }],
                [{ t: "" }],
                [{ s: "k", t: "export const" }, { t: " " }, { s: "c", t: "studio" }, { t: ": " }, { s: "c", t: "Studio" }, { t: " = {" }],
                [{ t: "  name: " }, { s: "s", t: "\"193Times\"" }, { t: "," }],
                [{ t: "  region: " }, { s: "s", t: "\"RU-Новороссийск\"" }, { t: "," }],
                [{ t: "  stack: " }, { s: "s", t: "[\"next\", \"motion\", \"tailwind\"]" }, { t: "," }],
                [{ t: "  ai: " }, { s: "s", t: "[\"claude-4.7\", \"gpt-5\", \"sora\"]" }, { t: "," }],
                [{ t: "  ship: " }, { s: "n", t: "193" }, { t: "," }, { s: "p", t: " // дней опыта" }],
                [{ t: "  free: " }, { s: "n", t: "2" }, { t: "," }, { s: "p", t: " // слота / квартал" }],
                [{ t: "};" }],
              ]}
            />
          </motion.div>

          <motion.div style={{ y: yB }} className="lg:col-span-4">
            <CodePanel
              file="POST /api/brief"
              kind="api"
              statusRight="201 Created · 142ms"
              live
              lines={[
                [{ s: "p", t: "→ POST https://193times.ru/api/brief" }],
                [{ s: "p", t: "← server response" }],
                [{ t: "{" }],
                [{ t: "  " }, { s: "k", t: "\"status\"" }, { t: ":   " }, { s: "n", t: "201" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"reply\"" }, { t: ":    " }, { s: "s", t: "\"≤ 24ч\"" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"queue\"" }, { t: ":    " }, { s: "s", t: "\"Q3—Q4 / 2026\"" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"slots\"" }, { t: ":    " }, { s: "n", t: "2" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"rate\"" }, { t: ":     " }, { s: "s", t: "\"₽12k/час\"" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"contact\"" }, { t: ":  " }, { s: "s", t: "\"193times@mail.ru\"" }, { t: "," }],
                [{ t: "  " }, { s: "k", t: "\"id\"" }, { t: ":       " }, { s: "s", t: "\"brief_9a3b41\"" }],
                [{ t: "}" }],
              ]}
            />
          </motion.div>

          <motion.div style={{ y: yC }} className="md:col-span-2 lg:col-span-4">
            <CodePanel
              file="zsh — ~/193t"
              kind="term"
              statusRight="exit 0 · 1.93s"
              live
              lines={[
                [{ s: "p", t: "$ " }, { s: "c", t: "hf" }, { t: " deploy --prod --notes 'spring drop'" }],
                [{ s: "p", t: "› " }, { t: "compile     " }, { s: "g", t: "ok" }, { t: "   " }, { s: "p", t: "+187 modules" }],
                [{ s: "p", t: "› " }, { t: "bundle      " }, { s: "g", t: "ok" }, { t: "   " }, { s: "p", t: "218.4 kb gz" }],
                [{ s: "p", t: "› " }, { t: "visuals     " }, { s: "g", t: "ok" }, { t: "   " }, { s: "p", t: "12 frames"   }],
                [{ s: "p", t: "› " }, { t: "automation  " }, { s: "g", t: "ok" }, { t: "   " }, { s: "p", t: "9 hooks"     }],
                [{ s: "p", t: "› " }, { t: "lighthouse  " }, { s: "g", t: "99/100" }],
                [{ s: "p", t: "› " }, { t: "deploy      " }, { s: "g", t: "live" }, { t: " " }, { s: "p", t: "193times.ru" }],
                [{ s: "p", t: "› " }, { t: "ship        " }, { s: "e", t: "193ms ✓" }],
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
 *   n - number (ember dim)     p - punctuation / comment (muted)
 *   c - constant (ink-bright)  g - success (gold)
 *   e - emphasis (ember bold)  default - ink/85
 */
function CodePanel({
  file,
  lines,
  kind = "code",
  statusRight,
  live = false,
}: {
  file: string;
  lines: Seg[][];
  kind?: "code" | "api" | "term";
  statusRight?: string;
  live?: boolean;
}) {
  const reduce = useReducedMotion();

  // Flatten lines into a character stream so we can reveal progressively.
  const flat = useMemo(() => {
    const out: { ch: string; s?: string }[] = [];
    lines.forEach((row, li) => {
      row.forEach((seg) => {
        for (const ch of seg.t) out.push({ ch, s: seg.s });
      });
      if (li < lines.length - 1) out.push({ ch: "\n" });
    });
    return out;
  }, [lines]);

  const [pos, setPos] = useState(live && !reduce ? 0 : flat.length);

  useEffect(() => {
    if (!live || reduce) {
      setPos(flat.length);
      return;
    }
    const total = flat.length;
    const speedMin = 18;
    const speedMax = 42;
    const pauseFull = 2400;
    const pauseEol = 220;
    let cur = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (cur < total) {
        cur += 1;
        setPos(cur);
        const justTyped = flat[cur - 1]?.ch;
        const wait =
          justTyped === "\n"
            ? pauseEol
            : speedMin + Math.random() * (speedMax - speedMin);
        timer = setTimeout(step, wait);
      } else {
        timer = setTimeout(() => {
          cur = 0;
          setPos(0);
          timer = setTimeout(step, 280);
        }, pauseFull);
      }
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [flat, live, reduce]);

  // Rebuild styled lines from the revealed slice of the flat stream.
  const revealed = useMemo(() => {
    if (pos >= flat.length) return lines;
    const out: Seg[][] = [[]];
    for (let i = 0; i < pos; i++) {
      const { ch, s } = flat[i];
      if (ch === "\n") {
        out.push([]);
      } else {
        const row = out[out.length - 1];
        const last = row[row.length - 1];
        if (last && last.s === s) last.t += ch;
        else row.push({ s, t: ch });
      }
    }
    return out;
  }, [pos, flat, lines]);

  const totalLines = lines.length;
  const caretRow = revealed.length - 1;
  const isTyping = live && !reduce && pos < flat.length;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line bg-card/95 font-mono text-[12px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,59,31,0.08)] backdrop-blur"
      role="figure"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-line bg-bg/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-ember/70" />
        </span>
        <span className="text-[10.5px] uppercase tracking-[0.16em] text-muted">
          {file}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {statusRight ?? (kind === "api" ? "200 OK" : kind === "term" ? "zsh" : "ts")}
        </span>
      </div>
      {/* Body, sized to total content so layout stays stable while typing */}
      <pre
        className="m-0 p-4 leading-[1.55] text-ink"
        style={{ minHeight: `${totalLines * 1.55 + 0.6}em` }}
      >
        {revealed.map((row, i) => (
          <div key={i} className="flex whitespace-pre">
            <span className="mr-3 w-5 select-none text-right text-muted/45">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">
              {row.map((seg, k) => (
                <span key={k} className={styleClass(seg.s)}>
                  {seg.t}
                </span>
              ))}
              {isTyping && i === caretRow && (
                <span className="ml-[1px] inline-block h-[1.05em] w-[7px] -mb-[2px] animate-pulse bg-ember align-baseline" />
              )}
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
