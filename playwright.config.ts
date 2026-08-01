import { defineConfig, devices } from "@playwright/test";

// Base URL compartilhada com e2e/utils/baseUrl.ts
const BASE_URL = (
  process.env.E2E_BASE_URL ||
  process.env.PLAYWRIGHT_BASE_URL ||
  "http://localhost:8080"
).replace(/\/+$/, "");

// O pacote de config do runner Lovable pode não existir localmente.
// Nesse caso caímos num config equivalente para rodar os specs na máquina do dev.
let config: ReturnType<typeof defineConfig>;

try {
  const { createLovableConfig } = await import("lovable-agent-playwright-config/config");
  config = createLovableConfig({});
} catch {
  config = defineConfig({
    testDir: "e2e",
    fullyParallel: true,
    reporter: process.env.CI ? "line" : "list",
    use: {
      baseURL: BASE_URL,
      trace: "retain-on-failure",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  });
}

export default config;
