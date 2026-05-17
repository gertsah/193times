"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Wordmark, { Mark } from "./Wordmark";
import SplitReveal from "./primitives/SplitReveal";

/**
 * Color-flip section: pure ink-on-bg vs the rest of the dark site.
 *
 * The section pins to the viewport for a short scroll range while a
 * giant wordmark scales up; the bar at the top of the panel travels
 * across as a horizontal progress ribbon. Acts as a visual jolt that
 * also shows the brand on the inverted palette.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wordmarkScale = useTransform(scrollYProgress, [0.15, 0.6], [0.94, 1.05]);
  const bgFill = useTransform(scrollYProgress, [0.05, 0.55], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      aria-label="Манифест"
      className="relative isolate bg-ink text-bg"
    >
      {/* horizontal progress ribbon */}
      <div className="relative h-1 w-full bg-bg/10">
        <motion.div
          style={{ width: bgFill }}
          className="absolute inset-y-0 left-0 bg-ember"
        />
      </div>

      <div className="container-x relative grid grid-cols-12 gap-y-8 py-20 md:gap-x-6 md:py-32">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bg/60">
            §02b · Манифест
          </p>
        </div>

        <div className="col-span-12 md:col-span-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-bg/60">
            <span className="text-ember">·</span> 193Times — Новороссийск
          </p>

          <h2 className="mt-6 max-w-[18ch] font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] text-bg md:text-7xl lg:text-[6.4rem]">
            <SplitReveal>
              Мы не сдаём
            </SplitReveal>
            <br />
            <SplitReveal delay={0.1}>
              <span className="font-display font-normal italic text-ember">макеты</span>
              {" — "}
            </SplitReveal>
            <br />
            <SplitReveal delay={0.25}>
              мы запускаем
            </SplitReveal>
            <br />
            <SplitReveal delay={0.4}>
              {""}
              <span className="font-display font-normal italic text-ember">системы.</span>
            </SplitReveal>
          </h2>

          <div className="mt-10 grid grid-cols-12 gap-y-6 md:gap-x-6">
            <p className="col-span-12 max-w-[60ch] text-lg leading-relaxed text-bg/75 md:col-span-7 md:text-xl">
              Дизайн без кода — это PDF. Код без дизайна — это
              CRUD-форма. 193Times живёт на пересечении: каждый
              проект собирается как продукт — с типографикой, моушном
              и автоматизацией внутри.
            </p>

            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <div className="flex items-start gap-5 rounded-2xl border border-bg/15 bg-bg/5 p-5">
                <Mark invert size={48} />
                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bg/60">
                    Brand mark
                  </p>
                  <p className="text-sm leading-snug text-bg/85">
                    Тот же знак на инвертированной палитре. Бренд
                    работает в обе стороны.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GIANT wordmark behind */}
      <div className="container-x relative pb-16 md:pb-24">
        <motion.div style={{ scale: wordmarkScale }} className="origin-bottom-left">
          <Wordmark className="text-[22vw] tracking-[-0.05em] leading-none md:text-[20vw]" />
        </motion.div>
        <div className="mt-6 flex items-end justify-between border-t border-bg/15 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bg/60">
            Wordmark · light variant · 2026
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bg/60">
            193 / 193
          </span>
        </div>
      </div>
    </section>
  );
}
