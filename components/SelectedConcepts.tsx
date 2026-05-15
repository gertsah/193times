"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "./primitives/SectionLabel";
import Reveal from "./primitives/Reveal";
import SplitReveal from "./primitives/SplitReveal";
import { asset } from "@/lib/asset";

type Concept = {
  index: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  year: string;
};

const CONCEPTS: Concept[] = [
  {
    index: "01",
    title: "Лендинг",
    tags: ["Сайт", "UI", "Код"],
    description:
      "Быстрый лендинг с кастомной анимацией и секциями, заточенными под конверсию.",
    image: "/media/concepts/website.png",
    year: "2026",
  },
  {
    index: "02",
    title: "AI Visual Pack",
    tags: ["Визуалы", "AI", "Бренд"],
    description:
      "Набор сгенерированных визуалов для соцсетей, кампаний и hero-кадров.",
    image: "/media/concepts/visuals.png",
    year: "2026",
  },
  {
    index: "03",
    title: "Automation Flow",
    tags: ["Код", "Workflow", "AI"],
    description:
      "Умная форма, связанная с CRM, email, Telegram и приватным дашбордом.",
    image: "/media/concepts/automation.png",
    year: "2026",
  },
  {
    index: "04",
    title: "Brand System",
    tags: ["Дизайн", "Веб", "Ассеты"],
    description:
      "Гибкая digital-айдентика — лого, цвета, типографика, переиспользуемые компоненты.",
    image: "/media/concepts/brand.png",
    year: "2026",
  },
];

export default function SelectedConcepts() {
  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-y-10 md:gap-x-6">
          <div className="col-span-12 md:col-span-8">
            <SectionLabel index="03">Избранные работы</SectionLabel>
            <h2 className="mt-6 font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] md:text-6xl lg:text-[5.4rem]">
              <SplitReveal>Концепты в</SplitReveal>
              <br />
              <SplitReveal delay={0.15}>
                <span className="font-display font-normal italic text-ember">движении.</span>
              </SplitReveal>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">
                Короткая подборка работ для брендов, фаундеров и креаторов —
                каждая как рабочая digital-система.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-12 md:mt-24 md:gap-x-6 md:gap-y-24">
          {CONCEPTS.map((c, i) => (
            <ConceptCard key={c.index} concept={c} alignRight={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-line pt-6">
          <span className="marginalia">Запись поля — закрытие 04 / 04</span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            Заказать похожее
            <span className="inline-block h-px w-8 bg-ink/40 transition-all group-hover:w-12 group-hover:bg-ember" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ConceptCard({
  concept,
  alignRight,
}: {
  concept: Concept;
  alignRight?: boolean;
}) {
  return (
    <Reveal
      className={`col-span-12 md:col-span-6 ${alignRight ? "md:mt-24" : ""}`}
    >
      <motion.article
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="group relative"
      >
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-card">
          {/* Header strip */}
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="marginalia">
              Концепт / <span className="text-ember">{concept.index}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {concept.year}
            </span>
          </div>

          {/* Image */}
          <div className="relative aspect-[5/4] overflow-hidden">
            <motion.div
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 },
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={asset(concept.image)}
                alt={concept.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <h3 className="font-sans font-black text-4xl tracking-[-0.04em] leading-none md:text-5xl">
                {concept.title}
              </h3>
              <ul className="flex flex-wrap justify-end gap-1.5">
                {concept.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-ink/20 bg-bg/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/80 backdrop-blur"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer description */}
          <div className="flex items-center gap-6 px-6 py-5">
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              {concept.description}
            </p>
            <span
              aria-hidden
              className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ember transition-transform group-hover:rotate-45"
            >
              ↗
            </span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
