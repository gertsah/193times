import Logo from "./Logo";

const NAV = [
  { label: "Работы", href: "#work" },
  { label: "Процесс", href: "#process" },
  { label: "Услуги", href: "#services" },
  { label: "Контакты", href: "#contact" },
];

const SOCIALS = [
  { label: "Telegram", href: "https://t.me/l93times" },
  { label: "Instagram", href: "https://instagram.com/193times" },
  { label: "TikTok", href: "https://tiktok.com/@193times" },
  { label: "Behance", href: "https://behance.net/193times" },
];

export default function Footer() {
  return (
    <footer>
      <div className="edge py-16 md:py-20">
        <Logo size={44} className="mb-8 text-ink" />

        {/* Big wordmark line */}
        <a
          href="#top"
          className="block font-display text-[18vw] font-light leading-[0.9] tracking-tightest md:text-[12vw] lg:text-[11rem]"
        >
          193<span className="italic">Times</span>
        </a>

        <p className="mt-6 max-w-md text-pretty text-base text-muted">
          Сайты. Визуалы. Автоматизации.{" "}
          <span className="text-ink">Собрано кодом.</span>
        </p>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-10">
          <nav className="col-span-6 md:col-span-3" aria-label="Footer">
            <p className="label">Навигация</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((i) => (
                <li key={i.href}>
                  <a
                    href={i.href}
                    className="link-underline text-[15px] text-ink/85 hover:text-ink"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <p className="label">Каналы</p>
            <ul className="mt-4 space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[15px] text-ink/85 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="label">Прямая связь</p>
            <a
              href="mailto:193times@mail.ru"
              className="mt-4 block font-display text-2xl md:text-3xl"
            >
              193times@mail.ru
            </a>
            <p className="label mt-4">
              Студия из{" "}
              <span className="text-ember">Новороссийска</span>, Россия
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 label">
            <span>© 2026 — 193Times</span>
            <span className="hidden sm:inline">·</span>
            <a href="/privacy/" className="link-underline hover:text-ink">
              Политика конфиденциальности
            </a>
          </div>
          <span className="inline-flex items-center gap-2 label">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            Студия онлайн · принимаем брифы
          </span>
        </div>
      </div>
    </footer>
  );
}
