/**
 * Mensagens pré-preenchidas do WhatsApp: remove somente pictogramas/emoji.
 * Alguns caminhos de abertura no Android exibem esses caracteres como "�".
 * Mantém acentos, preços, formatação *negrito*, URLs e texto do cliente.
 * O funil no site mantém seus ícones normalmente.
 */
const EMOJI = /(?:\p{Regional_Indicator}{2}|[\p{Extended_Pictographic}\p{Emoji_Presentation}](?:\uFE0E|\uFE0F|\p{Emoji_Modifier}|\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}])*)/gu;

export function toWhatsAppPlainText(message: string): string {
  return message
    .replace(EMOJI, "")
    .replace(/[\uFE0E\uFE0F\u200D\u20E3\uFFFD]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/^[ \t]+/gm, "")
    .trim();
}
