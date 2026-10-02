"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import TermsConSec from "../pet/views/layout/termscondition/termsconsec";

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
