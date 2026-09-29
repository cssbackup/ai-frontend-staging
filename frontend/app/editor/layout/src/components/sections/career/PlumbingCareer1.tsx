// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "../header/PlumbingLink";
import { site } from "../data/plumbing1";
import { CareerPageData } from "../types/plumbing";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { ShieldCheck, GraduationCap, Calendar, Users, Briefcase, MapPin, Clock, BarChart3, ArrowRight, Wrench, TrendingUp, Smile } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import { TbHeartPlus } from "react-icons/tb";
import type { SectionProps } from "../../../types/section";

interface CareerProps {
  careerData?: CareerPageData;
}

function Career({ careerData }: CareerProps) {
  // Fallback to static site data if props are not provided
  const data = careerData ?? site.career;

  // Icon switcher for "Why Join Aquafix?" section
  const renderBenefitIcon = (iconName: string) => {
    const iconClass = "h-8 w-8 sm:h-12 sm:w-12 text-[#0052CC]";
    switch (iconName) {
      case "shield":
        return <ShieldCheck className={iconClass} />;
      case "heart":
        return <TbHeartPlus className={iconClass} />;
      case "graduation-cap":
        return <GraduationCap className={iconClass} />;
      case "calendar":
        return <Calendar className={iconClass} />;
      case "users":
        return <Users className={iconClass} />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className={iconClass} />;
      }
    }
  };

  // Icon switcher for "Life at Aquafix" section
  const renderLifeIcon = (iconName: string) => {
    const iconClass = "h-8 w-8 text-white";
    switch (iconName) {
      case "wrench":
        return <Wrench className={iconClass} />;
      case "trending-up":
        return <TrendingUp className={iconClass} />;
      case "heart-smile":
        return <Smile className={iconClass} />;
      case "users-group":
        return <Users className={iconClass} />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className={iconClass} />;
      }
    }
  };

  return (
    <main>
      {/* 1. PAGE BANNER */}
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

      {/* MAIN CONTENT AREA */}
      <div className="bg-[#FAFBFD] py-8 md:py-12 text-[#0F172A]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* 2. WHY JOIN SECTION */}
          {data?.whyJoinSection && (
            <section
              {...plumbingEditorAttrs("Why Join", "whyJoinSection")}
              className="text-center"
            >
              <SectionHeader title={data.whyJoinSection.title} align="center" />

              {data.whyJoinSection.benefits &&
                data.whyJoinSection.benefits.length > 0 && (
                  <ScrollReveal direction="up">
                    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {data.whyJoinSection.benefits.map((benefit) => (
                        <div
                          key={benefit.id}
                          className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                          {/* Circular Light Blue Icon Container */}
                          <div className="flex h-14 sm:w-20 sm:h-20 w-14 items-center justify-center rounded-full bg-[#EEF4FF]">
                            {renderBenefitIcon(benefit.iconName)}
                          </div>
                          <h3 className="mt-5 text-base font-black text-[#0F172A]">
                            {benefit.title}
                          </h3>
                          <p className="mt-2 text-sm font-medium leading-relaxed text-[#64748B]">
                            {benefit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                )}
            </section>
          )}

          {/* 3. OPEN POSITIONS SECTION */}
          {data?.openPositionsSection && (
            <section
              {...plumbingEditorAttrs("Open Positions", "openPositionsSection")}
              className="mt-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <SectionHeader
                    title={data.openPositionsSection.title}
                    align="left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    window.location.reload();
                  }}
                  className="group inline-flex cursor-pointer items-center gap-1.5 text-sm font-extrabold text-[#0052CC] hover:underline"
                >
                  <span>
                    {data.openPositionsSection.viewAllJobsText ||
                      "View All Jobs"}
                  </span>

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Job Cards List */}
              {data.openPositionsSection.positions && (
                <ScrollReveal direction="up">
                  <div className="mt-8 space-y-4">
                    {data.openPositionsSection.positions.map((pos) => (
                      <div
                        key={pos.id}
                        className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_15px_rgba(0,0,0,0.015)] transition-all hover:border-blue-200 hover:shadow-sm sm:flex-row sm:items-center sm:p-6"
                      >
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                          {/* Briefcase Icon Container */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#0052CC] sm:h-14 sm:w-14">
                            <Briefcase className="h-5 w-5 sm:h-8 sm:w-8" />
                          </div>
                          {/* Job Details */}
                          <div className="text-center sm:text-left">
                            <h3 className="text-base font-extrabold text-[#0F172A]">
                              {pos.title}
                            </h3>

                            {/* Metadata Tags */}
                            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-[#64748B] sm:justify-start sm:gap-y-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-5 w-5 text-[#84CC16]" />
                                {pos.location}
                              </span>

                              <span className="hidden sm:inline">•</span>

                              <span className="flex items-center gap-1">
                                <Clock className="h-5 w-5 text-[#84CC16]" />
                                {pos.jobType || (pos as { type?: string }).type}
                              </span>

                              <span className="hidden sm:inline">•</span>

                              <span className="flex items-center gap-1">
                                <BarChart3 className="h-5 w-5 text-[#84CC16]" />
                                {pos.experience}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Apply Button */}

                        <Link
                          href={pos.applyLink || (pos as { href?: string }).href || "#"}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/40 px-5 py-2.5 text-sm font-extrabold text-[#0052CC] transition-all hover:bg-[#0052CC] hover:text-white sm:w-auto"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </section>
          )}

          {/* 4. LIFE AT COMPANY SECTION */}
          {data?.lifeAtCompanySection && (
            <section
              {...plumbingEditorAttrs("Life at Company", "lifeAtCompanySection")}
              className="mt-10"
            >
              <SectionHeader
                title={data.lifeAtCompanySection.title}
                align="center"
              />

              {data.lifeAtCompanySection.items && (
                <ScrollReveal direction="up">
                  <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {data.lifeAtCompanySection.items.map((item) => (
                      <div
                        key={item.id}
                        className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md"
                      >
                        {/* Image Preview Container */}
                        <div className="relative aspect-[4/3] w-full  bg-slate-100">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1024px) 288px, (min-width: 640px) 560px, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Floating Green Circle Badge Overlapping Center-Bottom */}
                          <div className="absolute -bottom-5 left-1/2 flex h-12 sm:w-16 sm:h-16 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-[#84CC16] shadow-md">
                            {renderLifeIcon(item.iconName)}
                          </div>
                        </div>

                        {/* Content Box */}
                        <div className="p-6 pt-8 text-center">
                          <h3 className="text-base font-black text-[#0F172A]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm font-medium leading-relaxed text-[#64748B]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default function PlumbingCareer1({ data }: SectionProps) {
  return <Career careerData={data as never} />;
}
