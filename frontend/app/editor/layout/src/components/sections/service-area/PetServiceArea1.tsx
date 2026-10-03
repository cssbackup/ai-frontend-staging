"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import ServiceArea from "./PetServiceAreaView";

export default function PetServiceArea1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "serviceAreas" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <ServiceArea />
      </PetFrame>
    </PetSiteProvider>
  );
}
