"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import DisclaimerSec from "../pet/views/layout/disclaimer/disclaimersec";

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
