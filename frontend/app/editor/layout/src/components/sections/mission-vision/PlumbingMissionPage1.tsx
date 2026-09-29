// @ts-nocheck
"use client";

import { ServiceVisionMissionData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import Image from "next/image";
import { Eye, Users, ShieldCheck, Leaf, Target } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import { HiOutlineLightBulb } from "react-icons/hi";
import type { SectionProps } from "../../../types/section";

interface MissionProps {
  visionMissionData?: ServiceVisionMissionData;
}

function Mission({ visionMissionData }: MissionProps) {
  // Fallback to static site data if props are not provided
  const data = visionMissionData ?? site.visionMission;
  const sectionData = data?.visionMission;

  // Dynamic Lucide icon mapper for cards and values
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "eye":
        return <Eye className="h-7 sm:h-14 sm:w-14 w-7 text-[#0459E8]" />;
      case "target":
        return <Target className="h-7 w-7 sm:h-14 sm:w-14 text-[#22C55E]" />;
      case "users":
        return <Users className="h-6 w-6 sm:w-12 sm:h-12 text-[#2467EC]" />;
      case "shield-check":
        return (
          <ShieldCheck className="h-6 w-6 sm:w-12 sm:h-12 text-[#2467EC]" />
        );
      case "lightbulb":
        return <HiOutlineLightBulb className="h-6 w-6 sm:w-12 sm:h-12 text-[#2467EC]" />;
      case "leaf":
        return <Leaf className="h-6 w-6 sm:w-12 sm:h-12 text-[#2467EC]" />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className="h-6 w-6 sm:w-12 sm:h-12 text-[#2467EC]" />;
      }
    }
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

      {/* VISION & MISSION SECTION */}
      {sectionData && (
        <section
          {...plumbingEditorAttrs("Vision & Mission", "visionMission")}
          className="bg-slate-50/50 py-8 md:py-12"
        >
          <div className="mx-auto max-w-[1200px] px-2 sm:px-6">
            {/* Header */}
            <SectionHeader
              pretitle={sectionData.subTitle}
              title={sectionData.title}
              align="center"
            />

            {/* Vision & Mission Cards Grid */}
            <ScrollReveal direction="up">
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                {sectionData.cards?.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 sm:w-20 sm:h-20 w-14 items-center justify-center rounded-full bg-[#e7edf8]">
                          {renderIcon(card.iconName)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#1E293B]">
                            {card.title}
                          </h3>
                          <div className="w-[50px] mt-3 h-[2px] bg-[#0062ff]">
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-sm font-medium leading-relaxed text-[#64748B] sm:text-base">
                        {card.desc}
                      </p>
                    </div>

                    {/* Card Image */}
                    <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-56">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 768px) 560px, 100vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Core Values Strip */}
            {sectionData.values && sectionData.values.length > 0 && (
              <ScrollReveal direction="up" delay={0.2}>
                <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:grid-cols-2 lg:grid-cols-4">
                  {sectionData.values.map((val) => (
                    <div key={val.id} className="flex last:border-r-0 md:border-r md:border-gray-300 flex-col items-start">
                      <div className="flex items-center justify-center rounded-xl ">
                        {renderIcon(val.iconName)}
                      </div>
                      <h4 className="mt-4 text-base font-bold text-[#1E293B]">
                        {val.title}
                      </h4>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-[#64748B]">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default function PlumbingMissionPage1({ data }: SectionProps) {
  return <Mission visionMissionData={data as never} />;
}
