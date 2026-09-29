// @ts-nocheck
"use client";

import Image from "next/image";
import { ServiceAwardsData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import CtaBanner from "../cta/PlumbingCTA1";
import { Trophy, ShieldCheck, HardHat, Leaf } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import { LiaAwardSolid } from "react-icons/lia";
import type { SectionProps } from "../../../types/section";

interface AwardsProps {
  awardsData?: ServiceAwardsData;
}

function Awards({ awardsData }: AwardsProps) {
  const data = awardsData ?? (site.awards as unknown as ServiceAwardsData);

  // Helper function to render card icons
  const renderCardIcon = (iconName: string) => {
    const iconClass = "h-5 w-5 sm:h-7 sm:w-7 text-[#0052CC]";
    switch (iconName) {
      case "trophy":
        return <Trophy className={iconClass} />;
      case "shield-check":
        return <ShieldCheck className={iconClass} />;
      case "hard-hat":
        return <HardHat className={iconClass} />;
      case "leaf":
        return <Leaf className={iconClass} />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className={iconClass} />;
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

      {/* AWARDS & CERTIFICATES SECTION */}
      <section
        {...plumbingEditorAttrs("Awards", "tagline title description awards")}
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

          {/* Awards Cards Grid */}
          {data?.awards && data.awards.length > 0 && (
            <ScrollReveal direction="up">
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.awards.map((award) => (
                <div
                  key={award.id}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Certificate Image Frame */}
                  <div className="relative aspect-[4/3] w-full  rounded-xl bg-slate-100">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      sizes="(min-width: 1024px) 288px, (min-width: 640px) 560px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Icon Circle */}
                  <div className="mx-auto -mt-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-50 shadow-md sm:h-14 sm:w-14">
                    {renderCardIcon(award.iconName)}
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 text-base font-bold text-[#0F172A]">
                    {award.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#64748B]">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {data?.bottomCta && (
        <section
          {...plumbingEditorAttrs("CTA Banner", "bottomCta")}
          className="bg-[#FAFBFD] pb-8 md:pb-12"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <CtaBanner
              variant="award"
              title={data.bottomCta.title}
              description={data.bottomCta.description}
              buttonLabel={data.bottomCta.buttonText}
              buttonHref={data.bottomCta.buttonLink}
              buttonIcon={data.bottomCta.buttonIcon || data.bottomCta.iconName}
              media={
                (data.bottomCta as { image?: string }).image
                  ? {
                      type: "image",
                      src: (data.bottomCta as { image?: string }).image as string,
                      alt: data.bottomCta.title,
                      sizes: "96px",
                    }
                  : {
                      type: "icon",
                      icon: (
                        <LiaAwardSolid className="h-10 sm:w-24 sm:h-24 w-10" />
                      ),
                    }
              }
            />
          </div>
        </section>
      )}
    </main>
  );
}

export default function PlumbingAward1({ data }: SectionProps) {
  return <Awards awardsData={data as never} />;
}
