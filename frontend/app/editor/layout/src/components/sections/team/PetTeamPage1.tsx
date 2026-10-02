"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import Teams from "../pet/views/homelayout/teams";

export default function PetTeamPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "ourTeam" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner title="Our Team" pageKey="ourteam" />
          <Teams />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
