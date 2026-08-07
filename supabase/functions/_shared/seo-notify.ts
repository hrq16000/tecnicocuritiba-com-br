/**
 * Envio de alertas para o Slack.
 * Suporta dois modos, nessa ordem:
 *  1. Connector gateway da Lovable (SLACK_API_KEY + LOVABLE_API_KEY)
 *  2. Incoming Webhook (SLACK_WEBHOOK_URL)
 * Se nenhum estiver configurado, apenas registra e segue (não quebra o monitor).
 */

const GATEWAY = "https://connector-gateway.lovable.dev/slack/api";

export type Severidade = "critico" | "alerta" | "aviso" | "ok";

const EMOJI: Record<Severidade, string> = {
  critico: "🚨",
  alerta: "⚠️",
  aviso: "ℹ️",
  ok: "✅",
};

export interface SlackAlerta {
  severidade: Severidade;
  titulo: string;
  detalhe?: string;
  linhas?: string[];
  url?: string;
}

export function slackConfigurado(): boolean {
  return Boolean(
    Deno.env.get("SLACK_WEBHOOK_URL") ||
      (Deno.env.get("SLACK_API_KEY") && Deno.env.get("LOVABLE_API_KEY")),
  );
}

function montarTexto(a: SlackAlerta): string {
  const partes = [`${EMOJI[a.severidade]} *${a.titulo}*`];
  if (a.detalhe) partes.push(a.detalhe);
  if (a.linhas?.length) partes.push(a.linhas.slice(0, 15).map((l) => `• ${l}`).join("\n"));
  if (a.linhas && a.linhas.length > 15) partes.push(`_… e mais ${a.linhas.length - 15} item(ns)._`);
  if (a.url) partes.push(`<${a.url}|Abrir painel>`);
  return partes.join("\n");
}

export async function enviarSlack(a: SlackAlerta): Promise<{ ok: boolean; erro?: string }> {
  const texto = montarTexto(a);
  const webhook = Deno.env.get("SLACK_WEBHOOK_URL");

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: texto }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Slack webhook falhou [${res.status}]: ${body}`);
      return { ok: false, erro: `${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  }

  const slackKey = Deno.env.get("SLACK_API_KEY");
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const canal = Deno.env.get("SLACK_ALERT_CHANNEL") || "#seo-alertas";

  if (!slackKey || !lovableKey) {
    console.warn("Slack não configurado — alerta apenas gravado no banco.");
    return { ok: false, erro: "slack_nao_configurado" };
  }

  const res = await fetch(`${GATEWAY}/chat.postMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": slackKey,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ channel: canal, text: texto, mrkdwn: true }),
  });
  const raw = await res.text();
  if (!res.ok) {
    console.error(`Slack gateway falhou [${res.status}]: ${raw}`);
    return { ok: false, erro: `${res.status}: ${raw.slice(0, 200)}` };
  }
  try {
    const json = JSON.parse(raw);
    if (!json.ok) return { ok: false, erro: String(json.error) };
  } catch {
    return { ok: false, erro: `resposta_invalida: ${raw.slice(0, 120)}` };
  }
  return { ok: true };
}
