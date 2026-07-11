import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { execSync } from "node:child_process";
import { componentTagger } from "lovable-tagger";
// @ts-expect-error - JS plugin without types
import { prerenderCitiesPlugin } from "./scripts/prerender-cities.mjs";

const resolveAppVersion = () => {
  if (process.env.APP_VERSION) return process.env.APP_VERSION;
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7);
  if (process.env.COMMIT_REF) return process.env.COMMIT_REF.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return `b${Date.now().toString(36)}`;
  }
};
const APP_VERSION = resolveAppVersion();
const APP_BUILD_TIME = new Date().toISOString();
const GOOGLE_SITE_VERIFICATION =
  process.env.VITE_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || "";

const googleSiteVerificationPlugin = () => ({
  name: "google-site-verification-meta",
  transformIndexHtml(html: string) {
    const token = GOOGLE_SITE_VERIFICATION.trim();
    if (!token) return html;
    if (html.includes('name="google-site-verification"')) return html;
    return html.replace(
      /<meta name="msvalidate\.01" content="" \/>/,
      `<meta name="msvalidate.01" content="" />\n    <meta name="google-site-verification" content="${token.replace(/"/g, "&quot;")}" />`,
    );
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    googleSiteVerificationPlugin(),
    mode === "development" && componentTagger(),
    prerenderCitiesPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __APP_BUILD_TIME__: JSON.stringify(APP_BUILD_TIME),
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // Split leaf-only libs. Runtime react/router/supabase permanecem em
          // `vendor` para evitar o TDZ ("Cannot access 'kf' before initialization",
          // 2026-07 audit-fase2). Adições futuras: manter apenas libs sem
          // dependência do runtime React.
          if (id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("react-helmet")) return "vendor-helmet";

          return "vendor";
        },

      },
    },
  },
}));
