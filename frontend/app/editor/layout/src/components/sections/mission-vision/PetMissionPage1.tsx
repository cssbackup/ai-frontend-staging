"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import MissionSec from "./PetMissionSec";
import MissionCta from "./PetMissionCta";
import WhyChooseUs from "../whychooseus/PetWhyChooseUsView";

export default function PetMissionPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "missionSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="mission" />
          <MissionSec />
          <MissionCta />
          <WhyChooseUs />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
