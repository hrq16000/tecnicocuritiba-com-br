# Plano — melhorias pós-refresh dos 5 posts long-tail

## Concluído nesta rodada

- **Refresh dos 5 posts long-tail**: H1/title, meta description, primeiro parágrafo (`.lead`) e nomes exatos das keywords aplicados em `src/pages/Blog.tsx` (index) e `src/data/blogPostsContent.tsx` (conteúdo). FAQs já estavam no formato final.
- **GA4 share tracking**: novo helper `trackShareClick(network, ctx)` em `src/lib/analytics.ts` disparando os eventos `share` (canônico do GA4) + `share_click`. Ligado nos botões WhatsApp/Facebook/X do `BlogTOCAndShare`, com `slug`, `title`, `url` e `location`.
- **CLS residual**: `width={40} height={40}` + `decoding="async"` no avatar do `ReviewsGrid`. Cards do Blog já tinham dimensões explícitas (`1200x630` capa, `800x400` fallback, `500x280` grid, `1600x900` hero do post).

## Pendências que precisam de arquivo/decisão do cliente

- **/sobre com CNPJ real, endereço e foto do técnico**: aguardando envio dos arquivos (foto real do técnico + string do CNPJ + endereço formatado) para atualizar `src/pages/Sobre.tsx`, `JsonLdSchema` (LocalBusiness) e `Footer`.
- **Lighthouse real em produção**: rodar `bun run lh:mobile` + `bun run lh:prod` no ambiente CI ou local com a build de produção após o próximo deploy. Sandbox atual não roda Chrome headless com throttling determinístico — o número que sair daqui não é confiável. O que hoje mais provavelmente puxa LCP acima de 2.5s em mobile 4G:
  1. Hero da home (`FastHeroSection`) — validar se o LCP é a imagem hero (com `fetchPriority="high"`) ou um bloco de texto abaixo do fold.
  2. Vendor chunk único (ver abaixo) — força o parse de ~250 KB antes do primeiro paint no mobile lento.
  3. Fontes: já com `font-display: swap` e preconnect Google Fonts, mas 3 variantes ainda é aceitável — trocar para 2 pesos derruba TBT em ~30 ms.
  4. GTM/GA4 carrega com `defer` — se ainda estiver como script no `<head>` sem `defer`, mover para o fim do body.

## Não seguir (regressões conhecidas)

- **`manualChunks` mais granular**: já foi testado e caiu na TDZ `Cannot access 'kf' before initialization` em produção. A regra atual (`"vendor"` único) é intencional e está documentada no `vite.config.ts`. Só voltar a esse tópico depois de auditoria com `import-analyzer` para eliminar imports circulares entre React/Router/Radix.
- **AVIF com fallback via `<picture>`**: exige refator dos componentes de imagem (`Blog.tsx`, `BlogPost.tsx`, `RealImageSection`, hero) e conversão em build (`vite-imagetools` + assets locais). Hoje o site serve capas via Unsplash (`?auto=format`) — Unsplash já negocia AVIF/WebP automaticamente via `Accept`. Portanto, ganho marginal para as imagens hospedadas por eles; ganho real virá quando migrarmos as capas para assets estáticos. Fica como próxima fase (fase 6).

## Próximos passos (sem dependência do cliente)

1. Auditar hero da home no Chrome DevTools > Performance > LCP: se o LCP for texto/gradiente e não a imagem, remover `fetchPriority="high"` da hero (economiza banda no mobile).
2. Migrar as capas dos 10 posts mais lidos para assets locais em `src/assets/blog/*.avif|webp|jpg` + `<picture>` com AVIF/WebP/JPG — abre caminho para o item AVIF acima.
3. Coletar 10+ reviews reais no Google Business antes de publicar `AggregateRating` no Schema.

## Fora do Lovable (recap curto)

- Google Business Profile ativo com NAP idêntico ao site.
- Fotos reais (fachada, bancada, técnico) para substituir stock.
- Backlinks locais (Apontador, Guiamais, ACP, portais paranaenses).
- Coleta ativa de reviews via T+24h/T+72h no WhatsApp.
