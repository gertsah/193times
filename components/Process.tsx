"use client";

import Section from "./primitives/Section";
import Reveal from "./primitives/Reveal";

const STEPS = [
  {
    index: "01",
    title: "Понимание",
    keyword: "Бриф",
    body: "Изучаем цель, аудиторию, стиль и тот ограничитель, о котором никто не говорит вслух.",
  },
  {
    index: "02",
    title: "Дизайн",
    keyword: "Direction",
    body: "Задаём направление, структуру, UI и собираем визуальную систему, в которой проект будет жить.",
  },
  {
    index: "03",
    title: "Разработка",
    keyword: "Build",
    body: "Пишем код, собираем ассеты, подключаем формы, API, AI и закадровые автоматизации.",
  },
  {
    index: "04",
    title: "Запуск",
    keyword: "Ship",
    body: "Публикуем, наблюдаем, оптимизируем и передаём работающую систему — а не статичный макет.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      index="03"
      label="Процесс"
      lead={
        <>
          От идеи до{" "}
          <em className="not-italic text-ember">рабочей системы.</em>
        </>
      }
      intro="Четыре фазы. Без agile-театра — прямо, спокойно, production-grade. Большинство проектов мы запускаем за 2—6 недель."
    >
      <div>
        {STEPS.map((s, i) => (
          <Reveal key={s.index} delay={i * 0.06}>
            <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-9 md:py-12">
              <div className="col-span-12 flex items-baseline gap-4 md:col-span-3">
                <span className="font-mono text-xs text-ember">{s.index}</span>
                <span className="label">{s.keyword}</span>
              </div>
              <h3 className="col-span-12 display text-4xl md:col-span-4 md:text-5xl">
                {s.title}
              </h3>
              <p className="col-span-12 max-w-md text-pretty text-base leading-relaxed text-muted md:col-span-5 md:text-lg">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
