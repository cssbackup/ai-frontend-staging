"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import Banner from "./PetHomeBanner";

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
