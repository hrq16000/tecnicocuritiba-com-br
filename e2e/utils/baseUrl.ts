// Resolve a base URL que funciona tanto no CI quanto localmente,
// sem depender do baseURL injetado pelo pacote de config do runner.
export const BASE_URL = (
  process.env.E2E_BASE_URL ||
  process.env.PLAYWRIGHT_BASE_URL ||
  "http://localhost:8080"
).replace(/\/+$/, "");

export const abs = (pathOrUrl: string): string =>
  /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : `${BASE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
