import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Isolate from parent MS Tailwind v3 postcss.config.js
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3010,
    host: true,
    strictPort: false, // fall to next free port if 3010 busy (source may own it)
  },
});

