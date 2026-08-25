// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
// Whitelist canônica de slugs válidos em /servicos/* + rotas extras
// aceitas para linkagem contextual em /problemas/*, /bairros/*, etc.
//
// Fonte: rotas registradas em src/LegacyApp.tsx + páginas em
// src/pages/servicos/*. Manter em sincronia manualmente — o script
// scripts/check-problemas-internal-links.mjs valida no CI.

export const VALID_SERVICO_SLUGS: ReadonlySet<string> = new Set([
  "conserto-notebook-curitiba",
  "conserto-pc-notebook",
  "conserto-placa",
  "conserto-tv",
  "conserto-monitor",
  "conserto-celular",
  "manutencao-tv",
  "formatacao-computador",
  "remocao-virus",
  "redes-wifi",
  "backup-recuperacao",
  "montagem-pc",
  "upgrade-ssd-memoria",
  "computador-lento",
  "computador-nao-liga",
]);

export const VALID_EXTRA_ROUTES: ReadonlySet<string> = new Set([
  "/coleta-e-entrega",
  "/coleta-formulario",
  "/diagnostico-tecnico",
  "/como-funciona",
  "/precos-e-politicas",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/servicos",
  "/problemas-reais-e-casos",
]);

export function isValidInternalTarget(to: string): boolean {
  if (!to) return false;
  if (to.startsWith("/servicos/")) {
    const slug = to.replace("/servicos/", "").split("/")[0];
    return VALID_SERVICO_SLUGS.has(slug);
  }
  if (
    to.startsWith("/problemas/") ||
    to.startsWith("/marcas/") ||
    to.startsWith("/bairros/") ||
    to.startsWith("/tecnico-informatica-")
  ) {
    return true;
  }
  return VALID_EXTRA_ROUTES.has(to);
}
