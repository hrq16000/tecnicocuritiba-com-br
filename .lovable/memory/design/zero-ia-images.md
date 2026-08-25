---
name: Política Zero IA em Imagens
description: Regra Zero IA para fotos do portal, gate check:ai-images, allowlist de marca gráfica e substituição do hero
type: constraint
---

# Política Zero IA em Imagens

É proibido usar imagens geradas por IA em qualquer foto apresentada como real (prova fotográfica / E-E-A-T). Todo raster em `public/` e `src/assets/` é varrido pelo gate `check:ai-images` (`scripts/check-ai-images.mjs`), que detecta assinaturas C2PA, EXIF de ferramentas (GPT-4o, Midjourney, Firefly etc.) e nomes de arquivo suspeitos. O gate roda no build e no CI — falhar = deploy bloqueado.

## Exceções (allowlist no script)
Apenas **marca gráfica flat** (não fotografia): `src/assets/logo.png` e o wordmark `public/lovable-uploads/b702f033-....png` (usado na CTASection). Estão allowlistados com justificativa até o redesign vetorial (SVG). Nunca adicionar fotos a essa lista.

## Estado atual
- Hero da home usa foto real auditada: `IMAGES.tecnicoTrabalhando` (Unsplash photo-1531482615713) com srcset responsivo e crédito visível (`creditLabel`/`imageTitle` de `src/lib/imageCredits.ts`).
- 12 imagens IA órfãs foram deletadas de `public/lovable-uploads/` (com variantes webp/avif).
- Fotos novas entram SOMENTE via `src/lib/images.ts` (Unsplash/Pexels), validadas por `check:image-credits` (fonte, alt ≥20 chars, licença).
- `sitemap-images.xml` é regenerado por `npm run sitemap:images` após mudanças no pool.
