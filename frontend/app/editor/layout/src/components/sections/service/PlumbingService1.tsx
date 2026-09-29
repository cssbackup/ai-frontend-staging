// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import Link from "../header/PlumbingLink";
import { SectionHeader, ScrollReveal, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { ArrowRight } from "lucide-react";
import { getPlumbingIcon, plumbingItemsPerRowClass } from "../../../lib/plumbingIcons";
import { BsClockHistory } from "react-icons/bs";
import { site, type ServiceServiceData } from "../data/plumbing1";
import type { SectionProps } from "../../../types/section";

export type ServiceData = ServiceServiceData;

const defaultServiceData: ServiceData = site.service;

// Icon mapper to match JSON icon names dynamically
const renderServiceIcon = (iconName: string) => {
  const iconProps = { className: "h-6 md:w-12 md:h-12 w-6 text-[#1E40AF]" };

  const Icon = getPlumbingIcon(iconName);
  return <Icon {...iconProps} />;
};

// CTA banner icon mapper
const renderCtaIcon = (iconName: string) => {
  if (iconName === "clock-history") {
    return <BsClockHistory className="sm:h-8 sm:w-8 w-6 h-6" />;
  }
  const Icon = getPlumbingIcon(iconName);
  return <Icon className="sm:h-8 sm:w-8 w-6 h-6" />;
};

function ServicesSection({
  serviceData,
}: {
  serviceData?: ServiceData;
}) {
  const data = serviceData || defaultServiceData;

  const badge = data?.badge || "OUR SERVICES";
  const title = data?.title || {
    normal: "Our",
    highlighted: "Plumbing Services",
  };
  const description =
    data?.description ??
    "We provide reliable and professional plumbing solutions to keep your home or business running smoothly.";
  const services = data?.services || [];
  const homeCta = data?.homeCta;

  return (
    <section {...plumbingEditorAttrs("What We Offer", "badge title description services homeCta itemsPerRow")} className="w-full bg-white md:py-12 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        {/* SECTION HEADER */}
        <SectionHeader
          pretitle={badge}
          title={{ normal: title.normal, highlighted: title.highlighted }}
          description={description}
          align="center"
          descriptionMaxWidth="max-w-xl"
          className="mx-auto mb-10 max-w-2xl"
          highlightClassName="text-[#1E40AF]"
        />

        {/* SERVICES GRID */}
        <ScrollReveal direction="up">
          <div className={`grid ${plumbingItemsPerRowClass(data.itemsPerRow, 3)} gap-6`}>
            {services.map((item) => (
              <Link
                key={item.id}
                href={item.href || "/service-details"}
                className="group flex flex-col-reverse sm:flex-row overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              >
                {/* CONTENT AREA */}
                <div className="flex min-w-0 flex-1 flex-col justify-between p-6 sm:p-5 lg:p-6">
                  <div>
                    {/* Icon Circle */}
                    <div className="flex h-12 md:h-20 md:w-20 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] mb-4 transition-transform duration-300 group-hover:scale-105">
                      {renderServiceIcon(item.iconName)}
                    </div>
                    <div className="h-[2px] ml-2 w-8 bg-[#1E40AF] mt-4 rounded-full" />

                    <h3 className="text-[17px] font-bold leading-snug text-[#0F172A] group-hover:text-[#1E40AF] transition-colors duration-200">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-relaxed text-[#64748B]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* IMAGE AREA  */}
                <div className="relative h-48 w-full sm:h-auto sm:w-[45%] shrink-0 overflow-hidden bg-slate-100">
                  <Image
                    src={item.image?.src}
                    alt={item.image?.alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* HOME CTA BANNER (CONTENT FROM JSON) */}
        {homeCta && (
          <ScrollReveal direction="up">
            <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#F0F5FF] via-[#F6F8FF] to-[#F0F5FF] p-5 sm:p-6 md:px-20 md:flex-row shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-blue-50/50">
              {/* Left Block: Phone Support */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex  sm:h-16 sm:w-16 h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0052CC] text-white shadow-md shadow-blue-500/20">
                  {renderCtaIcon(homeCta.call.iconName)}
                </div>
                <div>
                  <span className="block text-sm font-semibold text-slate-500">
                    {homeCta.call.label}
                  </span>
                  <a
                    href={homeCta.call.href}
                    className="text-lg font-extrabold text-[#0F172A] hover:text-[#0052CC] transition-colors"
                  >
                    {homeCta.call.number}
                  </a>
                </div>
              </div>

              {/* Vertical Divider (Hidden on Mobile) */}
              <div className="hidden h-10 w-[1px] bg-slate-200 md:block" />

              {/* Middle Block: 24/7 Service Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex sm:h-16 sm:w-16 h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0052CC] text-white shadow-md shadow-blue-500/20">
                  {renderCtaIcon(homeCta.service.iconName)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0F172A]">
                    {homeCta.service.title}
                  </h4>
                  <p className="text-sm font-medium text-slate-500">
                    {homeCta.service.description}
                  </p>
                </div>
              </div>

              {/* Right Block: Action Button */}
              <div className="w-full shrink-0 md:w-auto">
                <Link
                  href={homeCta.button.href}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052CC] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:bg-[#0041A3] hover:shadow-lg active:scale-[0.98] sm:w-auto"
                >
                  <span>{homeCta.button.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export default function PlumbingService1({ data }: SectionProps) {
  return <ServicesSection serviceData={(data as ServiceData | undefined) ?? site.service} />;
}
