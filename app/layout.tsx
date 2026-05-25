import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Cormorant } from "next/font/google";
import "./globals.css";

const display = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.193times.ru"),
  title: "193Times — Сайты, визуалы и автоматизации, собранные кодом",
  description:
    "193Times — креативная digital-студия из Новороссийска. Делаем сайты, визуалы и бизнес-автоматизации через дизайн, код и AI.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "193Times — Сайты, визуалы и автоматизации, собранные кодом",
    description:
      "Custom websites, AI-generated visuals, and business automations from a code-driven creative studio.",
    type: "website",
    url: "https://www.193times.ru",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "193Times",
    description: "Сайты, визуалы и автоматизации, собранные кодом.",
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self' https://fonts.gstatic.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:;"
        />
        <meta
          name="permissions-policy"
          content="camera=(), microphone=(), geolocation=(), payment=()"
        />
      </head>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
