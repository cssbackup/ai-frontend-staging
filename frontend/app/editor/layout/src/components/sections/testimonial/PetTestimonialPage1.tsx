"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import TestimonialSec from "../pet/views/layout/testimonial/testimonialsec";

export default function PetTestimonialPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "testimonialSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="testimonial" />
          <TestimonialSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
