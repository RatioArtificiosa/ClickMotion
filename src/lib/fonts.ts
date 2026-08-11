import { Inter, Syne, Birthstone } from "next/font/google";

/** Body / UI */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Display / hero lockups - geometric, heavy.
 * Use syne.className on headlines.
 */
export const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/**
 * ClickMotion wordmark only (Google Fonts Birthstone).
 * BRAND.md: white + soft glow on dark. Size must always fit container.
 */
export const birthstone = Birthstone({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-wordmark",
  display: "swap",
});
