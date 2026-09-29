// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import { ServicePartnersData, site } from "../data/plumbing1";
import { SectionHeader, ScrollReveal } from "../banner/PlumbingInnerBanner1";
import type { SectionProps } from "../../../types/section";

interface PartnersProps {
  partnersData?: ServicePartnersData;
}

function Partners({ partnersData }: PartnersProps) {
  const data = partnersData ?? site.partners;

  const partners = data?.partners ?? [];
  const marqueePartners = partners.concat(partners);

  return (
    <section className="w-full bg-white px-4 py-6 sm:px-6 lg:px-8">
      <ScrollReveal direction="up">
        <div className="mx-auto overflow-hidden rounded-[24px] bg-white px-3 py-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] sm:px-6 sm:py-10">
          {/* SECTION HEADER */}
          <SectionHeader
            pretitle={data.badge}
            title={data.title}
            description={data.desc}
            align="center"
            descriptionMaxWidth="max-w-2xl"
            className="mb-6"
          />

          {/* AUTO-SCROLLING MARQUEE */}
          {partners.length > 0 && (
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
              <div className="animate-marquee flex w-max items-center gap-3 sm:gap-5 hover:[animation-play-state:paused]">
                {marqueePartners.map((partner, index) => (
                  <div
                    key={`${partner.id ?? partner.name ?? "partner"}-${index}`}
                    className="w-[160px] shrink-0 sm:w-[200px] md:w-[220px] lg:w-[240px]"
                  >
                    <div className="flex h-20 w-full cursor-pointer items-center justify-center rounded-[14px] border border-slate-100 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-md sm:h-24 sm:px-8 sm:py-5">
                      <Image
                        src={partner.logo}
                        alt={partner.name || "Partner logo"}
                        width={320}
                        height={160}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

export default function PlumbingPartners1({ data }: SectionProps) {
  return <Partners partnersData={(data as typeof site.partners | undefined) ?? site.partners} />;
}
