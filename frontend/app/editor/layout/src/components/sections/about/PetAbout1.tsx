"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import About from "./PetAboutHome";

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
