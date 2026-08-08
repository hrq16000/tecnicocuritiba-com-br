# Registro das Operações de Tratamento (ROPA)

> Documento gerado automaticamente por `scripts/generate-ropa.mjs` a partir de
> `docs/lgpd/decisoes.json`. Não edite manualmente.

- **Controlador:** O Técnico de Informática — Curitiba
- **Site:** https://tecnicocuritiba.com.br
- **Canal do titular:** WhatsApp (canal oficial) e página /exclusao-de-dados
- **Encarregado:** Responsável operacional do portal (contato via /exclusao-de-dados)
- **Versão:** 1.0
- **Status:** AUTORIZADO
- **Operações registradas:** 4

## 1. Funil de atendimento por WhatsApp (geração de lead)

**Finalidade:** Triagem do problema técnico, envio de orçamento e agendamento do atendimento.

**Base legal:** Execução de procedimentos preliminares a contrato (art. 7º, V, LGPD)

**Categorias de titulares:** Clientes e potenciais clientes

**Dados tratados:**
- Nome informado espontaneamente
- Equipamento, sintomas e modelo
- Cidade e bairro
- Período preferido de atendimento
- Parâmetros de origem (UTM) da visita

**Prazo de retenção:** 24 meses após o último contato

**Compartilhamento:**
- WhatsApp/Meta (transporte da conversa)

**Transferência internacional:** Sim (provedores com operação fora do Brasil)

**Medidas de segurança e governança:**
- Sem coleta de dados sensíveis
- Mensagem pré-preenchida sem armazenamento de conteúdo no site
- Nenhum telefone exposto publicamente

---

## 2. Mensuração de cliques e navegação (click_events + GA4)

**Finalidade:** Medir desempenho do funil, dos CTAs e das campanhas.

**Base legal:** Consentimento (art. 7º, I, LGPD) via banner de cookies e Consent Mode v2

**Categorias de titulares:** Visitantes do site

**Dados tratados:**
- Evento de clique e rota
- UTMs e origem
- Viewport e tipo de dispositivo
- Identificador de sessão anônimo (deduplicação)

**Prazo de retenção:** 14 meses (GA4) e 12 meses (tabela click_events)

**Compartilhamento:**
- Google Analytics 4
- Google AdSense (quando consentido)

**Transferência internacional:** Sim (provedores com operação fora do Brasil)

**Medidas de segurança e governança:**
- Scripts de anúncio e analytics só carregam após consentimento
- Tabela click_events com RLS INSERT-only para anônimos
- Sem coleta de identificadores diretos do titular

---

## 3. Avaliações e depoimentos de clientes

**Finalidade:** Publicar prova social autorizada e acompanhar qualidade do serviço.

**Base legal:** Consentimento específico do titular (art. 7º, I, LGPD)

**Categorias de titulares:** Clientes atendidos

**Dados tratados:**
- Primeiro nome
- Bairro/cidade
- Nota e comentário
- Serviço realizado

**Prazo de retenção:** Enquanto a autorização de publicação estiver vigente

**Compartilhamento:**
- Google Business Profile (quando o cliente publica diretamente)

**Transferência internacional:** Não

**Medidas de segurança e governança:**
- Aceite explícito antes da publicação
- Página /avaliar com noindex e antispam
- Histórico de auditoria de aprovação/revogação em /admin/reviews

---

## 4. Ordem de serviço e consulta pública de status

**Finalidade:** Registrar o serviço executado e permitir consulta do andamento pelo cliente.

**Base legal:** Execução de contrato (art. 7º, V, LGPD) e obrigação legal fiscal (art. 7º, II)

**Categorias de titulares:** Clientes atendidos

**Dados tratados:**
- Número da OS
- Telefone de contato (para busca)
- Equipamento e laudo técnico
- Fotos e anexos enviados pelo cliente
- Histórico de estágios da OS

**Prazo de retenção:** 5 anos (garantia e obrigações fiscais)

**Compartilhamento:**
- Nenhum terceiro além da infraestrutura de hospedagem

**Transferência internacional:** Não

**Medidas de segurança e governança:**
- Rate limit e log de auditoria nas consultas públicas
- Acesso administrativo restrito por papel
- Exclusão de anexos sob solicitação em /exclusao-de-dados

---

## Direitos do titular

Confirmação, acesso, correção, anonimização, portabilidade, informação sobre
compartilhamento e revogação do consentimento podem ser exercidos pela página
`/exclusao-de-dados` ou pelo canal oficial de WhatsApp. Prazo de resposta: até
15 dias corridos.
