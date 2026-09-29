// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "../header/PlumbingLink";
import { ServiceContactSectionData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { Mail, Phone, MapPin, ShieldCheck, Users, Award, Send, Navigation } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import PlumbingFormFields, {
  defaultContactFormFields,
  normalizePlumbingFormFields,
} from "../form/PlumbingFormFields";
import type { SectionProps } from "../../../types/section";

interface ContactProps {
  contactData?: ServiceContactSectionData;
}

function Contact({ contactData }: ContactProps) {
  // Fallback to static site data if props are not provided
  const data = contactData ?? site.contactSection;
  const contactFields = normalizePlumbingFormFields(data?.formSection?.fields);
  const formFields = contactFields.length ? contactFields : defaultContactFormFields;

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Action logic for form submission
  };

  // Lucide Icon Renderer for top cards & form features
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="h-6 sm:w-10 sm:h-10 w-6 text-[#84CC16]" />;
      case "phone":
        return <Phone className="h-6 sm:w-10 sm:h-10 w-6 text-[#84CC16]" />;
      case "map-pin":
        return <MapPin className="h-6 sm:w-10 sm:h-10 w-6 text-[#84CC16]" />;
      case "shield-check":
        return <ShieldCheck className="h-6 sm:w-8 sm:h-8 w-6 text-[#84CC16]" />;
      case "users":
        return <Users className="h-6 sm:w-8 sm:h-8 w-6 text-[#84CC16]" />;
      case "award":
        return <Award className="h-6 sm:w-8 sm:h-8 w-6 text-[#84CC16]" />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className="h-6 sm:w-8 sm:h-8 w-6 text-[#84CC16]" />;
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

      <section
        {...plumbingEditorAttrs("Contact", "title description topCards")}
        className="bg-[#FAFBFD] py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Main Title & Description */}
          <SectionHeader
            title={data?.title}
            description={data?.description}
            align="center"
            className="md:items-start md:text-left"
          />

          {/* Top 3 Info Cards */}
          {data?.topCards && data.topCards.length > 0 && (
            <ScrollReveal direction="up">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {data.topCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex h-12 sm:w-16 sm:h-16 w-12 shrink-0 items-center justify-center rounded-full bg-[#ECFCCB]">
                    {renderIcon(card.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">
                      {card.title}
                    </h3>
                    <p className="mt-1 whitespace-pre-line text-sm font-medium leading-relaxed text-[#64748B]">
                      {card.description}
                    </p>
                    <p className="mt-3 whitespace-pre-line text-sm font-bold text-[#84CC16]">
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Form & Features */}
      {data?.formSection && (
        <section
          {...plumbingEditorAttrs("Contact Form", "formSection")}
          className="bg-[#FAFBFD] pb-8 md:pb-12"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Column - Form Features */}
              <ScrollReveal direction="left" className="lg:col-span-5  md:pr-24">
                <span className="text-base font-extrabold uppercase tracking-widest text-[#84CC16]">
                  {data.formSection.tagline}
                </span>
                <h2 className="mt-2 md:mt-4 text-3xl font-black text-[#0F172A] sm:text-4xl">
                  {data.formSection.title}
                </h2>
                <p className="mt-3 md:mt-5 text-sm font-medium leading-relaxed text-[#64748B]">
                  {data.formSection.description}
                </p>

                {/* Features List */}
                <div className="mt-8 flex flex-col gap-6 md:gap-8">
                  {data.formSection.features.map((feat, index) => (
                    <div key={index} className="flex  md:pr-10 items-start gap-4">
                      <div className="flex h-12 md:w-16 md:h-16 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ECFCCB]">
                        {renderIcon(feat.iconName)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#0F172A]">
                          {feat.title}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-[#64748B]">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Right Column - Contact Form */}
              <ScrollReveal direction="right" className="lg:col-span-7">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 md:gap-3 rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-8"
                >
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
                    className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#65A30D] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#4D7C0F]"
                  >
                    <Send className="h-4 w-4" />
                    {data.formSection.submitButtonText}
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

        {/* Map Section */}
        {data?.map && (
          <section {...plumbingEditorAttrs("Map", "map")}>
          <ScrollReveal direction="up">
          <div className="relative mt-8 h-[450px] w-full bg-slate-100 md:mt-12">
            <iframe
              title="Location Map"
              src={data.map.embedUrl}
              className="h-full w-full border-0"
              loading="lazy"
            />
            <div className="absolute left-2 top-20 z-10 w-80 rounded-2xl bg-white p-6 shadow-xl sm:left-12 sm:top-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECFCCB]">
                  <MapPin className="h-5 w-5 text-[#84CC16]" />
                </div>
                <h4 className="text-lg font-bold text-[#0F172A]">
                  {data.map.title}
                </h4>
              </div>

              <p className="mt-4 whitespace-pre-line text-sm font-medium text-[#64748B]">
                {data.map.address}
              </p>

              <Link
                href={data.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3 text-sm font-bold text-white transition-all hover:bg-black"
              >
                <Navigation className="h-4 w-4" />
                {data.map.directionsText}
              </Link>
            </div>
          </div>
          </ScrollReveal>
          </section>
        )}
    </main>
  );
}

export default function PlumbingContactPage1({ data }: SectionProps) {
  return <Contact contactData={data as never} />;
}
