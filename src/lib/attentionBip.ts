/**
 * Feedback UX unificado quando o usuário tenta avançar sem preencher:
 * - Beep curto via WebAudio (não requer asset).
 * - Vibração leve (mobile) via navigator.vibrate.
 * - Anima os elementos alvo com a classe utilitária `.wa-attention` (pulse + ring-3).
 *
 * O beep respeita o "Reduce Motion / silent": só toca uma vez por 800ms e
 * só se `sessionStorage.getItem("wa_bip_off") !== "1"`.
 */
let lastBipAt = 0;

export function bip(): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - lastBipAt < 800) return;
  lastBipAt = now;

  try {
    if (sessionStorage.getItem("wa_bip_off") === "1") return;
  } catch { /* noop */ }

  try {
    const AudioCtor: typeof AudioContext | undefined =
      (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const ctx = new AudioCtor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    osc.onended = () => ctx.close().catch(() => { /* noop */ });
  } catch { /* silent */ }

  try {
    (navigator as Navigator & { vibrate?: (n: number | number[]) => boolean }).vibrate?.(60);
  } catch { /* noop */ }
}

export function attention(selector: string, root?: ParentNode): void {
  const scope: ParentNode = root ?? (typeof document !== "undefined" ? document : (null as unknown as ParentNode));
  if (!scope) return;
  const els = Array.from(scope.querySelectorAll<HTMLElement>(selector));
  for (const el of els) {
    el.classList.remove("wa-attention");
    // Force reflow to restart the animation.
    void el.offsetWidth;
    el.classList.add("wa-attention");
    window.setTimeout(() => el.classList.remove("wa-attention"), 2200);
  }
}

export function bipAndAttention(selector: string, root?: ParentNode): void {
  bip();
  attention(selector, root);
}
