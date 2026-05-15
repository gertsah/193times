"use client";

import SectionLabel from "./primitives/SectionLabel";
import Reveal from "./primitives/Reveal";
import SplitReveal from "./primitives/SplitReveal";
import Wordmark, { Mark } from "./Wordmark";

export default function DesignPreview() {
  return (
    <section id="system" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-y-10 md:gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="02">Беглый взгляд</SectionLabel>
            <h2 className="mt-6 font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] md:text-6xl lg:text-[5rem]">
              <SplitReveal>Беглый взгляд</SplitReveal>
              <br />
              <SplitReveal delay={0.15}>
                {"на "}
                <span className="font-display font-normal italic text-ember">визуальную систему.</span>
              </SplitReveal>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <p className="max-w-md text-balance text-base leading-relaxed text-muted md:text-lg">
                Небольшой образец — типографика, цвет и компоненты,
                которые мы используем в каждом проекте 193Times.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-4 md:mt-20 md:gap-5">
          {/* Typography specimen */}
          <Reveal className="col-span-12 md:col-span-8" delay={0.05}>
            <Panel header="Типографика / Specimen 01">
              <div className="flex flex-col gap-3 p-7 md:p-10">
                <span className="marginalia">Display · Instrument Serif + Geist Sans</span>
                <p className="font-display text-[14vw] tracking-tightest leading-[0.92] md:text-[9vw] lg:text-[8.4rem]">
                  Aa <span className="italic text-ember">Bb</span> 193
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-8 gap-y-2 marginalia">
                  <span>Regular</span>
                  <span className="italic">Italic</span>
                  <span>Цифры 0–9</span>
                  <span className="text-ember">А — Я</span>
                </div>
              </div>
            </Panel>
          </Reveal>

          {/* Color palette */}
          <Reveal className="col-span-12 md:col-span-4" delay={0.12}>
            <Panel header="Палитра / 06 stops">
              <div className="grid h-full grid-cols-2 gap-px bg-line p-px">
                <Swatch hex="#050505" name="Фон" />
                <Swatch hex="#141414" name="Карточка" />
                <Swatch hex="#F5F2EA" name="Текст" mode="light" />
                <Swatch hex="#9A9A9A" name="Muted" />
                <Swatch hex="#FF3B1F" name="Ember" />
                <Swatch hex="#F5B23D" name="Gold" />
              </div>
            </Panel>
          </Reveal>

          {/* Buttons */}
          <Reveal className="col-span-12 md:col-span-5" delay={0.05}>
            <Panel header="Кнопки / Primary set">
              <div className="flex flex-wrap items-center gap-3 p-7 md:p-8">
                <button className="rounded-full bg-ember px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bg">
                  Начать проект →
                </button>
                <button className="rounded-full border border-line bg-card px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                  Посмотреть работы
                </button>
                <button className="rounded-full border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Полевые заметки
                </button>
                <button className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80">
                  <span className="h-px w-6 bg-ink/40 transition-all group-hover:w-10 group-hover:bg-ember" />
                  Ghost-ссылка
                </button>
              </div>
            </Panel>
          </Reveal>

          {/* Logo lockup */}
          <Reveal className="col-span-12 md:col-span-3" delay={0.1}>
            <Panel header="Логотип / Lockup">
              <div className="relative grid h-full place-items-center gap-4 p-8 md:p-6">
                <div className="flex items-center gap-3">
                  <Mark size={36} />
                  <Wordmark className="text-3xl md:text-4xl" />
                </div>
                <span className="absolute bottom-3 left-3 marginalia">
                  Mark <span className="text-ember">+</span> Wordmark
                </span>
              </div>
            </Panel>
          </Reveal>

          {/* Mini-UI */}
          <Reveal className="col-span-12 md:col-span-4" delay={0.18}>
            <Panel header="Карточка / 02 — KPI">
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between marginalia">
                  <span>Конверсия</span>
                  <span className="text-ember">+44%</span>
                </div>
                <p className="font-sans font-black text-5xl tracking-[-0.04em] leading-none">
                  2,193
                </p>
                <div className="relative h-12 w-full overflow-hidden rounded-md bg-bg">
                  <svg
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                  >
                    <path
                      d="M0,48 L20,42 L42,46 L62,30 L84,34 L106,20 L128,24 L150,12 L172,18 L200,4"
                      fill="none"
                      stroke="#FF3B1F"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
                <p className="marginalia">
                  Проект: Launch / Поле W-23
                </p>
              </div>
            </Panel>
          </Reveal>

          {/* Spec strip */}
          <Reveal className="col-span-12" delay={0.05}>
            <Panel header="Layout / 12-кол. ритм" small>
              <div className="grid grid-cols-12 gap-2 p-4 md:p-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-sm bg-bg outline outline-1 outline-line"
                  >
                    <span className="block px-1.5 pt-1 font-mono text-[9px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Panel({
  children,
  header,
  small = false,
}: {
  children: React.ReactNode;
  header: string;
  small?: boolean;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[24px] border border-line bg-card">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="marginalia">{header}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember/80">
          ◇
        </span>
      </div>
      <div className={small ? "" : "min-h-full"}>{children}</div>
    </div>
  );
}

function Swatch({
  hex,
  name,
  mode = "dark",
}: {
  hex: string;
  name: string;
  mode?: "dark" | "light";
}) {
  return (
    <div
      className="relative flex aspect-square min-h-[80px] flex-col justify-end p-3"
      style={{ background: hex }}
    >
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
          mode === "light" ? "text-bg/70" : "text-ink/70"
        }`}
      >
        {name}
      </div>
      <div
        className={`font-mono text-[10px] ${
          mode === "light" ? "text-bg/40" : "text-ink/40"
        }`}
      >
        {hex}
      </div>
    </div>
  );
}
