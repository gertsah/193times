# 193Times

> Digital studio from Novorossiysk, Russia.
> Сайты. Визуалы. Автоматизации. Собрано кодом.

Premium dark, editorial, code-driven single-page site built as the studio's
own brand surface.

## Stack

- **Next.js 14** (App Router, RSC) + **TypeScript**
- **Tailwind CSS 3.4** (custom design tokens)
- **Framer Motion 11** (darkroom-style mask reveals)
- **Geist Sans / Geist Mono** + **Instrument Serif** type system

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
```

## Architecture highlights

- **Sticky intro → hero hand-off** — `Intro` is `fixed inset-0 z-0` and
  lives in the background of the page for its whole lifetime; a transparent
  `h-screen` spacer at the top of `<main>` lets the intro show through at
  scroll = 0, and `<main>` (`z-10 bg-bg`) slides up over it as the user
  scrolls.
- **`SplitReveal`** — Revelo / darkroom.engineering-style word reveal:
  each word sits in an `overflow:hidden` mask, inner span animates
  `y: 115% → 0` + `opacity: 0 → 1` + `blur(8px) → blur(0)` with
  `cubic-bezier(0.22, 1, 0.36, 1)` over 0.75s, stagger 0.05s.
- **`GridPulse`** — invisible grid of square cells; a small random subset
  is lit in ember and the lit set evolves one cell at a time for an
  organic flicker.
- **`Manifesto`** — color-flip section showing the wordmark on the
  inverted palette (ink bg / cream text) with a scroll-linked progress
  ribbon and scaled wordmark.
- **`Wordmark` / `Mark`** — custom `193Times` wordmark in Geist Black
  with a minimal `T × 3` overlap, plus a square `193T` brand mark that
  ships in both `light` and `dark` variants and inverts on hover in the
  header.
- **Hero code panels** — three floating panels with parallax-tied scroll
  motion: `studio.config.ts`, `POST /brief`, `zsh deploy log`.
- **Hero imagery** generated via Higgsfield (`seedream_v4_5` high for the
  hero, `nano_banana_flash` 2k for concept thumbnails). See
  `media-gen-prompts/` for the prompts used.

## Section index

| § | Section | Purpose |
|---|---|---|
| 00 | Hero | Brand statement, code-driven studio, REC/coords stamp |
| 01 | WhatWeDo | Сайты / Визуалы / Автоматизации cards |
| 02 | DesignPreview | Type, palette, buttons, lockup, KPI card, grid |
| 03 | SelectedConcepts | Four AI-imagined work concepts in alternating offset |
| 02b | Manifesto | Color-flip — "Мы не сдаём макеты, мы запускаем системы." |
| 04 | Process | 4-phase scroll-pinned timeline |
| 05 | Services | Pill grid + giant marquee belt |
| 06 | CTA | Editorial contact form with chips + direct lines |
| – | Footer | Brand lockup + nav + channels + direct line |

## Notes

- Heavy media (`hero.png`, `intro.mp4`, concept PNGs) live in `public/media/`.
  Total assets ≈ 50 MB — under the GitHub 100 MB-per-file limit, but consider
  Git LFS or a CDN if the repo grows.
- The contact form currently no-ops on submit; wire it to Resend/Formspree
  or your own endpoint when you go live.
- Social URLs in the footer use placeholder `@193times` handles — swap them
  for the real ones before launch.
