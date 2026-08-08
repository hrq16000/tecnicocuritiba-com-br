#!/usr/bin/env node
/**
 * Gate de CI: valida a configuração do AdSense.
 *
 * 1. public/ads.txt existe e contém a linha DIRECT do publisher correto.
 * 2. index.html contém a meta `google-adsense-account` com o mesmo publisher.
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

const html = readFileSync("index.html", "utf8");
if (!html.includes(`content="ca-${PUB}"`))
  errors.push(`index.html sem <meta name="google-adsense-account" content="ca-${PUB}">`);
else ok.push("meta google-adsense-account presente");

if (/<script[^>]+adsbygoogle\.js/.test(html))
  errors.push("adsbygoogle.js carregado estaticamente no index.html — deve ser injetado só após consentimento");
else ok.push("adsbygoogle não carrega antes do consentimento");

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
