import { test, expect } from "@playwright/test";

const VALID = [
  "/servicos",
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-colombo",
  "/servicos/conserto-placa",
  "/problemas/reparo-placa-principal-tv-curitiba",
  "/blog/como-crimpar-cabo-de-rede-rj45",
];

for (const path of VALID) {
  test(`entrada direta 200: ${path}`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    expect(await res.text()).not.toContain("Oops! Page not found");
  });
}

test("URL inexistente continua 404", async ({ request }) => {
  const res = await request.get("/rota-inexistente-hotfix-p0-xyz");
  expect(res.status()).toBe(404);
});
