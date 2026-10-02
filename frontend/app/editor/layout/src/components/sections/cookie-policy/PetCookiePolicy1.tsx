"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import CookiePolicySec from "../pet/views/layout/cookiepolicy/cookiepolicy";

export default function PetCookiePolicy1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "cookiePolicySec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="cookiepolicy" />
          <CookiePolicySec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
