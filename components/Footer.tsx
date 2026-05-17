import Wordmark, { Mark } from "./Wordmark";

const NAV = [
  { label: "Работы", href: "#work" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Контакты", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/193times" },
  { label: "TikTok", href: "https://tiktok.com/@193times" },
  { label: "Telegram", href: "https://t.me/193times" },
  { label: "LinkedIn", href: "https://linkedin.com/company/193times" },
  { label: "Behance", href: "https://behance.net/193times" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg pt-12 pb-8 md:pt-20 md:pb-10">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-6 md:gap-y-12">
          {/* Brand block */}
          <div className="col-span-12 md:col-span-6">
            <div className="hidden items-center gap-5 md:flex">
              <Mark size={56} />
              <span className="marginalia">Brand mark · 193T</span>
            </div>
            <Wordmark className="block text-[14vw] tracking-[-0.05em] md:mt-6 md:text-[12vw] lg:text-[13rem]" />
            <p className="mt-4 max-w-md text-balance text-base text-muted md:mt-6 md:text-lg">
              Сайты. Визуалы. Автоматизации.{" "}
              <span className="text-ink">Собрано кодом.</span>
            </p>
            <p className="mt-2 marginalia md:mt-3">
              Студия из{" "}
              <span className="text-ember">Новороссийска</span>, Россия
            </p>
          </div>

          {/* On mobile: nav + channels side-by-side as two columns of one row,
              then direct-contact below; on md+ they spread across the grid. */}
          <div className="col-span-6 md:col-span-2 md:col-start-8">
            <p className="marginalia">Навигация</p>
            <ul className="mt-3 space-y-1.5 md:mt-4 md:space-y-2">
              {NAV.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="underline-grow inline-block text-[15px] text-ink/80 hover:text-ink md:text-base"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="marginalia">Каналы</p>
            <ul className="mt-3 space-y-1.5 md:mt-4 md:space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-grow inline-block text-[15px] text-ink/80 hover:text-ink md:text-base"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="marginalia">Прямая связь</p>
            <a
              href="mailto:hello@193times.com"
              className="mt-3 inline-block font-sans font-black text-[22px] tracking-[-0.04em] leading-tight md:mt-4 md:text-[1.5rem]"
            >
              hello@193times.com
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-5 md:mt-16 md:flex-row md:items-center md:gap-4 md:pt-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 marginalia md:gap-x-6 md:gap-y-2">
            <span>© 2026 — 193Times</span>
            <span className="hidden md:inline">·</span>
            <span>Выпуск <span className="text-ember">№193</span></span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Сделано дизайном, кодом и AI</span>
          </div>
          <div className="marginalia inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            Студия онлайн · принимаем брифы
          </div>
        </div>
      </div>
    </footer>
  );
}
