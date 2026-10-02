"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import Footer from "../pet/views/ui/footer";

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
