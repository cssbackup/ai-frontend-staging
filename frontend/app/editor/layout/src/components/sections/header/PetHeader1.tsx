"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import Navbar from "../pet/views/ui/navbar";

export default function PetHeader1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "navbar" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Navbar />
      </PetFrame>
    </PetSiteProvider>
  );
}
