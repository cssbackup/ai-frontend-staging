// @ts-nocheck
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Wrench, ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceTestimonialData, site } from "../data/plumbing1";
import { SectionHeader, ScrollReveal } from "../banner/PlumbingInnerBanner1";
import type { SectionProps } from "../../../types/section";

interface TestimonialSectionProps {
  testimonialData?: ServiceTestimonialData;
}

function TestimonialSection({
  testimonialData,
}: TestimonialSectionProps) {
  const data = testimonialData ?? site.testimonial;
  const items = data?.testimonialItems ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex = items.length === 0 ? 0 : Math.min(currentIndex, items.length - 1);

  const handlePrev = () => {
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = items[safeIndex];

  const surroundingAvatars = [
    {
      index: (safeIndex + 1) % items.length,
      positionClass: "-top-5 left-[15%] sm:left-[18%]",
      sizeClass: "h-14 w-14 sm:h-16 sm:w-16",
      delayClass: "[animation-delay:0s]",
    },
    {
      index: (safeIndex + 2) % items.length,
      positionClass: "top-[40%] -right-4 sm:-right-6",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14",
      delayClass: "[animation-delay:1s]",
    },
    {
      index: (safeIndex + 3) % items.length,
      positionClass: "-bottom-6 right-[18%] sm:right-[22%]",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14",
      delayClass: "[animation-delay:2s]",
    },
    {
      index: (safeIndex + 4) % items.length,
      positionClass: "-bottom-6 left-[18%] sm:left-[22%]",
      sizeClass: "h-12 w-12 sm:h-14 sm:w-14",
      delayClass: "[animation-delay:3s]",
    },
  ];

  if (!data || items.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 md:py-12">
      {/* PURE X-AXIS (HORIZONTAL) FLOAT WITH DYNAMIC SHADOW */}
      {data.image && (
        <div className="pointer-events-none absolute right-0 top-0  w-36 select-none sm:w-48 lg:w-64">
          <Image
            src={data.image}
            alt=""
            width={216}
            height={242}
            className="h-auto w-full object-contain"
          />
        </div>
      )}

      {/* WORKER ILLUSTRATION OVERLAY - BOTTOM LEFT */}
      {data.image2 && (
        <div className="pointer-events-none absolute bottom-0 left-0  w-44 select-none sm:w-60 lg:w-72">
          <Image
            src={data.image2}
            alt=""
            width={248}
            height={167}
            className="h-auto w-full object-contain"
          />
        </div>
      )}

      <ScrollReveal direction="up">
      <div className="relative z-20 mx-auto max-w-[1100px] px-4 sm:px-6">
        {/* HEADER */}
        <SectionHeader
          pretitle={data.badge}
          title={data.title}
          align="center"
        />

        {/* TESTIMONIAL DISPLAY */}
        <div className="relative mt-16 sm:mt-20">
          {/* QUOTE CARD */}
          <div className="relative mx-auto max-w-[850px] rounded-2xl bg-[#F0F5FD] px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14">
            {/* QUOTE ICON */}
            <div className="absolute -top-6 left-1/2 z-20 flex h-12 w-16 -translate-x-1/2 items-center justify-center px-2">
              <svg
                className="h-10 w-10 text-[#2467EC]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* QUOTE */}
            <p className="mx-auto min-h-[120px] max-w-[700px] text-sm font-medium leading-relaxed text-[#475569] sm:text-base md:text-lg">
              {currentTestimonial?.quote}
            </p>

            {/* SURROUNDING AVATARS - X-AXIS ANIMATION WITH SHADOWS */}
            {items.length > 1 &&
              surroundingAvatars.map((spot, index) => {
                const item = items[spot.index];

                if (!item) return null;

                return (
                  <button
                    key={`${item.id ?? item.name}-${index}`}
                    type="button"
                    onClick={() => setCurrentIndex(spot.index)}
                    aria-label={`View testimonial from ${item.name}`}
                    className={`absolute animate-float-x rounded-full border-2 border-[#2467EC] bg-white p-[2px] transition-transform duration-300 hover:scale-125 hover:z-40 ${spot.positionClass} ${spot.sizeClass} ${spot.delayClass}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </button>
                );
              })}
          </div>

          {/* ACTIVE CLIENT DETAILS */}
          {currentTestimonial && (
            <div className="relative z-30 mt-6 flex flex-col items-center text-center">
              {/* MAIN ACTIVE AVATAR - ALSO FLOATING ON X-AXIS WITH SHADOW */}
              <div className="relative h-20 w-20 animate-float-x rounded-full border-2 border-[#2467EC] bg-white p-[2px] sm:h-24 sm:w-24">
                <Image
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              {/* NAME */}
              <h3 className="mt-4 text-xl font-bold text-[#1E293B] sm:text-2xl">
                {currentTestimonial.name}
              </h3>

              {/* ROLE */}
              <p className="mt-1 text-sm font-semibold text-[#64748B]">
                {currentTestimonial.role}
              </p>

              {/* NAVIGATION */}
              {items.length > 1 && (
                <div className="mt-5 flex items-center justify-center gap-6 text-[#64748B]">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="p-1 transition-colors hover:text-[#2467EC]"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="p-1 transition-colors hover:text-[#2467EC]"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}

export default function PlumbingTestimonial1({ data }: SectionProps) {
  return <TestimonialSection testimonialData={(data as typeof site.testimonial | undefined) ?? site.testimonial} />;
}
