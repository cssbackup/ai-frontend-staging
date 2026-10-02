"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import Banner from "../pet/views/homelayout/banner";

export default function PetBanner1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "banner" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Banner />
      </PetFrame>
    </PetSiteProvider>
  );
}
