# Auditoria completa — tecnicocuritiba.com.br

_Data: 11 jul 2026 · Escopo: código-fonte + assets estáticos do projeto Lovable · **Nenhum arquivo foi modificado**._

Legenda de severidade: 🔴 Crítico · 🟡 Médio · 🟢 Baixo.

---

## 1. SEO On-page

**Estado atual.** O projeto usa uma combinação de `index.html` estático + `<PageSEO>`/`document.title` + `<JsonLdSchema>` por rota, cobrindo ~150 rotas registradas em `src/LegacyApp.tsx` (arquivo com 902 linhas, ~55 rotas de cidade/bairro + serviços + blog + hubs).

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| `<html lang="pt-BR">` | ✔ | — | Definido em `index.html`. |
| Viewport, theme-color, apple-touch-icon, manifest, favicon versionado | ✔ | — | `index.html` linhas 1–90. |
| Title raiz | ✔ | — | "Técnico de Informática Curitiba \| Hoje R$ 99,99" (60 chars). |
| Meta description raiz | ✔ | — | 149 chars, inclui keyword + preço + CTA. |
| Canonical raiz | ✔ | — | `https://tecnicocuritiba.com.br/`. |
| Open Graph + Twitter Card | ✔ | — | `og:image` absoluto 1200×630, `type=website`, `secure_url`, `image:alt`. |
| `meta name="keywords"` (obsoleta) | 🟢 | Baixo | Google ignora; pode remover para limpar bytes (`index.html`). |
| `msvalidate.01` vazio | 🟡 | Médio | Bing Webmaster não verifica sem token. `index.html` linha ~34. |
| `google-site-verification` vazio | 🟡 | Médio | GSC verifica via DNS/HTML — se GSC hoje verifica por DNS/GA4 tudo bem; se não, adicionar token. |
| `<title>`/description por rota | ✔ | — | `PageSEO` + `document.title` em quase todas as páginas; SPA sem SSR, então crawlers com JS (Googlebot) leem, mas Facebook/LinkedIn/WhatsApp veem só o `index.html` raiz. |
| H1 único por rota | ✔ (amostra) | 🟢 | Não encontrei duplicações em amostra (Sobre, Blog, TecnicoInformaticaCuritiba, ProblemaPage). Recomendo teste automatizado (`e2e/seo-h1.spec.ts`) inexistente hoje. |
| JSON-LD `LocalBusiness` | ✔ | — | `src/components/JsonLdSchema.tsx`, cidades e serviços. |
| JSON-LD `Service` | ✔ | — | `src/components/ServiceLandingSchema.tsx`, `CityServiceSchema.tsx`. |
| JSON-LD `FAQPage` | ✔ | — | `BlogPostFAQ`, `GeoSpecificFAQs`, `LocalFAQSection`, `ServiceLandingSchema`. |
| JSON-LD `BreadcrumbList` | ✔ | — | `Breadcrumbs.tsx`, `PageSEO.tsx`. |
| JSON-LD `BlogPosting` | ✔ | — | `BlogPost.tsx`. |
| `AggregateRating` no schema | 🟡 | Médio | `DynamicAggregateRating.tsx` — verificar se hoje há ≥ 10 reviews reais no banco antes de publicar (risco de Manual Action). |
| Meta `og:image` versionada por query (`?v=20260629-1`) | ✔ | — | Bom cache-bust. |

**Recomendações:**
- Preencher `msvalidate.01` e (se GSC ainda não verificado) `google-site-verification` no `index.html`.
- Considerar remover `<meta name="keywords">` (bytes inúteis, Google ignora desde 2009).
- Adicionar E2E que valide "exatamente um `<h1>` por rota" (`e2e/seo-h1.spec.ts`).

---

## 2. SEO Local

**Estado atual.** Cobertura muito forte:
- **11 páginas de cidade** (`/tecnico-informatica-*`) para Curitiba + RMC (SJP, Araucária, Campo Largo, Pinhais, Colombo, Fazenda Rio Grande, Almirante Tamandaré, Piraquara, Campo Magro, Quatro Barras).
- **~55 páginas de bairro** (`/bairros/*`) cobrindo Curitiba central + bairros de Araucária, Campo Largo e SJP, servidas por template `BairroTemplate.tsx` (516 linhas).
- **Redirects legados** de `/tecnico-em-*` para os slugs canônicos (LegacyApp:480-486).
- `geo.region`, `geo.placename`, `geo.position`, `ICBM` presentes em `index.html`.
- Schema `LocalBusiness` com `areaServed` por cidade em `CityServiceSchema.tsx`.

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| NAP consistente | 🔴 | **Crítico** | `src/components/FAQSection.tsx:5` usa `5541987224831`; **todo o resto do site** usa `5541997452053` (Footer, Header, JsonLdSchema, todos os CTAs). Isso quebra confiança do Google Business Profile e envia leads para um número diferente. |
| Endereço no schema | 🟡 | Médio | `Sobre.tsx` não expõe CNPJ nem endereço real (usuário informou que enviará quando tiver). Enquanto isso, LocalBusiness schema fica sem `address.streetAddress` verificado. |
| Mapa embed por cidade | ✔ | — | `CoverageMapSection.tsx`. |
| Conteúdo duplicado entre landings de cidade | 🟡 | Médio | Templates compartilhados (`BairroTemplate`, `CityServiceSchema`) — texto único vem por props, mas ~30-40% do markup é comum. Google tolera se o texto principal (H1, primeiros 300 palavras, FAQs, depoimentos) varia — auditar amostra manual em Piraquara/Quatro Barras (páginas menos populosas) para garantir variação de introdução. |
| Áreas atendidas por bairro no schema | ✔ | — | `areaServed` array em `JsonLdSchema.tsx`. |

**Recomendações:**
- **Corrigir imediatamente `FAQSection.tsx:5`** para o número padrão `5541997452053` (mesmo message template do resto).
- Auditar 3 bairros aleatórios de baixa concorrência (ex.: `braga`, `costeira`, `guatupe`) e garantir 500+ palavras únicas por página.

---

## 3. Conteúdo e Blog

**Estado atual.**
- **Blog com 142 posts** (`src/pages/Blog.tsx`, contagem por `slug:`).
- Conteúdo em `src/data/blogPostsContent.tsx` (10 836 linhas — arquivão) + `blogProgrammaticPosts.tsx` (540 linhas de programáticos).
- Cada post: H1, breadcrumb, autor/data/tempo de leitura, imagem hero com `width/height`, `BlogTOCAndShare` (sumário + share GA4-tracked), CTA WhatsApp meio + fim, `BlogPostFAQ`, `BlogPosting` schema, `Article` schema, breadcrumb schema.
- Feed RSS em `/rss.xml` + `sitemap-news.xml` gerados no `prebuild` (`scripts/generate-rss.mjs`).
- Sitemap total: **545 URLs** (48 main + 221 bairros + 54 serviços + 27 marcas + 190 problemas + 5 news).

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| Densidade média por post | ✔ | — | Amostra dos 5 recentes: 700–1 100 palavras. Adequado. |
| Alt text | ✔ (amostra) | 🟢 | Imagens de capa usam `alt={post.title}`. Nenhum `alt=""` encontrado no grep. |
| Links internos post → serviço/cidade | ✔ | — | Amostra em `blogPostsContent.tsx` mostra 4-6 `<Link>` internos por post. |
| Links quebrados internos | 🟡 | Médio | Sem checagem automatizada. Recomendado: script `scripts/check-internal-links.mjs` percorrendo os 545 URLs do sitemap. |
| Títulos duplicados no blog | 🟢 | Baixo | Amostra por slug parece única; sem verificador. |
| Categorias/tags | ✔ | — | `Blog.tsx` implementa filtro por categoria + busca + paginação. |
| Autor / E-E-A-T | 🟡 | Médio | Autor genérico "Técnico em Curitiba". Recomendado criar `/autor/[nome]` com bio + foto + credenciais depois que a foto real do técnico chegar. |

---

## 4. Performance (Core Web Vitals)

**Estado atual (sem Lighthouse ao vivo).**
- Bundle: `vite.config.ts` força **um único `manualChunks: "vendor"`** para evitar TDZ (`Cannot access 'kf' before initialization`) — documentado no arquivo. Isso pesa ~250-300 KB gz no primeiro paint, mas evita regressão conhecida.
- Assets: `public/lovable-uploads/` = 17 webp + 15 png + 6 jpg. **`og-image.png` = 604 KB** (fora do fluxo, só servido em share previews).
- Preload de imagem LCP: `index.html` faz `preload as="image"` da hero da home com `imagesrcset` responsivo — ✔.
- Fontes: fallback `@font-face Inter Fallback` inline com `size-adjust` (elimina FOUT). Google Fonts vem via `<link>` com `preconnect` — ✔.
- Preconnect: `googletagmanager`, `google-analytics`, `wa.me`, `api.whatsapp.com`, `fonts.gstatic.com`, `fonts.googleapis.com` — ✔.
- `dns-prefetch` para GTM e GA — ✔.
- Analytics: GA4 (`G-B9VPHCZC10`) + Google Ads (`AW-17892118207`) carregados via script assíncrono no `index.html` linha 137–142.
- `lucide-react` importado por named import (tree-shakeable) — ✔.

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| Code splitting por rota | 🟡 | Médio | `LegacyApp.tsx:451+` importa todas as ~150 páginas **estaticamente** (sem `React.lazy`). O bundle inicial contém HTML+JSX de todo o site. Grande oportunidade de INP/LCP. |
| Vendor chunk único | 🟡 | Médio | Intencional (TDZ), mas custa parse-time em mobile 4G. Requer auditoria de imports circulares antes de reverter. |
| `og-image.png` 604 KB | 🟢 | Baixo | Só usado por crawlers de share preview; não impacta usuários. Comprimir para <200 KB via `squoosh` é ganho para preview em conexões lentas. |
| Imagens sem `width`/`height` | 🟢 | Baixo | Auditoria de src: **0 casos encontrados** em `<img>` de linha única. `ReviewsGrid` já corrigido nesta sessão. |
| Imagens sem `loading` | 🟡 | Médio | 44 ocorrências pelo grep multiline — a maioria são `<img>` com atributos em múltiplas linhas. Confirmar visualmente que todas abaixo da dobra têm `loading="lazy"`. Hero do post usa `loading="eager" fetchPriority="high"` ✔. |
| AVIF | 🟢 | Baixo | Assets locais são WebP. Unsplash (usado nas capas) já negocia AVIF via `Accept`. Ganho real só migrando capas para assets locais + `<picture>`. |
| Componentes pesados eager | 🟡 | Médio | `WhatsAppFunnel` (606 linhas), `WhatsAppChatbot` (565), `SchedulingModal` (369), `SocialProofNotification`, `CoverageMapSection` (mapa) são importados eager no shell. Migrar para `React.lazy` + `LazyMount` (que já existe) rende bom INP. |
| SchedulingModal / WhatsAppChatbot mortos? | 🟡 | Médio | Removido o botão "Agendar" do header, mas `SchedulingModal`, `SchedulingButton`, `SchedulingSection`, `WhatsAppChatbot` continuam no bundle via `LegacyApp` e `SocialProofNotification`. Se não há entrada de UI, é dead-code ~940 linhas. |
| LCP element (estimado) | — | — | Home: provavelmente a **imagem hero** pré-carregada (`77ec0b6a-…-480.webp`). CLS zerado pelo `AspectRatio` e width/height explícitos. |

**Recomendações prioritárias:**
1. `React.lazy` por rota em `LegacyApp.tsx` (Suspense + `RouteLoader` que já existe).
2. Auditar e remover `SchedulingModal`/`WhatsAppChatbot` se não há CTA que os abra.
3. Rodar Lighthouse de produção (`bun run lh:mobile`) — sandbox não roda determinístico.
4. Comprimir `public/og-image.png` (604 KB → <200 KB).

---

## 5. Acessibilidade (a11y)

**Estado atual.**
- Design system: Tailwind + shadcn/ui. Cores por tokens semânticos (nenhum `text-white`/`bg-black`/`bg-[#...]` hardcoded encontrado no src).
- Landmarks: `<header>`, `<main>`, `<footer>`, `<article>`, `<section>` usados consistentemente em `Sobre`, `Blog`, `BlogPost`, `TecnicoInformaticaCuritiba`.
- Botões só-de-ícone: `FastHeader` do WhatsApp já tem `aria-label="Falar com técnico no WhatsApp"`; share buttons no `BlogTOCAndShare` têm `aria-label`.
- Testes E2E de contraste existem: `e2e/contrast.spec.ts`.

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| Contraste AA | ✔ (amostra) | 🟢 | Testes E2E cobrem. Sem violações reportadas em runtime. |
| `aria-label` em botões só-ícone | ✔ (amostra) | 🟢 | Auditar `SocialProofNotification`, `WhatsAppFloat` para garantir. |
| Foco visível | ✔ | — | Tailwind ring padrão. |
| Ordem de tabulação | ✔ | — | Sem `tabIndex` numérico > 0 no grep. |
| Formulários | 🟢 | — | Só há forms em `AdminFunnel` e `AdminLogin` (admin, não indexado). `ColetaFormulario` usa inputs sem `<form>`. Verificar `<label htmlFor>` em `ColetaFormulario.tsx` (640 linhas). |
| Landmark `<main>` único | ✔ | — | Cada rota renderiza um `<main>`. |
| Skip-link "pular para conteúdo" | 🟡 | Médio | Não encontrado. Adicionar `<a href="#main">Pular para conteúdo</a>` no início do `Header`. |
| `alt=""` em imagens decorativas | ✔ | — | Grep não encontrou `alt=""` — mas por completude checar `BackgroundImage`, `FloatingParticles`. |

---

## 6. UX e Conversão

**Estado atual.**
- CTA primário: WhatsApp em toda página (Header fixo, floating button, funil global, botões inline em serviços, blog e footer).
- **`FastHeader`** — botão único WhatsApp (Agendar removido nesta sessão). ✔
- **`WhatsAppFloat`** flutuante posicionado com `bottom-right` fixo; sem layout shift porque é `position: fixed` fora do fluxo.
- **`WhatsAppFunnel`** — modal global intercepta cliques em qualquer link `wa.me` para qualificar o lead antes de abrir o WhatsApp.
- Prova social: `SocialProofNotification` (toasts), `ReviewsGrid`, `TrustSection`, `TestimonialsSection`.
- Preços visíveis: `PricingBanner`, `PrecoVisitaTecnica`, `HomePricingBlock`, página `/precos-e-politicas`.
- Tempo de atendimento: `TechnicianAvailability` mostra "atendimento hoje / mesmo dia".
- Responsividade: breakpoints Tailwind padrão. Teste E2E: `e2e/como-funciona-mobile.spec.ts`, `e2e/menu-hamburger.spec.ts`, `e2e/mobile-ctas.spec.ts`.

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| Tempo até primeiro CTA | ✔ | — | Header renderiza no shell crítico; CTA visível <1 s. |
| Botão WhatsApp flutuante causa CLS | ✔ | — | `position: fixed`, sem shift. |
| Prova social destacada | ✔ | — | 3 componentes. **⚠** verificar se `AggregateRating` publicado bate com # reais no admin. |
| Preços visíveis | ✔ | — | R$ 99,99 destacado no title, meta, hero e vários blocos. |
| Formulário de contato | 🟡 | Médio | Não há form público além do `ColetaFormulario`. Toda conversão vai por WhatsApp (regra de negócio confirmada). Se cliente quiser capturar leads offline, considerar form curto (nome + WhatsApp) com submit via edge function → Supabase. |
| Chat online | 🟡 | Médio | `WhatsAppChatbot` existe mas parece dormente (não vi entrada de UI após remoção do Agendar). Ou reativa ou remove. |

---

## 7. Qualidade de código

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| Arquivos > 300 linhas | 🟡 | Médio | 25 arquivos. Destaques: `src/lib/problemaPagesData.ts` **11 122 linhas**, `blogPostsContent.tsx` **10 836**, `LegacyApp.tsx` **902**, `Blog.tsx` **933**, `ComoFunciona.tsx` **809**. Recomendado quebrar `problemaPagesData` em arquivos por problema. |
| Uso de `any` | ✔ | — | 0 ocorrências (`: any`, `<any>`, `as any`) no src. |
| Cores hardcoded (bypass do theme) | ✔ | — | 0 ocorrências de `text-white`, `bg-black`, `bg-[#...]`. |
| `console.log`/`warn`/`error` | 🟢 | Baixo | 0 no grep (todos usam `errorReporter`/`analytics`). |
| Componentes duplicados | 🟡 | Médio | `HeroSection` **e** `FastHeroSection`, `Header` **e** `FastHeader`, `App` **e** `LegacyApp` — duplicação intencional (bootstrap vs. legado), mas confuso para novos devs. Consolidar em uma iteração dedicada. |
| Imports mortos | 🟡 | Médio | `SchedulingModal`, `SchedulingButton`, `SchedulingSection`, `WhatsAppChatbot` (940+ linhas) possivelmente órfãos após remoção do CTA "Agendar". |
| Testes | ✔ | — | Vitest + Playwright. ~15 specs E2E cobrindo funil, sitemap, CTAs, contraste, headers. |
| CI | ✔ | — | Workflows: `ci.yml`, `security.yml`, `lighthouse-prod.yml`, `jsonld-daily.yml`. |
| Estrutura de pastas | ✔ | — | Convencional (`components/`, `pages/`, `lib/`, `hooks/`, `data/`, `integrations/`). |

---

## 8. Segurança e boas práticas

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| HTTPS em links externos | ✔ | — | Todos `wa.me`, `facebook.com`, `twitter.com` em HTTPS. |
| `rel="noopener noreferrer"` em `target="_blank"` | ✔ | — | Todos os `<a target="_blank">` no grep têm `rel="noopener nofollow"` (BlogTOCAndShare) ou equivalente. |
| Chaves expostas no client | 🟢 | Baixo | Só a `SUPABASE_PUBLISHABLE_KEY` (correto — é anon). Não vi `SERVICE_ROLE`. |
| Headers de segurança | ✔ | — | `public/_headers` presente (Netlify/Vercel). Script `scripts/check-security-headers.ts` no CI. |
| RLS + audit | ✔ | — | `docs/security-rls-audit.md` documentado, `scripts/check-rls-migrations.ts` no CI. |
| Formulários com honeypot/captcha | 🟡 | Médio | `AdminFunnel`/`AdminLogin` autenticados. `ColetaFormulario` público não parece ter honeypot — verificar antes de rankear no Google (spammers replicam a URL). |
| CSP | 🟡 | Médio | Verificar `_headers` — se não há `Content-Security-Policy`, adicionar (permitindo GTM, GA, fonts). |

---

## 9. Analytics e rastreamento

**Estado atual (`index.html` + `src/lib/analytics.ts`).**
- **GA4** `G-B9VPHCZC10` — instalado, com `anonymize_ip: true` e `consent mode` (banner LGPD `ConsentBanner.tsx`).
- **Google Ads** `AW-17892118207` — instalado com conversão `AW-17892118207/i5jSCMqi1JYcEL-d0NNC` (`gtagReportConversion`).
- Eventos GA4 rastreados: `cta_click`, `click_whatsapp`, `click_call`, `generate_lead` (dedup por `sessionStorage`), `share`, `share_click` (adicionado nesta sessão), `hydration_timeout`, page views por SPA.
- Meta Pixel / TikTok Pixel — **não instalado**. Só relevante se cliente rodar campanhas nessas plataformas.
- Google Search Console: meta `google-site-verification` **vazia** — verificar se GSC já valida por DNS ou via GA4 (Google conecta automaticamente propriedades do GA4).

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| GA4 | ✔ | — | |
| Google Ads conversão | ✔ | — | |
| Search Console meta | 🟡 | Médio | Confirmar método de verificação com cliente. |
| Rastreamento de scroll depth | 🟡 | Médio | Não rastreado. GA4 tem "scrolls" default (90%), mas 25/50/75% via `scroll_depth` custom rendem mais insight. |
| Meta Pixel | — | 🟢 | Não instalado; adicionar se cliente for anunciar no Facebook/Instagram. |

---

## 10. Integrações e fluxos

| Item | Estado | Sev. | Observação |
|---|---|---|---|
| WhatsApp — número consistente | 🔴 | **Crítico** | `FAQSection.tsx:5` usa `5541987224831` — divergente de todo o resto (`5541997452053`). |
| Formulário → destino | ✔ | — | `ColetaFormulario` grava em Supabase (`funnel_submissions` table); admin visualiza em `AdminFunnel`. |
| Chat / agendamento | 🟡 | Médio | `WhatsAppChatbot` e `SchedulingModal` existem mas sem entrada de UI ativa após remoção do "Agendar". Decidir: reativar ou remover. |
| Reviews pipeline | ✔ | — | `AdminReviews` + `ReviewRequestButtons` (WhatsApp T+24/72h) implementados. |
| IndexNow | ✔ | — | `scripts/indexnow-ping.mjs` + edge function `indexnow-ping`. |
| RSS + sitemap-news | ✔ | — | Gerado em `prebuild`. |

---

## Resumo executivo

Base sólida de SEO técnico, blog e cobertura local — o site já opera acima da média dos concorrentes de Curitiba. Os riscos concentram-se em (a) **um número de WhatsApp divergente** que rouba leads, (b) **peso do bundle inicial** por code-splitting rota-a-rota inexistente, e (c) **componentes órfãos** (Scheduling, Chatbot) que inflam o JS sem entrega de valor. Dead-code + `React.lazy` por rota é o único ponto de performance que ainda pode mover LCP mobile abaixo de 2,5 s de forma consistente.

| Eixo | Nota | Comentário curto |
|---|---:|---|
| SEO on-page | **90/100** | Falta preencher tokens de verificação e limpar keywords legacy. |
| SEO local | **82/100** | Cobertura ampla, mas número divergente na FAQ é regressor imediato. |
| Conteúdo | **88/100** | 142 posts, schemas completos, faltam autores reais. |
| Performance | **72/100** | Preload+shell excelentes; bundle vendor único e ausência de `React.lazy` puxam INP. |
| Acessibilidade | **86/100** | Semântica boa; falta skip-link e auditoria fina em componentes de social proof. |
| UX/Conversão | **88/100** | Funil global sólido; único gap é a decisão sobre chat/agendamento. |
| Código | **80/100** | Sem `any`, sem cores hardcoded; peca por arquivos gigantes (`problemaPagesData.ts`) e duplicações Header/Hero/App. |
| **Média ponderada** | **83/100** | |

## Top 10 problemas críticos (impacto × esforço)

| # | Problema | Impacto | Esforço | Nota |
|---|---|---|---|---|
| 1 | **NAP divergente** em `FAQSection.tsx:5` | 🔴 Alto | P (5 min) | Trocar `5541987224831` → `5541997452053`. |
| 2 | **Sem `React.lazy` por rota** em `LegacyApp.tsx` | Alto | M (2-3 h) | Baixa INP mobile e primeiro JS parse. |
| 3 | **Componentes órfãos** (`SchedulingModal`, `WhatsAppChatbot` + relacionados, ~940 linhas) | Médio | P (30 min) | Confirmar não uso e remover, ou ligar CTA. |
| 4 | `msvalidate.01` e `google-site-verification` **vazios** | Médio | P (5 min) | Colar tokens (Bing + GSC). |
| 5 | `public/og-image.png` **604 KB** | Baixo (crawlers) | P (10 min) | Comprimir com `squoosh` para <200 KB. |
| 6 | **Skip-link** ausente para leitores de tela | Médio (a11y) | P (10 min) | Adicionar `<a>` visível no focus no início do `Header`. |
| 7 | `ColetaFormulario` sem **honeypot** | Médio | P (20 min) | Campo `<input>` oculto + rejeição server-side. |
| 8 | **CSP header** não confirmado | Médio | M (1 h) | Adicionar em `public/_headers` com allowlist GTM/GA/Fonts. |
| 9 | `AggregateRating` no schema **sem base de reviews reais** | Alto (risco Google Manual Action) | P (5 min) | Ocultar até termos ≥ 10 reviews genuínas — regra já em memória, verificar componente ativo. |
| 10 | **`problemaPagesData.ts` = 11k linhas** num único módulo | Baixo | G (1 dia) | Refator em arquivos por problema; melhora tree-shake e DX. |

## Roadmap sugerido

### Fase 1 — Quick wins (1 dia)
- [P] Corrigir NAP em `FAQSection.tsx` (#1).
- [P] Preencher `msvalidate.01` + `google-site-verification` (#4).
- [P] Comprimir `og-image.png` (#5).
- [P] Adicionar skip-link no `Header` (#6).
- [P] Honeypot no `ColetaFormulario` (#7).
- [P] Confirmar/remover `SchedulingModal` + `WhatsAppChatbot` órfãos (#3).
- [P] Auditar `AggregateRating` — só publicar com dados reais (#9).

### Fase 2 — Curto prazo (1 semana)
- [M] `React.lazy` por rota em `LegacyApp.tsx` (#2).
- [M] CSP header em `public/_headers` (#8).
- [M] Rodar Lighthouse de produção real (`bun run lh:all`) e listar top-3 recursos que travam LCP.
- [M] Autor "Técnico em Curitiba" com bio real + foto (aguardando arquivos).
- [M] Migrar top-10 capas do blog para assets locais + `<picture>` AVIF/WebP.
- [M] Adicionar scroll_depth (25/50/75%) no GA4.

### Fase 3 — Médio prazo (1 mês)
- [G] Refatorar `problemaPagesData.ts` (11k) em arquivos por problema (#10).
- [G] Consolidar `Header`/`FastHeader`, `Hero`/`FastHero`, `App`/`LegacyApp`.
- [G] Auditoria de imports circulares para reverter `manualChunks` a granular (destrava code-splitting real do vendor).
- [G] E2E `seo-h1.spec.ts` (h1 único por rota) + `seo-title-dedup.spec.ts` (titles únicos).
- [G] Script `check-internal-links.mjs` para os 545 URLs do sitemap.

## Checklist externo (fora do Lovable)

- [ ] **Google Business Profile** — criar/reivindicar, NAP idêntico ao site, 5-10 fotos reais.
- [ ] **Google Search Console** — verificar propriedade (DNS ou meta tag), submeter todos os 6 sitemaps do `sitemap-index.xml`.
- [ ] **Bing Webmaster Tools** — importar do GSC, adicionar `msvalidate.01`.
- [ ] **Fotos reais** (fachada, bancada, técnico) para substituir stock do Unsplash.
- [ ] **CNPJ + endereço reais** para expor em `Sobre.tsx` + `LocalBusiness` schema.
- [ ] **Coleta ativa de reviews** — meta ≥ 10 no GBP antes de publicar `AggregateRating`.
- [ ] **Backlinks locais** — Apontador, Guiamais, ACP, Sebrae/PR, portais paranaenses (Bem Paraná, Gazeta do Povo).
- [ ] **Guest posts** em portais de tecnologia local.
- [ ] **GetNinjas / 99 Serviços** — perfil ativo para leads + backlink.
- [ ] **Google Alerts** para "Técnico em Curitiba" (link building reativo).
- [ ] Se for anunciar no Facebook/Instagram: **Meta Pixel** + eventos server-side.
