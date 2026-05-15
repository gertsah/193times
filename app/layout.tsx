import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://193times.com"),
  title: "193Times — Websites, Visuals & Automations Built With Code",
  description:
    "193Times creates custom websites, visual systems and business automations using design, code and AI-powered workflows.",
  openGraph: {
    title: "193Times — Websites, Visuals & Automations Built With Code",
    description:
      "Custom websites, AI-generated visuals, and business automations from a code-driven creative studio.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "193Times",
    description:
      "Websites, visuals and automations built with code.",
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <body className="bg-bg text-ink">{children}</body>
    </html>
  );
}
