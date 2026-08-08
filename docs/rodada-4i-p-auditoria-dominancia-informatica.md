# RODADA 4I-P — Auditoria de Dominância SEO em Informática

> **Somente leitura.** Nenhuma alteração de código, copy, rota, schema, canonical ou sitemap foi feita nesta rodada. Único artefato criado: este documento.

## 1. Resumo executivo

A arquitetura de informática está **tecnicamente correta na camada de serviços** (`/servicos/*` com intenção única, title/H1 distintos, self-canonical, breadcrumbs e interlinking forte), mas apresenta **três problemas reais**:

1. **Dívida de duplicação massiva em rotas locais**: o gate `check:title-meta` falha com **598 violações em 300 rotas** `/atendimento/*` — todas herdando o title/description padrão da home ("Técnico de Informática em Curitiba | Conserto de PC e Notebook"). Isso é canibalização estrutural comprovada por gate, não por similaridade textual.
2. **Desalinhamento de intenção em `/assistencia-tecnica-curitiba`**: a URL mais "assistência técnica em informática" do site tem title voltado a **consoles** (PS5/Xbox/Nintendo). A query-cluster principal do negócio não tem dono claro.
3. **Autoridade interna concentrada nas páginas erradas**: `/precos-e-politicas` (145 links) e `/servicos` (115) dominam, enquanto `/assistencia-tecnica-curitiba` (8) e `/manutencao-notebook-pc-curitiba` (4) — ambas comerciais — recebem quase nada.

O GSC (28 dias, 152 cliques / 10.741 impressões / pos. média 9,18) mostra que **o tráfego real vem de placa/áudio/TV e preços**, não do cluster de informática. Cluster de informática ainda está em fase de impressão, não de clique.

## 2. Metodologia

- `git status --short` + `git diff --stat` → baseline limpo (zero alterações pendentes).
- Inventário de rotas via `src/LegacyApp.tsx`.
- Extração de title/description/H1 por leitura direta dos arquivos de página.
- Contagem de link equity interno por ocorrência literal de cada rota em `src/` e `scripts/`.
- GSC via propriedade `sc-domain:tecnicocuritiba.com.br` (28 dias, 2026-07-08 → 2026-08-04). **A propriedade `sc-domain:tecnico.curitiba.br` citada no briefing não existe** — não foi inventada.
- Gates executados: `check:seo` (OK), `check:title-meta` (FALHA, 598). `check:trust-claims` e `check:analytics-parity` **não existem** no `package.json` — registrado, não criado.

## 3. Inventário (páginas de informática indexáveis)

| URL | H1 | Title (resumo) | Canonical | Indexável | Intenção |
|---|---|---|---|---|---|
| `/` | Técnico de informática Curitiba | Técnico de Informática em Curitiba \| Conserto de PC e Notebook | self | sim | LOCAL/TRANSACTIONAL |
| `/servicos` | Serviços de Informática Curitiba — Hoje a partir de R$ 99,99 | Serviços de Informática em Curitiba \| Conserto de PC e Notebook | self | sim | HUB/TRANSACTIONAL |
| `/tecnico-informatica-curitiba` | Técnico de Informática em Curitiba | Técnico de Informática em Curitiba a partir de R$ 99,99 \| Atendimento Hoje | self | sim | LOCAL |
| `/assistencia-tecnica-curitiba` | Assistência Técnica Especializada em Curitiba | Assistência Técnica de **Consoles** em Curitiba \| PS5, Xbox… | self | sim | ⚠️ BRAND/EQUIPMENT (desalinhado do H1) |
| `/manutencao-notebook-pc-curitiba` | Manutenção de Notebook e PC em Curitiba | Manutenção de Notebook e PC em Curitiba — a partir de R$ 99,99 | self | sim | LOCAL/TRANSACTIONAL |
| `/servicos/conserto-pc-notebook` | Conserto de PC e Notebook em Curitiba | Conserto de PC e Notebook em Curitiba a partir de R$ 99,99 | self | sim | TRANSACTIONAL |
| `/servicos/conserto-notebook-curitiba` | Conserto de Notebook em Curitiba | Conserto de Notebook Curitiba a partir de R$ 99,99 \| Hoje | self | sim | TRANSACTIONAL (notebook) |
| `/servicos/formatacao-computador` | Formatação de Computador em Curitiba | Formatação de Computador em Curitiba a partir de R$ 99,99 | self | sim | TRANSACTIONAL |
| `/servicos/remocao-virus` | Remoção de Vírus em Curitiba | Remoção de Vírus em Curitiba a partir de R$ 99,99 | self | sim | TRANSACTIONAL |
| `/servicos/upgrade-ssd-memoria` | Upgrade de SSD e Memória RAM em Curitiba | Upgrade SSD e Memória RAM em Curitiba a partir de R$ 99,99 (mão de obra) | self | sim | TRANSACTIONAL |
| `/servicos/backup-recuperacao` | Backup e Recuperação de Dados em Curitiba | Backup e Recuperação de Dados em Curitiba | self | sim | TRANSACTIONAL |
| `/servicos/redes-wifi` | Redes e Wi-Fi | Redes e Wi-Fi em Curitiba | self | sim | TRANSACTIONAL |
| `/servicos/montagem-pc` (+ `/como-funciona`) | Montagem de PC | Montagem de PC em Curitiba | self | sim | TRANSACTIONAL |
| `/servicos/computador-lento` | Computador Lento? Descubra a Causa e Resolva Hoje | Computador Lento? Causas e Soluções Profissionais | self | sim | PROBLEM/SYMPTOM |
| `/servicos/computador-nao-liga` | Computador Não Liga? Calma — Tem Solução | Computador Não Liga? Causas e Soluções | self | sim | PROBLEM/SYMPTOM |
| `/suporte-empresas` | Suporte de TI para Empresas em Curitiba | Suporte de TI para Empresas em Curitiba \| Contratos, M365 e Backup | self | sim | B2B |
| `/atendimento-domicilio`, `/atendimento-remoto`, `/atendimento` | — | — | self | sim | MODALIDADE |
| `/precos-e-politicas` (+ alias `/valores`) | — | — | self | sim | TRANSACTIONAL/COMMERCIAL |
| `/areas-atendidas`, `/busca` | — | — | self | sim | NAVEGACIONAL/LOCAL |
| `/tecnico-informatica-{11 cidades}` | — | — | self | sim | LOCAL |
| `/atendimento/:cidade/:bairro` (~300) | — | ⚠️ duplicado da home | self | sim | LOCAL |
| `/servicos/:servico/:cidade` (matriz) | — | — | self | sim | LOCAL+SERVIÇO |
| `/guias/*`, `/blog/*` | — | — | self | sim | INFORMATIONAL |

Não foram tocadas nem auditadas para mudança: `/servicos/conserto-tv`, `/servicos/conserto-placa`, `/servicos/conserto-monitor`.

## 4. Intenções

Cada `/servicos/*` tem **uma intenção primária clara**. Os conflitos de intenção estão fora de `/servicos/`:

- `/assistencia-tecnica-curitiba` → title diz consoles, H1 diz "assistência técnica especializada" → **duas intenções em uma URL**.
- `/tecnico-informatica-curitiba` vs `/manutencao-notebook-pc-curitiba` vs `/` → três URLs disputando "informática Curitiba" em nível de intenção LOCAL.

## 5. Query → URL

| Cluster | URL mais adequada | Outra competindo? |
|---|---|---|
| técnico de informática curitiba | `/tecnico-informatica-curitiba` | `/` (home) — **sobreposição leve, aceitável** |
| assistência técnica informática curitiba | *sem dono claro* | `/assistencia-tecnica-curitiba` (title consoles), `/servicos`, `/` — **canibalização provável** |
| assistência técnica computador curitiba | `/servicos/conserto-pc-notebook` | `/manutencao-notebook-pc-curitiba` |
| manutenção computador curitiba | `/manutencao-notebook-pc-curitiba` | `/servicos/conserto-pc-notebook` — sobreposição leve |
| conserto computador curitiba | `/servicos/conserto-pc-notebook` | — |
| conserto notebook curitiba | `/servicos/conserto-notebook-curitiba` | `/servicos/conserto-pc-notebook` — **sobreposição leve** |
| manutenção notebook curitiba | `/manutencao-notebook-pc-curitiba` | `/servicos/conserto-notebook-curitiba` |
| formatação notebook/computador curitiba | `/servicos/formatacao-computador` | — |
| upgrade SSD / memória | `/servicos/upgrade-ssd-memoria` | — |
| computador lento / notebook lento | `/servicos/computador-lento` | `/problemas/*` |
| computador/notebook não liga | `/servicos/computador-nao-liga` | `/problemas/*` |
| remoção de vírus | `/servicos/remocao-virus` | — |
| backup / recuperação de dados | `/servicos/backup-recuperacao` | — |
| suporte técnico empresas / TI empresas curitiba | `/suporte-empresas` | `/guias/organizacao-de-ti-para-escritorios` (informacional, ok) |
| rede Wi-Fi empresa | `/servicos/redes-wifi` | `/suporte-empresas` — sobreposição leve |
| PC gamer manutenção | `/servicos/montagem-pc` | — (aliases já 301) |

## 6. GSC (2026-07-08 → 2026-08-04)

Totais: **152 cliques · 10.741 impressões · CTR 1,42% · posição média 9,18**. Home indexada, canonical selecionado por Google = `https://tecnicocuritiba.com.br`, `page_fetch_state: SUCCESSFUL`.

Top pages:

| URL | Impr. | Cliques | Pos. | Interpretação |
|---|---:|---:|---:|---|
| `/problemas/reparo-placa-som-amplificador-curitiba` | 709 | 23 | 7,86 | Melhor ativo do site |
| `/problemas/reparo-placa-principal-tv-curitiba` | 731 | 13 | 6,58 | CTR baixo p/ pos. 6,6 → possível CTR |
| `/valores` | 673 | 9 | 7,47 | Posição ainda insuficiente |
| `/` | 374 | 7 | 8,99 | Posição ainda insuficiente |
| `/problemas/fonte-queimada-curitiba` | 116 | 7 | 7,04 | Saudável |
| `/procedimentos/microsoldagem-celular-curitiba` | 99 | 7 | 7,80 | Saudável |
| `/marcas/logitech` | 35 | 5 | 6,57 | CTR 14% — saudável |
| `/tecnico-informatica-colombo` | 435 | 5 | 6,17 | **CTR 1,1% em pos. 6,2 → problema possível de CTR** |
| `/servicos` | 449 | 4 | 13,87 | Posição insuficiente (pág. 2) |
| `/blog/como-crimpar-cabo-de-rede-rj45` | 360 | 3 | 9,10 | Informacional, ok |

**Nenhuma URL de `/servicos/*` de informática aparece no top-10 do GSC.** Não há, no recorte disponível, evidência de múltiplas URLs recebendo impressões para o mesmo cluster de informática → **canibalização não comprovada por dados**, apenas provável por arquitetura.

Não há 3 meses de dados comparáveis disponíveis por esta ferramenta (recorte fixo de 28 dias completos) — registrado como limitação, não inventado.

## 7. Semrush

Não consultado nesta rodada: o volume de sinal GSC próprio já é suficiente para as conclusões, e estimativas de terceiro não alterariam o diagnóstico de arquitetura interna. Fica registrado como pendência opcional da 4I-P.1 (keyword gap contra até 5 concorrentes locais).

## 8. Canibalização

| Caso | Classificação |
|---|---|
| 300 rotas `/atendimento/*` com title/description idênticos à home | **CANIBALIZAÇÃO COMPROVADA (por gate `check:title-meta`, 598 violações)** |
| `/assistencia-tecnica-curitiba` × `/servicos` × `/` para "assistência técnica informática curitiba" | CANIBALIZAÇÃO PROVÁVEL |
| `/manutencao-notebook-pc-curitiba` × `/servicos/conserto-pc-notebook` | SOBREPOSIÇÃO LEVE |
| `/servicos/conserto-notebook-curitiba` × `/servicos/conserto-pc-notebook` | SOBREPOSIÇÃO LEVE |
| `/servicos/computador-lento` × `/problemas/*` sintomas | SOBREPOSIÇÃO LEVE |
| `/tecnico-informatica-curitiba` × `/` | SOBREPOSIÇÃO LEVE (aceitável, funções diferentes) |
| Demais `/servicos/*` | SEM CANIBALIZAÇÃO |

## 9. Home

A home distribui via componentes compartilhados (grid de serviços, interlinking, footer NAP 11 cidades) e não via links hardcoded em `Index.tsx`. Isso mantém consistência, mas significa que **a home não tem âncoras editoriais contextuais próprias** para as landings comerciais prioritárias — todos os links partem de blocos reutilizados, com âncora igual em todo o site.

## 10. Hub `/servicos`

1. Distribui autoridade? **Sim** — 115 referências internas para o hub e ele lista todos os serviços.
2. Âncoras descritivas? **Sim** — nomes de serviço, sem "clique aqui".
3. Serviços estratégicos visíveis? **Sim**.
4. Excesso de links? **Não** no hub principal.
5. Órfãs? Ver §12.

Ponto fraco: `/servicos` está em **posição média 13,87** (página 2) com 449 impressões — é um hub que atrai demanda mas não converte posição.

## 11. Profundidade de clique

| Landing | Cliques desde a home |
|---|---|
| `/servicos` | 1 (header) |
| `/precos-e-politicas` | 1 |
| `/servicos/{formatacao,remocao-virus,upgrade-ssd,conserto-pc-notebook,redes-wifi,backup,montagem-pc}` | 2 |
| `/suporte-empresas` | 1–2 |
| `/tecnico-informatica-curitiba` | 2 |
| `/areas-atendidas` | 2 (footer/interlinking) |
| `/servicos/conserto-notebook-curitiba` | 2–3 |
| `/manutencao-notebook-pc-curitiba` | **3+** ⚠️ |
| `/assistencia-tecnica-curitiba` | **3+** ⚠️ |
| `/atendimento/:cidade/:bairro` | 3 |

## 12. Órfãs

Nenhuma órfã absoluta: todas as rotas comerciais têm ≥4 referências internas. Casos de **quase-órfã comercial**:

- `/manutencao-notebook-pc-curitiba` — 4 referências.
- `/assistencia-tecnica-curitiba` — 8 referências.
- `/areas-atendidas` — 8 referências (hub local recém-criado, subalimentado).

Todas presentes no sitemap (`sitemap-main.xml` / `sitemap-servicos.xml`) — **nenhuma rota estratégica ausente do sitemap**. Sem P0 de indexação.

## 13. Link equity interno (ordenado)

```
145  /precos-e-politicas
115  /servicos
 66  /servicos/upgrade-ssd-memoria
 66  /servicos/conserto-pc-notebook
 49  /servicos/formatacao-computador
 46  /servicos/redes-wifi
 42  /servicos/remocao-virus
 39  /servicos/backup-recuperacao
 37  /servicos/montagem-pc
 33  /suporte-empresas
 24  /tecnico-informatica-curitiba
 17  /servicos/computador-nao-liga
 15  /servicos/computador-lento
 13  /servicos/conserto-notebook-curitiba
  8  /assistencia-tecnica-curitiba
  8  /areas-atendidas
  4  /manutencao-notebook-pc-curitiba
```

**A arquitetura NÃO distribui autoridade proporcionalmente ao valor estratégico.** `/precos-e-politicas` recebe 36× mais links internos que `/manutencao-notebook-pc-curitiba`, e `/servicos/conserto-notebook-curitiba` (cluster "conserto notebook curitiba", alto valor comercial) recebe 5× menos que `/servicos/upgrade-ssd-memoria`.

## 14. Âncoras

Âncoras genéricas ("saiba mais", "veja mais", "clique aqui") aparecem em apenas **8 ocorrências** em todo o `src/` (`PrecosEPoliticas` 2, `Footer` 2, `ProcedimentosPlaca`, `ProblemaPage`, `ComoFunciona`, `Header`). Classificação geral: **DESCRITIVA**. Nenhum caso de exact-match excessivo detectado. Sem ação necessária.

## 15. Breadcrumbs

`PageSEO` recebe `breadcrumbs` explícitos em todas as `/servicos/*` auditadas (Início → Serviços → Serviço), com `BreadcrumbList` correspondente. Hierarquia coerente, sem breadcrumb artificial. **OK.**

## 16. Canonical

Todas as páginas auditadas usam self-canonical via `PageSEO path`. GSC confirma canonical selecionado = declarado na home. Aliases legados (`/valores`, `/conserto-monitor`, `/servicos/pc-gamer`, `/tecnico-em-*`, `/formatacao-de-computador-curitiba`, etc.) são `<Navigate replace>` — comportamento client-side. **Sem canonical cruzado inesperado, sem ausência.** Nada a corrigir.

## 17. Titles

- **Duplicação grave**: 300 rotas `/atendimento/*` com o title da home. Registrado como dívida P1 estrutural.
- **Desalinhamento**: `AssistenciaTecnicaCuritiba.tsx:337` — title de consoles em URL de assistência técnica genérica.
- **Excessivamente longo**: `/servicos/upgrade-ssd-memoria` — "Upgrade SSD e Memória RAM em Curitiba a partir de R$ 99,99 (mão de obra) | Técnico em Curitiba" (~100 chars, truncará).
- Demais `/servicos/*`: únicos, com keyword + cidade + preço. **Bons.**

## 18. H1

Nenhum H1 semanticamente indistinguível dentro de `/servicos/*`. Pares mais próximos, ainda assim distintos:

- "Conserto de PC e Notebook em Curitiba" vs "Conserto de Notebook em Curitiba" — distinção legítima (escopo).
- "Manutenção de Notebook e PC em Curitiba" — **o mais próximo do anterior**; único ponto de atenção real de H1.

## 19. Meta descriptions

Todas as `/servicos/*` têm description única, factual e com preço/garantia. Duas dívidas:

- **`AssistenciaTecnicaCuritiba.tsx:335`** — description focada em consoles/placa de vídeo numa URL cuja intenção percebida é informática geral. **Dívida separada, não corrigida nesta rodada.**
- 300 descriptions duplicadas em `/atendimento/*` (mesma raiz do problema de title).

## 20. Local SEO

Presença factual e natural de "Curitiba" em H1+title+description em todas as comerciais. "São José dos Pinhais" presente nas rotas dedicadas e no footer NAP (11 cidades). **Sem keyword stuffing local.** OK.

## 21. Cidades

11 páginas `/tecnico-informatica-*` (Curitiba, SJP, Araucária, Campo Largo, Pinhais, Colombo, Fazenda Rio Grande, Almirante Tamandaré, Piraquara, Campo Magro, Quatro Barras) + aliases 301.

- Função real: **sim** — cobrem RMC com NAP e conteúdo próprio.
- Conteúdo distinto: sim, mas variação moderada.
- Recebem links: sim (footer NAP + interlinking).
- Aparecem no GSC: **sim** — `/tecnico-informatica-colombo` com 435 impressões e pos. 6,17. Prova de que o modelo de cidade funciona.

## 22. Bairros

| Grupo | Classificação |
|---|---|
| `/bairros/*` (Centro, Batel, Portão, CIC, Santa Felicidade, SJP…) | ÚTIL — conteúdo dedicado |
| `/servicos/{servico}/{bairro}` (matriz curada, ~40 rotas) | ÚTIL — intenção serviço+local real |
| `/atendimento/:cidade/:bairro` (~300 shells) | **FRACA** — metadados duplicados da home; risco de doorway |

A política antidoorway permanece. **Não excluir**: o problema é metadado, não existência.

## 23. Residencial × B2B

A intenção empresarial **tem URL clara**: `/suporte-empresas` (33 links internos, title B2B explícito com M365/backup/contratos), apoiada por `/guias/organizacao-de-ti-para-escritorios` e `/guias/como-escolher-workstation`. Sobreposição com `/servicos/redes-wifi` é leve e aceitável (rede é entregável comum aos dois públicos). **Não está espalhada.**

## 24. Notebook × Computador

**SIM — devem permanecer independentes.** Justificativa: `/servicos/conserto-notebook-curitiba` cobre tela/dobradiça/teclado/bateria (peças exclusivas de notebook), `/servicos/conserto-pc-notebook` cobre placa-mãe/fonte/hardware geral. Intenções e entregáveis diferentes. Ressalva: `/manutencao-notebook-pc-curitiba` é a terceira URL nesse espaço e é a mais fraca das três (4 links, 3+ cliques de profundidade) — é ela, não o par notebook/PC, que gera ambiguidade.

## 25. Sintomas

| Sintoma | Cobertura |
|---|---|
| lento | LANDING PRÓPRIA (`/servicos/computador-lento`) |
| não liga | LANDING PRÓPRIA (`/servicos/computador-nao-liga`) |
| travando | BLOCO (dentro de computador-lento / `/problemas/*`) |
| aquecendo | BLOCO (`/problemas/*`) |
| tela azul | BLOCO (`/problemas/*`) |
| sem internet | BLOCO (`/servicos/redes-wifi`) |

Risco de thin content: **baixo nas landings de sintoma** (conteúdo longo, FAQ, JSON-LD). Risco concentrado nas ~300 shells `/atendimento/*`, não nos sintomas. **Não criar novas micro-landings de sintoma.**

## 26. Serviços específicos

| Serviço | Cobertura |
|---|---|
| SSD | LANDING PRÓPRIA |
| RAM | LANDING PRÓPRIA (compartilhada com SSD) |
| formatação | LANDING PRÓPRIA |
| backup | LANDING PRÓPRIA (compartilhada com recuperação) |
| recuperação de dados | LANDING PRÓPRIA (compartilhada com backup) |
| vírus | LANDING PRÓPRIA |
| redes | LANDING PRÓPRIA |

**Cobertura completa.** Nenhum serviço ausente. Não presumir que RAM ou recuperação de dados mereçam URL própria sem dado de demanda separada.

## 27. Conteúdo editorial

- `/blog/como-crimpar-cabo-de-rede-rj45` — 360 impressões, 3 cliques, pos. 9,1. Tema: rede. Landing comercial apoiada: `/servicos/redes-wifi`. **Melhor ativo editorial do cluster de informática.**
- `/guias/organizacao-de-ti-para-escritorios` → apoia `/suporte-empresas`.
- `/guias/como-escolher-workstation` → apoia `/suporte-empresas` / `/servicos/montagem-pc`.
- `/blog/*` restante, `/faq`, `/como-funciona`, `/diagnostico-tecnico`, `/quando-nao-compensa`, `/problemas-reais-e-casos`.

## 28. Artigo → money page

Os guias apontam contextualmente para `/suporte-empresas`. O artigo de maior tração (`crimpar-cabo-rj45`, 360 impressões) é o candidato mais claro a reforço de link contextual para `/servicos/redes-wifi` — **oportunidade P2, não executada.**

## 29. Money page → conteúdo

`/servicos/*` já linkam para `/precos-e-politicas`, `/como-funciona`, `/quando-nao-compensa` e FAQ próprio. Fluxo de confiança **adequado**.

## 30. Clusters (arquitetura real, URLs existentes)

```
/  (home)
└── /servicos  (hub)
    ├── COMPUTADOR
    │   ├── /servicos/conserto-pc-notebook
    │   ├── /servicos/formatacao-computador
    │   ├── /servicos/montagem-pc  (+ /como-funciona)
    │   └── /manutencao-notebook-pc-curitiba   ← ambígua
    ├── NOTEBOOK
    │   └── /servicos/conserto-notebook-curitiba
    ├── SERVIÇOS
    │   ├── /servicos/remocao-virus
    │   ├── /servicos/upgrade-ssd-memoria
    │   ├── /servicos/backup-recuperacao
    │   └── /servicos/redes-wifi
    ├── EMPRESAS
    │   ├── /suporte-empresas
    │   ├── /guias/organizacao-de-ti-para-escritorios
    │   └── /guias/como-escolher-workstation
    ├── SINTOMAS
    │   ├── /servicos/computador-lento
    │   ├── /servicos/computador-nao-liga
    │   └── /problemas/*
    ├── LOCAL
    │   ├── /tecnico-informatica-{11 cidades}
    │   ├── /areas-atendidas · /busca
    │   ├── /bairros/*
    │   ├── /servicos/{servico}/{cidade|bairro}
    │   └── /atendimento/:cidade/:bairro   ← metadados duplicados
    ├── COMERCIAL
    │   ├── /precos-e-politicas (/valores)
    │   └── /atendimento-domicilio · /atendimento-remoto · /coleta-e-entrega
    └── DESALINHADA
        └── /assistencia-tecnica-curitiba  (title = consoles)
```

## 31. Gap real de conteúdo

| Possível gap | Veredito |
|---|---|
| "assistência técnica de informática em Curitiba" com URL dedicada | **GAP REAL** — não de página nova, mas de dono claro entre URLs existentes |
| notebook lento (URL própria) | JÁ COBERTO (computador-lento cobre ambos) |
| recuperação de dados URL própria | VOLUME/INTENÇÃO INSUFICIENTE |
| TI para empresas | JÁ COBERTO |
| home office / manutenção preventiva | DEPENDE DE DADOS |
| PC gamer | JÁ COBERTO (301 → montagem-pc) |
| impressora | JÁ COBERTO (`/conserto-impressora-curitiba`) |

Nenhum gap justifica **página nova** nesta rodada.

## 32. Keyword gap (Semrush)

Não executado — ver §7. Fica como item opcional da 4I-P.1.

## 33. SERP features

Sem dados de SERP feature nesta rodada (não consultado). Observação baseada em GSC: as queries com melhor performance são **hiper-específicas de reparo** ("conserto de módulo de som" pos. 3, CTR 16,7%), enquanto as genéricas locais ("arruma computador", "1001 soluções it") ficam em posições 9–39 sem clique. Isso é consistente com **Map Pack capturando o clique nas queries locais genéricas** — hipótese, não medição. Reforça a 4I-M (autoridade local externa/GBP) como frente correta, não conteúdo adicional.

## 34. Score de arquitetura SEO — **72/100**

| Critério | Peso | Nota | Justificativa |
|---|---:|---:|---|
| Intenção por URL | 20 | 15 | `/servicos/*` impecável; `/assistencia-tecnica-curitiba` desalinhada; `/manutencao-notebook-pc-curitiba` ambígua |
| Canibalização | 15 | 8 | 300 rotas com title/desc duplicados (gate falhando) |
| Interlinking | 20 | 15 | Denso e descritivo, mas desproporcional ao valor estratégico |
| Profundidade de clique | 10 | 8 | Quase tudo em 1–2 cliques; 2 comerciais em 3+ |
| Local relevance | 10 | 9 | Excelente; cidade em GSC com pos. 6,2 comprova |
| Query-page alignment | 15 | 10 | Bom nos serviços; sem dono no cluster-mãe |
| Cobertura comercial | 10 | 7 | Completa; falta autoridade, não páginas |

## 35. Top 5 achados

1. **598 violações de title/description duplicados em 300 rotas `/atendimento/*`** — evidência: `npm run check:title-meta` (exit 2). URLs: `/atendimento/:cidade/:bairro`. Impacto: dilui relevância local e é o único caso de canibalização comprovada. Ação futura: gerar title/description únicos por cidade+bairro nos shells de prerender.
2. **`/assistencia-tecnica-curitiba` com title/description de consoles** — evidência: `AssistenciaTecnicaCuritiba.tsx:335-338` vs H1 na linha 401. Impacto: o cluster-mãe "assistência técnica informática Curitiba" não tem dono. Ação futura: decidir a intenção canônica dessa URL (informática geral **ou** consoles) e alinhar title/desc/H1.
3. **Desproporção de link equity** — evidência: §13. `/manutencao-notebook-pc-curitiba` (4) e `/servicos/conserto-notebook-curitiba` (13) vs `/precos-e-politicas` (145). Impacto: as landings de maior valor comercial recebem menos autoridade. Ação futura: adicionar links contextuais nos blocos de interlinking existentes.
4. **`/tecnico-informatica-colombo`: 435 impressões, pos. 6,17, CTR 1,1%** — evidência: GSC. Impacto: pos. 6 com CTR 1,1% é anômalo. Ação futura: **não alterar title por CTR ainda** (n=5 cliques, amostra insuficiente); reobservar em 90 dias. Hipótese primária: Map Pack absorvendo o clique.
5. **`/servicos` em pos. 13,87 com 449 impressões** — evidência: GSC. Impacto: o hub principal está na página 2. Ação futura: reforço de autoridade externa (4I-M), não mudança de conteúdo.

## 36. P0

**Nenhum.** Indexação OK, canonical OK, sitemap cobre todas as rotas estratégicas, nenhuma órfã grave, nenhum conflito técnico comprovado. Ausência de tráfego em `/servicos/*` **não** é P0.

## 37. P1

1. Title/description únicos para as ~300 rotas `/atendimento/:cidade/:bairro` (gate `check:title-meta` já falhando).
2. Definir e alinhar a intenção canônica de `/assistencia-tecnica-curitiba`.
3. Reequilibrar link equity para `/servicos/conserto-notebook-curitiba` e `/manutencao-notebook-pc-curitiba`.

## 38. P2

1. Encurtar o title de `/servicos/upgrade-ssd-memoria` (~100 chars).
2. Link contextual `/blog/como-crimpar-cabo-de-rede-rj45` → `/servicos/redes-wifi`.
3. Reduzir profundidade de clique de `/areas-atendidas`.

## 39. O que NÃO fazer

- **Não criar novas páginas de bairro.** Já são ~300 shells + matriz curada; o problema é metadado, não cobertura.
- **Não criar landing por sintoma sem demanda comprovada.** "Travando", "aquecendo", "tela azul" estão bem servidos como blocos.
- **Não fundir notebook × computador.** Intenções e entregáveis distintos; a ambiguidade está em `/manutencao-notebook-pc-curitiba`.
- **Não alterar title de `/tecnico-informatica-colombo` por CTR.** n=5 cliques. Amostra insuficiente.
- **Não podar nenhuma página por ausência de dado no GSC.** O site tem 28 dias de janela e o cluster de informática ainda está em fase de impressão.
- **Não criar página nova por "concorrente tem".** Nenhum gap de cobertura foi identificado.
- **Não mexer em `/servicos/conserto-tv`, `/servicos/conserto-placa`, `/servicos/conserto-monitor`** — são os ativos de melhor performance do site.
- **Não criar gate novo.** `check:trust-claims` e `check:analytics-parity` não existem; registrado, não criado.

## 40. Gates

| Comando | Resultado |
|---|---|
| `npm run check:seo` | ✅ OK — index.html title/desc/h1 válidos |
| `npm run check:title-meta` | ❌ 598 violações em 300 rotas `/atendimento/*` (pré-existente) |
| `npm run check:trust-claims` | ⚠️ **não existe** no `package.json` |
| `npm run check:analytics-parity` | ⚠️ **não existe** no `package.json` |

## 41. Git final

```
git status --short   → (vazio, exceto este documento)
git diff --stat      → 0 alterações
git diff -- src/     → 0 alterações
git diff -- scripts/ → 0 alterações
```

**PROVA DE ZERO ALTERAÇÃO DE PRODUTO: confirmada.**

---

## Perguntas obrigatórias

**1. Qual URL deve ser a principal autoridade para "assistência técnica em informática em Curitiba"?**
`/tecnico-informatica-curitiba`. Ela já tem title/H1/description alinhados ao cluster, self-canonical, 24 links internos e preço. `/assistencia-tecnica-curitiba` deveria ser rebaixada a hub de consoles/equipamentos (que é o que seu title já diz), e `/servicos` permanecer como hub de serviços.

**2. Existe canibalização real?**
**Sim, uma:** as ~300 rotas `/atendimento/:cidade/:bairro` com title e description idênticos à home (comprovada por gate). Todo o resto é sobreposição leve ou canibalização apenas provável — sem evidência de GSC.

**3. Qual página recebe autoridade interna abaixo do que merece?**
`/servicos/conserto-notebook-curitiba` (13 links) — é a landing do cluster comercial de maior valor do negócio e recebe 5× menos links que `/servicos/upgrade-ssd-memoria`. Em segundo, `/manutencao-notebook-pc-curitiba` (4 links, 3+ cliques).

**4. Qual cluster possui o maior gap comercial real?**
Nenhum gap de **cobertura**. O maior gap é de **propriedade de intenção** no cluster-mãe "assistência técnica / técnico de informática em Curitiba", disputado entre três URLs sem dono declarado.

**5. Temos páginas demais, páginas de menos ou o número certo?**
**Páginas demais na camada local automatizada** (~300 shells `/atendimento/*` com metadados duplicados) e **o número certo na camada de serviços** (14 landings, cobertura completa, zero sobra). Não faltam páginas.

---

## DECISÃO FINAL

```
ARQUITETURA SEO DE INFORMÁTICA TEM OPORTUNIDADES CIRÚRGICAS
```

## Próximo passo

Abrir **4I-P.1** apenas para os 3 ajustes P1, com diff mínimo e gates completos — sendo o item 1 (metadados únicos em `/atendimento/*`) o único que já está comprovado por gate falhando. A frente de maior retorno continua sendo a **4I-M** (autoridade local externa / GBP): as posições 6–9 com CTR ~1% em queries locais indicam clique capturado por Map Pack, o que conteúdo interno adicional não resolve.
