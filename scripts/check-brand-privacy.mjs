#!/usr/bin/env node
/**
 * Gate de privacidade de marca (build + CI):
 *
 *  1. CNPJ — nem o número (qualquer formato) nem a palavra "CNPJ" podem
 *     existir em superfícies publicadas (src/, public/, index.html).
 *  2. WhatsApp — o número NUNCA pode aparecer formatado/visível para o
 *     usuário. A forma crua (dígitos/E.164) só é tolerada em linhas que
 *     montam links (wa.me, api.whatsapp.com), constantes (WHATSAPP_NUMBER,
 *     NAP_PHONE) ou schema JSON-LD (telephone/contactPoint).
 *
 * Uso:
 *   node scripts/check-brand-privacy.mjs          # varre src/, public/, index.html
 *   node scripts/check-brand-privacy.mjs --dist   # inclui dist/ (pós-build)
 *
 * Exit 1 = encontrou vazamento → bloqueia build/deploy.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { pathToFileURL } from "node:url";

// --- Padrões ----------------------------------------------------------------

/** CNPJ em qualquer formato (com ou sem pontuação). */
export const CNPJ_DIGITS = /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/;

/** A própria menção a CNPJ não deve existir em superfícies publicadas. */
export const CNPJ_WORD = /\bCNPJ\b/i;

/**
 * Telefone visível: exige ao menos UM separador visual (espaço, parêntese,
 * ponto ou hífen) entre os grupos — é o que caracteriza "texto visível".
 * Cobre: "(41) 99745-2053", "41 9 9745-2053", "+55 41 99745-2053", etc.
 */
export const WA_FORMATTED =
  /(\+?55[\s().-]+)?\(?41\)?[\s.]+9{0,2}\s*9?745[\s.-]\s*2053/;

/** Número cru em dígitos (E.164 ou nacional) — permitido só em contexto de link/constante. */
export const WA_RAW = /(?<![\d+])\+?55?41997452053(?!\d)/;

/** Linhas onde a forma crua é legítima: montagem de link, constantes, schema. */
export const WA_RAW_ALLOW =
  /wa\.me\/|api\.whatsapp\.com|whatsapp|WHATSAPP_NUMBER|NAP_PHONE|telephone|contactPoint/i;

/** Contato exclusivo via WhatsApp: links mailto: são proibidos no portal. */
export const MAILTO_LINK = /mailto:/i;

/**
 * Caixas postais de contato (contato@, atendimento@, …) não podem aparecer
 * em superfícies publicadas. E-mails didáticos de posts (seu-email@exemplo.com,
 * joao.silva@empresa.local) não correspondem a este padrão.
 */
export const CONTACT_EMAIL =
  /\b(?:contato|atendimento|suporte|comercial|orcamento|orçamento|vendas|faleconosco|sac)@[a-z0-9.-]+\.[a-z]{2,}\b/i;

/**
 * URLs de embed/mapas do Google carregam sequências longas de dígitos no
 * parâmetro `pb` — não são CNPJ. Só isentam a regra cnpj-digits; a palavra
 * "CNPJ" e o WhatsApp visível continuam proibidos nessas linhas.
 */
export const CNPJ_ALLOW =
  /google\.com\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps|googleapis\.com|gstatic\.com/i;

const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".html", ".css", ".txt", ".xml", ".json", ".svg", ".md",
]);

const SKIP_DIRS = new Set(["node_modules", ".git", ".lovable", "test-results", "playwright-report"]);

// --- Núcleo (importável por testes) ------------------------------------------

/**
 * Analisa um texto e retorna violações [{ line, rule, excerpt }].
 * @param {string} filePath caminho (para mensagens)
 * @param {string} content  conteúdo do arquivo
 * @param {{ dist?: boolean }} opts modo dist: ignora WA_RAW (bundles embutem constantes)
 */
export function scanContent(filePath, content, opts = {}) {
  const violations = [];
  const lines = content.split("\n");
  lines.forEach((text, idx) => {
    const line = idx + 1;
    const excerpt = text.trim().slice(0, 120);

    if (CNPJ_WORD.test(text)) {
      violations.push({ line, rule: "cnpj-word", excerpt });
    }
    // Reseta lastIndex de regexes com /g não é necessário (sem flag g).
    if (CNPJ_DIGITS.test(text) && !CNPJ_ALLOW.test(text)) {
      violations.push({ line, rule: "cnpj-digits", excerpt });
    }
    if (WA_FORMATTED.test(text)) {
      violations.push({ line, rule: "whatsapp-formatted-visible", excerpt });
    }
    if (!opts.dist && WA_RAW.test(text) && !WA_RAW_ALLOW.test(text)) {
      violations.push({ line, rule: "whatsapp-raw-outside-link-context", excerpt });
    }
    if (MAILTO_LINK.test(text)) {
      violations.push({ line, rule: "email-mailto-link", excerpt });
    }
    if (CONTACT_EMAIL.test(text)) {
      violations.push({ line, rule: "email-contact-address", excerpt });
    }
  });
  return violations.map((v) => ({ file: filePath, ...v }));
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else if (TEXT_EXTENSIONS.has(extname(entry).toLowerCase())) yield p;
  }
}

// --- CLI ---------------------------------------------------------------------

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const includeDist = process.argv.includes("--dist");
  const roots = ["src", "public", "index.html"].filter((p) => existsSync(p));
  if (includeDist && existsSync("dist")) roots.push("dist");
  // TanStack Start (Nitro) publica os assets do client em .output/public.
  if (includeDist && existsSync(".output/public")) roots.push(".output/public");

  /** @type {ReturnType<typeof scanContent>} */
  let all = [];
  let files = 0;

  for (const root of roots) {
    const stat = statSync(root);
    const list = stat.isDirectory() ? [...walk(root)] : [root];
    for (const file of list) {
      files++;
      let content;
      try {
        content = readFileSync(file, "utf8");
      } catch {
        continue; // binário/encoding — não é superfície de texto
      }
      const isDist = file.startsWith("dist") || file.startsWith(".output");
      all = all.concat(scanContent(file, content, { dist: isDist }));
    }
  }

  if (all.length > 0) {
    console.error(`\n[brand-privacy] FALHOU — ${all.length} ocorrência(s) proibida(s):`);
    for (const v of all) {
      console.error(`  ✗ ${v.file}:${v.line} [${v.rule}] ${v.excerpt}`);
    }
    console.error(
      "\nRegras: CNPJ (número ou palavra) é proibido em superfícies publicadas; " +
        "o número de WhatsApp só pode existir como dígitos crus em links wa.me / constantes / JSON-LD — nunca formatado/visível.\n"
    );
    process.exit(1);
  }

  console.log(
    `[brand-privacy] OK — ${files} arquivo(s) varridos${includeDist ? " (incluindo dist/)" : ""}: sem CNPJ e sem número de WhatsApp visível ✔`
  );
}
