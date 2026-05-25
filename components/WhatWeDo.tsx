"use client";

import Section from "./primitives/Section";
import Reveal from "./primitives/Reveal";
import Carousel from "./primitives/Carousel";
import { VisualsTiles, AutomationGraph } from "./primitives/disciplineVisuals";

const WEBSITE_ITEMS = [
  "Лендинги под ключ",
  "Маркетинговые сайты",
  "UI / UX дизайн",
  "Дизайн-системы",
  "Дашборды",
  "API-интеграции",
];

export default function WhatWeDo() {
  return (
    <Section
      id="services"
      index="01"
      label="Что мы делаем"
      lead={
        <>
          Три дисциплины,{" "}
          <em className="not-italic text-ember">одна студия.</em>
        </>
      }
      intro="Мы не сдаём «макеты» — мы поставляем рабочие системы из дизайна, кода и AI-усиленных воркфлоу. Возьмите одну дисциплину или весь пакет."
    >
      {/* Featured discipline — Сайты + carousel */}
      <Reveal>
        <div className="pt-8">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 flex items-baseline gap-3 md:col-span-4">
              <span className="text-lg text-ember">ⓐ</span>
              <h3 className="display text-4xl md:text-5xl">Сайты</h3>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted">
                Главная дисциплина. Лендинги и интерфейсы на чистом коде
                с кастомной анимацией и структурой под конверсию — каждый
                собран как продукт, а не страница.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {WEBSITE_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Carousel of beautiful site previews */}
          <div className="mt-10">
            <Carousel />
          </div>
        </div>
      </Reveal>

      {/* Discipline B — content left, generative grid right */}
      <DisciplineRow
        mark="ⓑ"
        title="Визуалы и дизайн"
        body="Режиссируем кадры и оформление — от AI-графики до выверенной полиграфики. Каждый визуал заточен под бренд, а не под сток."
        items={[
          "AI-визуалы",
          "Графический дизайн",
          "Инфографика",
          "Презентации",
          "Бренд-визуалы",
          "Контент для соцсетей",
        ]}
        visual={<VisualsTiles />}
      />

      {/* Discipline C — graph left, content right (alternated) */}
      <DisciplineRow
        mark="ⓒ"
        title="Автоматизации"
        body="Тихие системы, которые экономят часы каждую неделю — формы, боты, дашборды и AI, связанные в один поток."
        items={[
          "CRM-сценарии",
          "Telegram / Discord боты",
          "AI-ассистенты",
          "Формы → CRM",
          "Внутренние тулзы",
          "No-code + code",
        ]}
        visual={<AutomationGraph />}
        flip
      />
    </Section>
  );
}

function DisciplineRow({
  mark,
  title,
  body,
  items,
  visual,
  flip = false,
}: {
  mark: string;
  title: string;
  body: string;
  items: string[];
  visual: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <Reveal>
      <div className="mt-20 grid grid-cols-12 items-center gap-x-6 gap-y-10 md:mt-28">
        {/* Content */}
        <div
          className={`col-span-12 md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}
        >
          <div className="flex items-baseline gap-3">
            <span className="text-xl text-ember">{mark}</span>
            <h3 className="display text-4xl md:text-6xl">{title}</h3>
          </div>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted md:text-lg">
            {body}
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-px sm:grid-cols-2">
            {items.map((item, i) => (
              <li key={item}>
                <a
                  href="#contact"
                  className="group flex items-baseline gap-3 py-2.5"
                >
                  <span className="font-mono text-[10px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[17px] text-ink transition-colors group-hover:text-ember">
                    {item}
                  </span>
                  <span className="ml-auto translate-x-0 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ember group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div
          className={`col-span-12 md:col-span-6 ${flip ? "md:order-1" : "md:col-start-7"}`}
        >
          {visual}
        </div>
      </div>
    </Reveal>
  );
}
