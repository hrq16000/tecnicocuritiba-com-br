Escopo grande — vou dividir em 3 fases entregáveis. Confirme antes de eu executar tudo de uma vez, ou aprove a Fase 1 primeiro.

## Fase 1 — Analytics & Tracking (rápido, baixo risco)

**1.1 Fallback "unknown" em `trackCTAClick`**
- `src/lib/analytics.ts`: normalizar `context` — quando `modalidade`, `problema` ou `equipamento` vierem `undefined/null/""`, gravar `"unknown"` no payload GA4. Nunca perder o evento.

**1.2 Evento separado para links internos em `/problemas/*`**
- Novo helper `trackInternalLink(fromProblema, toRoute, linkLabel)` → event_name `internal_link_click` com `problema_categoria`, `servico_slug`, `link_label`, `page_path`.
- Aplicar em `ProblemaPage.tsx` no bloco "Serviços Relacionados" e nos `relatedPages` (só quando `to` começar com `/servicos/`).

**1.3 Validação de links internos + evento de erro**
- Em `ProblemaPage.tsx`, importar a lista canônica de serviços (`src/pages/servicos/`). Ao renderizar cada link, se `to` começar com `/servicos/` e o slug não existir na whitelist, disparar `trackInternalLink` com `event_name: internal_link_broken` (severity=error) e adicionar `data-broken="true"` para inspeção.
- Whitelist derivada estaticamente de `src/pages/hubs/categories.ts` ou array explícito curado.

**1.4 Scroll depth + visibilidade de CTAs**
- Novo hook `useScrollDepth()` (25/50/75/100%) e `useCTAVisibility(ref, id)` via `IntersectionObserver`. Eventos: `scroll_depth` (com `depth_percent`, `problema`) e `cta_visible` (com `cta_id`, `time_to_visible_ms`).
- Instrumentar `ProblemaPage.tsx` — botões WhatsApp Agora, Ligar Agora e CTA final.

## Fase 2 — Conteúdo Wi-Fi & TV Smart

**2.1 Galeria WebP nas páginas de Wi-Fi e TV Smart**
- Usar `IMAGES` existente em `src/lib/images.ts` (assets já WebP via CDN). Novo componente `<ServiceGallery items={[…]} />` com `<figure>/<figcaption>`, `loading="lazy"`, `decoding="async"`, alt semântico.
- Adicionar em `src/pages/servicos/RedesWifi.tsx` (galeria "O que está incluso no atendimento Wi-Fi") e `src/pages/servicos/ConsertoTV.tsx` + `ManutencaoTV.tsx` (galeria "Processo de reparo/troca de tela").

**2.2 FAQs de triagem**
- Adicionar bloco `<FAQSection>` extra nessas 3 páginas com 5–6 perguntas focadas em triagem (o que testar antes, sinais de falha, quando não compensa), reutilizando o catálogo de `sintomas` já presente em `src/lib/problemas/` (Wi-Fi e TV) para consistência SEO.
- FAQPage JSON-LD dessas perguntas via `PageSEO`/JsonLdSchema.

## Fase 3 — Páginas por bairro (Wi-Fi + TV Smart)

**3.1 Template por bairro para 2 serviços**
- Reaproveitar padrão existente `src/pages/servico-bairro/`. Criar rotas:
  - `/servicos/redes-wifi/curitiba/:bairro`
  - `/servicos/conserto-tv/curitiba/:bairro`
- Bairros iniciais (top 8 por busca): Batel, Água Verde, Boqueirão, Cabral, Portão, CIC, Santa Felicidade, Bacacheri.
- Cada página: H1 único, 2 parágrafos exclusivos por bairro (referências locais, tempo de deslocamento), CTAs abrindo o funil com `origin=bairro-<slug>-<servico>`, breadcrumbs, LocalBusiness+Service JSON-LD, links para o hub `/servicos/<servico>` e para problemas relacionados.
- Registrar no gerador de sitemap (`scripts/generate-sitemaps.mjs`) e no `check-sitemap-problemas.mjs` (novo `check-sitemap-bairros-servico.mjs`).

**3.2 CI guard**
- Contagem esperada: 2 serviços × 8 bairros = 16 URLs adicionais. Bloquear PR se divergir.

---

## Detalhes técnicos

- Payload GA4 será filtrado por `Object.entries` para nunca enviar `undefined`; strings vazias viram `"unknown"`.
- IntersectionObserver com `threshold: 0.5` e `once: true` por CTA para evitar spam.
- Todos os novos eventos passam por `sanitizeEvent` já existente (ou criar se não houver).
- Nenhuma alteração em regras de triagem/funil — apenas leitura de estado.

Total estimado: ~14 arquivos alterados/criados, +2 CI checks.

**Aprovar tudo ou executar só a Fase 1 primeiro?**