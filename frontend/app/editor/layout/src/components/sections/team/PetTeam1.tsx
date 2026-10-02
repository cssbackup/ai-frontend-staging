"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import Teams from "../pet/views/homelayout/teams";

export default function PetTeam1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "ourTeam" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Teams />
      </PetFrame>
    </PetSiteProvider>
  );
}
