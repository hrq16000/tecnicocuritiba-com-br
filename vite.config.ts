import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { execSync } from "node:child_process";
import { componentTagger } from "lovable-tagger";
// @ts-expect-error - JS plugin without types
import { prerenderCitiesPlugin } from "./scripts/prerender-cities.mjs";
// @ts-expect-error - JS plugin without types
import { prerenderPilotPlugin } from "./scripts/prerender-pilot.mjs";
// @ts-expect-error - JS plugin without types
import { prerenderSitemapShellsPlugin } from "./scripts/prerender-bairros.mjs";


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
    prerenderPilotPlugin(),
    prerenderSitemapShellsPlugin(),

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
          // Helpers internos do Vite (preload-helper etc.) precisam ficar no
          // chunk base; se caírem em um chunk pesado (ex.: pdf), o entry passa
          // a fazer modulepreload dele sem necessidade.
          if (id.includes("vite/preload-helper") || id.includes("vite/modulepreload")) return "vendor";
          if (!id.includes("node_modules")) return undefined;


          // Split leaf-only libs. Runtime react/router/supabase permanecem em
          // `vendor` para evitar o TDZ ("Cannot access 'kf' before initialization",
          // 2026-07 audit-fase2). Adições futuras: manter apenas libs sem
          // dependência do runtime React.
          if (id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("react-helmet")) return "vendor-helmet";
          // Libs "folha" (sem acoplamento ao runtime React/Router) isoladas para
          // sair do chunk `vendor` e carregar só nas rotas que as usam.
          if (id.includes("jspdf") || id.includes("canvg") || id.includes("html2canvas")) return "vendor-pdf";
          if (id.includes("qrcode")) return "vendor-qrcode";
          if (/node_modules\/(recharts|d3-|victory-|internmap|delaunator|robust-predicates)/.test(id)) return "vendor-charts";
          if (id.includes("react-markdown") || id.includes("remark-") || id.includes("mdast") || id.includes("micromark") || id.includes("unified") || id.includes("hast") || id.includes("vfile") || id.includes("unist")) return "vendor-markdown";
          if (id.includes("date-fns")) return "vendor-date";
          if (id.includes("dompurify")) return "vendor-sanitize";
          if (id.includes("embla-carousel")) return "vendor-carousel";
          if (id.includes("@sentry")) return "vendor-sentry";
          if (id.includes("/zod/")) return "vendor-zod";

          return "vendor";
        },


      },
    },
  },
}));
