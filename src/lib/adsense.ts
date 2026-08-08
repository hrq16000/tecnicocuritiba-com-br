/**
 * Carregamento do AdSense condicionado ao consentimento (LGPD / Consent Mode v2).
 *
 * O script `adsbygoogle` só é injetado depois que o visitante aceita o banner.
 * Antes disso nenhum script de terceiros de publicidade é executado, e o
 * Consent Mode permanece com `ad_storage`/`ad_personalization` em "denied"
 * (default definido no index.html).
 */
export const ADSENSE_CLIENT = "ca-pub-3762170279587706";

const SCRIPT_ID = "adsbygoogle-js";

export const loadAdSense = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return;

  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(s);
};

/** Injeta o AdSense apenas quando já existe consentimento salvo ("granted"). */
export const loadAdSenseIfConsented = () => {
  try {
    if (localStorage.getItem("lgpd_consent_v1") === "granted") loadAdSense();
  } catch {
    /* storage indisponível: mantém anúncios desligados */
  }
};
