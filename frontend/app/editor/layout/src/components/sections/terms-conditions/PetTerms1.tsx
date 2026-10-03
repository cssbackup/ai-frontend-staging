"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import TermsConSec from "./PetTermsSec";

export default function PetTerms1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "termsConditionSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="termscondition" />
          <TermsConSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
