"use client";

import { motion } from "framer-motion";
import Reveal from "./primitives/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Inverted-palette interlude — the one light-on-dark-flip moment that
 * breaks the dark rhythm and states the studio's position plainly.
 */
export default function Manifesto() {
  return (
    <section
      aria-label="Манифест"
      className="bg-ink text-bg"
    >
      <div className="edge py-24 md:py-36">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-3">
            <span className="font-mono text-[11px] text-ember">—</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-bg/50">
              Манифест · 193Times
            </span>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2 className="display max-w-[14ch] text-pretty text-[2.8rem] leading-[1.0] text-bg sm:text-6xl lg:text-[5.6rem]">
              {["Мы не сдаём", "макеты —", "мы запускаем"].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease }}
                  className="block"
                >
                  {line === "макеты —" ? (
                    <>
                      <em className="not-italic text-ember">макеты</em> —
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="block italic text-ember"
              >
                системы.
              </motion.span>
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-12 max-w-2xl text-pretty text-lg leading-relaxed text-bg/70 md:text-xl">
                Дизайн без кода — это PDF. Код без дизайна — это
                CRUD-форма. 193Times живёт на пересечении: каждый проект
                собирается как продукт — с типографикой, моушном и
                автоматизацией внутри.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
