"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import FaqSec from "../pet/views/layout/faq/faqsec";

export default function PetFaq1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "faqSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="faq" />
          <FaqSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
