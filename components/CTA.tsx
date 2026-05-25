"use client";

import { FormEvent, useState } from "react";
import Section from "./primitives/Section";

const NEEDS = ["Сайт", "Визуалы", "Автоматизация", "Полный пакет"] as const;
const BUDGETS = [
  "до 200 тыс",
  "200—700 тыс",
  "700тыс — 1.5 млн",
  "1.5 млн +",
] as const;

export default function CTA() {
  const [need, setNeed] = useState<(typeof NEEDS)[number]>("Полный пакет");
  const [budget, setBudget] =
    useState<(typeof BUDGETS)[number]>("700тыс — 1.5 млн");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  }

  return (
    <Section
      id="contact"
      index="04"
      label="Связь"
      lead={
        <>
          Есть идея? Превратим её в{" "}
          <em className="not-italic text-ember">рабочую систему.</em>
        </>
      }
      intro="Расскажите, что нужно — сайт, визуалы, автоматизация или полный пакет. Отвечаем в течение одного рабочего дня."
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="col-span-12 md:col-span-7"
        >
          <Field label="Имя" name="name" placeholder="Иван Иванов" />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="ivan@studio.ru"
          />

          <Picker
            label="Что нужно"
            options={NEEDS}
            value={need}
            onChange={(v) => setNeed(v as (typeof NEEDS)[number])}
          />
          <Picker
            label="Бюджет"
            options={BUDGETS}
            value={budget}
            onChange={(v) => setBudget(v as (typeof BUDGETS)[number])}
          />

          <div className="py-5">
            <label htmlFor="message" className="label">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Несколько строк о проекте, дедлайне, ссылки на референсы…"
              className="mt-3 w-full resize-none bg-transparent text-base leading-relaxed text-ink placeholder:text-faint focus:outline-none"
            />
          </div>

          {/* Consent — required by FZ-152 */}
          <label
            htmlFor="consent"
            className="flex cursor-pointer items-start gap-3 py-5 text-[13px] leading-relaxed text-muted transition-colors hover:text-ink"
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
              Согласен на обработку персональных данных согласно{" "}
              <a
                href="/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember link-underline"
              >
                Политике конфиденциальности
              </a>{" "}
              и ФЗ-152.
            </span>
          </label>

          <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <span className="label">
              Ответ за <span className="text-ember">~24 часа</span>
            </span>
            <button
              type="submit"
              disabled={!consent && !submitted}
              className="group inline-flex items-center gap-3 rounded-full bg-ember px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bg transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {submitted ? "Отправлено ✓" : "Отправить бриф"}
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

        {/* Direct contacts */}
        <div className="col-span-12 flex flex-col gap-8 md:col-span-4 md:col-start-9">
          <DirectLine
            label="Email"
            value="193times@mail.ru"
            href="mailto:193times@mail.ru"
          />
          <DirectLine
            label="Telegram"
            value="@l93times"
            href="https://t.me/l93times"
          />
          <DirectLine label="Часы" value="Пн — Пт · 10—19 МСК" />
          <div className="pt-5">
            <p className="label">Заметка</p>
            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted">
              Берём <span className="text-ink">2 проекта в квартал</span> —
              каждый получает полное внимание от дизайна до запуска.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
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
    <div className="py-5">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent text-lg text-ink placeholder:text-faint focus:outline-none"
      />
    </div>
  );
}

function Picker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="py-5">
      <span className="label">{label}</span>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
              value === o
                ? "border-ember text-ember"
                : "border-line text-muted hover:border-faint hover:text-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
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
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block pt-5"
    >
      <p className="label">{label}</p>
      <p className="mt-2 flex items-center gap-3 font-display text-2xl md:text-[1.6rem]">
        {value}
        {href && (
          <span className="text-base text-ember opacity-0 transition-opacity group-hover:opacity-100">
            ↗
          </span>
        )}
      </p>
    </Cmp>
  );
}
