// @ts-nocheck
"use client";

import React from "react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import { site } from "../data/plumbing1";
import Image from "next/image";
import { SectionHeader, ScrollReveal } from "../banner/PlumbingInnerBanner1";
import type { SectionProps } from "../../../types/section";

export interface ProcessStep {
  id?: number;
  number?: string;
  stepNumber?: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface ProcessData {
  badge?: string;
  image?: string;
  title?: string;
  steps?: ProcessStep[];
}

interface ProcessSectionProps {
  processData?: ProcessData;
}

function ProcessSection({ processData }: ProcessSectionProps) {
  // Direct JSON mapping support with dual keys fallback
  const jsonProcessData: ProcessData = site.howWeWork;

  const data = processData || jsonProcessData || {};
  const steps = data.steps || [];

  const renderIcon = (iconName?: string) => {
    const Icon = getPlumbingIcon(iconName);
    return <Icon className="h-12 w-12 text-[#2467EC] sm:h-14 sm:w-14" />;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#EDF3FD] py-8 md:py-12">
   
      {/* WATER SPLASH OVERLAY - TOP RIGHT */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 select-none opacity-80 sm:opacity-100">
        <Image src={data.image || ""} alt="" width={194} height={173} />
      </div>

      <div className="relative z-20 mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <SectionHeader
          pretitle={data.badge}
          title={data.title}
          align="center"
        />

        {/* CARDS GRID */}
        <ScrollReveal direction="up">
        <div className="relative mt-20 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {steps?.map((step, index) => {
            const num = step.number || step.stepNumber || String(index + 1).padStart(2, "0");
            const isElevated = index % 2 === 1;

            return (
              <div
                key={`${step.id ?? "step"}-${index}`}
                className={`group relative flex flex-col items-center text-center transition-all duration-300 animate-subtle-float ${
                  isElevated ? "lg:-translate-y-10" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                {/* STEP NUMBER - TOP LEFT OF CIRCLE */}
                <span className="absolute -left-1 -top-7 z-0 text-5xl font-black tracking-tighter text-[#D9E8FC] select-none sm:-left-3 sm:-top-8 sm:text-6xl">
                  {num}
                </span>

                {/* OUTER DASHED CIRCLE */}
                <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border-2 border-dashed border-[#BADAFF] bg-transparent p-3 sm:h-48 sm:w-48">
                  {/* INNER BLUE TINT CIRCLE CONTAINER */}
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#E5F0FF] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {renderIcon(step.icon)}
                  </div>
                </div>

                {/* TITLE & DESCRIPTION */}
                <h3 className="mt-6 text-xl font-bold text-[#1E293B] sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-[240px] text-sm font-medium leading-relaxed text-[#64748B]">
                  {step.desc}
                </p>

                {/* SWIRLY LOOP ARROWS BETWEEN CARDS (DESKTOP ONLY) */}
                {index < steps.length - 1 && (
                  <div
                    className={`pointer-events-none absolute z-30 hidden lg:block ${
                      index === 0
                        ? "right-[-32px] top-[30px]"
                        : index === 1
                          ? "right-[-32px] top-[90px]"
                          : "right-[-32px] top-[30px]"
                    }`}
                  >
                    <svg
                      width="75"
                      height="65"
                      viewBox="0 0 75 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Swirly Loop Path */}
                      <path
                        d={
                          index % 2 === 0
                            ? "M 5 25 C 25 10, 45 5, 40 25 C 35 45, 15 35, 35 45 C 50 50, 60 40, 68 35"
                            : "M 5 40 C 25 55, 45 60, 40 40 C 35 20, 15 30, 35 20 C 50 15, 60 25, 68 30"
                        }
                        stroke="#D3E4FC"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Arrow Head */}
                      <path
                        d={
                          index % 2 === 0
                            ? "M 60 32 L 70 35 L 64 43"
                            : "M 60 34 L 70 30 L 64 22"
                        }
                        stroke="#D3E4FC"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function PlumbingHowWeWork1({ data }: SectionProps) {
  return <ProcessSection processData={(data as typeof site.howWeWork | undefined) ?? site.howWeWork} />;
}
