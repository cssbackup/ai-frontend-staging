// @ts-nocheck
"use client";

import { useState } from "react";
import { ServiceFaqData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import CtaBanner from "../cta/PlumbingCTA1";
import { Plus, Minus, Headset } from "lucide-react";
import type { SectionProps } from "../../../types/section";

interface FaqProps {
  FaqData?: ServiceFaqData;
}

function Faq({ FaqData }: FaqProps) {
  // Fallback to static site data if props are not provided
  const data = FaqData ?? site.faq;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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

      {/* FAQ SECTION */}
      <section
        {...plumbingEditorAttrs("FAQ", "tagline title description faqs")}
        className="bg-[#F8FAFC] py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          {/* Section Header */}
          <SectionHeader
            pretitle={data?.tagline}
            title={data?.title}
            description={data?.description}
            align="center"
            descriptionMaxWidth="max-w-xl"
          />

          {/* FAQ Accordion List */}
          {data?.faqs && data.faqs.length > 0 && (
            <ScrollReveal direction="up">
            <div className="mt-10 flex flex-col gap-4">
              {data.faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-[#E0E7FF] bg-[#F4F7FF] shadow-sm"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                            isOpen
                              ? "bg-[#0052CC] text-white"
                              : "bg-[#EFF6FF] text-[#0052CC]"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4 stroke-[3]" />
                          ) : (
                            <Plus className="h-4 w-4 stroke-[3]" />
                          )}
                        </div>
                        <span className="text-base font-bold text-[#0F172A] sm:text-lg">
                          {faq.question}
                        </span>
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && faq.answer && (
                      <div className="px-6 pb-6 pt-0 text-sm font-medium leading-relaxed text-[#475569] sm:pl-18 sm:text-base">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {data?.contactCta && (
        <section
          {...plumbingEditorAttrs("CTA Banner", "contactCta")}
          className="bg-[#F8FAFC] pb-8 md:pb-12"
        >
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            <CtaBanner
              variant="faq"
              title={data.contactCta.title}
              description={data.contactCta.description}
              buttonLabel={data.contactCta.buttonText}
              buttonHref={data.contactCta.buttonUrl || "#"}
              buttonIcon={data.contactCta.buttonIcon || "headset"}
              media={
                (data.contactCta as { image?: string }).image
                  ? {
                      type: "image",
                      src: (data.contactCta as { image?: string }).image as string,
                      alt: data.contactCta.title,
                      sizes: "64px",
                    }
                  : {
                      type: "icon",
                      icon: <Headset className="h-8 w-8" />,
                    }
              }
            />
          </div>
        </section>
      )}
    </main>
  );
}

export default function PlumbingFaq1({ data }: SectionProps) {
  return <Faq FaqData={data as never} />;
}
