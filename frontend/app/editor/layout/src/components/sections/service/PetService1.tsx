"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import Services from "./PetServicesView";

export default function PetService1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "ourServices" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Services />
      </PetFrame>
    </PetSiteProvider>
  );
}
