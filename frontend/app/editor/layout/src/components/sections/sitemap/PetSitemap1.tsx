"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import SitemapSec from "./PetSitemapSec";

export default function PetSitemap1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "sitemapSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="sitemap" />
          <SitemapSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
