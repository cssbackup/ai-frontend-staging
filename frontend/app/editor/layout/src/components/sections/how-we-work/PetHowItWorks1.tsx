"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import Works from "./PetWorksView";

export default function PetHowItWorks1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "howItWorks" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Works />
      </PetFrame>
    </PetSiteProvider>
  );
}
