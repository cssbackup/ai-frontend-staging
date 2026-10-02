"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import AppSection from "../pet/views/layout/appointment/appsection";

export default function PetAppointment1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "appointmentSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="appointment" />
          <AppSection />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
