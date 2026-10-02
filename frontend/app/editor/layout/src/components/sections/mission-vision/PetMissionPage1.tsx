"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import MissionSec from "../pet/views/layout/mission/missionsec";
import MissionCta from "../pet/views/layout/mission/missioncta";
import WhyChooseUs from "../pet/views/homelayout/whychooseus";

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
