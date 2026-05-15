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
    <footer className="relative border-t border-line bg-bg pt-20 pb-10">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-6">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-5">
              <Mark size={56} />
              <span className="marginalia">Brand mark · 193T</span>
            </div>
            <Wordmark className="mt-6 block text-[18vw] tracking-[-0.05em] md:text-[12vw] lg:text-[13rem]" />
            <p className="mt-6 max-w-md text-balance text-lg text-muted">
              Сайты. Визуалы. Автоматизации.{" "}
              <span className="text-ink">Собрано кодом.</span>
            </p>
            <p className="mt-3 marginalia">
              Студия из{" "}
              <span className="text-ember">Новороссийска</span>, Россия
            </p>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-8">
            <p className="marginalia">Навигация</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="underline-grow inline-block text-base text-ink/80 hover:text-ink"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="marginalia">Каналы</p>
            <ul className="mt-4 space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-grow inline-block text-base text-ink/80 hover:text-ink"
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
              className="mt-4 inline-block font-sans font-black text-2xl tracking-[-0.04em] leading-tight md:text-[1.5rem]"
            >
              hello@
              <br />
              193times.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 marginalia">
            <span>© 2026 — 193Times</span>
            <span>·</span>
            <span>Выпуск <span className="text-ember">№193</span></span>
            <span>·</span>
            <span>Сделано дизайном, кодом и AI</span>
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
