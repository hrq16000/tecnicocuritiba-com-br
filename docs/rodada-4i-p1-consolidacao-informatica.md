# Rodada 4I-P.1 — Consolidação cirúrgica do cluster de informática

> Estado final reconciliado após a recuperação 4I-P.1R. Este documento substitui
> versões anteriores conflitantes.

## 1. HEAD final auditado
`c04aa328b223df2b1dc722a7fc661ad50b211219` — branch de trabalho, working tree limpo
no início da recuperação (`git status --short` sem saída, `git diff --stat` vazio).
O HEAD `b9ad475` citado no pedido **não é mais o HEAD**; as alterações da 4I-P.1 já
estavam integradas.

## 2. Diff recebido
Alterações da 4I-P.1 já commitadas:
- `src/pages/Servicos.tsx` (hub)
- `src/pages/AssistenciaTecnicaCuritiba.tsx` (contrato SEO)
- `package.json` (script `check:internal-links`)

## 3. Estado antes da recuperação
Build final e gates não executados; relatório incompleto; suspeita de instabilidade
no gate de links internos.

## 4. Propriedade da intenção
**NÃO — INTENÇÕES DISTINTAS.**
- `/tecnico-informatica-curitiba` = intenção-mãe "técnico/assistência de informática
  em Curitiba", atendimento domiciliar, preço de entrada.
- `/assistencia-tecnica-curitiba` = reparo de bancada multiequipamento (computadores,
  notebooks, placas, consoles, smartphones).
Nenhuma reatribuição de intenção-mãe foi feita. Canonical SELF em ambas.

## 5. /tecnico-informatica-curitiba
Existe, indexável, no sitemap, canonical próprio.
- title: `Técnico de Informática em Curitiba a partir de R$ 99,99 | Atendimento Hoje`
- H1: `Técnico de Informática em Curitiba`
- Linkada do hub `/servicos` e do bloco `ServicosCorrelatos`.

## 6. /assistencia-tecnica-curitiba
Existe, indexável, canonical SELF.
- title: `Assistência Técnica Especializada em Curitiba | Reparo de Bancada`
- H1: `Assistência Técnica Especializada em Curitiba` (inalterado)
- description alinhada ao reparo de bancada.

## 7. Canibalização
`check:cannibalization` **não existe** no projeto (scripts reais listados na Fase 14).
Avaliação manual: títulos e H1 distintos, foco de conteúdo distinto (domiciliar ×
bancada). Nenhuma sobreposição nova criada pela 4I-P.1.
Par `/` × `/tecnico-informatica-curitiba`: **PRÉ-EXISTENTE** (title do shell global),
não agravado por esta rodada — rodada futura própria.

## 8. Hub antes/depois
Auditoria do artefato: `check:internal-links` verificou **636 URLs — 636 OK**, zero
links internos quebrados. A alegação de "75 de 77 hrefs → NotFound" **não se reproduz**
em nenhum ponto do histórico auditável; hub não perdeu destinos.

## 9. Cards sem href
**Zero.** Todos os cards de serviço possuem CTA real (WhatsApp `<a>`), e todos os
cards de "Qual o Seu Problema?" expõem chips `<Link>` com destino real. Nenhum
elemento com aparência de link sem ação. Sem regressão UX.

## 10. Gate internal-links
`scripts/check-internal-links.mjs`, exposto como `check:internal-links`.
Lê o sitemap-index, valida status HTTP de todas as URLs e amostra 30 páginas para
extrair `<a href>` internos. Executado contra `PREVIEW_URL=http://localhost:4173`
(build + preview). Resultado: **PASS**.

## 11. Causa do timeout
**Não reproduzido.** O gate não é Playwright e não possui helper `isNotFound` nem
espera por `meta[name="robots"]`. O timeout relatado pertencia a uma abordagem E2E
que não existe no HEAD. Não há espera por hidratação: a detecção é por status HTTP.

## 12. Correção do helper
Nenhuma necessária — não há helper. Nenhum timeout aumentado, nenhum erro engolido.

## 13. Build
`bun run build` — **exit 0**. Prerender: 17 rotas pilot, 101 cidades, 613 shells de
bairro com canônico próprio. Postbuild SEO: `dist/index.html` OK (title, desc 157c, 1 H1).

## 14. Gates
| Gate | Resultado |
| --- | --- |
| build + postbuild `check:seo` | PASS |
| `check:internal-links` (preview 4173) | PASS — 636/636 |
| `check:title-meta` (BASE_URL=preview) | PASS — 300 rotas únicas |
| `check:brand` | PASS — 732 arquivos |
| `validate:jsonld` | NÃO EXECUTÁVEL no sandbox (browsers Playwright ausentes) — roda no CI |

`check:cannibalization`, `check:copy`, `check:meta-uniqueness`,
`check:sitemap-source`, `check:internal-links:strict` **não existem** no projeto.

## 15. Paridade shell/runtime
Ambas as rotas não possuem shell prerenderizado dedicado: o HTML inicial serve o shell
global e o contrato final é aplicado pelo `PageSEO` no runtime. Situação **pré-existente
e simétrica** entre as duas URLs; nenhuma contradição de intenção introduzida.

## 16. JSON-LD
**REGRESSÃO FACTUAL corrigida:** removida a declaração
`Conserto de Equipamento de Som em Curitiba` (`Audio Repair`) do array `Service[]` de
`/assistencia-tecnica-curitiba` — áudio foi formalmente recusado como vertical.
Nenhum outro tipo alterado (BreadcrumbList, LocalBusiness, FAQPage, Service, WebSite
preservados). Sem redesign de schema.

## 17. Check copy
Gate `check:copy` inexistente. O termo "Orçamento pelo WhatsApp" já é vocabulário
corrente do site (aparece em gates de preço e no funil). **PRÉ-EXISTENTE**, sem nova
violação detectada por `check:brand`.

## 18. TV/placas/monitor
Zero alteração de conteúdo, intenção ou destino. As menções no hub e no JSON-LD são
as já existentes; nenhuma nova exposição estratégica.

## 19. Funil/tracking/banco
Intactos: 0 alteração em CTA, triagem, GA4, Supabase ou telemetria.

## 20. Arquivos alterados
4I-P.1 (originais): `src/pages/Servicos.tsx`, `src/pages/AssistenciaTecnicaCuritiba.tsx`,
`package.json`.
4I-P.1R (correção de validação): `src/pages/AssistenciaTecnicaCuritiba.tsx`
(1 linha — remoção do Service de áudio) + este relatório.

## 21. P0
Nenhum.

## 22. P1
- Corpo editorial de `/assistencia-tecnica-curitiba` ainda console-heavy (fora de escopo).
- `/` × `/tecnico-informatica-curitiba`: similaridade de title pré-existente.

## 23. P2
- Sobreposição B2B (`/assistencia-tecnica-empresas-curitiba` × `/empresa-de-ti-curitiba`).
- Desproporção de link equity interno.

## 24. Git final
Diff mínimo, localizado e explicável. Nenhuma página, rota ou redirect criado.

---

# DECISÃO

CLUSTER DE INFORMÁTICA CONSOLIDADO — 4I-P.1 APROVADA

Próximo passo: SEO interno de informática **recongelado**. Nenhuma nova mudança
orgânica; prioridade integral à execução humana da 4I-M/GBP e aguardar dados do GSC.
