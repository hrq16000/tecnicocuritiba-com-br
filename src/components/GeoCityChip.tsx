import { useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { CURITIBA_REGION_CITIES } from "@/lib/geoCity";

/**
 * Chip de localidade no hero: mostra carregamento suave enquanto o IP é
 * resolvido, depois "Detectado" (com opção de corrigir) ou "Confirmado".
 * Quando a cidade não é atendida, não exibe nada (nunca informação errada).
 */
export const GeoCityChip = () => {
  const { city, status, confirmCity } = useGeolocation();
  const [editing, setEditing] = useState(false);

  if (status === "unknown") return null;

  if (status === "loading") {
    return (
      <span
        className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-[13px] text-white/80 backdrop-blur-sm"
        aria-live="polite"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
        Detectando sua cidade…
      </span>
    );
  }

  if (editing) {
    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {CURITIBA_REGION_CITIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              confirmCity(c);
              setEditing(false);
            }}
            className="inline-flex min-h-8 items-center rounded-full border border-white/20 bg-white/[0.1] px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {c}
          </button>
        ))}
      </div>
    );
  }

  return (
    <span
      className="mt-3 inline-flex min-h-8 items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-[13px] text-white backdrop-blur-sm"
      data-geo-status={status}
      aria-live="polite"
    >
      <span aria-hidden="true">📍</span>
      <span>
        {status === "confirmed" ? "Confirmado" : "Detectado"}:{" "}
        <strong className="font-semibold">{city}</strong>
      </span>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="ml-1 rounded-full px-2 py-0.5 text-[12px] font-semibold text-accent underline-offset-2 hover:underline"
      >
        {status === "confirmed" ? "alterar" : "confirmar"}
      </button>
    </span>
  );
};
