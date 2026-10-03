"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import Teams from "./PetTeamsView";

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
