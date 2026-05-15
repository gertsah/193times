"use client";

import SectionLabel from "./primitives/SectionLabel";
import Reveal from "./primitives/Reveal";
import SplitReveal from "./primitives/SplitReveal";
import Marquee from "./primitives/Marquee";

const SERVICES = [
  { title: "Сайты под ключ", kind: "build" },
  { title: "Лендинги", kind: "build" },
  { title: "UI / UX дизайн", kind: "design" },
  { title: "Дизайн-системы", kind: "design" },
  { title: "AI-визуалы", kind: "visual" },
  { title: "Бренд-визуалы", kind: "visual" },
  { title: "Motion-ready ассеты", kind: "visual" },
  { title: "Автоматизации", kind: "automation" },
  { title: "CRM-интеграции", kind: "automation" },
  { title: "Telegram / Discord боты", kind: "automation" },
  { title: "AI-ассистенты", kind: "automation" },
  { title: "Дашборды", kind: "build" },
  { title: "Внутренние тулзы", kind: "build" },
  { title: "No-code + code системы", kind: "automation" },
  { title: "API-интеграции", kind: "automation" },
] as const;

const TAG_COLOR: Record<(typeof SERVICES)[number]["kind"], string> = {
  build: "text-ember/80",
  design: "text-gold/80",
  visual: "text-ink/70",
  automation: "text-ember/60",
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-y-10 md:gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="05">Услуги</SectionLabel>
            <h2 className="mt-6 font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] md:text-6xl lg:text-[5.4rem]">
              <SplitReveal>Что мы можем</SplitReveal>
              <br />
              <SplitReveal delay={0.15}>
                {""}
                <span className="font-display font-normal italic text-ember">для вас сделать.</span>
              </SplitReveal>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">
                Рабочее меню — выберите, что нужно, или закажите полный
                пакет: сайт, визуалы и автоматизация под капотом.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pills grid */}
        <Reveal delay={0.05}>
          <ul className="mt-16 flex flex-wrap gap-2.5 md:mt-20">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-ink/80 transition-all hover:-translate-y-0.5 hover:border-ember/50 hover:text-ink"
                >
                  <span className={`text-[10px] ${TAG_COLOR[s.kind]}`}>◆</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* huge background marquee strip */}
      <div className="relative mt-24 md:mt-32 border-y border-line">
        <Marquee speed="slow" className="py-7 md:py-9">
          {[
            "Code-driven",
            "Editorial",
            "Premium",
            "Cinematic",
            "Автоматизировано",
            "AI-augmented",
            "Кастом",
            "Calm",
          ].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="flex items-center gap-10 px-10 font-sans font-black tracking-[-0.04em] text-[5.5vw] md:text-[3.4vw]"
            >
              <span
                className={
                  i % 2 === 1 ? "font-display font-normal italic text-ember" : "text-ink"
                }
              >
                {w}
              </span>
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-line" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
