"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import Services from "../pet/views/homelayout/services";

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
