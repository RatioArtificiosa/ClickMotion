/**
 * Local empty PostCSS config so Vite does NOT walk up to the MS monorepo
 * postcss.config.js (Tailwind v3 + autoprefixer). Tailwind v4 is applied via
 * @tailwindcss/vite in vite.config.ts only.
 */
export default {
  plugins: {},
};
