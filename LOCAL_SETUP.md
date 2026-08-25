# Desenvolvimento Local

## Requisitos
- Bun (`npm i -g bun`) ou Node 20+
- Docker (apenas se quiser rodar as Edge Functions localmente)

## App (frontend + SSR)
```bash
bun install
cp .env.example .env   # preencha com os valores do backend (já provisionados no projeto)
bun run dev            # http://localhost:8080
```

## Verificações antes de commitar
```bash
bun run typecheck              # tsc --noEmit (falha em @ts-expect-error não utilizado)
bun run check:brand-privacy    # zero CNPJ / zero WhatsApp visível
bun run check:photos           # imagens otimizadas (WebP/AVIF)
bun run check:photo-privacy    # sem EXIF/GPS em fotos públicas
```

## Edge Functions locais (opcional)
As functions existentes em `supabase/functions/` podem rodar via Docker:
```bash
bun run functions:serve        # supabase functions serve (requer Supabase CLI + Docker)
```
O `supabase/config.toml` é gerenciado automaticamente pela plataforma — não edite
configurações de projeto nele. Em dev, os scripts que chamam serviços externos
(IndexNow, GSC, e-mail) emitem aviso e são pulados quando a secret correspondente
não está presente, então o app funciona offline sem mocks adicionais.

## E2E local
```bash
bun run build && bun run preview &
npx playwright test e2e/whatsapp-prefill-fallback.spec.ts
```
