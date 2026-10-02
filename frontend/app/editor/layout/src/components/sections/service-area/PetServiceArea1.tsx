"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import ServiceArea from "../pet/views/homelayout/servicearea";

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
