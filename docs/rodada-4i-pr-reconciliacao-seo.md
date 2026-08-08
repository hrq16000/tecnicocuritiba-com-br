# RODADA 4I-P.R — Reconciliação canônica da auditoria SEO

**Modo:** somente leitura. Nenhuma alteração em `src/`, `scripts/`, `public/` ou banco.

---

## 1. Commit auditado

```text
COMMIT AUDITADO = a38fb1db92de58d16c7d3c0708e436a6d0eaa4ce ("Auditoria rodada 4I-P concluída")
BRANCH AUDITADA = edit/edt-d971baf8-3647-4864-b09b-c2c1e6c6c130
DATA/HORA       = 2026-08-08 05:3x UTC (02:3x America/Sao_Paulo)
```

Todas as conclusões abaixo valem exclusivamente para este estado.

---

## 2. Scripts disponíveis (fonte: package.json)

| Gate citado historicamente | Existe agora? | Resultado |
| -------------------------- | ------------- | --------- |
| check:seo | SIM | PASS (postbuild: title/desc/h1 OK em `dist/index.html`) |
| check:title-meta | SIM | ver seção 7 |
| check:canonical | NÃO | — (coberto parcialmente por `scripts/check-sitemap-urls.mjs`, não é script npm) |
| check:thin | NÃO | — |
| check:claims | NÃO | — |
| check:trust-claims | NÃO | — |
| check:analytics-parity | NÃO | — |
| check:internal-links | NÃO como script npm (existe `scripts/check-internal-links.mjs`, chamado no workflow) | não executado nesta rodada |
| check:orphan-pages | NÃO | — |
| check:sitemap-source | NÃO | — |
| check:editorial-governance | NÃO | — |

Nenhum script foi criado.

---

## 3. Sitemap — verdade

`npm run build` executa `generate-sitemaps.mjs` (predev/prebuild) a partir de `src/LegacyApp.tsx` + data files. Índice com 6 sub-sitemaps; totais: main 59, servicos 133, bairros 221, marcas 27, problemas 190, news 5.

Rotas `/atendimento/:cidade` e `/atendimento/:cidade/:bairro` (71 no bucket `servicos`) estão presentes; rotas noindex (`/avaliar`, `/obrigado`, `/funil-indisponivel`, `/status-anuncios`) e `/admin`, `/ads`, redirects `<Navigate>` são excluídas por regra explícita.

**Classificação: `SITEMAP CORRETO`.**

---

## 4. Services

**Não existe `src/lib/services.ts` nem `ServicoDetalhe.tsx` neste repositório.** As páginas de serviço são componentes explícitos em `src/pages/servicos/*` registrados em `LegacyApp.tsx`, e o gerador de sitemap lê as rotas literais do próprio `LegacyApp.tsx` — logo não existe a classe de bug "serviço indexável ausente do sitemap por divergência entre `services.ts` e o gerador".

URLs citadas historicamente que **não existem**: `/servicos/informatica`, `/servicos/recuperacao-dados`, `/servicos/manutencao-de-notebook`, `/servicos/manutencao-de-computador`, `/servicos/suporte-tecnico-empresarial`.

---

## 5. Editorial fail-closed

Não existe `EDITORIAL_WAVE_SLUGS` em nenhum arquivo do repositório, e `src/pages/BlogPost.tsx` não contém lógica de `noindex`. Os artigos citados (`como-fazer-manutencao-nobreak`, `notebook-nao-liga-o-que-fazer`, `como-montar-pc-gamer-2026`, `como-fazer-backup-completo-windows-11`) **não existem como posts** — os slugs de blog no sitemap-news são 5, todos com shell estático em `dist/blog/*`.

**Classificação: mecanismo inexistente → achado `NÃO REPRODUZIDO`** (não é "quebrado" nem "operante"; não há política de aprovação editorial implementada). Não é P0 porque não há artigo não aprovado indexado — não há artigos não aprovados.

---

## 6. `/atendimento/*`

- Rotas geradas: `/atendimento` + cidades + bairros; `prerender-bairros.mjs` reporta **613 shells com canônico próprio** (21 já existentes de etapas anteriores), sobre 350 rotas testadas no gate.
- Todos os shells inspecionados: `robots = index, follow, max-image-preview:large...`, canonical self, 1 `<h1>`.
- Presentes no sitemap: sim (bucket `servicos`).
- noindex: nenhum.

Amostra verificada em `dist/`:

| Rota | title | canonical |
| --- | --- | --- |
| /atendimento/curitiba | "Atendimento Técnico em Curitiba \| Orçamento no WhatsApp" | self |
| /atendimento/curitiba/batel | "Atendimento Técnico em Batel, Curitiba \| WhatsApp" | self |
| /atendimento/colombo/centro | "Atendimento Técnico em Centro, Colombo \| WhatsApp" | self |

---

## 7. Title/meta — origem da divergência histórica

Executado o gate real `check:title-meta` em duas bases:

| Base | Exit code | Rotas | Violações |
| --- | --- | --- | --- |
| `http://localhost:8080` (dev server Vite, **sem prerender**) | 1 | 300 | 598 (title+description duplicados, todos herdando o shell SPA da home) |
| `http://localhost:8099` (servindo `dist/` após `npm run build`) | **0** | **350** | **0** |

**Causa raiz da divergência entre relatórios anteriores:** o gate foi rodado contra o dev server, que não aplica os shells estáticos de `prerender-bairros.mjs`. O HTML realmente publicado (`dist/`) tem title/description únicos e dentro dos limites.

> Metadados iguais no dev server ≠ canibalização. Em produção não há sequer duplicação técnica.

---

## 8. GSC — janela canônica

Janela única: **2026-07-08 a 2026-08-04** (28 dias completos; a janela de 3 meses não está disponível por este canal). Property `sc-domain:tecnicocuritiba.com.br`. Home: *Submitted and indexed*, canonical escolhido pelo Google = próprio, robots ALLOWED, último crawl 2026-08-07.

Totais: **152 cliques, 10.741 impressões, CTR 1,42%, posição média 9,18.**

Top páginas:

| URL | Cliques | Impressões | CTR | Posição |
| --- | --: | --: | --: | --: |
| /problemas/reparo-placa-som-amplificador-curitiba | 23 | 709 | 3,24% | 7,86 |
| /problemas/reparo-placa-principal-tv-curitiba | 13 | 731 | 1,78% | 6,58 |
| /valores | 9 | 673 | 1,34% | 7,47 |
| / | 7 | 374 | 1,87% | 8,99 |
| /problemas/fonte-queimada-curitiba | 7 | 116 | 6,03% | 7,04 |
| /procedimentos/microsoldagem-celular-curitiba | 7 | 99 | 7,07% | 7,80 |
| /marcas/logitech | 5 | 35 | 14,29% | 6,57 |
| /tecnico-informatica-colombo | 5 | 435 | 1,15% | 6,17 |
| /servicos | 4 | 449 | 0,89% | 13,87 |
| /blog/como-crimpar-cabo-de-rede-rj45 | 3 | 360 | 0,83% | 9,10 |

Queries do cluster genérico de informática ("assistência técnica informática curitiba", "técnico de computador", "manutenção computador", "conserto notebook curitiba") **não aparecem** nas linhas retornadas — o topo de queries é dominado por áudio/placas e preço. Cluster genérico: **SEM DADOS suficientes**.

---

## 9. Cidades satélite

`/tecnico-informatica-colombo` aparece com 435 impressões e posição 6,17; `/tecnico-informatica-curitiba` e `/tecnico-informatica-araucaria` não aparecem no top-10 de páginas. Não há, nesta janela, par query↔URL que mostre satélite capturando query genérica sem localidade.

**Classificação: `DADOS INSUFICIENTES`** (não comprovado).

---

## 10. Página primária do cluster de informática

| Critério | /tecnico-informatica-curitiba | /servicos/informatica | /assistencia-tecnica-curitiba |
| --- | --- | --- | --- |
| existe | SIM | **NÃO EXISTE** | SIM |
| intenção | local + serviço técnico de informática em Curitiba | — | genérica de assistência, mas conteúdo/meta de consoles |
| links internos (ocorrências em `src/`) | 24 | 0 | — |
| GSC (janela) | sem linhas no top | — | sem linhas no top |

**PÁGINA PRIMÁRIA = `/tecnico-informatica-curitiba`.**
Demais: `/assistencia-tecnica-curitiba` = OUTRA INTENÇÃO (consoles) — hoje mal rotulada; `/servicos` = HUB; páginas de cidade satélite = SUPORTE local.

---

## 11. `/assistencia-tecnica-curitiba`

- Shell estático (`dist/`): title `Assistencia Tecnica Curitiba em Curitiba | Técnico em Curitiba` (derivado genérico do prerender).
- Runtime (`PageSEO` em `src/pages/AssistenciaTecnicaCuritiba.tsx`, l.337-338): title/description **de consoles** (PS5, Xbox, Nintendo, placa de vídeo).
- H1: "Assistência Técnica Especializada em …" (genérico).

> O title/description ainda são de consoles? **SIM (no DOM/runtime)** — e divergem do shell estático, que é genérico e repetitivo.

**P1 de intenção + inconsistência shell↔runtime.** Não corrigido.

---

## 12. B2B

URLs existentes: `/assistencia-tecnica-empresas-curitiba` (SuporteEmpresas), `/empresa-de-ti-curitiba`, `/suporte-empresas`. `/servicos/suporte-tecnico-empresarial` **não existe**. Nenhuma delas aparece na janela GSC.

**Resultado: `SOBREPOSIÇÃO LEVE`** (mesma audiência PJ, intenções redacionais distintas; sem evidência de diluição em GSC).

---

## 13. Link equity (metodologia única: ocorrências literais da URL em `src/`)

| URL | Ocorrências |
| --- | --: |
| /precos-e-politicas | 145 |
| /servicos | 112 |
| /tecnico-informatica-curitiba | 24 |
| /servicos/conserto-notebook-curitiba | 13 |
| /manutencao-notebook-pc-curitiba | 4 |
| /servicos/informatica | 0 (inexistente) |
| /servicos/recuperacao-dados | 0 (inexistente) |

---

## 14. Home

`src/pages/Index.tsx` não contém links literais para money pages de informática; os links vêm de componentes (`ServicesSection` → `/valores`, `InterlinkingBlock` → `/areas-atendidas`) e de listas de serviços. Não há link contextual **estável e literal** da home para `/tecnico-informatica-curitiba` nem para `/servicos/conserto-notebook-curitiba`.

**Achado "home sem money links": PARCIALMENTE CONFIRMADO** (existe hub `/servicos` e `/valores`; falta link direto para a página primária do cluster).

---

## 15. Hub `/servicos`

Hub existe, é indexável, está no sitemap e recebe 112 referências internas. Cobertura por tema não foi medida com gate próprio (não existe `check:internal-links` como script npm) — registrado, não criado.

---

## 16. Canibalização

- **Nível A — duplicação técnica:** inexistente em produção (gate verde contra `dist/`). Única exceção estética: shells genéricos do prerender para páginas que têm meta próprio no runtime (ex.: `/assistencia-tecnica-curitiba`).
- **Nível B — sobreposição semântica:** leve, entre B2B (3 URLs) e entre `/assistencia-tecnica-curitiba` × cluster de informática.
- **Nível C — canibalização comprovada por GSC:** **nenhuma**.

---

## 17. Matriz de verdades conflitantes

| Achado histórico | Estado atual | Evidência | Veredito |
| --- | --- | --- | --- |
| editorial noindex quebrado | mecanismo inexistente | sem `EDITORIAL_WAVE_SLUGS`, sem noindex em BlogPost, artigos citados não existem | NÃO REPRODUZIDO |
| services fora do sitemap | não há `services.ts`; sitemap deriva de `LegacyApp.tsx` | build + inspeção dos sub-sitemaps | REFUTADO |
| 598 violações title/meta | só no dev server (sem prerender) | gate exit 1 em :8080 / exit 0 em `dist/` (350 rotas) | REFUTADO em produção |
| satélites canibalizam Curitiba | sem par query↔URL | GSC 08/07–04/08 | SEM DADOS |
| B2B canibaliza | sobreposição leve | 3 URLs reais, zero linhas GSC | REFUTADO (como canibalização) |
| home sem money links | falta link direto ao cluster primário | grep em Index.tsx/componentes | CONFIRMADO (parcial) |
| `/assistencia-tecnica-curitiba` = consoles | title/desc de consoles no runtime | `src/pages/AssistenciaTecnicaCuritiba.tsx:337-338` | CONFIRMADO |

---

## 18. P0

**Nenhum.** Indexação da home OK, robots ALLOWED, canonical self, sitemap correto, gates existentes verdes contra o artefato publicado.

## 19. P1 (máx. 3)

1. `/assistencia-tecnica-curitiba`: intenção conflitante — meta de consoles em URL genérica de assistência, divergindo do shell estático.
2. Home sem link contextual estável para a página primária do cluster (`/tecnico-informatica-curitiba`).
3. Shell estático de rotas que já têm `PageSEO` próprio gera title derivado repetitivo ("X em Curitiba | Técnico em Curitiba") — risco de divergência shell↔runtime em outras URLs.

## 20. P2 (máx. 5)

1. `check:title-meta` não fixa `BASE_URL` para o artefato buildado → falsos positivos e relatórios conflitantes.
2. `/servicos` com posição média 13,87 e CTR 0,89% (title/description candidatos a revisão futura).
3. `check:internal-links` existe como script mas não como gate npm.
4. Blog com apenas 5 posts no sitemap-news, `/blog/como-crimpar-cabo-de-rede-rj45` com 360 impressões e CTR 0,83%.
5. TV/placas/monitor concentram os cliques (36 de 152) — congelados nesta rodada, apenas registrado.

---

## 21. Gates executados

| Gate | Resultado |
| --- | --- |
| `npm run build` (inclui generate-sitemaps, prerender pilot/cities/bairros, check:seo) | PASS |
| `check:title-meta` contra `dist/` | PASS (0 violações, 350 rotas) |
| `check:title-meta` contra dev server | FAIL (598) — artefato incorreto, não representa produção |

Nenhum gate novo criado.

## 22. Git final

`git status --short` / `git diff -- src/` / `git diff -- scripts/`: **zero alteração** (apenas artefatos regenerados de build em `dist/` e regeneração automática de sitemap/rss pelo `prebuild`, não versionados nesta rodada).

---

## RESPOSTAS OBRIGATÓRIAS

**A. HÁ P0 ATUAL?** NÃO
**B. O SITEMAP ESTÁ CORRETO?** SIM
**C. FAIL-CLOSED EDITORIAL CORRETO NO HTML INICIAL?** NÃO SE APLICA — o mecanismo não existe; nenhum artigo não aprovado está indexado.
**D. AS ~300 ROTAS /ATENDIMENTO/* TÊM METADADOS DUPLICADOS?** NÃO (apenas no dev server sem prerender)
**E. EXISTE CANIBALIZAÇÃO COMPROVADA POR GSC?** NÃO
**F. URL PRIMÁRIA DO CLUSTER DE INFORMÁTICA =** `/tecnico-informatica-curitiba`
**G. AJUSTE DE MAIOR IMPACTO CONFIRMADO AGORA:** alinhar `/assistencia-tecnica-curitiba` (title/description/H1) à intenção real da URL e eliminar a divergência shell↔runtime.

---

## DECISÃO

```text
ESTADO SEO RECONCILIADO — PRONTO PARA 4I-P.1
```

Próximo passo: 4I-P.1 com no máximo três alterações, exclusivamente os P1 acima, sem transportar achados de snapshots anteriores.
