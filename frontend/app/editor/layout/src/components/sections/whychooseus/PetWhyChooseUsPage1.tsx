"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import WhyChooseUs from "./PetWhyChooseUsView";

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
