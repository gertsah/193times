"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const NAV = [
  { label: "Работы", href: "#work" },
  { label: "Процесс", href: "#process" },
  { label: "Услуги", href: "#services" },
  { label: "Контакты", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/* Top meta strip */}
        <div className="edge flex items-center justify-between py-2">
          <span className="label">О студии · 193Times</span>
          <span className="label hidden sm:inline">Новороссийск · RU</span>
          <span className="label">EST. 2026 ©</span>
        </div>

        <div className="edge flex h-14 items-center justify-between md:h-16">
          <a
            href="#top"
            aria-label="193Times — на главную"
            className="group flex items-center gap-3"
          >
            <Logo size={30} className="text-ink" />
            <span className="font-display text-xl font-medium tracking-tight">
              193<span className="italic">Times</span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink md:inline-flex"
            >
              <span className="text-ember">→&nbsp;</span> Связаться
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="relative grid h-9 w-9 place-items-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 right-0 top-0 h-px bg-ink transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 right-0 h-px bg-ink transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
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
            className="fixed inset-0 z-40 bg-bg md:hidden"
          >
            <div className="edge flex h-full flex-col justify-between pb-12 pt-28">
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 * i + 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-baseline gap-4 border-b border-line py-5"
                  >
                    <span className="font-mono text-xs text-ember">
                      0{i + 1}
                    </span>
                    <span className="display text-4xl">{item.label}</span>
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-2">
                <p className="label">Прямая связь</p>
                <a
                  href="mailto:193times@mail.ru"
                  className="block font-display text-2xl"
                >
                  193times@mail.ru
                </a>
                <p className="label pt-2">Новороссийск, RU</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
