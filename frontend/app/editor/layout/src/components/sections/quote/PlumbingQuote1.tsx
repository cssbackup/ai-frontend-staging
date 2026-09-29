// @ts-nocheck
"use client";

import { useState } from "react";
import { ServiceGetQuoteData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { Clock, ShieldCheck, DollarSign } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import PlumbingFormFields, {
  defaultQuoteFormFields,
  normalizePlumbingFormFields,
} from "../form/PlumbingFormFields";
import type { SectionProps } from "../../../types/section";

interface GetQuoteProps {
  quoteData?: ServiceGetQuoteData;
}

function GetQuote({ quoteData }: GetQuoteProps) {
  const data = quoteData ?? site.quote;
  const formFields = Array.isArray((data as { formFields?: unknown })?.formFields)
    ? normalizePlumbingFormFields((data as { formFields?: unknown }).formFields)
    : defaultQuoteFormFields;
  const submitButtonText =
    (data as { submitButtonText?: string }).submitButtonText ||
    (data as { formFields?: { submitButtonText?: string } }).formFields?.submitButtonText ||
    "Submit";

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  // Helper function to render feature icons with responsive w-14 h-14 for tablet/desktop
  const renderFeatureIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 sm:h-12 sm:w-12 text-[#84CC16] transition-all";
    switch (iconName) {
      case "clock":
        return <Clock className={iconClass} />;
      case "shield-check":
        return <ShieldCheck className={iconClass} />;
      case "dollar-sign":
        return <DollarSign className={iconClass} />;
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

      {/* GET A QUOTE SECTION */}
      <section {...plumbingEditorAttrs("Quote", "tagline title description features formTitle formFields")} className="bg-[#FAFBFD] py-8 md:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Content Area */}
            <div
              className="lg:col-span-6"
            >
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="lg:col-span-6  md:mt-28 ">
                  <SectionHeader
                    pretitle={data?.tagline}
                    title={data?.title}
                    description={data?.description}
                    align="center" 
                    className="md:items-start md:text-left  md:pr-32 md:space-y-3"
                    descriptionMaxWidth="md:items-start md:text-left"
                  />

                {/* 3 Key Highlights Grid - Centered items across all screen sizes */}
                {data?.features && data.features.length > 0 && (
                  <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {data.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="flex h-12 w-12 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-50">
                          {renderFeatureIcon(feature.iconName)}
                        </div>
                        <h4 className="mt-4 text-sm font-bold text-[#051C42]">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-[#64748B]">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
            </div>

            {/* Right Form Card */}
            <div
              className="lg:col-span-6"
            >
            <ScrollReveal direction="right" className="lg:col-span-6">
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-10">
                  <div className="text-center">
                    <h3 className="text-xl font-black text-[#051C42]">
                      {data?.formTitle || "Request Your Quote"}
                    </h3>
                    <div className="mx-auto mt-2 h-0.5 w-8 bg-[#84CC16]" />
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-5 md:gap-3"
                  >
                    <PlumbingFormFields
                      fields={formFields}
                      values={formData}
                      onChange={(name, value) =>
                        setFormData((prev) => ({ ...prev, [name]: value }))
                      }
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-2 w-full cursor-pointer rounded-xl bg-[#84CC16] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#73b511] active:scale-[0.99]"
                    >
                      {submitButtonText}
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PlumbingQuote1({ data }: SectionProps) {
  return <GetQuote quoteData={data as never} />;
}
