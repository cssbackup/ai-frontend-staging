"use client";

import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";
import { editorSlug } from "../pet/editorSlug";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider, usePetSite } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import ServiceHero from "../pet/views/layout/servicedetails/servicehero";
import ServiceIncluded from "../pet/views/layout/servicedetails/serviceincluded";
import ServiceProcess from "../pet/views/layout/servicedetails/serviceprocess";

function PetDetailBody() {
  const site = usePetSite();
  const preview = useOptionalPreview();
  const slug = editorSlug(preview?.currentPage || "");
  const services = site.serviceDetails?.services || [];
  const service = services.find((item) => item.slug === slug || editorSlug(item.title || item.titleHighlight || "") === slug) || services[0];
  if (!service) return null;
  const serviceTitle = service.titlePrefix && service.titleHighlight
    ? `${service.titlePrefix} ${service.titleHighlight}`.trim()
    : service.titleHighlight || service.title || "Service Detail";
  const breadcrumbs = service.breadcrumbs || [
    { label: "Home", href: "/" },
    { label: serviceTitle, active: true },
  ];
  return (
    <main className="min-h-screen">
      <SubBanner title={serviceTitle} breadcrumbs={breadcrumbs} bgImage={service.bgImage} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 lg:mt-14">
        <ServiceHero data={service} />
        <ServiceIncluded data={service} />
        <ServiceProcess data={service} />
      </div>
    </main>
  );
}

export default function PetServiceDetails1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "serviceDetails");
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <PetDetailBody />
      </PetFrame>
    </PetSiteProvider>
  );
}
