// @ts-nocheck
"use client";

import Image from "next/image";
import { ServiceIndustrySectionData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { getPlumbingIcon, plumbingItemsPerRowClass } from "../../../lib/plumbingIcons";
import type { SectionProps } from "../../../types/section";

interface IndustryProps {
  industryData?: ServiceIndustrySectionData;
}

function Industry({ industryData }: IndustryProps) {
  // Fallback to static site data if props are not provided
  const data = industryData ?? site.industry;

  const renderIcon = (iconName?: string) => {
    const Icon = getPlumbingIcon(iconName);
    return <Icon className="h-6 w-6 text-[#0052CC]" />;
  };

  return (
    <main>
      {/* PAGE BANNER */}
      {data?.banner && (
        <PlumbingInnerBanner1
          appearance={plumbingBannerAppearance(data)}
          title={data.banner.title}
          breadcrumbHome={data.banner.breadcrumbHome}
          breadcrumbCurrent={data.banner.breadcrumbCurrent}
          backgroundImage={data.banner.backgroundImage}
          homeHref={data.banner.homeHref}
        />
      )}

      {/* INDUSTRIES SECTION */}
      <section
        {...plumbingEditorAttrs("Industries", "tagline title description cards itemsPerRow")}
        className="bg-[#FAFBFD] py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Header */}
          <SectionHeader
            pretitle={data?.tagline}
            title={data?.title}
            description={data?.description}
            align="center"
            descriptionMaxWidth="max-w-2xl"
          />

          {/* Grid of Industry Cards */}
          {data?.cards && data.cards.length > 0 && (
            <ScrollReveal direction="up">
            <div className={`mt-12 grid ${plumbingItemsPerRowClass(data?.itemsPerRow, 4)} gap-8`}>
              {data.cards.map((card) => (
                <div
                  key={card.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                >
                  {/* Card Image Container with Circular Floating Icon */}
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1024px) 288px, (min-width: 640px) 560px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Floating Icon overlapping image bottom center */}
                    <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      {renderIcon(card.iconName || (card as { icon?: string }).icon)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 pt-10">
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] transition-colors duration-200 group-hover:text-[#0052CC]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-[#64748B]">
                        {card.description}
                      </p>
                    </div>

                    {/* Learn More Link */}
                    {/* <Link
                      href={card.link || "#"}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] transition-colors hover:text-[#003EA8]"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link> */}
                  </div>
                </div>
              ))}
            </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}

export default function PlumbingIndustry1({ data }: SectionProps) {
  return <Industry industryData={data as never} />;
}
