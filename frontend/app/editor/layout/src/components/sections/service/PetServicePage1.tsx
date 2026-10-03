"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import SubBanner from "../banner/PetSubBanner";
import Services from "./PetServicesView";
import ServicePage from "./ServicePage";

const servicePageData = (data: SectionProps["data"]) => {
  if (!data) return data;
  const services = (data as { services?: unknown }).services;
  if (!Array.isArray(services) || !services.length) return data;
  const productItems = services.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const title = typeof record.title === "string" ? record.title : "";
    if (!title || record.active === false) return [];
    const description =
      typeof record.description === "string"
        ? record.description
        : typeof record.desc === "string"
          ? record.desc
          : "";
    return [
      {
        id: typeof record.id === "string" ? record.id : title,
        title,
        desc: description,
        image: typeof record.image === "string" ? record.image : "",
        alt: title,
        category: "Service",
        link: typeof record.link === "string" ? record.link : "",
        active: true,
      },
    ];
  });
  if (!productItems.length) return data;
  return { ...data, productItems };
};

export default function PetServicePage1({ data }: SectionProps) {
  const layout = typeof data?.layout === "string" ? data.layout : "";
  const keepsPetServices = Array.isArray(
    (data as { services?: unknown } | undefined)?.services,
  );
  if (/^ServicePage-[1-4]$/.test(layout) && !keepsPetServices) {
    const site = mergePetSite(data as Record<string, unknown> | undefined, "ourServices");
    return (
      <PetSiteProvider value={site}>
        <PetFrame>
          <main className="w-full min-h-screen">
            <SubBanner pageKey="services" />
            <ServicePage data={servicePageData(data)} />
          </main>
        </PetFrame>
      </PetSiteProvider>
    );
  }
  const site = mergePetSite(data as Record<string, unknown> | undefined, "ourServices" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="services" />
          <Services />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
