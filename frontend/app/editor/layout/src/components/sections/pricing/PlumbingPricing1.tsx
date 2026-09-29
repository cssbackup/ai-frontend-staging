// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "../header/PlumbingLink";
import { ServicePricingSectionData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { Home, Building, CheckCircle2, ArrowRight, ShieldCheck, ShieldAlert, Banknote, Clock, Award, Headset, Pipette, Wrench, Boxes } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import type { SectionProps } from "../../../types/section";

interface PricingProps {
  pricingData?: ServicePricingSectionData;
}

function Pricing({ pricingData }: PricingProps) {
  const data = pricingData ?? (site.pricing as unknown as ServicePricingSectionData);
  
  // Constrain state to valid plan keys to prevent TypeScript indexing errors
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [activePlan, setActivePlan] = useState<string>("res-advanced");

  // Safely index plans using the typed tab key
  const currentPlans = data?.plans?.[activeTab] || [];

  // Tab switch handler
  const handleTabChange = (tabId: string) => {
    const selectedTab = tabId as "residential" | "commercial";
    setActiveTab(selectedTab);
    
    const plansForTab = data?.plans?.[selectedTab] || [];
    const recommended = plansForTab.find((p) => p.isRecommended) || plansForTab[0];
    if (recommended) {
      setActivePlan(recommended.id);
    }
  };

  // Plan header icon mapper
  const renderPlanIcon = (iconName: string, isHighlighted: boolean) => {
    const iconClass = isHighlighted ? "h-6 w-6 text-white" : "h-6 w-6 text-[#0052CC]";
    switch (iconName) {
      case "pipe":
        return <Pipette className={iconClass} />;
      case "faucet":
        return <Wrench className={iconClass} />;
      case "toolbox":
        return <Boxes className={iconClass} />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className={iconClass} />;
      }
    }
  };

  // Bottom feature icon mapper
  const renderBottomIcon = (iconName: string) => {
    switch (iconName) {
      case "banknote":
        return <Banknote className="h-8 w-8 md:w-12 md:h-12 text-[#84CC16]" />;
      case "clock":
        return <Clock className="h-8 w-8 md:w-12 md:h-12  text-[#0052CC]" />;
      case "award":
        return <Award className="h-8 w-8 md:w-12 md:h-12  text-[#84CC16]" />;
      case "headset":
        return <Headset className="h-8 w-8 md:w-12 md:h-12  text-[#0052CC]" />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className="h-8 w-8 md:w-12 md:h-12 text-[#0052CC]" />;
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

      {/* PRICING SECTION */}
      <section
        {...plumbingEditorAttrs(
          "Pricing",
          "tagline title description tabs plans",
        )}
        className="bg-[#FAFBFD] py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Header */}
          <SectionHeader
            pretitle={data?.tagline}
            title={
              data?.title
                ? { normal: "Simple, Transparent & Fair", highlighted: "Pricing" }
                : undefined
            }
            description={data?.description}
            align="center"
            descriptionMaxWidth="max-w-2xl"
            highlightClassName="text-[#0052CC]"
          />

            {/* Service Filter Tabs */}
            {data?.tabs && data.tabs.length > 0 && (
              <div className="mt-8 flex justify-center items-center ">
                {data.tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center cursor-pointer gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-[#0052CC] text-white shadow-md"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      {tab.iconName === "home" ? (
                        <Home className="h-4 w-4" />
                      ) : (
                        <Building className="h-4 w-4" />
                      )}
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            )}

          {/* Pricing Cards Grid */}
          {currentPlans.length > 0 && (
            <ScrollReveal direction="up">
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:items-center">
              {currentPlans.map((plan) => {
                const isActive = activePlan === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setActivePlan(plan.id)}
                    className={`relative flex cursor-pointer flex-col rounded-3xl transition-all duration-300 ${
                      isActive
                        ? "bg-[#051C42] text-white shadow-2xl lg:-translate-y-4"
                        : "border border-slate-100 bg-white text-[#0F172A] shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-lg"
                    }`}
                  >
                    {/* Recommended Badge */}
                    {isActive && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-md bg-[#84CC16] px-4 py-1 text-[10px] font-black tracking-wider text-[#0F172A]">
                        {plan.badgeText || "RECOMMENDED"}
                      </div>
                    )}

                    {/* Card Content Top */}
                    <div className="p-8 text-center">
                      <p
                        className={`text-sm font-black tracking-widest ${
                          isActive ? "text-slate-300" : "text-[#0052CC]"
                        }`}
                      >
                        {plan.name}
                      </p>

                      {/* Icon Circle */}
                      <div
                        className={`mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full ${
                          isActive ? "bg-[#0052CC]" : "bg-blue-50"
                        }`}
                      >
                        {renderPlanIcon(plan.iconName, isActive)}
                      </div>

                      {/* Price Block */}
                      <div className="mt-6 flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black tracking-tight sm:text-5xl">
                          {plan.price}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isActive ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {plan.period}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-[11px] font-medium ${
                          isActive ? "text-slate-400" : "text-slate-400"
                        }`}
                      >
                        {plan.billingInfo}
                      </p>

                      <hr
                        className={`my-6 border-t ${
                          isActive ? "border-slate-800" : "border-slate-100"
                        }`}
                      />

                      {/* Included List Header */}
                      <p
                        className={`text-left text-sm font-bold ${
                          isActive ? "text-slate-200" : "text-[#0F172A]"
                        }`}
                      >
                        {plan.includedTitle}
                      </p>

                      {/* Features List */}
                      <ul className="mt-4 flex flex-col gap-3 text-left">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2.5 text-sm font-medium"
                          >
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 ${
                                isActive ? "text-[#84CC16]" : "text-[#0052CC]"
                              }`}
                            />
                            <span
                              className={
                                isActive ? "text-slate-200" : "text-[#475569]"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        href={plan.buttonLink}
                        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all ${
                          isActive
                            ? "bg-[#84CC16] text-[#0F172A] hover:bg-[#72B011]"
                            : "border border-blue-200 bg-white text-[#0052CC] hover:bg-blue-50"
                        }`}
                      >
                        {plan.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Card Footer Note */}
                    <div
                      className={`flex items-center gap-3 rounded-b-3xl px-8 py-4 text-sm font-medium ${
                        isActive
                          ? "bg-[#031533] text-slate-300"
                          : "bg-[#F8FAFC] text-[#64748B]"
                      }`}
                    >
                      {plan.footerIcon === "shield-star" ? (
                        <ShieldAlert
                          className={`h-5 w-5 shrink-0 ${
                            isActive ? "text-[#84CC16]" : "text-[#0052CC]"
                          }`}
                        />
                      ) : (
                        <ShieldCheck
                          className={`h-5 w-5 shrink-0 ${
                            isActive ? "text-[#84CC16]" : "text-[#0052CC]"
                          }`}
                        />
                      )}
                      <span className="text-[11px] leading-snug">{plan.footerNote}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {data?.bottomFeatures && data.bottomFeatures.length > 0 && (
        <section
          {...plumbingEditorAttrs("Pricing Features", "bottomFeatures")}
          className="bg-[#FAFBFD] pb-8 md:pb-12"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
              {data.bottomFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-slate-300 last:border-0 sm:[&:nth-child(even)]:border-l sm:pl-4 lg:border-l lg:pl-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-50">
                    {renderBottomIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] font-medium text-[#64748B]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </main>
  );
}

export default function PlumbingPricing1({ data }: SectionProps) {
  return <Pricing pricingData={data as never} />;
}
