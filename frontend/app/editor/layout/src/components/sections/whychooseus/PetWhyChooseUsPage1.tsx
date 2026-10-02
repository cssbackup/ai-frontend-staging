"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import WhyChooseUs from "../pet/views/homelayout/whychooseus";

export default function PetWhyChooseUsPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "whyChooseUs" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="whychooseus" />
          <WhyChooseUs />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
