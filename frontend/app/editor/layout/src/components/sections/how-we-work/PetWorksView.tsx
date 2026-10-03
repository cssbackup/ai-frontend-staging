// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Image from "../data/pet/PetImage";
import {
    FadeIn,
    StaggerContainer,
    StaggerItem,
    MotionCard,
} from "../data/pet/animations";
import { User, Clock, Stethoscope, Utensils } from "lucide-react";
import { FaPaw } from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
    User,
    Clock,
    Stethoscope,
    Utensils,
};




const DashedConnectorArrow = () => (
    <svg
        width="44"
        height="16"
        viewBox="0 0 44 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#F37021]"
        aria-hidden="true"
    >
        <path
            d="M 2 8 L 36 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
        />
        <path
            d="M 33 3 L 40 8 L 33 13"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function Works() {
const petData = usePetSite();
const worksData: HowItWorksData = petData.howItWorks as HowItWorksData;

    if (!worksData) return null;

    return (
        <section className="relative w-full bg-[#FDF8F3] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden">

            <FaPaw className="absolute top-10 left-8 w-24 h-24 text-[#F37021]/5 -rotate-12 pointer-events-none" />
            <FaPaw className="absolute bottom-8 right-10 w-28 h-28 text-[#F37021]/5 rotate-45 pointer-events-none" />

            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <div className="flex flex-col items-center text-center mb-6">

                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{worksData.badge}</span>
                        </div>
                    </FadeIn>


                    <FadeIn direction="up" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#2C1810] tracking-tight leading-tight mb-3.5 max-w-3xl">
                            {worksData.titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {worksData.titleHighlight}
                            </span>
                        </h2>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-md mx-auto mb-3 font-normal leading-relaxed">
                            {worksData.description}
                        </p>
                    </FadeIn>

                    <div className="flex items-center justify-center gap-2.5">
                        <div className="h-[1.5px] w-7 bg-[#F37021]/40 rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-7 bg-[#F37021]/40 rounded-full" />
                    </div>

                </div>

                <StaggerContainer className={`grid gap-6 w-full ${
                    (worksData.steps?.length || 0) <= 1
                        ? "grid-cols-1"
                        : (worksData.steps?.length || 0) === 2
                          ? "grid-cols-1 sm:grid-cols-2"
                          : (worksData.steps?.length || 0) === 3
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}>
                    {worksData.steps?.map((step, idx) => {
                        const IconComponent = iconMap[step.icon] || User;
                        const isNotLast = idx < worksData.steps.length - 1;

                        return (
                            <StaggerItem key={step.id} direction="up" className="relative">
                                <MotionCard
                                    hoverY={-6}
                                    hoverScale={1.01}
                                    className="bg-white rounded-[28px] sm:rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm border border-neutral-100/90 hover:shadow-xl transition-all duration-300 relative group h-full"
                                >
                                    <div className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full border-2 border-[#F37021] text-[#F37021] font-extrabold text-sm sm:text-sm bg-white flex items-center justify-center shadow-2xs">
                                        {step.stepNumber}
                                    </div>
                                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#FDF8F3] shadow-md mb-2 mt-2 group-hover:scale-105 transition-transform duration-500">
                                        <Image
                                            src={step.image}
                                            alt={step.title}
                                            fill
                                            sizes="(max-width: 640px) 144px, 160px"
                                            className="object-cover object-center"
                                        />
                                    </div>
                                    <div className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#F37021] text-[#F37021] flex items-center justify-center shadow-md -mt-6 mb-3 shrink-0">
                                        <IconComponent className="w-5.5 h-5.5 text-[#F37021]" strokeWidth={2} />
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-extrabold text-[#2C1810] mb-2 leading-snug">
                                        {step.title}
                                    </h3>

                                    <p className="text-sm sm:text-sm text-[#7A6A60] font-medium leading-relaxed px-1">
                                        {step.description}
                                    </p>

                                </MotionCard>
                                {isNotLast && (
                                    <div className="hidden lg:flex absolute top-1/2 w-10 -translate-y-5 -right-8 z-40 pointer-events-none items-center justify-center">
                                        <DashedConnectorArrow />
                                    </div>
                                )}
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

            </div>
        </section>
    );
}
