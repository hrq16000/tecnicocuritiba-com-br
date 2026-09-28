import { test, expect } from "@playwright/test";

/** Gate: todo schema Service em rotas de serviço/bairro tem provider, serviceType e offers. */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";
const PAGES = [
  "/assistencia-tecnica-curitiba",
  "/assistencia-tecnica-computador-curitiba",
  "/assistencia-tecnica-notebook-curitiba",
  "/empresa-de-ti-curitiba",
  "/suporte-empresas",
  "/conserto-tv-curitiba",
  "/servicos/conserto-celular",
  "/servicos/conserto-pc-notebook/batel",
  "/servicos/formatacao-computador/centro",
  "/servicos/redes-wifi/cic",
];
type Node = Record<string, unknown>;
const collect = (n: unknown, out: Node[]) => {
  if (Array.isArray(n)) n.forEach((x) => collect(x, out));
  else if (n && typeof n === "object") {
    const t = (n as Node)["@type"];
    if (t === "Service" || (Array.isArray(t) && t.includes("Service"))) out.push(n as Node);
    Object.values(n as Node).forEach((v) => typeof v === "object" && collect(v, out));
  }
};
for (const path of PAGES) {
  test(`Service completo em ${path}`, async ({ page }) => {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    const svcs: Node[] = [];
    for (const t of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      try { collect(JSON.parse(t), svcs); } catch { /* ignore */ }
    }
    expect(svcs.length, "ao menos um Service").toBeGreaterThan(0);
    for (const s of svcs) {
      expect(s.provider, `provider em ${String(s.name)}`).toBeTruthy();
      expect(s.serviceType, `serviceType em ${String(s.name)}`).toBeTruthy();
      expect(s.offers, `offers em ${String(s.name)}`).toBeTruthy();
    }
  });
}
