"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import LocationSec from "../pet/views/layout/servicelocation/locationsec";

export default function PetServiceLocationPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "serviceAreas" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="servicelocation" />
          <LocationSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
