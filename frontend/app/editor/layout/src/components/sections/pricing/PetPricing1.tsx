"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import PriceSec from "../pet/views/layout/pricing/pricesec";

export default function PetPricing1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "pricingSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="pricing" />
          <PriceSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
