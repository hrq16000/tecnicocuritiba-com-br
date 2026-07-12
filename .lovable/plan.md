
# Reestruturação Inteligente do Funil de Triagem

Objetivo: transformar o `WhatsAppFunnel` atual (baseado em condicionais espalhadas no JSX e num único `equipmentBranches.ts` plano) numa máquina de estados centralizada, orientada por dados, com perguntas contextuais por equipamento, modalidade calculada automaticamente e sem regressões nas áreas externas (SEO, rotas, páginas institucionais).

Todo o trabalho fica confinado a `src/components/funnel/*`, `src/lib/funnel*`, `src/components/WhatsAppFunnel.tsx` e testes. Nenhuma alteração em SEO, rotas, páginas institucionais, header/footer, WhatsAppFloat, número de WhatsApp (`5541997452053`), Cloud/Supabase ou páginas `/problema/*`.

## 1. Nova arquitetura (data-driven)

Novo diretório `src/components/funnel/engine/`:

- `types.ts` — tipos `Equipment`, `ServiceRoute` (`remote | visita | coleta`), `Symptom`, `Question`, `TriageState`, `TriageAction`, `PricingRule`.
- `config.ts` — objeto único com WhatsApp number, nome da empresa, textos de termos, valores (R$ 99,99 / R$ 169,99 / R$ 299,99 / faixas de TV, som, videogame, celular), prazos (3–60 dias úteis), versão da triagem (`TRIAGE_VERSION = "2026.07.1"`). Reaproveita `coletaConfig.ts` onde possível.
- `equipments.ts` — array declarativo por equipamento (`pc`, `tv`, `celular`, `surface`, `som`, `videogame`, `outro`) com: label, emoji, perguntas de identificação, lista de sintomas, e para cada sintoma uma função `route(context)` que devolve `remote | visita | coleta`. Substitui `equipmentBranches.ts` (mantém arquivo antigo como re-export shim para não quebrar testes existentes).
- `questions.ts` — `getQuestionsForEquipment(state)` e `getQuestionsForSymptom(state)` retornam a lista de perguntas contextuais (usadas na etapa "detalhes").
- `routing.ts` — `determineServiceRoute(state)` aplica as regras (remoto só p/ PC ligando + instalação; visita só p/ PC em serviços rápidos; coleta obrigatória p/ TV, celular, tablet, Surface, som, receiver, áudio, videogame, outro, PC que não liga, defeito de placa, dano físico).
- `pricing.ts` — `getPricingRules(route, equipment, symptom)` devolve `{ min, label, prazo, disclaimers, faixas? }`.
- `messages.ts` — `buildTriageSummary(state)` e `buildWhatsAppMessage(state)` (formato legível, sem campos vazios, com identificador de triagem `TRG-<timestamp>` e versão).
- `machine.ts` — reducer puro `triageReducer(state, action)` com ações `SELECT_EQUIPMENT`, `ANSWER`, `NEXT`, `BACK`, `ACCEPT_TERMS`, `RESET`, `HYDRATE`. Faz `resetDependentAnswers()` ao trocar equipamento/sintoma. Calcula `completedSteps`, `validationErrors`, `currentStep` derivados. Não permite `NEXT` sem validação.
- `validation.ts` — `validateCurrentStep(state)` e `getFirstIncompleteField(state)`.
- `persistence.ts` — `loadState` / `saveState` / `clearState` em `localStorage` sob `wa_funnel_state_v6` com campo `version`. Se `version` diferir da atual, descarta (corrige a "tela de erro" causada por estado antigo). TTL de 3 dias.

## 2. Etapas (dinâmicas)

Ordem: `equipment → deviceDetails → symptom → contextualAnswers → serviceRoute → urgency → termsAccepted → finalReview`.

Etapas condicionais adicionais só aparecem quando `getQuestionsForSymptom` devolver perguntas (ex: molhou → "quando aconteceu / tentou ligar"). O total de etapas exibido na barra de progresso é `state.steps.length` calculado dinamicamente.

Regras-chave já validadas nas perguntas:

- "Outro" pede: equipamento + marca + modelo? + idade + liga? + o que aconteceu + queda/líquido/queimado + tentativa anterior + informação adicional. Após responder, mostra o aviso do valor mínimo R$ 99,99.
- Substituir opção "Outro / Só orçamento" por apenas "Outro" (já está OK, confirmar).
- Substituir "Hoje" por "Próximas 72 horas úteis — até 3 dias úteis".
- Botão final: "Agendar agora" (sem "Continuar para WhatsApp" / "Enviar" / "Finalizar").
- Perguntas de frequência só aparecem para sintomas intermitentes (`symptom.intermittent === true`).
- Perguntas "Quando começou?" vs "Quando aconteceu?" diferenciadas por `symptom.eventual === true`.

## 3. Modalidade

`determineServiceRoute` (regras exatas do briefing):

```text
remote  ← equipment=pc  && liga=normal && objetivo∈{instalar, configurar} && semDefeitoFísico
visita  ← equipment=pc  && (serviço rápido no local)  && !defeitoBancada
coleta  ← default para todos os demais (TV, celular, tablet, Surface, som,
          receiver, áudio, videogame, outro, PC que não liga / placa / dano)
```

A etapa "modalidade" nunca oferece alternativa quando só há uma compatível — apenas explica em linguagem simples. Nunca exibe o texto genérico antigo "provavelmente conseguimos resolver por remoto ou visita".

## 4. Termos (registro de ciência)

Etapa dedicada, com checkboxes separados por modalidade (coleta tem 3 aceites: valor mínimo, R$ 99,99 em caso de desistência, prazo 3–60 dias úteis). Nenhum pré-marcado. Ao aceitar, grava `{ acceptedAt, modalidade, termsVersion }` no estado e na mensagem final. Rotulado como "registro de ciência e aceite eletrônico" (nunca "assinatura digital").

## 5. Correção da tela de erro (causa raiz)

Diagnóstico esperado a partir do código atual:

- `wa_funnel_state_v5` guardava `step` numérico fixo. Se o array de etapas mudar (ex: rota "outro"), o step persistido aponta para uma etapa inexistente → `undefined.map` no render → AppErrorBoundary.
- Auto-advance via `setTimeout` sem cleanup dispara duas transições em sequência quando o usuário clica rápido.
- Handler global de clique em `<a href="wa.me/...">` reabre o funil enquanto ainda está submetendo, ressetando o estado.

Correções:

1. `persistence.ts` versiona o estado (`version: TRIAGE_VERSION`); mismatch → descarta silenciosamente.
2. `machine.ts` só aceita `NEXT` se `validateCurrentStep(state).ok`; guarda `isTransitioning` no reducer.
3. `useEffect` de auto-advance com `clearTimeout` no cleanup e trava `transitioningRef`.
4. Handler global ignora cliques quando `submittingRef.current === true` **ou** quando o anchor está dentro de `[data-funnel-root]` (evita reabrir a partir do próprio botão final).
5. Novo `FunnelErrorBoundary` local: se algo explodir no modal, mostra "Reiniciar triagem" (chama `RESET` + `clearState`), sem derrubar a página inteira. `AppErrorBoundary` continua como fallback global.

## 6. UX / Mobile / Acessibilidade

- `DialogContent`: `max-w-[560px]` desktop, `w-[calc(100vw-1rem)] max-h-[100dvh]` mobile, header fixo + área scrollável + footer fixo.
- Ao selecionar opção, move foco para o próximo campo obrigatório (`getFirstIncompleteField`) e, quando a etapa fica completa, aplica pulso curto no indicador de progresso e chama `next()` após 400ms. Respeita `prefers-reduced-motion`.
- Botão "Continuar" continua existindo como fallback acessível (não obrigatório usar).
- Bip só toca em tentativa explícita de avançar com campo faltando (nunca ao abrir).
- Focus trap do Radix Dialog já cobre a11y; adicionar `aria-live="polite"` na área de erro.
- `data-funnel-open="1"` no `<body>` (já existe) — CSS já esconde floats/sticky; confirmar.

## 7. Mensagem WhatsApp

`buildWhatsAppMessage` produz texto limpo, sem JSON, sem campos vazios, com bloco final:

```text
Confirmo que li e aceitei as condições apresentadas no funil.
Triagem: TRG-<timestamp> · v2026.07.1
```

Se `window.open` for bloqueado: fallback exibe caixa com botão "Copiar mensagem" e link `wa.me`; preserva todo o estado.

## 8. Testes

- `src/components/funnel/engine/machine.test.ts` — reducer + validação + roteamento (todos os cenários 1–22 do briefing).
- `src/components/funnel/engine/routing.test.ts` — cada regra de modalidade.
- `src/components/WhatsAppFunnel.integration.test.tsx` — atualizado para novos rótulos e etapas.
- `e2e/whatsapp-funnel.spec.ts` — atualizado: TV → coleta obrigatória, PC lento + funcionando → visita, PC instalar programa → remoto, Outro → pergunta idade + valor mínimo. Mantém teste de "Agendar agora" mobile e dedup de eventos.

## Arquivos afetados

Novos:
- `src/components/funnel/engine/{types,config,equipments,questions,routing,pricing,messages,machine,validation,persistence}.ts`
- `src/components/funnel/engine/FunnelErrorBoundary.tsx`
- `src/components/funnel/engine/__tests__/*.test.ts`

Editados:
- `src/components/WhatsAppFunnel.tsx` — reescrito para consumir a engine (mantém API pública: eventos `wa-funnel:open`, atributos `data-funnel-*`, número de WhatsApp).
- `src/components/funnel/equipmentBranches.ts` — vira shim que re-exporta os tipos antigos a partir de `engine/equipments.ts` para não quebrar `equipmentBranches.test.ts`.
- `src/components/WhatsAppFunnel.integration.test.tsx`, `e2e/whatsapp-funnel.spec.ts`, `e2e/agendar-agora-mobile.spec.ts` — atualizados.

Não tocados: `Header`, `Footer`, `WhatsAppFloat`, `AppErrorBoundary`, páginas, SEO, sitemaps, `coletaConfig.ts` (apenas lido).

## Fora de escopo (não neste turno)

Os itens abaixo do briefing original ficam para turnos seguintes, para manter esta entrega focada e revisável:
- Página `/obrigado` com mensagens separadas WhatsApp × ligação.
- JSON-LD `FAQPage` + `LocalBusiness` novos.
- Otimização de imagens / lazy loading em `/problema/*`.

Após aprovação deste plano, implemento a engine e a integração, rodo `tsgo` + `vitest run` + o Playwright do funil para validar antes de encerrar.
