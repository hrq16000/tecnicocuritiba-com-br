# Technical decisions

- The 30 domestic tutorials use one audited 1200×630 real-photo cover per Windows, cellphone, and Wi-Fi group, referenced through exported project assets; this preserves the site's zero-AI-photography policy while keeping article image fields and list/detail metadata consistent.

## Referências visuais — adoção seletiva (17/11/2026)

- TasteSkill (https://www.tasteskill.dev/): direção de arte, hierarquia e revisão crítica, respeitando a identidade própria.
- Transitions.dev (https://transitions.dev/): movimentos CSS discretos em navegação, filtros, CTA e feedback, com teclado, foco, contraste e `prefers-reduced-motion`.
- React Bits (https://reactbits.dev/): apenas componentes gratuitos React específicos com revisão MIT + Commons Clause, dependências e desempenho; sem cópia Pro ou instalação indiscriminada.
- RiseClub (https://riseclub.tech/): referência de curadoria/editoria e comunidade; nenhum conteúdo, interface ou dados podem ser copiados.
- Contexto do projeto: Landing técnica Curitiba com SEO local, anúncios e atendimento: preservar identidade azul/laranja, contatos e indicadores reais. Usar somente fotos reais licenciadas, respeitando a proibição local de fotografias geradas por IA e a prioridade do LCP.
- Toda alteração visual funcional precisa de PR própria, compatibilidade 390/1440, gates existentes e preservação de SEO, segurança, marca e dados reais. Estas instruções não autorizam deploy, pagamento, banco ou DNS.

## Método adicional de evidência visual (20/11/2026)

Somente para **novas mudanças de UI e correções visuais comprovadamente necessárias**:
- Usar a ideia de diagnóstico de oclusão e interatividade do [Gist de Playwright](https://gist.github.com/tobiashochguertel/bf7bc60f8946c7ecbe0d14782b4a8c99) como roteiro, sem copiar código, executar instaladores ou criar novo runner: checar sobreposição de CTA/WhatsApp, topo fixo, foco, scroll e viewport 390/1440 com os testes locais já existentes.
- O [Reanimate](https://github.com/NiazMorshed2007/reanimate) (MIT) oferece apenas **método** para motion autoral quando houver necessidade real: capturar referência própria/autorizada, definir gatilho/duração/easing, comparar estados inicial/intermediário/final e registrar evidência. Não instalar CLI, binários, plugins ou novas dependências por esta diretriz; preferir CSS e ferramentas já disponíveis.
- Preservar desempenho LCP/CLS, foto real licenciada (sem IA), SEO local, anúncios, canais de atendimento, identidade azul/laranja e dados/comunicações verdadeiros; sem retrabalho das páginas atuais só para adotar skills.
- Classificar métodos não pertinentes como `NOT_APPLICABLE` ou redundantes; PR isolada e gates já existentes antes de qualquer integração. Nenhum merge, deploy ou alteração em banco é autorizado por esta nota.
