// @ts-nocheck
"use client";

import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { TestimonialData } from "../types/plumbing";
import { site } from "../data/plumbing1";
import type { SectionProps } from "../../../types/section";

interface TestimonialsProps {
  testimonialData?: TestimonialData;
}

function Testimonials({ testimonialData }: TestimonialsProps) {
  const data = testimonialData ?? site.testimonial;

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

      {/* TESTIMONIALS SECTION */}
      <section
        {...plumbingEditorAttrs("Testimonials", "badge title testimonialItems")}
        className="bg-slate-50/50 py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Header */}
          <SectionHeader
            pretitle={data?.badge}
            title={data?.title}
            align="center"
          />

          {/* Testimonials Grid */}
          <ScrollReveal direction="up">
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.testimonialItems?.map((item, index) => (
              <div
                key={`${item.id ?? item.name}-${index}`}
                className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div>
                  {/* Card Top Header: Quote Icon + Star Rating */}
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-[#2467EC] fill-[#2467EC]/10" />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="mt-6 text-sm font-medium leading-relaxed text-[#64748B]">
                    "{item.quote}"
                  </p>
                </div>

                {/* Profile Footer */}
                <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">
                      {item.name}
                    </h3>
                    <span className="mt-1 inline-block rounded-md bg-[#EBF2FE] px-2.5 py-0.5 text-sm font-semibold text-[#2467EC]">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

export default function PlumbingTestimonialPage1({ data }: SectionProps) {
  return <Testimonials testimonialData={data as never} />;
}
