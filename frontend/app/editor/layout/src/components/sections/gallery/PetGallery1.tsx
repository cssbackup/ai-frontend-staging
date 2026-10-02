"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import ImageGallery from "../pet/views/layout/gallery/imagegallery";
import VideoGallery from "../pet/views/layout/gallery/videogallery";

export default function PetGallery1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "gallerySec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="gallery" />
          <ImageGallery />
          <VideoGallery />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
