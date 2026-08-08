import { test, expect, devices } from "@playwright/test";

/**
 * Valida que os links internos entre /servicos/conserto-monitor,
 * /servicos/conserto-placa, FAQs e as variações por cidade/bairro
 * carregam sem 404 (SPA: 404 é detectado pelo H1 "404").
 */

const VIEWPORTS = [
  { name: "desktop", viewport: { width: 1280, height: 900 } },
  { name: "mobile", viewport: devices["Pixel 5"].viewport },
];

const HUBS = ["/servicos/conserto-monitor", "/servicos/conserto-placa"];

const CITY_VARIANTS = [
  "/atendimento/curitiba",
  "/atendimento/sao-jose-dos-pinhais",
  "/areas-atendidas",
  "/faq",
];

async function assertNotFoundFree(page, path: string, baseURL?: string | null) {
  const res = await page.goto(new URL(path, baseURL ?? "http://localhost:8080").toString(), {
    waitUntil: "domcontentloaded",
  });
  expect(res?.status(), `HTTP de ${path}`).toBeLessThan(400);
  await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
  const h1 = (await page.locator("h1").first().textContent())?.trim() ?? "";
  expect(h1, `${path} renderizou 404`).not.toMatch(/^404/);
}

for (const { name, viewport } of VIEWPORTS) {
  test.describe(`links conserto-monitor/placa — ${name}`, () => {
    test.use({ viewport });

    test("hubs e links internos carregam sem 404", async ({ page, baseURL }) => {
      const collected = new Set<string>();

      for (const hub of HUBS) {
        await assertNotFoundFree(page, hub, baseURL);
        const hrefs = await page
          .locator('a[href^="/servicos/"], a[href^="/atendimento"], a[href^="/preco"], a[href^="/faq"]')
          .evaluateAll((els) =>
            Array.from(
              new Set(els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || "")),
            ).filter(Boolean),
          );
        hrefs.forEach((h) => collected.add(h.split("#")[0]));
      }

      expect(collected.size, "links internos coletados").toBeGreaterThan(0);

      const targets = [...new Set([...collected].slice(0, 20).concat(CITY_VARIANTS))];
      const broken: string[] = [];

      for (const href of targets) {
        try {
          await assertNotFoundFree(page, href, baseURL);
        } catch {
          broken.push(href);
        }
      }

      expect(broken, `links quebrados em ${name}`).toEqual([]);
    });
  });
}
