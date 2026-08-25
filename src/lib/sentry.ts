// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
/**
 * Sentry loader leve — só ativa em produção quando `VITE_SENTRY_DSN` está
 * definido no build. Sem DSN, todas as APIs viram no-op (custo zero em bundle
 * e runtime — o import de `@sentry/react` é dinâmico e só ocorre quando há
 * DSN). Tags automáticas: `route`, `env`, `app_version`.
 */
declare const __APP_VERSION__: string;

const APP_VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";
const DSN = (import.meta.env.VITE_SENTRY_DSN as string | undefined) || "";
const ENV =
  (import.meta.env.VITE_SENTRY_ENV as string | undefined) ||
  (import.meta.env.MODE === "production" ? "production" : "development");

type SentryLike = {
  init: (opts: Record<string, unknown>) => void;
  captureException: (err: unknown, ctx?: Record<string, unknown>) => void;
  captureMessage: (msg: string, ctx?: Record<string, unknown>) => void;
  addBreadcrumb: (b: Record<string, unknown>) => void;
  setTag: (k: string, v: string) => void;
  reactRouterV6BrowserTracingIntegration?: (opts: Record<string, unknown>) => unknown;
  browserTracingIntegration?: () => unknown;
};

let sentry: SentryLike | null = null;
let initPromise: Promise<SentryLike | null> | null = null;
let enabled = false;

const noop = () => {};
const stub: SentryLike = {
  init: noop,
  captureException: noop,
  captureMessage: noop,
  addBreadcrumb: noop,
  setTag: noop,
};

export const isSentryEnabled = () => enabled;

export const initSentry = (): Promise<SentryLike | null> => {
  if (initPromise) return initPromise;
  if (!DSN || typeof window === "undefined") {
    initPromise = Promise.resolve(null);
    return initPromise;
  }
  initPromise = import("@sentry/react")
    .then((mod) => {
      const S = mod as unknown as SentryLike;
      S.init({
        dsn: DSN,
        environment: ENV,
        release: APP_VERSION,
        tracesSampleRate: 0.05,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0,
        // Reduz volume de eventos triviais do navegador
        ignoreErrors: [
          "ResizeObserver loop limit exceeded",
          "Non-Error promise rejection captured",
          /Loading chunk [\w-]+ failed/i,
          /Failed to fetch dynamically imported module/i,
        ],
      });
      S.setTag("app_version", APP_VERSION);
      S.setTag("env", ENV);
      S.setTag("route", typeof location !== "undefined" ? location.pathname : "");
      sentry = S;
      enabled = true;
      return S;
    })
    .catch(() => null);
  return initPromise;
};

const withSentry = <K extends keyof SentryLike>(fn: K, ...args: Parameters<SentryLike[K] extends (...a: never) => unknown ? SentryLike[K] : never>) => {
  const target = sentry || stub;
  try {
    (target[fn] as (...a: unknown[]) => unknown)(...(args as unknown[]));
  } catch { /* noop */ }
};

export const sentryCapture = (err: unknown, ctx?: Record<string, unknown>) =>
  withSentry("captureException", err, ctx);
export const sentryMessage = (msg: string, ctx?: Record<string, unknown>) =>
  withSentry("captureMessage", msg, ctx);
export const sentryBreadcrumb = (b: Record<string, unknown>) =>
  withSentry("addBreadcrumb", b);
export const sentryTag = (k: string, v: string) => withSentry("setTag", k, v);

// Atualiza a tag `route` a cada navegação SPA — chamado por um listener global.
export const attachSentryRouteTracker = () => {
  if (typeof window === "undefined") return;
  const update = () => sentryTag("route", location.pathname);
  window.addEventListener("popstate", update);
  const origPush = history.pushState;
  const origReplace = history.replaceState;
  history.pushState = function (...args) {
    const r = origPush.apply(this, args);
    update();
    return r;
  };
  history.replaceState = function (...args) {
    const r = origReplace.apply(this, args);
    update();
    return r;
  };
};
