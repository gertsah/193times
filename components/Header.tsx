"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "./Wordmark";

const NAV = [
  { label: "Работы", href: "#work" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Контакты", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Europe/Moscow",
        }) + " MSK",
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          {/* Brand lockup */}
          <a
            href="#top"
            aria-label="193 Times — на главную"
            className="group flex items-center"
          >
            <Wordmark className="text-[22px] md:text-[28px] transition-opacity duration-300 group-hover:opacity-80" />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80 transition-colors hover:text-ink"
              >
                <span className="mr-1 text-ember/80 opacity-0 transition-opacity group-hover:opacity-100">/</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted lg:inline">
              {time || "—— MSK"}
            </span>
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ember/60 hover:text-ember md:inline-flex"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" aria-hidden />
              Начать проект
              <svg
                viewBox="0 0 14 14"
                className="ml-0.5 h-3 w-3 transition-transform group-hover:translate-x-0.5"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 right-0 top-0 h-px bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 right-0 top-[6px] h-px bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 right-0 bottom-0 h-px bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-x flex h-screen flex-col justify-between pt-24 pb-10">
              <nav className="flex flex-col gap-6" aria-label="Mobile">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sans font-black text-5xl tracking-[-0.04em] text-ink"
                  >
                    <span className="text-ember/70 mr-3 font-mono text-base">
                      0{i + 1}
                    </span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-6">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="group flex w-full items-center justify-between rounded-full border border-line bg-card px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                    Начать проект
                  </span>
                  <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
                <p className="marginalia">
                  hello@193times.com · Новороссийск, RU
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
