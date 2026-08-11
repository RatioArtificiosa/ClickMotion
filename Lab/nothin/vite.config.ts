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
    // Lab port: source nothin-clone + design-in-motion use 3030
    port: 3032,
    strictPort: true,
    host: true,
  },
});
