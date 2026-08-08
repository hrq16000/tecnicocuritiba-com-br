import { test, expect, type Page } from "@playwright/test";

/**
 * Valida o banner LGPD:
 *  - Aceitar/Recusar disparam `gtag('consent','update', …)` do Consent Mode v2
 *  - a decisão fica persistida em `lgpd_consent_v2`
 *  - o link da política abre corretamente em mobile e desktop
 */

const CONSENT_KEY = "lgpd_consent_v2";
const POLICY_PATH = "/politica-de-cookies-e-anuncios";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;


type ConsentUpdate = {
  ad_storage?: string;
  ad_user_data?: string;
  ad_personalization?: string;
  analytics_storage?: string;
};

async function lastConsentUpdate(page: Page): Promise<ConsentUpdate | null> {
  // O index.html define o próprio `gtag`, que empilha os argumentos em `dataLayer`.
  return page.evaluate(() => {
    const layer = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []) as unknown[];
    const updates = layer
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "consent" && args[1] === "update");
    return updates.length ? (updates[updates.length - 1][2] as ConsentUpdate) : null;
  });
}

async function openFresh(page: Page) {
  await page.goto("/");
  await page.evaluate(() => {
    try {
      localStorage.removeItem("lgpd_consent_v2");
      localStorage.removeItem("lgpd_consent_v1");
    } catch {
      /* noop */
    }
  });
  await page.reload();
  const banner = page.getByRole("region", { name: /privacidade e cookies/i });
  await expect(banner).toBeVisible({ timeout: 10000 });
  return banner;
}

for (const vp of VIEWPORTS) {
  test.describe(`Consent Mode v2 — ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("Aceitar concede ads e analytics", async ({ page }) => {
      const banner = await openFresh(page);

      await banner.getByRole("button", { name: "Aceitar" }).click();
      await expect(banner).toBeHidden();

      const update = await lastConsentUpdate(page);
      expect(update).toMatchObject({
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });

      const saved = await page.evaluate((k) => localStorage.getItem(k), CONSENT_KEY);
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved as string)).toMatchObject({ ads: true, analytics: true });
    });

    test("Recusar nega ads e analytics", async ({ page }) => {
      const banner = await openFresh(page);

      await banner.getByRole("button", { name: "Recusar" }).click();
      await expect(banner).toBeHidden();

      const update = await lastConsentUpdate(page);
      expect(update).toMatchObject({
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });

      const saved = await page.evaluate((k) => localStorage.getItem(k), CONSENT_KEY);
      expect(JSON.parse(saved as string)).toMatchObject({ ads: false, analytics: false });

      // Nenhum script de anúncio pode ter sido injetado após recusa.
      expect(await page.locator("#adsbygoogle-js").count()).toBe(0);
    });

    test("link da política abre a página de cookies", async ({ page }) => {
      const banner = await openFresh(page);
      const link = banner.getByRole("link", { name: /pol[ií]tica de cookies/i });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", POLICY_PATH);

      await link.click();
      await page.waitForURL(`**${POLICY_PATH}`);
      await expect(page.locator("h1")).toBeVisible();
    });
  });
}
