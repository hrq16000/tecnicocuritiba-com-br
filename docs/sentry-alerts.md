# Sentry Alerts — Checklist & Config Template

Configure as regras abaixo na UI do Sentry após adicionar `VITE_SENTRY_DSN`
como build secret (Workspace Settings → Build Secrets). Todas as regras
devem incluir a **rota** (`tags[route]`) e o **ambiente** (`tags[env]`) na
notificação — esses tags já são enviados por `src/lib/sentry.ts`.

## Canais de destino
- **Slack** — canal `#alerts-tecnicocuritiba`
- **Email** — `alerts@tecnicocuritiba.com.br`

Cadastre as integrações em Settings → Integrations antes de criar as regras.

## Checklist de regras (Alerts → Issue Alerts)

### 1. Erros críticos em produção
- **Condição**: `event.level:error` AND `environment:production`
- **Filtro**: `event.count > 1 in 5m` (evita ruído de single hit)
- **Ação**: Slack `#alerts-tecnicocuritiba` + Email
- **Assunto sugerido**: `[TC] ⚠️ {level} em {tags[route]} ({tags[env]})`

### 2. Pico de falhas de carregamento (ChunkLoadError / hydration)
- **Condição**: `message:"*ChunkLoadError*" OR message:"*Failed to fetch*"
  OR message:"*Hydration*"`
- **Filtro**: `event.count > 10 in 15m`
- **Ação**: Slack `#alerts-tecnicocuritiba`
- **Playbook**: verificar deploy recente / rollback via publish

### 3. Erros no funil de WhatsApp
- **Condição**: `tags[cta_type]:whatsapp` AND `event.level:error`
- **Filtro**: `unique_users > 3 in 10m`
- **Ação**: Slack + Email (impacto direto em conversão)

### 4. Rotas /atendimento/* quebradas
- **Condição**: `tags[route]:"/atendimento/*"` AND `event.level:error`
- **Filtro**: `event.count > 2 in 5m`
- **Ação**: Slack

### 5. Regressão de Core Web Vitals (opcional — Performance Alerts)
- **Tipo**: Metric Alert
- **Métrica**: `p75(measurements.lcp) > 4000` for 15 minutes
- **Ação**: Slack

## Template de payload Slack (customize em Alerts → Custom message)

```
🚨 *{project}* — {message}
Rota: `{tags[route]}` | Env: `{tags[env]}` | Versão: `{tags[app_version]}`
Usuários: {unique_users} | Ocorrências: {event.count}
CTA: `{tags[cta_type]}` @ `{tags[cta_location]}`
{link}
```

## Como o app popula os tags

`src/lib/sentry.ts` seta automaticamente:
- `tags.route` — `window.location.pathname` na inicialização
- `tags.env` — `import.meta.env.MODE`
- `tags.app_version` — `window.__APP_VERSION__`

`src/lib/analytics.ts` (`trackCTAClick`) envia breadcrumbs `cta` com
`data.cta_type`, `data.cta_location`, `bairro`, `servico`, `modalidade`,
`category`, `symptomSlug` — todos aparecem no timeline do issue.

## Verificação após configurar

1. Dispare um erro de teste: `throw new Error("[sentry-test] alert smoke")`
   em um botão qualquer (remova depois).
2. Confirme que a notificação chega ao Slack/Email com rota e env corretos.
3. Suprima o teste em produção.
