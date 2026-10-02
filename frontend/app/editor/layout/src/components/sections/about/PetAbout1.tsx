"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import About from "../pet/views/homelayout/about";

export default function PetAbout1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "about" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <About />
      </PetFrame>
    </PetSiteProvider>
  );
}
