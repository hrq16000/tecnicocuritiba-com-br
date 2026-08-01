import { test, expect } from "@playwright/test";
import { abs } from "./utils/baseUrl";

// Rotas-chave: home, cidades, bairros, posts, problemas e /obrigado.
const ROUTES = [
  "/",
  "/sobre",
  "/precos-e-politicas",
  "/atendimento/curitiba",
  "/atendimento/sao-jose-dos-pinhais",
  "/atendimento/colombo",
  "/atendimento/curitiba/batel",
  "/atendimento/curitiba/agua-verde",
  "/problemas/computador-nao-liga-curitiba",
  "/problemas/notebook-nao-liga-curitiba",
  "/problemas/tv-nao-liga-curitiba",
  "/obrigado",
];

// Ruído externo (extensões, analytics bloqueado em CI) não deve reprovar o gate.
const IGNORE = [
  /googletagmanager|google-analytics|gtag/i,
  /favicon/i,
  /ERR_BLOCKED_BY_CLIENT/i,
  /sentry/i,
  /net::ERR_INTERNET_DISCONNECTED/i,
];

for (const route of ROUTES) {
  test(`sem console.error em ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (IGNORE.some((re) => re.test(text))) return;
      errors.push(text);
    });
    page.on("pageerror", (e) => {
      if (IGNORE.some((re) => re.test(e.message))) return;
      errors.push(`pageerror: ${e.message}`);
    });

    const res = await page.goto(abs(route), { waitUntil: "domcontentloaded" });
    expect(res?.status(), `status de ${route}`).toBeLessThan(400);
    await page.waitForTimeout(1500);

    expect(errors, `console errors em ${route}:\n${errors.join("\n")}`).toHaveLength(0);
  });
}
