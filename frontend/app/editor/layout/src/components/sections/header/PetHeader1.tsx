"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import Navbar from "./PetNavbar";

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
