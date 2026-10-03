"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import Footer from "./PetFooterView";

export default function PetFooter1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "footer" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Footer />
      </PetFrame>
    </PetSiteProvider>
  );
}
