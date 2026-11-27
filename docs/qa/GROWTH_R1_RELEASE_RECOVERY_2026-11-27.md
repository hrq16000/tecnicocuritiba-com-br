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

## Resultado do scanner e preview

O run 46056245758 executou o scanner fixado por digest e varreu 2624 commits (~16,08 MB), sinalizou 10 achados potenciais e terminou com código 1. Isso confirma que o gate não foi enfraquecido. Sem assumir que são credenciais válidas: é necessário triage dos achados, eventual rotação de credenciais legítimas e revisão autorizada antes de liberar a PR. O scanner passa a exibir somente regra, caminho, linha e commit; nenhum valor secreto, match ou autor será registrado. O relatório temporário é eliminado no fim do step.

O run 46056014408 falhou em Wait for preview. Reprodução local: Vite preview inicia, mas responde HTTP 500 porque o plugin TanStack procura dist/server/server.js, enquanto o build Nitro cloudflare-module gera .output/server/index.mjs e wrangler.json. O preview local com Wrangler 4.169.0 identificou ASSETS, porém o ambiente retornou uv_interface_addresses (system error 1). A compatibilidade do runtime real ainda precisa ser validada num runner com workerd funcional. Não se deve trocar a aplicação SSR por fallback estático ou liberar o gate apenas para obter verde.

## Triagem individual dos 10 alertas históricos

O run 46056508267 confirmou dez fingerprints. Cada registro foi consultado no commit de origem, sem reproduzir valores. Três JWTs têm payload Supabase issuer=supabase, role=anon; nenhuma dessas três ocorrências é service_role. Chaves anon são destinadas ao cliente, condicionadas a RLS efetivo. Cinco identificadores de consentimento/diagnóstico são usados em localStorage/sessionStorage (incluindo o Playwright que lê storage com page.evaluate). Os dois registros IndexNow correspondem exatamente ao texto exigido no arquivo público de verificação do domínio. Não são segredos de acesso privilegiado.

A lista .gitleaksignore contém somente os 10 fingerprints commit:arquivo:regra:linha já verificados. Não há supressão por extensão, diretório, família de regra ou padrão genérico. Todo novo achado continua bloqueante; o gate de RLS, privacidade e demais verificações permanece independente. Manter os valores de JWT e verificação fora do relatório.
Referências: https://supabase.com/docs/guides/getting-started/api-keys, https://supabase.com/docs/guides/database/secure-data, https://www.indexnow.org/documentation, https://github.com/gitleaks/gitleaks (fingerprints).

## Ensaio controlado do runtime de preview

Apenas o workflow Internal links passa a usar a configuração de Worker gerada pelo build Nitro, Wrangler 4.169.0 (Node 22), loopback explícito e checagem HTTP 2xx. É uma prova incremental da compatibilidade no runner GitHub, não uma mudança de produção nem um bypass de SSR. Os demais jobs permanecem com seus gates originais até esta prova passar. O script de links e sitemap não foi alterado.

## Recuperação SEO e consentimento no SSR (27/11/2026)

O run 46056933553 confirmou o preview Cloudflare funcional e acessibilidade do sitemap (780 rotas), mas encontrou 102 ocorrências de links inválidos na amostra. O catálogo de 189 problemas passa a fornecer o conteúdo e metadados no loader SSR; os slugs válidos legados recebem 301 específico, os desconhecidos retornam 404. Links editoriais, serviços, bairros e rotas antigas foram corrigidos para destinos existentes; bairros sem página própria ficam como texto. A verificação de links passou de uma amostra aleatória de 30 para todas as URLs, com cache de destinos adicionais e sem reduzir as verificações.

O gate de marca agora lê todo o sitemap efetivamente servido pelo SSR, não um dist/index.html inexistente. O nome de marca já definido pelo gate ("Técnico em Curitiba") foi alinhado nos metadados dos próprios schemas, preservando identidade legal/NAP e o prestador externo CFTV. Não altera identidade visual, preços, contratos ou destinos de conversão.

Restaurei o banner já existente, meta de publisher e Consent Mode default-denied. loadAdSense verifica consentimento explícito antes de criar qualquer script; não introduzi carregamento externo GA4. Os gates de SEO e AdSense leem HTML realmente servido pelo preview do Worker, com Wrangler fixado e Node 22. A remoção do index.html antigo não é tratada como aprovação automática. Os workflows de preview abandonam vite preview SPA e usam o Worker construído.

Validação local com Nitro node-server (não é um deploy Cloudflare):
- TypeScript sem erro; 67/67 testes unitários.
- Build OK; SEO da home: title presente, descrição 157 caracteres, exatamente um H1.
- AdSense: ads.txt e meta correspondentes; script publicitário não estático; teste de consentimento negativo/positivo.
- Canonical /problemas/computador-nao-liga-curitiba 200 (conteúdo SSR completo); alias raiz 301; slug desconhecido 404.
- 780/780 URLs HTTP OK, rastreamento integral sem links quebrados; verificação de marca de 780 HTMLs OK.
- 189 arquivos de problemas/163 links únicos validados antes do último lote; NAP e SEO SSR passaram.
- CI remoto e publicação de produção ainda pendentes; manter PR sem merge até os gates reais ficarem verdes.
