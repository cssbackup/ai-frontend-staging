"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import AboutSec from "../pet/views/layout/about/aboutsec";
import Works from "../pet/views/homelayout/works";
import Teams from "../pet/views/homelayout/teams";
import WhyChooseUs from "../pet/views/homelayout/whychooseus";

export default function PetAboutPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "about" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="about" />
          <AboutSec />
          <Works />
          <Teams />
          <WhyChooseUs />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
