// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { execSync } from "node:child_process";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Versão do app embutida no build — consumida por src/lib/errorReporter.ts
// (APP_BUILD_INFO) para o meta app-version e o cache-bust de versão.
const resolveAppVersion = () => {
  if (process.env["APP_VERSION"]) return process.env["APP_VERSION"];
  if (process.env["VERCEL_GIT_COMMIT_SHA"]) return process.env["VERCEL_GIT_COMMIT_SHA"].slice(0, 7);
  if (process.env["COMMIT_REF"]) return process.env["COMMIT_REF"].slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return `b${Date.now().toString(36)}`;
  }
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: {
        // Legacy imports keep working through the compatibility shims.
        "react-router-dom": new URL("./src/lib/router-compat.tsx", import.meta.url)
          .pathname,
        "react-helmet": new URL("./src/lib/helmet-compat.tsx", import.meta.url)
          .pathname,
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(resolveAppVersion()),
      __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  },
});
