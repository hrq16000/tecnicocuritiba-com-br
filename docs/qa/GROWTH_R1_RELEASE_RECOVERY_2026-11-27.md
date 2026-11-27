# Recovery R1 — dependências, segurança e separação de testes

Escopo: desbloquear a PR #5 de acabamento visual sem alterar o funil público nem desativar gates de CI.

## Causa e correções

- O package-lock desatualizado não refletia o React 19 do manifesto. next-themes 0.3 também não declarava compatibilidade. Atualizamos next-themes, Vite/Rolldown (mesma versão de Vite para o Vitest), sharp e zod; os dois lockfiles foram regenerados a partir da resolução npm validada. O lock textual do Bun é o utilizado pelo Bun moderno; o binário histórico não foi modificado.
- O Vitest coletava specs de Playwright e executava testes de navegador em ambiente Node. Configuração própria preserva todos os testes unitários/integração em src e scripts; Playwright continua com seus próprios specs e workflow.
- O teste legado do funil usava um MemoryRouter que não existe no shim TanStack e é desnecessário para o componente. O harness agora monta o componente diretamente, limpa persistência entre cenários e simula apenas a API de scroll ausente no jsdom. A triagem, barreira de coleta, mensagem WhatsApp e guard de submissão continuam testados sem alteração das regras de negócio.

## Validação local

- npm ci --no-audit --no-fund em diretório limpo: aprovado.
- bun install --frozen-lockfile em diretório limpo: aprovado.
- npm audit --package-lock-only --audit-level=high: 0 high, 0 critical, 6 moderate.
- bun audit: 0 high, 0 critical; dois advisories moderate (esbuild, postcss-selector-parser). Não equivale a auditoria livre de todos os achados.
- npm run test:unit: 12/12 suites, 63/63 testes.
- npx tsc --noEmit: aprovado.
- npm run build incluindo pós-build (brand privacy, 1520 arquivos): aprovado.

## Gate de entrega

A validação local não substitui o CI completo, os testes E2E e o deploy. Não fazer merge/publicação até todos os gates obrigatórios concluírem; não atualizar baselines ou reduzir limites para mascarar falhas. Os arquivos gerados (sitemaps, feeds, .output e config Wrangler) não fazem parte desta correção. A PR #6 de documentação permanece independente.

## Segundo diagnóstico CI

O run 46056014396 aprovou o audit npm, mas o wrapper gitleaks-action@v2 falhou por ausência de GITLEAKS_LICENSE da organização, antes de executar uma varredura. Substituído pelo CLI oficial MIT em imagem de versão 8.30.1 fixada por digest, com histórico Git completo, findings redigidos, montagem somente leitura, sem rede no container e exit code bloqueante. Nenhuma allowlist nova, nenhum gate desabilitado. A execução real do scanner depende do próximo CI. Fontes: https://github.com/gitleaks/gitleaks e https://github.com/gitleaks/gitleaks/pkgs/container/gitleaks/versions.
