"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import Services from "../pet/views/homelayout/services";
import ServicePage from "./ServicePage";

const servicePageData = (data: SectionProps["data"]) => {
  if (!data) return data;
  if (Array.isArray(data.productItems) && data.productItems.length) return data;
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
  if (/^ServicePage-[1-4]$/.test(layout)) {
    return <ServicePage data={servicePageData(data)} />;
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
