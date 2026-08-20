import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pin CSS pipeline — ignore parent MS monorepo postcss/tailwind v3
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3040,
    strictPort: true,
    host: true,
  },
});
