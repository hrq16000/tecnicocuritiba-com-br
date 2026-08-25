/// <reference types="vite/client" />

declare const __APP_VERSION__: string;
declare const __APP_BUILD_TIME__: string;

/**
 * Explicit VITE_* keys so generated code (e.g. src/integrations/supabase/client.ts)
 * can use dot access under `noPropertyAccessFromIndexSignature`.
 */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_SUPABASE_PROJECT_ID: string;
  readonly VITE_AGGREGATE_RATING_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
