"use client";

import { createContext, useContext } from "react";
import { site as defaultSite } from "./petDefaults";

const PetSiteContext = createContext(defaultSite);

export function PetSiteProvider({
  value,
  children,
}: {
  value: typeof defaultSite;
  children: React.ReactNode;
}) {
  return (
    <PetSiteContext.Provider value={value}>{children}</PetSiteContext.Provider>
  );
}

export function usePetSite() {
  return useContext(PetSiteContext);
}

export function mergePetSite(
  data: Record<string, unknown> | undefined,
  slice?: string,
) {
  if (!slice || !data || typeof data !== "object" || !Object.keys(data).length) {
    return defaultSite;
  }
  const current = defaultSite[slice];
  const nextSlice =
    current && typeof current === "object" && !Array.isArray(current)
      ? { ...current, ...data }
      : data;
  const pageBanner =
    data.pageBanner && typeof data.pageBanner === "object"
      ? data.pageBanner
      : undefined;
  return {
    ...defaultSite,
    [slice]: nextSlice,
    ...(pageBanner ? { pageBanner } : {}),
  };
}
