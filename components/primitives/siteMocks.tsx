import { ReactNode } from "react";

/**
 * Code-built website previews for the "Сайты" carousel — each is a tiny
 * self-contained mock of a beautiful site in its own palette. Placeholders
 * until real case screenshots replace them.
 */
export type SiteMock = {
  title: string;
  tag: string;
  status: string;
  node: ReactNode;
};

/* ── 1. Fashion editorial — cream / ink ── */
function Editorial() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#efe9df] text-[#161310]">
      <div className="flex items-center justify-between px-[6%] py-[4%] text-[1.4cqw]">
        <span className="font-mono uppercase tracking-[0.3em]">Maison</span>
        <span className="hidden gap-[1.5em] sm:flex">
          <span>Shop</span>
          <span>About</span>
          <span>Contact</span>
        </span>
        <span className="font-mono">'26</span>
      </div>
      <div className="relative flex flex-1 items-end px-[6%] pb-[5%]">
        <div
          aria-hidden
          className="absolute right-[6%] top-[2%] h-[78%] w-[34%] rounded-t-full bg-gradient-to-b from-[#c98a5e] to-[#7a4a32]"
        />
        <h5 className="relative font-serif text-[11cqw] font-medium leading-[0.85] tracking-tight">
          Soft
          <br />
          <span className="italic">Tailoring</span>
        </h5>
      </div>
    </div>
  );
}

/* ── 2. SaaS / product — deep indigo ── */
function SaaS() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0b1020] text-[#e9ecff]">
      <div className="flex items-center justify-between px-[6%] py-[4%] text-[1.4cqw]">
        <span className="font-semibold tracking-tight">◇ Flowstate</span>
        <span className="rounded-full bg-[#5b6cff] px-[1.4em] py-[0.5em] text-[#fff]">
          Start free
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-[2cqw] px-[6%] text-center">
        <span className="rounded-full border border-[#2a3358] px-[1.4em] py-[0.5em] text-[1.3cqw] text-[#9aa6e0]">
          ✦ Ship faster
        </span>
        <h5 className="text-[8cqw] font-semibold leading-[0.95] tracking-tight">
          Build without
          <br />
          the busywork
        </h5>
        <div className="flex gap-[1.5cqw] text-[1.4cqw]">
          <span className="rounded-md bg-[#5b6cff] px-[1.8em] py-[0.7em]">
            Get started
          </span>
          <span className="rounded-md border border-[#2a3358] px-[1.8em] py-[0.7em] text-[#9aa6e0]">
            Docs
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 3. Restaurant / organic — terracotta ── */
function Restaurant() {
  return (
    <div className="absolute inset-0 flex bg-[#1c1813] text-[#f2e8d8]">
      <div className="flex w-[52%] flex-col justify-between p-[6%]">
        <span className="font-serif text-[2.4cqw] italic">Olivo</span>
        <div>
          <h5 className="font-serif text-[8.5cqw] leading-[0.9]">
            Field to
            <br />
            <span className="text-[#c9722f]">table.</span>
          </h5>
          <p className="mt-[1.5cqw] max-w-[22ch] text-[1.5cqw] text-[#a89a86]">
            Seasonal kitchen, open fire, natural wine.
          </p>
        </div>
        <span className="font-mono text-[1.3cqw] uppercase tracking-[0.25em] text-[#8a7c68]">
          Book a table →
        </span>
      </div>
      <div
        aria-hidden
        className="w-[48%] bg-gradient-to-br from-[#c9722f] via-[#8f4a22] to-[#2a1a10]"
      />
    </div>
  );
}

/* ── 4. Streetwear / bold — black + lime ── */
function Streetwear() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#0a0a0a] p-[5%] text-[#eaffb0]">
      <div className="flex items-center justify-between text-[1.4cqw]">
        <span className="font-mono uppercase tracking-[0.2em]">/NOISE</span>
        <span className="font-mono">cart (2)</span>
      </div>
      <h5 className="text-[14cqw] font-black uppercase leading-[0.82] tracking-tighter text-[#d6ff3f]">
        Drop
        <br />
        003
      </h5>
      <div className="flex items-end justify-between">
        <div className="grid grid-cols-3 gap-[1cqw]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-[4cqw] w-[4cqw] rounded-sm bg-[#1a1a1a]"
            />
          ))}
        </div>
        <span className="rounded-full bg-[#d6ff3f] px-[1.8em] py-[0.6em] text-[1.4cqw] font-bold text-[#0a0a0a]">
          Shop now
        </span>
      </div>
    </div>
  );
}

/* ── 5. Luxury / wine — bordeaux ── */
function Luxury() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f4f1ea] text-[#3a1320]">
      <div className="flex items-center justify-between border-b border-[#3a132022] px-[6%] py-[3.5%] text-[1.3cqw]">
        <span className="font-serif text-[2.4cqw] tracking-tight">Vœu</span>
        <span className="hidden gap-[1.6em] font-mono uppercase tracking-[0.2em] sm:flex">
          <span>Cellar</span>
          <span>Story</span>
          <span>Visit</span>
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center px-[6%] text-center">
        <div>
          <p className="font-mono text-[1.3cqw] uppercase tracking-[0.3em] text-[#9a5566]">
            Est. 1911 · Bordeaux
          </p>
          <h5 className="mt-[1.5cqw] font-serif text-[9cqw] italic leading-[0.9]">
            Quiet
            <br />
            luxury
          </h5>
          <span className="mt-[2cqw] inline-block border-b border-[#3a1320] pb-[0.3em] text-[1.5cqw]">
            Discover the cellar
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 6. Creative studio / portfolio — graphite ── */
function Studio() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#121212] p-[5%] text-[#f0efe9]">
      <div className="flex items-center justify-between text-[1.4cqw]">
        <span className="font-serif text-[2.2cqw] italic">Atelier Nord</span>
        <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-[#ff5a2c]" />
      </div>
      <div className="flex flex-1 items-center">
        <h5 className="text-[9cqw] font-light leading-[0.92] tracking-tight">
          Design that
          <br />
          <span className="font-serif italic text-[#ff5a2c]">moves</span> people
        </h5>
      </div>
      <div className="grid grid-cols-4 gap-[1.2cqw]">
        {["01", "02", "03", "04"].map((n) => (
          <div
            key={n}
            className="flex aspect-square items-end rounded-sm bg-gradient-to-br from-[#262626] to-[#161616] p-[0.8cqw] text-[1.1cqw] text-[#8a8a82]"
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export const SITE_MOCKS: SiteMock[] = [
  {
    title: "Fashion-бренд",
    tag: "Лендинг · UI",
    status: "Кейс скоро",
    node: <Editorial />,
  },
  {
    title: "SaaS-продукт",
    tag: "Сайт · конверсия",
    status: "Кейс скоро",
    node: <SaaS />,
  },
  {
    title: "Ресторан",
    tag: "Сайт · бронь",
    status: "Кейс скоро",
    node: <Restaurant />,
  },
  {
    title: "Streetwear-дроп",
    tag: "E-commerce",
    status: "Кейс скоро",
    node: <Streetwear />,
  },
  {
    title: "Винодельня",
    tag: "Бренд · сайт",
    status: "Кейс скоро",
    node: <Luxury />,
  },
  {
    title: "Креативная студия",
    tag: "Портфолио",
    status: "Кейс скоро",
    node: <Studio />,
  },
];
