#!/usr/bin/env node
/**
 * Gate de CI: JSON-LD das páginas de política.
 *
 * Garante que cada política pública declara, no mesmo bloco `application/ld+json`:
 *  - WebPage com url == canônico da página
 *  - BreadcrumbList com posições sequenciais e último item == canônico
 *  - FAQPage com >= 3 Question/acceptedAnswer preenchidos
 *
 * Uso: node scripts/check-policy-jsonld.mjs
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";

const PAGES = [
  { file: "src/pages/PoliticaCookies.tsx", route: "/politica-de-cookies-e-anuncios" },
  { file: "src/pages/PoliticaPublicidade.tsx", route: "/politica-de-publicidade" },
  { file: "src/pages/PoliticaPrivacidade.tsx", route: "/politica-de-privacidade" },
];

const errors = [];

/** Extrai o objeto `jsonLd` do módulo sem executar React (transpila só a constante). */
async function loadGraph(file) {
  const src = fs.readFileSync(path.resolve(file), "utf8");
  const start = src.indexOf("const jsonLd = {");
  if (start === -1) return null;
  // Balanceia chaves a partir do início do literal.
  let i = src.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end === -1) return null;
  const literal = src.slice(src.indexOf("{", start), end);
  // Resolve template literals simples do tipo `${CANONICAL}#webpage`.
  const canonical = src.match(/const CANONICAL = "([^"]+)"/)?.[1];
  const resolved = literal
    .replace(/`\$\{CANONICAL\}([^`]*)`/g, (_m, suffix) => JSON.stringify(canonical + suffix))
    .replace(/\bCANONICAL\b/g, JSON.stringify(canonical));
  try {
    // eslint-disable-next-line no-new-func
    const obj = new Function(`return (${resolved});`)();
    return { obj, canonical };
  } catch (err) {
    errors.push(`${file}: não foi possível interpretar o jsonLd (${err.message})`);
    return null;
  }
}

function nodesOf(obj) {
  if (Array.isArray(obj?.["@graph"])) return obj["@graph"];
  return [obj];
}

for (const { file, route } of PAGES) {
  if (!fs.existsSync(path.resolve(file))) {
    errors.push(`${file}: arquivo ausente (rota ${route})`);
    continue;
  }
  const loaded = await loadGraph(file);
  if (!loaded) {
    errors.push(`${file}: bloco JSON-LD 'const jsonLd' não encontrado`);
    continue;
  }
  const { obj, canonical } = loaded;
  const expected = SITE + route;

  if (canonical !== expected) {
    errors.push(`${file}: CANONICAL "${canonical}" != rota esperada "${expected}"`);
  }

  const nodes = nodesOf(obj);
  const byType = (t) => nodes.filter((n) => n?.["@type"] === t);

  const webpage = byType("WebPage")[0];
  if (!webpage) errors.push(`${file}: falta nó WebPage`);
  else if (webpage.url !== canonical) errors.push(`${file}: WebPage.url != canônico`);

  const crumbs = byType("BreadcrumbList")[0];
  if (!crumbs) {
    errors.push(`${file}: falta BreadcrumbList`);
  } else {
    const items = crumbs.itemListElement || [];
    if (items.length < 2) errors.push(`${file}: BreadcrumbList com menos de 2 níveis`);
    items.forEach((it, idx) => {
      if (it.position !== idx + 1) errors.push(`${file}: BreadcrumbList position fora de ordem (${it.position} na posição ${idx + 1})`);
      if (!it.name || !it.item) errors.push(`${file}: BreadcrumbList item ${idx + 1} sem name/item`);
    });
    const last = items[items.length - 1];
    if (last && last.item !== canonical) errors.push(`${file}: último breadcrumb não aponta para o canônico`);
  }

  const faq = byType("FAQPage")[0];
  if (!faq) {
    errors.push(`${file}: falta FAQPage`);
  } else {
    const qs = faq.mainEntity || [];
    if (qs.length < 3) errors.push(`${file}: FAQPage com apenas ${qs.length} pergunta(s) (mínimo 3)`);
    qs.forEach((q, idx) => {
      if (q?.["@type"] !== "Question") errors.push(`${file}: FAQPage item ${idx + 1} não é Question`);
      if (!q?.name?.trim()) errors.push(`${file}: FAQPage item ${idx + 1} sem pergunta`);
      const text = q?.acceptedAnswer?.text;
      if (!text || text.trim().length < 40) errors.push(`${file}: FAQPage item ${idx + 1} com resposta ausente ou curta demais`);
    });
  }
}

if (errors.length) {
  console.error(`[policy-jsonld] ${errors.length} erro(s):`);
  errors.forEach((e) => console.error("  ✗ " + e));
  process.exit(1);
}
console.log(`[policy-jsonld] OK — ${PAGES.length} políticas com WebPage, BreadcrumbList e FAQPage válidos.`);
