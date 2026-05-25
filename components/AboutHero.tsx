"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const DISCIPLINES = ["сайты", "визуалы", "автоматизации", "AI-воркфлоу"];
const STATS = [
  { n: "193", label: "дня в деле", count: true },
  { n: "2", label: "проекта / квартал" },
  { n: "≤24ч", label: "ответ на бриф" },
  { n: "100%", label: "кастомный код" },
];

export default function AboutHero() {
  return (
    <section
      id="about"
      className="relative min-h-[100svh] pt-28 pb-16 md:pt-32"
    >
      <div className="edge">
        {/* Headline — top aligned, clear */}
        <h2 className="display max-w-[20ch] text-pretty text-[2.8rem] leading-[0.98] sm:text-7xl lg:text-[6.4rem]">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="block"
          >
            Студия, которая собирает
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="block"
          >
            <em className="not-italic text-ember">рабочие продукты</em> — не
            макеты.
          </motion.span>
        </h2>

        {/* Kinetic line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex items-baseline gap-3 font-display text-3xl md:text-5xl"
        >
          <span className="text-muted">делаем</span>
          <RotatingWord />
        </motion.p>

        {/* Supporting grid: copy + stats */}
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="col-span-12 max-w-md text-pretty text-base leading-relaxed text-muted md:col-span-5 md:text-lg"
          >
            Небольшая команда из Новороссийска. Дизайн, код и AI — в одном
            потоке. Берём{" "}
            <span className="text-ink">2 проекта в квартал</span>, и каждый
            получает полное внимание от брифа до запуска.
          </motion.p>

          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-6 md:col-start-7 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="group"
              >
                <div className="display text-4xl tabular-nums transition-colors group-hover:text-ember md:text-5xl">
                  {s.count ? <Counter to={193} /> : s.n}
                </div>
                <div className="label mt-1.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  const [started, setStarted] = useState(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (started || reduce) return;
        setStarted(true);
        const dur = 1400;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true, amount: 0.6 }}
    >
      {val}
    </motion.span>
  );
}

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setI((v) => (v + 1) % DISCIPLINES.length),
      1900,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={DISCIPLINES[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="italic text-ember"
        >
          {DISCIPLINES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
