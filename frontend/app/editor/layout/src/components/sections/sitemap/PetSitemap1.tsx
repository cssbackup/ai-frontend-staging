"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import SitemapSec from "../pet/views/layout/sitemap/sitemapsec";

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
