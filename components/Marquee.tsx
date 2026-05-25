const WORDS = [
  "Сайты",
  "Визуалы",
  "Автоматизации",
  "AI",
  "Дизайн",
  "Инфографика",
  "Презентации",
  "Боты",
  "Код",
];

export default function Marquee({
  reverse = false,
  fast = false,
}: {
  reverse?: boolean;
  fast?: boolean;
}) {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden py-5 md:py-7">
      <div
        className={`flex w-max whitespace-nowrap ${
          fast ? "animate-marquee-fast" : "animate-marquee"
        } ${reverse ? "marquee-reverse" : ""}`}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`px-6 font-display text-[7vw] leading-none tracking-tight md:text-[4.4vw] ${
                i % 2 === 1 ? "italic text-ember" : "text-ink"
              }`}
            >
              {w}
            </span>
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rotate-45 bg-ember/60"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
