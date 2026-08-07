---
name: Padronização operacional das páginas de serviço
description: Matriz única de valor inicial, prazo, incluso/não incluso, acréscimos, observações, fotos e agendamento por serviço, com gate check:service-specs.
type: feature
---

# Matriz operacional dos serviços

- Fonte única: `src/lib/serviceSpecs.ts` (valores derivados de `src/lib/coletaConfig.ts` — nunca duplicar números).
- Render obrigatório: `<ServiceOperationalSpec path="/servicos/..." />` antes de `</main>` em **toda** página de `src/pages/servicos` (exceção whitelisted: `MontagemPcComoFunciona.tsx`).
- Campos obrigatórios por serviço: `valorInicial`, `valorRegra`, `tempoEstimado`, `modalidade`, `incluso`, `naoIncluso`, `acrescimos`, `observacoes`, `fotosNecessarias`, `quandoVisitaOuOrcamento`.
- Âncoras estáveis: `#condicoes-do-servico` e `#agendamento`.
- CTA do bloco usa `buildWhatsAppUrl` (cidade/bairro do geo entram automaticamente) + `trackWaClick("service_spec:<path>")`.
- Gate de CI: `npm run check:service-specs` (`scripts/check-service-specs.mjs`) falha se faltar bloco, campo ou spec órfão.
