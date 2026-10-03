"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import DisclaimerSec from "./PetDisclaimerSec";

export default function PetDisclaimer1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "disclaimerSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="disclaimer" />
          <DisclaimerSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
