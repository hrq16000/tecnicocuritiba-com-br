#!/usr/bin/env node
/**
 * Gate de CI: valida a configuração do AdSense.
 *
 * 1. public/ads.txt existe e contém a linha DIRECT do publisher correto.
 * 2. O head SSR contém a meta `google-adsense-account` com o mesmo publisher.
 * 3. O script adsbygoogle NÃO é carregado estaticamente (deve depender do consentimento).
 *
 * Com --remote <origem>, também verifica se o ads.txt publicado responde 200
 * e contém o publisher ID (relatório de status pós-deploy).
 */
import { readFileSync, existsSync } from "node:fs";

const PUB = "pub-3762170279587706";
const errors = [];
const ok = [];

if (!existsSync("public/ads.txt")) {
  errors.push("public/ads.txt não encontrado");
} else {
  const adsTxt = readFileSync("public/ads.txt", "utf8");
  const line = adsTxt
    .split("\n")
    .map((l) => l.trim())
    .find((l) => !l.startsWith("#") && l.includes(PUB));
  if (!line) errors.push(`public/ads.txt sem linha ativa para ${PUB}`);
  else if (!/google\.com,\s*pub-\d+,\s*DIRECT,\s*f08c47fec0942fa0/i.test(line))
    errors.push(`linha do ads.txt fora do formato IAB: "${line}"`);
  else ok.push(`ads.txt: ${line}`);
}

const root = readFileSync("src/routes/__root.tsx", "utf8");
const adsense = readFileSync("src/lib/adsense.ts", "utf8");
if (!root.includes('name: "google-adsense-account", content: ADSENSE_CLIENT') ||
    !adsense.includes(`ADSENSE_CLIENT = "ca-${PUB}"`))
  errors.push("head SSR sem meta google-adsense-account correspondente ao publisher");
else ok.push("meta google-adsense-account configurada no head SSR");

if (!root.includes("<ConsentBanner />") || !adsense.includes("|| !hasAdsConsent()) return;") ||
    /<script[^>]+adsbygoogle\.js/.test(root))
  errors.push("consentimento de publicidade ausente ou script carregado estaticamente");
else ok.push("AdSense condicionado ao consentimento");

const htmlIndex = process.argv.indexOf("--html");
if (htmlIndex !== -1) {
  const html = readFileSync(process.argv[htmlIndex + 1], "utf8");
  if (!html.includes('name="google-adsense-account"') || !html.includes(`content="ca-${PUB}"`))
    errors.push("HTML SSR sem meta google-adsense-account correspondente");
  else ok.push("meta google-adsense-account presente no HTML SSR");
  if (/<script[^>]+adsbygoogle\.js/.test(html))
    errors.push("adsbygoogle.js carregado estaticamente no HTML SSR");
  else ok.push("HTML SSR sem script publicitário estático");
}

const remoteIndex = process.argv.indexOf("--remote");
if (remoteIndex !== -1) {
  const origin = (process.argv[remoteIndex + 1] || "https://tecnicocuritiba.com.br").replace(/\/$/, "");
  try {
    const res = await fetch(`${origin}/ads.txt`, { redirect: "follow" });
    const body = await res.text();
    if (!res.ok) errors.push(`${origin}/ads.txt retornou HTTP ${res.status}`);
    else if (!body.includes(PUB)) errors.push(`${origin}/ads.txt acessível, mas sem ${PUB}`);
    else ok.push(`${origin}/ads.txt HTTP 200 e contém ${PUB}`);
  } catch (e) {
    errors.push(`falha ao buscar ${origin}/ads.txt: ${e.message}`);
  }
}

console.log("── Relatório AdSense ──");
ok.forEach((l) => console.log(`  ✓ ${l}`));
errors.forEach((l) => console.log(`  ✗ ${l}`));

if (errors.length) {
  console.error(`\ncheck:adsense FALHOU (${errors.length} problema(s))`);
  process.exit(1);
}
console.log("\ncheck:adsense OK");
