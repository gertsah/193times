"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "193t.cookies.ack.v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = window.setTimeout(() => setVisible(true), 900);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore — banner still hides for this session */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[420px]"
          role="dialog"
          aria-label="Уведомление о cookies"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card/95 p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur md:flex-row md:items-center md:gap-4 md:p-5">
            <p className="text-[13px] leading-relaxed text-ink/85 md:flex-1">
              Сайт использует только{" "}
              <span className="text-ink">технически необходимые</span> cookies.{" "}
              <a
                href="/privacy/"
                className="text-ember link-underline hover:text-ember"
              >
                Подробнее
              </a>
              .
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-ember px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bg transition-transform hover:-translate-y-0.5"
            >
              Понятно
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
