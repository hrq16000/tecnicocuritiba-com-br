
## Escopo

Seis frentes, ordenadas por dependência técnica. Todas preservam SEO, funil e regras existentes.

### 1. Mensagem WhatsApp pré-preenchida com contexto
- Criar helper `src/lib/whatsappMessage.ts` com `buildContextualMessage({ bairro, modalidade, problema, servico, equipamento })`.
- Template: `"Olá! Vim do site — [equipamento] com [problema] em [bairro]. Modalidade sugerida: [modalidade]. Pode me atender?"`. Fallbacks silenciosos quando faltar campo (sem "unknown" no texto visível).
- Integrar em: `ProblemaPage.tsx` (hero + footer CTA), páginas `/servicos/*` já instrumentadas (RedesWifi, ConsertoTV) e páginas `/servico-bairro/*` novas.
- Detectar bairro via slug da rota (`useLocation`) — sem geolocalização nova.

### 2. UTMs automáticos em WhatsApp + Ligação
- Estender `src/lib/whatsappUtm.ts` para adicionar `utm_content=<slug-do-problema-ou-servico>` e `utm_term=<bairro>` quando disponíveis via `data-cta-*` no anchor.
- Ligação: como `tel:` não aceita query, capturar no evento GA4 `click_call` via `trackCTAClick` já existente (adicionar `bairro`, `servico`, `problema` ao contexto).
- Marcar CTAs relevantes com `data-cta-bairro` / `data-cta-servico` em `ProblemaPage`, páginas de serviço e bairros.

### 3. JSON-LD por página de bairro (LocalBusiness + Service + areaServed)
- Criar `src/components/BairroSchema.tsx` que emite dois blocos JSON-LD:
  - `LocalBusiness` com `areaServed: { @type: "Neighborhood", name: <bairro>, containedInPlace: Curitiba }`.
  - `Service` com `serviceType`, `provider`, `areaServed` idem.
- Injetar nas 6 páginas bairro criadas (Wi-Fi Batel/Bacacheri; TV Batel/Boqueirão/Cabral/Bacacheri) e no template `ServicoBairroTemplate.tsx` para futuras.

### 4. Checklist PDF "Antes da visita"
- Gerar dois PDFs estáticos em `public/downloads/`:
  - `checklist-antes-visita-wifi.pdf`
  - `checklist-antes-visita-tv-smart.pdf`
- Conteúdo curto (1 página): itens de triagem, o que ter em mãos, prazos, contato WA.
- Gerar com reportlab (skill/pdf) usando DejaVu Sans (acentos PT-BR), tokens visuais da marca.
- Adicionar botão de download em:
  - `ProblemaPage.tsx` (bloco final, se categoria for `wifi` ou `tv`)
  - `/servicos/redes-wifi` e `/servicos/conserto-tv` (bloco após FAQ)
- Rastrear com `trackCTAClick('download', ...)` (novo tipo) → estender union `ctaType` para incluir `'download'`. Manter compat: nada muda para whatsapp/phone/chatbot.

### 5. Alertas admin para picos de erros
- Criar `src/lib/errorAlerts.ts`: agrega em `localStorage` (janela 24h) contadores de eventos `internal_link_broken`, `obrigado_modalidade_invalida`, `cta_click` com `modalidade='unknown'` OU `problema='unknown'` em rotas onde deveriam existir.
- Painel novo: adicionar seção em `src/components/admin/FunnelDiagnosticsPanel.tsx` (ou componente irmão) mostrando:
  - Top 10 links quebrados (from → to, contagem)
  - Total unknown modalidade/problema últimas 24h
  - Badge vermelho quando qualquer contador > threshold (unknown > 5, broken > 0).
- Instrumentar `trackInternalLink` e `trackCTAClick` para gravar entradas locais além de enviar ao GA4.

### 6. Validação de links internos em /problema/* (endurecer)
- Já existe `VALID_SERVICO_SLUGS` na fase anterior. Consolidar:
  - Extrair lista canônica em `src/lib/validServicoSlugs.ts` (gerada a partir de `src/pages/arrumar-pc/services.ts` + rotas registradas em `LegacyApp.tsx`).
  - `isValidInternalTarget(path)` retorna boolean; usar em cada `<Link>`/`<a>` interno renderizado por `ProblemaPage`.
  - Ao renderizar link inválido: renderizar mesmo assim mas disparar `trackInternalLink({ valid: false })` → GA4 recebe `internal_link_broken`.
  - Adicionar teste unitário `src/lib/validServicoSlugs.test.ts` cobrindo slugs conhecidos.
- Script CI: `scripts/check-problemas-internal-links.mjs` varre `src/lib/problemas/*.ts`, extrai links `/servicos/...` e falha o build se algum não estiver na whitelist. Ganchar em `.github/workflows/ci.yml`.

## Detalhes técnicos

- **Bairro detection**: rotas `/servicos/:servico/:bairro` já existem via `ServicoBairroTemplate`. Ler `params.bairro` e passar via prop/contexto ao `WhatsAppFloat`/CTAs locais. Em `ProblemaPage`, não há bairro — omitir campo do template.
- **PDF**: gerar uma única vez em `/tmp`, mover para `public/downloads/` (commitado). Não gerar em runtime.
- **CI**: adicionar step após `bun install`:
  ```yaml
  - name: Validate problema internal links
    run: node scripts/check-problemas-internal-links.mjs
  ```
- **Backward-compat**: nenhum evento GA4 existente muda de nome/schema; só adicionamos campos opcionais.

## Fora do escopo

- Não mexer no fluxo do funil, modalidades, preços ou textos das etapas.
- Não alterar `analytics.ts` além de aceitar `'download'` como tipo e propagar novos campos de contexto (`bairro`).
- Não gerar novas páginas de bairro além das já existentes.

## Arquivos afetados (estimativa)

Novos: `whatsappMessage.ts`, `BairroSchema.tsx`, `errorAlerts.ts`, `validServicoSlugs.ts` (+ teste), 2 PDFs, `check-problemas-internal-links.mjs`, componente admin de alertas.
Editados: `whatsappUtm.ts`, `analytics.ts` (mínimo), `ProblemaPage.tsx`, `RedesWifi.tsx`, `ConsertoTV.tsx`, 6 páginas de bairro, `ServicoBairroTemplate.tsx`, `FunnelDiagnosticsPanel.tsx`, `ci.yml`.
