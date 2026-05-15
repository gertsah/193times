"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./primitives/SectionLabel";
import Reveal from "./primitives/Reveal";
import SplitReveal from "./primitives/SplitReveal";

export default function WhatWeDo() {
  return (
    <section id="services-overview" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="01">Что мы делаем</SectionLabel>
            <h2 className="mt-6 font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] md:text-6xl lg:text-[5.2rem]">
              <SplitReveal>
                Превращаем идеи в
              </SplitReveal>
              <br />
              <SplitReveal delay={0.15}>
                {""}
                <span className="font-display font-normal italic text-ember">digital-системы.</span>
              </SplitReveal>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal delay={0.1}>
              <p className="max-w-md text-balance text-lg leading-relaxed text-muted md:text-xl">
                Три дисциплины, одна студия. Мы не сдаём «макеты» —
                мы поставляем рабочие системы из дизайна, кода и
                AI-усиленных воркфлоу.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:mt-24 md:grid-cols-3 md:gap-7">
          <Card
            index="A"
            title="Сайты"
            description="Лендинги, маркетинговые сайты и интерфейсы на чистом коде с кастомной анимацией и продуманной структурой под конверсию."
            keywords={["Next.js", "Motion", "CMS", "Edge"]}
            visual={<WebVisual />}
          />
          <Card
            index="B"
            title="Визуалы"
            description="AI-графика, кампании, контент для соцсетей, постеры под моушн и брендовые изображения — режиссируем, не штампуем."
            keywords={["Seedream", "Nano Banana", "Soul", "Арт-дир."]}
            visual={<VisualsVisual />}
            offset
          />
          <Card
            index="C"
            title="Автоматизации"
            description="Формы, CRM-сценарии, боты, дашборды, AI-ассистенты и внутренние тулзы, которые тихо экономят часы каждую неделю."
            keywords={["API", "Webhooks", "AI", "Боты"]}
            visual={<AutomationVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  title,
  description,
  keywords,
  visual,
  offset = false,
}: {
  index: string;
  title: string;
  description: string;
  keywords: string[];
  visual: ReactNode;
  offset?: boolean;
}) {
  return (
    <Reveal delay={offset ? 0.15 : 0}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-card p-6 md:p-7 ${
          offset ? "md:mt-12" : ""
        }`}
      >
        <div className="flex items-center justify-between marginalia">
          <span>Услуга / {index}</span>
          <span className="text-ember/80">↗</span>
        </div>

        <div className="relative mt-6 aspect-[5/4] overflow-hidden rounded-2xl border border-line bg-surface">
          {visual}
        </div>

        <h3 className="mt-7 font-sans font-black text-4xl tracking-[-0.04em] leading-none md:text-[2.6rem]">
          {title}
        </h3>
        <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-muted">
          {description}
        </p>

        <ul className="mt-7 flex flex-wrap gap-1.5 pt-4">
          {keywords.map((k) => (
            <li
              key={k}
              className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
            >
              {k}
            </li>
          ))}
        </ul>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
      </motion.article>
    </Reveal>
  );
}

/* ───────────────── card visuals ──────────────── */

function WebVisual() {
  return (
    <div className="absolute inset-0 grid-overlay p-4">
      <div className="relative h-full w-full rounded-lg border border-line bg-bg/80 p-3 shadow-[inset_0_0_40px_rgba(255,59,31,0.06)]">
        <div className="flex items-center gap-1.5 pb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-ember/70" />
          <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-muted">
            193times.com
          </span>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-7 space-y-2">
            <div className="h-2 w-3/4 rounded-full bg-ink/80" />
            <div className="h-2 w-2/3 rounded-full bg-ink/40" />
            <div className="mt-3 h-12 w-full rounded-md bg-line/60" />
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-16 rounded-full bg-ember" />
              <div className="h-5 w-12 rounded-full border border-line" />
            </div>
          </div>
          <div className="col-span-5 space-y-2">
            <div className="aspect-square w-full rounded-md bg-gradient-to-br from-ember/40 via-amber/20 to-transparent" />
            <div className="h-2 w-full rounded-full bg-line" />
            <div className="h-2 w-2/3 rounded-full bg-line" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-widest text-muted">
          §index — кадр 01
        </div>
      </div>
    </div>
  );
}

function VisualsVisual() {
  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1.5 p-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-md border border-line"
          style={{
            background:
              i % 4 === 0
                ? "linear-gradient(135deg, #FF3B1F 0%, #FF6A00 60%, #050505 100%)"
                : i % 4 === 1
                  ? "radial-gradient(circle at 30% 30%, #F5B23D 0%, #1a1a1a 70%)"
                  : i % 4 === 2
                    ? "conic-gradient(from 120deg, #1a1a1a, #2a2a2a, #1a1a1a, #FF3B1F30, #1a1a1a)"
                    : "linear-gradient(180deg, #0F0F0F 0%, #1F1F1F 100%)",
          }}
        />
      ))}
      <div className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-muted">
        лист 02 — палитра
      </div>
    </div>
  );
}

function AutomationVisual() {
  const nodes = [
    { x: 18, y: 28, label: "FORM" },
    { x: 50, y: 18, label: "AI" },
    { x: 82, y: 32, label: "CRM" },
    { x: 30, y: 70, label: "BOT" },
    { x: 70, y: 70, label: "MAIL" },
    { x: 50, y: 50, label: "" },
  ];
  return (
    <div className="absolute inset-0 grid-overlay">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="line-g" x1="0" x2="1">
            <stop offset="0" stopColor="#FF3B1F" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#FF3B1F" stopOpacity="0.6" />
            <stop offset="1" stopColor="#FF3B1F" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {nodes.slice(0, -1).map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={nodes[5].x}
            y2={nodes[5].y}
            stroke="url(#line-g)"
            strokeWidth="0.3"
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${
            i === 5
              ? "h-9 w-9 rounded-full border border-ember/60 bg-ember/10"
              : "h-3 w-3 rounded-full border border-line bg-bg shadow-[0_0_12px_rgba(255,59,31,0.5)]"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label && i !== 5 && (
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-widest text-muted">
              {n.label}
            </span>
          )}
          {i === 5 && (
            <span className="absolute inset-0 grid place-items-center font-mono text-[8px] uppercase tracking-widest text-ember">
              193
            </span>
          )}
        </div>
      ))}
      <div className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-muted">
        flow.run() — граф
      </div>
    </div>
  );
}
