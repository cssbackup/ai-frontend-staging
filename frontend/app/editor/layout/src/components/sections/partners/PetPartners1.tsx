"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import PartnerSec from "./PetPartnerSec";
import PartnerCTA from "./PetPartnerCta";

export default function PetPartners1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "partnerSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="partners" />
          <PartnerSec />
          <PartnerCTA />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
