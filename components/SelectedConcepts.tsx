"use client";

import Section from "./primitives/Section";
import Reveal from "./primitives/Reveal";

type Item = {
  index: string;
  title: string;
  tags: string[];
  year: string;
};

const ITEMS: Item[] = [
  { index: "01", title: "Лендинг", tags: ["Сайт", "UI", "Код"], year: "2026" },
  {
    index: "02",
    title: "AI Visual Pack",
    tags: ["Визуалы", "AI", "Бренд"],
    year: "2026",
  },
  {
    index: "03",
    title: "Automation Flow",
    tags: ["Код", "Workflow", "AI"],
    year: "2026",
  },
  {
    index: "04",
    title: "Brand System",
    tags: ["Дизайн", "Веб", "Ассеты"],
    year: "2026",
  },
];

export default function SelectedConcepts() {
  return (
    <Section
      id="work"
      index="02"
      label="Избранные работы"
      lead={
        <>
          Концепты в <em className="not-italic text-ember">движении.</em>
        </>
      }
      intro="Короткая подборка направлений — каждое как рабочая digital-система. Реальные кейсы появятся в карусели выше."
    >
      <div>
        {ITEMS.map((c, i) => (
          <Reveal key={c.index} delay={i * 0.05}>
            <a
              href="#contact"
              className="group block py-6 md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 md:py-8"
            >
              <div className="flex items-baseline gap-4 md:contents">
                <span className="font-mono text-[11px] text-faint md:col-span-1">
                  {c.index}
                </span>
                <h3 className="display text-3xl transition-colors group-hover:text-ember md:col-span-5 md:text-5xl">
                  {c.title}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 pl-8 md:mt-0 md:contents md:pl-0">
                <ul className="flex flex-wrap gap-x-4 gap-y-1 md:col-span-4 md:col-start-7">
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="flex shrink-0 items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:col-span-2">
                  ©{c.year}
                  <span className="text-ember opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <span className="label">Закрытие — 04 / 04</span>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink"
        >
          Заказать похожее
          <span className="inline-block h-px w-8 bg-faint transition-all group-hover:w-12 group-hover:bg-ember" />
        </a>
      </div>
    </Section>
  );
}
