#!/usr/bin/env node
/**
 * Gera e valida `public/sitemap-images.xml`.
 *
 * - Uma entrada <url> por página local (bairros, atendimento cidade/bairro)
 *   com as fotos reais exibidas na página (+ variantes WebP/AVIF).
 * - Sem <lastmod>: não existe timestamp por página confiável.
 * - Valida: URLs de página únicas, imagens únicas por página, host permitido
 *   e presença de legenda/título em toda entrada.
 *
 * Uso:
 *   node scripts/generate-image-sitemap.mjs          # gera + valida
 *   node scripts/generate-image-sitemap.mjs --check  # apenas valida
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE = "https://tecnicocuritiba.com.br";
const OUT = path.join(ROOT, "public", "sitemap-images.xml");
const CHECK_ONLY = process.argv.includes("--check");
const ALLOWED_HOSTS = ["images.unsplash.com", "images.pexels.com"];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ------------------------------------------------------- registry de fotos
const imagesSrc = fs.readFileSync(path.join(ROOT, "src/lib/images.ts"), "utf8");
const map = Object.fromEntries([...imagesSrc.matchAll(/^\s{2}(\w+):\s*"([^"]+)",/gm)].map(([, k, v]) => [k, v]));
const variants = (key) => {
  const base = (map[key] || "").split("?")[0];
  if (!base) return [];
  const q = "auto=format&fit=crop&w=1200&q=72";
  return [`${base}?${q}`, `${base}?fm=webp&${q}`, `${base}?fm=avif&${q}`];
};

// Conjuntos usados pelas páginas locais (espelham LocalPhotoGallery/BairroTemplate)
const LOCAL_SET = ["tecnicoTrabalhando", "bancadaTecnica", "componentesSsd"];

// ------------------------------------------------------- rotas dos sitemaps
function localRoutes() {
  const dir = path.join(ROOT, "public");
  const files = fs.readdirSync(dir).filter((f) => /^sitemap.*\.xml$/.test(f) && f !== "sitemap-images.xml");
  const routes = new Set();
  for (const f of files) {
    const xml = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (!loc.startsWith(SITE) || /sitemap[\w-]*\.xml$/.test(loc)) continue;
      const p = loc.slice(SITE.length).replace(/\/$/, "") || "/";
      if (/^\/(bairros|atendimento)\//.test(p)) routes.add(p);
    }
  }
  return [...routes].sort();
}

function localityName(routePath) {
  const last = routePath.split("/").filter(Boolean).pop() || "";
  return last
    .split("-")
    .map((w) => (["de", "da", "do", "das", "dos", "e"].includes(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function build() {
  const routes = localRoutes();
  const blocks = routes.map((r) => {
    const local = localityName(r);
    const imgs = LOCAL_SET.flatMap((key) =>
      variants(key).map((url) => ({
        url,
        title: `${(map[`${key}Alt`] || key).split(" — ")[0]} — ${local}`,
        caption: `${map[`${key}Alt`] || key} — atendimento em ${local}. Foto: Unsplash (Unsplash License).`,
      })),
    );
    const imageXml = imgs
      .map(
        (i) =>
          `    <image:image>\n      <image:loc>${esc(i.url)}</image:loc>\n      <image:title>${esc(i.title)}</image:title>\n      <image:caption>${esc(i.caption)}</image:caption>\n      <image:license>https://unsplash.com/license</image:license>\n    </image:image>`,
      )
      .join("\n");
    return `  <url>\n    <loc>${esc(SITE + r)}</loc>\n${imageXml}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${blocks.join("\n")}\n</urlset>\n`;
}

function validate(xml) {
  const errors = [];
  const imageLocs = [...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]);
  const pageUrls = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const dupPages = pageUrls.filter((u, i) => pageUrls.indexOf(u) !== i);
  if (dupPages.length) errors.push(`URLs de página duplicadas: ${[...new Set(dupPages)].slice(0, 5).join(", ")}`);
  if (/<lastmod>/.test(xml)) errors.push("sitemap-images.xml não deve conter <lastmod> (sem timestamp por página).");

  for (const block of xml.split("<url>").slice(1)) {
    const page = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    const imgs = [...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]);
    if (imgs.length === 0) errors.push(`${page}: entrada sem nenhuma imagem.`);
    const dup = imgs.filter((u, i) => imgs.indexOf(u) !== i);
    if (dup.length) errors.push(`${page}: imagens duplicadas (${dup.length}).`);
    const titles = [...block.matchAll(/<image:title>/g)].length;
    const caps = [...block.matchAll(/<image:caption>/g)].length;
    if (titles !== imgs.length || caps !== imgs.length) {
      errors.push(`${page}: título/legenda ausentes em alguma imagem.`);
    }
    for (const u of imgs) {
      const host = (u.match(/^https:\/\/([^/]+)/) || [])[1];
      if (!ALLOWED_HOSTS.includes(host)) errors.push(`${page}: host de imagem não permitido (${host}).`);
    }
  }
  return { errors, pages: pageUrls.length, images: imageLocs.length };
}

const xml = CHECK_ONLY ? fs.readFileSync(OUT, "utf8") : build();
if (!CHECK_ONLY) fs.writeFileSync(OUT, xml, "utf8");

const { errors, pages, images } = validate(xml);
if (errors.length) {
  console.error(`\n❌ sitemap-images: ${errors.length} problema(s)\n`);
  errors.slice(0, 40).forEach((e) => console.error(` - ${e}`));
  process.exit(1);
}
console.log(`✅ sitemap-images.xml — ${pages} páginas, ${images} imagens (AVIF/WebP/original), sem duplicatas.`);
