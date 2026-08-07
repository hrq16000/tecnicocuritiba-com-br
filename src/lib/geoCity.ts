/**
 * Detecção de cidade/bairro por IP (sem chave, sem custo) com cache de sessão.
 *
 * Regra de ouro do projeto: melhor não exibir do que exibir errado.
 * Se o IP não cair em uma cidade atendida, o status vira "unknown" e a UI
 * simplesmente não mostra nada personalizado.
 */

export const CURITIBA_REGION_CITIES = [
  "Curitiba",
  "São José dos Pinhais",
  "Araucária",
  "Campo Largo",
  "Pinhais",
  "Colombo",
  "Almirante Tamandaré",
  "Fazenda Rio Grande",
  "Piraquara",
  "Quatro Barras",
  "Campina Grande do Sul",
] as const;

export type GeoStatus = "loading" | "detected" | "confirmed" | "unknown";

export interface GeoState {
  status: GeoStatus;
  /** Cidade atendida detectada/confirmada, ou null quando desconhecida. */
  city: string | null;
  /** Bairro informado pelo usuário (nunca vem do IP com precisão útil). */
  neighborhood: string | null;
  region: string;
  source: "ip" | "user" | null;
}

const SESSION_KEY = "geo_city_v1";
const CONFIRM_KEY = "geo_city_confirmed_v1";
const EVENT_KEY = "geo_city_autofill_ip_sent_v1";

let state: GeoState = {
  status: "loading",
  city: null,
  neighborhood: null,
  region: "Paraná",
  source: null,
};

const listeners = new Set<(s: GeoState) => void>();
let started = false;

const emit = () => {
  const snapshot = state;
  listeners.forEach((l) => l(snapshot));
};

const setState = (patch: Partial<GeoState>) => {
  state = { ...state, ...patch };
  emit();
};

/** Normaliza acentos/caixa para comparar nomes de cidade vindos da API. */
const norm = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const matchServedCity = (raw?: string | null): string | null => {
  if (!raw) return null;
  const n = norm(raw);
  return CURITIBA_REGION_CITIES.find((c) => norm(c) === n) ?? null;
};

/** Dispara `geo_city_autofill_ip` no máximo uma vez por sessão. */
const trackAutofillOnce = (city: string) => {
  try {
    if (sessionStorage.getItem(EVENT_KEY)) return;
    sessionStorage.setItem(EVENT_KEY, "1");
  } catch {
    /* sessão indisponível: segue sem dedupe persistente */
  }
  try {
    window.gtag?.("event", "geo_city_autofill_ip", {
      event_category: "geo",
      city,
      method: "ip",
    });
  } catch {
    /* noop */
  }
};

const readCache = (): GeoState | null => {
  try {
    const confirmed = localStorage.getItem(CONFIRM_KEY);
    if (confirmed) {
      const parsed = JSON.parse(confirmed) as { city?: string; neighborhood?: string };
      const city = matchServedCity(parsed.city);
      if (city) {
        return {
          status: "confirmed",
          city,
          neighborhood: parsed.neighborhood || null,
          region: "Paraná",
          source: "user",
        };
      }
    }
  } catch {
    /* noop */
  }
  try {
    const cached = sessionStorage.getItem(SESSION_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as { city?: string | null };
      const city = matchServedCity(parsed.city);
      return {
        status: city ? "detected" : "unknown",
        city,
        neighborhood: null,
        region: "Paraná",
        source: city ? "ip" : null,
      };
    }
  } catch {
    /* noop */
  }
  return null;
};

const fetchCityByIp = async (): Promise<string | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { city?: string; region_code?: string; country_code?: string };
    if (data.country_code && data.country_code !== "BR") return null;
    return matchServedCity(data.city);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/** Inicia a detecção (idempotente). Seguro chamar de vários componentes. */
export const startGeoDetection = () => {
  if (started || typeof window === "undefined") return;
  started = true;

  const cached = readCache();
  if (cached) {
    state = cached;
    emit();
    if (cached.status === "detected" && cached.city) trackAutofillOnce(cached.city);
    return;
  }

  void (async () => {
    const city = await fetchCityByIp();
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ city }));
    } catch {
      /* noop */
    }
    if (city) {
      setState({ status: "detected", city, source: "ip" });
      trackAutofillOnce(city);
    } else {
      setState({ status: "unknown", city: null, source: null });
    }
  })();
};

export const getGeoState = (): GeoState => state;

export const subscribeGeo = (fn: (s: GeoState) => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

/** Confirma (ou corrige) manualmente a localidade; persiste entre sessões. */
export const confirmGeoCity = (city: string, neighborhood?: string) => {
  const match = matchServedCity(city) ?? city;
  try {
    localStorage.setItem(CONFIRM_KEY, JSON.stringify({ city: match, neighborhood: neighborhood || null }));
  } catch {
    /* noop */
  }
  setState({ status: "confirmed", city: match, neighborhood: neighborhood || null, source: "user" });
  try {
    window.gtag?.("event", "geo_city_confirmed", { event_category: "geo", city: match });
  } catch {
    /* noop */
  }
};
