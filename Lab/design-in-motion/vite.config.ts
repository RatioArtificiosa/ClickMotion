import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pin CSS pipeline to this package — ignore parent MS postcss/tailwind v3
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 3030,
    host: true,
  },
});
