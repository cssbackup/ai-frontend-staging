"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import WhyChooseUs from "./PetWhyChooseUsView";

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
