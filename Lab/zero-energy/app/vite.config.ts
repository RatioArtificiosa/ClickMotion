import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3070, host: true },
  optimizeDeps: {
    include: ["three", "lenis", "gsap"],
  },
});
