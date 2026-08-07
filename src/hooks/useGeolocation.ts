import { useEffect, useState } from "react";
import {
  CURITIBA_REGION_CITIES,
  confirmGeoCity,
  getGeoState,
  startGeoDetection,
  subscribeGeo,
  type GeoStatus,
} from "@/lib/geoCity";

interface GeoData {
  /** Cidade atendida detectada/confirmada. String vazia quando desconhecida. */
  city: string;
  neighborhood: string;
  region: string;
  status: GeoStatus;
  isLoading: boolean;
  error: string | null;
  confirmCity: (city: string, neighborhood?: string) => void;
}

export const useGeolocation = (): GeoData => {
  const [geo, setGeo] = useState(getGeoState);

  useEffect(() => {
    startGeoDetection();
    setGeo(getGeoState());
    return subscribeGeo(setGeo);
  }, []);

  return {
    city: geo.city ?? "",
    neighborhood: geo.neighborhood ?? "",
    region: geo.region,
    status: geo.status,
    isLoading: geo.status === "loading",
    error: geo.status === "unknown" ? "not_served" : null,
    confirmCity: confirmGeoCity,
  };
};

export { CURITIBA_REGION_CITIES };
