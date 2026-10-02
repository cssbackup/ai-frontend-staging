"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import WhyChooseUs from "../pet/views/homelayout/whychooseus";

export default function PetWhyChooseUs1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "whyChooseUs" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <WhyChooseUs />
      </PetFrame>
    </PetSiteProvider>
  );
}
