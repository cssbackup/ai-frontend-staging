"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import AboutSec from "./PetAboutSec";

export default function PetAboutPage1({ data }: SectionProps) {
  const record = (data ?? {}) as {
    pageBanner?: { title?: string; bgImage?: string; breadcrumbs?: { label?: string; href?: string; active?: boolean }[] };
  };
  const site = mergePetSite(data as Record<string, unknown> | undefined, "about");
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner
            pageKey="about"
            title={record.pageBanner?.title}
            bgImage={record.pageBanner?.bgImage}
            breadcrumbs={record.pageBanner?.breadcrumbs}
          />
          <AboutSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
