"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import ContactSec from "../pet/views/layout/contactus/contactsec";

export default function PetContactPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "contactSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="contactus" />
          <ContactSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
