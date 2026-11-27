import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "react-router-dom": fileURLToPath(new URL("./src/lib/router-compat.tsx", import.meta.url)),
      "react-helmet": fileURLToPath(new URL("./src/lib/helmet-compat.tsx", import.meta.url)),
    },
  },
  test: {
    // E2E specs run separately in Playwright; do not collect them in Vitest.
    include: ["src/**/*.{test,spec}.{ts,tsx,js,jsx,mjs}", "scripts/**/*.{test,spec}.{ts,tsx,js,jsx,mjs}"],
    environment: "jsdom",
    environmentOptions: { jsdom: { url: "https://tecnicocuritiba.com.br/" } },
  },
});
