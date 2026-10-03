"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import PriceSec from "./PetPriceSec";

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
