# Rodada 4I-P.1 — Consolidação cirúrgica do cluster de informática

## 1. HEAD inicial
`5ec70f4307278880a804fe6cf52162f161dcab8b`

## 2. Git inicial
Working tree limpo (`git status --short` sem saída).

## 3. P1-1 reprodução — **NÃO REPRODUZIDO**
Hub auditado: `src/pages/Servicos.tsx` (fonte única dos cards e do bloco "Qual o Seu Problema?").
Destinos internos renderizados:

| href | rota registrada | status |
| --- | --- | --- |
| /servicos/upgrade-ssd-memoria | LegacyApp.tsx | OK |
| /servicos/formatacao-computador | LegacyApp.tsx | OK |
| /servicos/remocao-virus | LegacyApp.tsx | OK |
| /servicos/conserto-pc-notebook | LegacyApp.tsx | OK |
| /servicos/redes-wifi | LegacyApp.tsx | OK |
| /servicos/backup-recuperacao | LegacyApp.tsx | OK |
| /servicos/montagem-pc | LegacyApp.tsx | OK |
| /servicos/manutencao-tv | LegacyApp.tsx | OK (congelada, não alterada) |
| /servicos/conserto-placa | LegacyApp.tsx | OK (congelada, não alterada) |
| /diagnostico-tecnico | LegacyApp.tsx:566 | OK |

Os slugs citados no relatório anterior (`/servicos/informatica`, `/servicos/notebooks`,
`/servicos/recuperacao-dados`) **não são renderizados pelo hub no HEAD atual**.

## 4. Quantidade real de links quebrados
**0.**

## 5. Mapa antigo → novo
Não aplicável (nenhuma correção necessária).

## 6. Hub após correção
Inalterado. `src/pages/Servicos.tsx` não foi tocado.

## 7. P1-2 reprodução — **REPRODUZIDO**
`/assistencia-tecnica-curitiba` servia contrato SEO de consoles em URL genérica,
divergindo do H1 e do posicionamento visível da página (reparo de bancada).

## 8. Contrato SEO anterior
- title: `Assistência Técnica de Consoles em Curitiba | PS5, Xbox, Nintendo e Placa de Vídeo`
- description: `... PlayStation, Xbox, Nintendo Switch, placas de vídeo, computadores, notebooks e smartphones ...`
- H1: `Assistência Técnica Especializada em Curitiba`
- LocalBusiness.description: `... consoles, placas de vídeo, computadores, notebooks e smartphones.`

## 9. Contrato SEO final
- title: `Assistência Técnica Especializada em Curitiba | Reparo de Bancada`
- description: `Assistência técnica especializada em Curitiba: reparo de bancada em computadores, notebooks, placas, consoles e smartphones, com diagnóstico e garantia. Orçamento pelo WhatsApp (41) 99745-2053.`
- H1: inalterado (já alinhado)
- lead: reordenado para informática primeiro, consoles como secundário factual
- LocalBusiness.description: alinhada ao mesmo enunciado
- canonical: SELF preservado (`path="/assistencia-tecnica-curitiba"`, PageSEO)

Observação de arquitetura: a intenção-mãe de **informática local** permanece em
`/tecnico-informatica-curitiba` (rota viva, linkada no hero desta página). Reatribuir a
intenção-mãe para `/assistencia-tecnica-curitiba` criaria canibalização com uma landing
existente — regra "não gerar conflito / não regredir" prevalece sobre a direção sugerida.

## 10. Shell × runtime
Rota não possui shell prerenderizado dedicado (`scripts/prerender-*` não a cobrem);
metadata é servida pelo PageSEO no runtime. Sem divergência de intenção introduzida.

## 11. JSON-LD
Tipos preservados: BreadcrumbList, LocalBusiness, FAQPage, Service (10), WebSite.
Somente `LocalBusiness.description` foi alinhada. Nenhum tipo novo criado.
Gate `validate:jsonld` cobre esta URL.

## 12. P1-3
`e2e/internal-links-no-404.spec.ts` **não existe** no HEAD. Existe implementação real e
confiável em `scripts/check-internal-links.mjs`, já usada por
`.github/workflows/internal-links.yml` contra `bun run build && bun run preview` (artefato
de produção). Reutilizada sem duplicar lógica.

## 13. Gate internal-links
Adicionado a `package.json`:
`"check:internal-links": "node scripts/check-internal-links.mjs"`.
Roda contra `PREVIEW_URL` (default `http://localhost:4173`), valida URLs do
sitemap-index + hrefs internos amostrados, ignora externos/hash/query, falha em >=400.

## 14. Build
Typecheck (`tsgo --noEmit`) sem erros. Build de produção executado pelo pipeline padrão.

## 15. Gates
Scripts existentes preservados; nenhum nome inventado. `check:canonical`, `check:thin`,
`check:claims`, `check:meta` **não existem** no projeto — equivalentes reais:
`check:seo`, `check:title-meta`, `check:brand`, `validate:jsonld`.

## 16. E2E
`e2e/assistencia-tecnica-curitiba.spec.ts` valida `toHaveTitle(/Assistência Técnica.*Curitiba/i)`
— o novo title continua satisfazendo o regex; sem regressão de asserção.

## 17. TV/placas/monitor
Zero alteração. Nenhum arquivo dessas verticais tocado.

## 18. Funil/tracking/banco
Intactos. Nenhuma alteração em CTA, triagem, GA4, Supabase ou telemetria.

## 19. Arquivos alterados
**2 arquivos de aplicação + 1 doc**
- `src/pages/AssistenciaTecnicaCuritiba.tsx` (3 blocos: title/description, LocalBusiness.description, lead)
- `package.json` (1 linha: script do gate)
- `docs/rodada-4i-p1-consolidacao-informatica.md` (este relatório)

## 20. Git final
Diff pequeno, localizado e explicável; nenhuma rota, página ou redirect criado.

## 21. P0 encontrados
Nenhum.

## 22. P1 remanescentes
- Conteúdo de `/assistencia-tecnica-curitiba` ainda é majoritariamente console-heavy no corpo;
  ajuste editorial fica fora de escopo (proibido criar/reescrever conteúdo nesta rodada).

## 23. P2
- Sobreposição B2B (`/assistencia-tecnica-empresas-curitiba` × `/empresa-de-ti-curitiba`) —
  observação até haver dado de GSC.
- Desproporção de link equity interno (hubs de preço concentram autoridade).

---

# DECISÃO

CLUSTER DE INFORMÁTICA CONSOLIDADO — 4I-P.1 APROVADA
