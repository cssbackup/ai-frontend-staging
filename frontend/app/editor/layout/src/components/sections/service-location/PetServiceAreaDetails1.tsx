"use client";

import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";
import { editorSlug } from "../data/pet/editorSlug";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider, usePetSite } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import LocationDetails from "./PetLocationDetails";

function PetDetailBody() {
  const site = usePetSite();
  const preview = useOptionalPreview();
  const slug = editorSlug(preview?.currentPage || "");
  const locations = site.serviceAreaDetails?.locations || [];
  const location = locations.find((item) => item.slug === slug || editorSlug(item.name || "") === slug) || locations[0];
  if (!location) return null;
  return (
    <main className="min-h-screen bg-white">
      <SubBanner title={location.title || "Location Detail"} bgImage={location.bgImage || "/subbanner.jpg"} breadcrumbs={location.breadcrumbs} />
      <LocationDetails data={location} />
    </main>
  );
}

export default function PetServiceAreaDetails1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "serviceAreaDetails");
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <PetDetailBody />
      </PetFrame>
    </PetSiteProvider>
  );
}
