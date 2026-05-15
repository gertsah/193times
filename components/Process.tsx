"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "./primitives/SectionLabel";
import Reveal from "./primitives/Reveal";
import SplitReveal from "./primitives/SplitReveal";

const STEPS = [
  {
    index: "01",
    title: "Понимание",
    body: "Изучаем цель, аудиторию, стиль и тот ограничитель, о котором никто не говорит вслух.",
    keyword: "Бриф",
  },
  {
    index: "02",
    title: "Дизайн",
    body: "Задаём направление, структуру, UI и собираем визуальную систему, в которой проект будет жить.",
    keyword: "Direction",
  },
  {
    index: "03",
    title: "Разработка",
    body: "Пишем код, собираем ассеты, подключаем формы, API, AI и закадровые автоматизации.",
    keyword: "Build",
  },
  {
    index: "04",
    title: "Запуск",
    body: "Публикуем, наблюдаем, оптимизируем и передаём работающую систему — а не статичный макет.",
    keyword: "Ship",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section id="process" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-y-10 md:gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="04">Процесс</SectionLabel>
            <h2 className="mt-6 font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] md:text-6xl lg:text-[5.4rem]">
              <SplitReveal>От идеи до</SplitReveal>
              <br />
              <SplitReveal delay={0.15}>
                <span className="font-display font-normal italic text-ember">рабочей системы.</span>
              </SplitReveal>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">
                Четыре фазы. Без agile-театра — прямо, спокойно,
                production-grade. Большинство проектов мы запускаем
                за 2—6 недель.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* vertical timeline */}
          <div
            aria-hidden
            className="absolute left-6 top-0 bottom-0 hidden w-px bg-line md:left-[3.25rem] md:block"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-6 top-0 bottom-0 hidden w-px origin-top bg-ember md:left-[3.25rem] md:block"
          />

          <div className="space-y-12 md:space-y-16">
            {STEPS.map((s, i) => (
              <Reveal key={s.index} delay={i * 0.05}>
                <div className="grid grid-cols-12 items-start gap-y-4 md:gap-x-6">
                  {/* Index column */}
                  <div className="col-span-2 md:col-span-2">
                    <div className="relative inline-flex items-center gap-4">
                      <span
                        aria-hidden
                        className="hidden h-3 w-3 -translate-x-[6px] rounded-full border border-ember bg-bg shadow-[0_0_18px_rgba(255,59,31,0.7)] md:inline-block"
                      />
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                        {s.index}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-sans font-black text-4xl tracking-[-0.04em] leading-none md:text-6xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 marginalia">
                      <span className="text-ember">·</span> {s.keyword}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="col-span-12 md:col-span-5 md:col-start-8">
                    <p className="max-w-[44ch] text-lg leading-relaxed text-ink/85 md:text-xl">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
