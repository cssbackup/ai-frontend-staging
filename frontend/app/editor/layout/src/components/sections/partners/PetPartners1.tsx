"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import PartnerSec from "../pet/views/layout/partners/partnersec";
import PartnerCTA from "../pet/views/layout/partners/cta";

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
