"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import ImageGallery from "./PetImageGallery";
import VideoGallery from "./PetVideoGallery";

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
