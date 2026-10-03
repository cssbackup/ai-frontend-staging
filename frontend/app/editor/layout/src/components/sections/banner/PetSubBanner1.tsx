"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "./PetSubBanner";

export default function PetSubBanner1({ data }: SectionProps) {
  const record = (data ?? {}) as {
    pageKey?: string;
    title?: string;
    bgImage?: string;
    breadcrumbs?: { label?: string; href?: string; active?: boolean }[];
  };
  const site = mergePetSite(data as Record<string, unknown> | undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <SubBanner
          pageKey={record.pageKey || "about"}
          title={record.title}
          bgImage={record.bgImage}
          breadcrumbs={record.breadcrumbs}
        />
      </PetFrame>
    </PetSiteProvider>
  );
}
