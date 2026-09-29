// @ts-nocheck
"use client";

import { useState } from "react";
import { ServiceEnquiryData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { Clock, ShieldCheck, Headset, Send } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import PlumbingFormFields, {
  defaultEnquiryFormFields,
  normalizePlumbingFormFields,
} from "../form/PlumbingFormFields";
import type { SectionProps } from "../../../types/section";

interface EnquiryProps {
  enquiryData?: ServiceEnquiryData;
}

function Enquiry({ enquiryData }: EnquiryProps) {
  // Fallback to static site data if props are not provided
  const data = enquiryData ?? site.enquiry;
  const enquiryFields = normalizePlumbingFormFields(
    (data?.form as { fields?: unknown } | undefined)?.fields,
  );
  const formFields = enquiryFields.length ? enquiryFields : defaultEnquiryFormFields;

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Lucide Icon mapper for features
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "clock":
        return <Clock className="h-6 sm:w-10 sm:h-10 w-6 text-[#0052CC]" />;
      case "shield-check":
        return <ShieldCheck className="h-6 sm:w-10 sm:h-10  w-6 text-[#0052CC]" />;
      case "headset":
        return <Headset className="h-6 sm:w-10 sm:h-10  w-6 text-[#0052CC]" />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className="h-6 sm:w-10 sm:h-10 w-6 text-[#0052CC]" />;
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

      {/* ENQUIRY SECTION */}
      <section className="bg-[#FAFBFD] py-8 md:py-12">
        <div className="mx-auto max-w-[1200px]  px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12  lg:grid-cols-12">
            {/* Left Content Column */}
            <div
              {...plumbingEditorAttrs(
                "Enquiry",
                "tagline title description features",
              )}
              className="lg:col-span-5"
            >
            <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="lg:col-span-5 md:mt-24 md:pr-12">
              <SectionHeader
                pretitle={data?.tagline}
                title={data?.title}
                description={data?.description}
                align="center"
                className="md:items-start md:text-left"
              />

              {/* Feature List */}
              {data?.features && data.features.length > 0 && (
                <div className="mt-8 flex flex-col gap-6">
                  {data.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex h-12 sm:w-20 sm:h-20 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF]">
                        {renderIcon(feature.iconName)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0F172A]">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-[#64748B]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            </ScrollReveal>
            </div>

            {/* Right Form Card Column */}
            <div
              {...plumbingEditorAttrs("Enquiry Form", "form")}
              className="lg:col-span-7"
            >
            <ScrollReveal direction="right" className="lg:col-span-7">
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] sm:p-10">
                {data?.form?.title && (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
                      {data.form.title}
                    </h3>
                    <div className="mx-auto mt-2 h-1 w-10 rounded bg-[#84CC16]" />
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 md:gap-3">
                  <PlumbingFormFields
                    fields={formFields}
                    values={formData}
                    onChange={handleChange}
                    labelClassName="text-sm font-bold text-[#0F172A]"
                    inputClassName="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-3 px-4 text-sm text-[#0F172A] outline-none transition-all focus:border-[#84CC16] focus:bg-white"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4D7C0F] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#3F6212]"
                  >
                    <Send className="h-4 w-4" />
                    {data?.form?.submitButtonText || "Submit Enquiry"}
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

export default function PlumbingEnquiry1({ data }: SectionProps) {
  return <Enquiry enquiryData={data as never} />;
}
