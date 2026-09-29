// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Wrench, Clock, ThumbsUp, DollarSign, Home, UserCheck } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import type { ServiceWhyChooseUsData } from "../data/plumbing1";
import { SectionHeader, ScrollReveal } from "../banner/PlumbingInnerBanner1";
import type { SectionProps } from "../../../types/section";
import { site } from "../data/plumbing1";

interface ChooseProps {
  chooseData: ServiceWhyChooseUsData;
}

// Dynamic Icon Renderer
const renderFeatureIcon = (iconName: string) => {
  const iconProps = { className: "h-6 w-6 text-white" };

  switch (iconName) {
    case "shield":
    case "experienced":
      return <ShieldCheck {...iconProps} />;

    case "wrench":
    case "quality":
      return <Wrench {...iconProps} />;

    case "clock":
    case "emergency":
      return <Clock {...iconProps} />;

    case "thumbs-up":
    case "satisfaction":
      return <ThumbsUp {...iconProps} />;

    case "dollar":
    case "pricing":
      return <DollarSign {...iconProps} />;

    case "home":
    case "services":
      return <Home {...iconProps} />;

    case "user-check":
      return <UserCheck {...iconProps} />;

    default: {
      const Icon = getPlumbingIcon(iconName);
      return <Icon {...iconProps} />;
    }
  }
};

function Choose({ chooseData }: ChooseProps) {
  const badge = chooseData.badge || "WHY CHOOSE US";

  const title = chooseData.title || {
    normal: "Reliable Plumbing Solutions You Can",
    highlighted: "Count On",
  };

  const description = chooseData.description || "";

  const features = chooseData.features || [];

  const imageSrc = chooseData.sideImage?.src || "";

  return (
    <section className="relative w-full overflow-hidden bg-white pb-8">
      <div className="relative mx-auto max-w-[1400px] md:min-h-[600px] lg:min-h-[700px]">

        <div className="relative z-10 grid grid-cols-1 md:min-h-[600px] md:grid-cols-12 lg:min-h-[700px]">

          <ScrollReveal direction="left" className="hidden md:col-span-3 md:block lg:col-span-4">
          <div className="hidden md:col-span-3 md:block lg:col-span-4" />
          </ScrollReveal>

          <ScrollReveal direction="right" className="order-1 md:order-none md:col-span-9 lg:col-span-8">
          <div className="order-1 flex flex-col justify-center bg-white px-5 pb-5 sm:px-8 md:order-none md:col-span-9 md:my-8 md:py-10 md:pl-20 md:pr-8 md:[clip-path:polygon(12%_0,_100%_0,_100%_100%,_0_100%)] lg:col-span-8 lg:my-10 lg:py-14 lg:pl-36 lg:pr-16 lg:[clip-path:polygon(15%_0,_100%_0,_100%_100%,_0_100%)]">

            <SectionHeader
              pretitle={badge}
              title={{ normal: title.normal, highlighted: title.highlighted }}
              description={description}
              align="left"
              descriptionMaxWidth="max-w-2xl"
              className="mb-6"
            />

            <div className="mb-6 h-[1px] w-full bg-gray-100 lg:mb-8" />

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:gap-x-4 md:gap-y-5 lg:gap-x-8 lg:gap-y-7">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-3 md:gap-3 lg:gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E40AF] shadow-sm md:h-9 md:w-9 lg:h-11 lg:w-11">
                    {renderFeatureIcon(feature.iconName)}
                  </div>

                  <div className="text-left">
                    <h3 className="text-md font-extrabold uppercase tracking-tight text-[#0F172A] ">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm font-medium leading-normal text-[#64748B]">
                      {feature.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
          </ScrollReveal>
        </div>

        <div className="relative mt-0 h-[280px] w-full sm:h-[330px] md:absolute md:inset-0 md:z-0 md:mt-0 md:h-full md:w-[78%] md:[clip-path:polygon(0_0,58%_0,43%_100%,0_100%)] lg:w-[83%] lg:[clip-path:polygon(0_0,60%_0,45%_100%,0_100%)]">
          <Image
            src={imageSrc}
            alt={chooseData.sideImage?.alt || "Why Choose Us"}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-left-top"
          />
        </div>

      </div>
    </section>
  );
}

export default function PlumbingWhyChooseUs1({ data }: SectionProps) {
  return <Choose chooseData={(data as typeof site.whyChooseUs | undefined) ?? site.whyChooseUs} />;
}
