"use client";

import { useRef, useState } from "react";
import { SITE_MOCKS } from "./siteMocks";

/**
 * Horizontal snap carousel of code-built website previews. Native
 * scroll-snap + drag for smoothness; arrow buttons nudge by one card.
 */
export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  function nudge(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between">
        <span className="label">{SITE_MOCKS.length} превью · листайте →</span>
        <div className="flex gap-2">
          <Arrow dir="prev" disabled={atStart} onClick={() => nudge(-1)} />
          <Arrow dir="next" disabled={atEnd} onClick={() => nudge(1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      >
        {SITE_MOCKS.map((s) => (
          <article
            key={s.title}
            data-card
            className="group w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[44%]"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-card transition-colors group-hover:border-faint">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-ember/70" />
                <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  preview · {s.tag}
                </span>
              </div>
              {/* Code-built preview */}
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ containerType: "inline-size" }}
              >
                {s.node}
                <span className="absolute right-3 top-3 z-10 rounded-full border border-black/10 bg-white/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-current backdrop-blur">
                  {s.status}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h4 className="display text-2xl">{s.title}</h4>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {s.tag}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Arrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Назад" : "Вперёд"}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ember hover:text-ember disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
    >
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
        <path
          d={dir === "prev" ? "M13 7H1M6 2L1 7l5 5" : "M1 7h12M8 2l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
