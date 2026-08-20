/**
 * Empty PostCSS config — Tailwind v4 runs via @tailwindcss/vite only.
 * Without an explicit path, Vite walks up to MS monorepo postcss/tailwind v3
 * and fails on `@import "tailwindcss"`.
 */
export default {
  plugins: [],
};
