"use client";

import { FormEvent, useState } from "react";
import SectionLabel from "./primitives/SectionLabel";
import Reveal from "./primitives/Reveal";
import SplitReveal from "./primitives/SplitReveal";

const NEEDS = [
  "Сайт",
  "Визуалы",
  "Автоматизация",
  "Полный пакет",
] as const;

const BUDGETS = [
  "до 200 тыс",
  "200—700 тыс",
  "700тыс — 1.5 млн",
  "1.5 млн +",
] as const;

export default function CTA() {
  const [need, setNeed] = useState<(typeof NEEDS)[number]>("Полный пакет");
  const [budget, setBudget] = useState<(typeof BUDGETS)[number]>("700тыс — 1.5 млн");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[160px]" />
      </div>

      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-y-8 md:gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="06">Связь</SectionLabel>
            <h2 className="mt-6 font-sans font-black text-balance text-5xl tracking-[-0.045em] leading-[0.95] md:text-6xl lg:text-[6rem]">
              <SplitReveal>Есть идея?</SplitReveal>
              <br />
              <SplitReveal delay={0.15}>
                {"Превратим её в "}
                <span className="font-display font-normal italic text-ember">рабочую систему.</span>
              </SplitReveal>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-muted">
                Расскажите, что нужно — сайт, визуалы, автоматизация
                или полный пакет. Отвечаем в течение одного рабочего
                дня.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <form
                onSubmit={onSubmit}
                className="relative overflow-hidden rounded-[28px] border border-line bg-card"
              >
                <div className="flex items-center justify-between border-b border-line px-6 py-4">
                  <span className="marginalia">
                    Форма / contact.193 — secure
                  </span>
                  <span className="inline-flex items-center gap-2 marginalia">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                    LIVE
                  </span>
                </div>

                <div className="grid gap-px bg-line p-px">
                  <Row>
                    <Field label="Имя" name="name" placeholder="Иван Иванов" />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="ivan@studio.ru"
                    />
                  </Row>

                  <div className="bg-card p-5 md:p-6">
                    <FieldLabel>Что нужно</FieldLabel>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {NEEDS.map((n) => (
                        <button
                          type="button"
                          key={n}
                          onClick={() => setNeed(n)}
                          className={`rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                            need === n
                              ? "border-ember bg-ember/15 text-ember"
                              : "border-line bg-bg text-ink/80 hover:border-ember/40"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card p-5 md:p-6">
                    <FieldLabel>Бюджет</FieldLabel>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                            budget === b
                              ? "border-ember bg-ember/15 text-ember"
                              : "border-line bg-bg text-ink/80 hover:border-ember/40"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card p-5 md:p-6">
                    <FieldLabel htmlFor="message">Сообщение</FieldLabel>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Несколько строк о проекте, дедлайне, ссылки на референсы…"
                      className="mt-3 w-full resize-none bg-transparent font-sans text-base leading-relaxed text-ink placeholder:text-muted/70 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Consent — required by FZ-152 */}
                <label
                  htmlFor="consent"
                  className="flex cursor-pointer items-start gap-3 border-t border-line bg-card px-6 py-4 text-[13px] leading-relaxed text-ink/80 transition-colors hover:text-ink"
                >
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-ember"
                  />
                  <span>
                    Я согласен(-на) на обработку моих персональных данных в
                    соответствии с{" "}
                    <a
                      href="/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ember underline-grow"
                    >
                      Политикой конфиденциальности
                    </a>{" "}
                    и Федеральным законом № 152-ФЗ.
                  </span>
                </label>

                <div className="flex flex-col items-start justify-between gap-4 px-6 py-5 md:flex-row md:items-center">
                  <p className="marginalia">
                    Ответ за{" "}
                    <span className="text-ember">~24 часа</span> · Бронь
                    Q3 — Q4 / 2026
                  </p>
                  <button
                    type="submit"
                    disabled={!consent && !submitted}
                    className="group inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {submitted ? "Отправлено ✓" : "Начать проект"}
                    <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none">
                      <path
                        d="M1 7h12M8 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <DirectLine
                  label="Email"
                  value="193times@mail.ru"
                  href="mailto:193times@mail.ru"
                />
                <DirectLine
                  label="Telegram"
                  value="@odin93times"
                  href="https://t.me/odin93times"
                />
                <DirectLine
                  label="Студия онлайн"
                  value="Пн — Пт · 10—19 МСК"
                />
                <div className="rounded-2xl border border-line bg-card p-5">
                  <p className="marginalia">Заметка</p>
                  <p className="mt-3 leading-relaxed text-ink/85">
                    Берём{" "}
                    <span className="text-ember">2 проекта в квартал</span>{" "}
                    — каждый получает полное внимание от дизайна до запуска.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid bg-card md:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="border-b border-line p-5 md:border-b-0 md:border-r md:p-6 last:border-r-0">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent font-sans text-lg text-ink placeholder:text-muted/70 focus:outline-none"
      />
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="marginalia inline-flex items-center gap-2">
      <span className="text-ember">→</span>
      {children}
    </label>
  );
}

function DirectLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const Cmp = href ? "a" : "div";
  return (
    <Cmp
      href={href}
      className="group flex items-center justify-between border-b border-line pb-5"
    >
      <div>
        <p className="marginalia">{label}</p>
        <p className="mt-2 font-sans font-black text-2xl tracking-[-0.04em] leading-none md:text-3xl">
          {value}
        </p>
      </div>
      {href && (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ember transition-transform group-hover:rotate-45">
          ↗
        </span>
      )}
    </Cmp>
  );
}
