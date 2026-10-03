// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Image from "../data/pet/PetImage";
import Link from "../data/pet/PetLink";
import {
    FadeIn,
    StaggerContainer,
    StaggerItem,
    MotionCard,
} from "../data/pet/animations";
import { ArrowRight, ArrowUpRight, Star, Dog } from "lucide-react";
import { PiBoneLight } from "react-icons/pi";
import { FaPaw } from "react-icons/fa";




const DotMatrixDecoration = () => (
    <svg
        width="90"
        height="70"
        viewBox="0 0 90 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#F37021]/20"
        aria-hidden="true"
    >
        {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
                <circle
                    key={`${row}-${col}`}
                    cx={col * 14 + 6}
                    cy={row * 13 + 6}
                    r="2.5"
                    fill="currentColor"
                />
            ))
        )}
    </svg>
);

export default function Services() {
const petData = usePetSite();
const ourServicesData: OurServicesData = petData.ourServices as OurServicesData;

    if (!ourServicesData) return null;

    return (
        <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">

            <div className="absolute top-10 left-6 sm:left-12 pointer-events-none hidden sm:block">
                <DotMatrixDecoration />
            </div>
            <div className="absolute top-8 right-6 sm:right-16 pointer-events-none hidden sm:block">
                <PiBoneLight className="h-18 w-18 text-orange-500" />
            </div>

            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <div className="flex flex-col items-center text-center mb-6">
                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{ourServicesData.badge}</span>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B26] tracking-tight leading-tight mb-3.5 max-w-3xl">
                            {ourServicesData.titlePrefix} {ourServicesData.titleMiddle}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {ourServicesData.titleHighlight}
                            </span>
                        </h2>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-xl mx-auto mb-4 font-normal leading-relaxed">
                            {ourServicesData.description}
                        </p>
                    </FadeIn>
                    <div className="flex items-center justify-center gap-2.5 mt-1">
                        <div className="h-[1.5px] w-7 bg-[#F37021]/50 rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-7 bg-[#F37021]/50 rounded-full" />
                    </div>

                </div>


                <StaggerContainer className={`grid w-full gap-6 lg:gap-7 ${
                    (ourServicesData.services?.filter((service) => service.active !== false).length || 0) <= 1
                        ? "grid-cols-1"
                        : (ourServicesData.services?.filter((service) => service.active !== false).length || 0) === 2
                          ? "grid-cols-1 sm:grid-cols-2"
                          : (ourServicesData.services?.filter((service) => service.active !== false).length || 0) === 3
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}>
                    {ourServicesData.services?.filter((service) => service.active !== false).map((service) => {
                        const isStar = service.badgeIcon === "Star";

                        return (
                            <StaggerItem key={service.id} direction="up">
                                <MotionCard hoverY={-6} hoverScale={1.01} className="h-full">
                                    <div className="relative bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-amber-900/5 p-4 flex flex-col items-center text-center pb-7 group h-full">
                                        <Link
                                            href={service.link || `/services/${service.id}`}
                                            aria-label={service.title}
                                            data-editor-no-inline
                                            className="absolute inset-0 z-0"
                                        />
                                        <div className="pointer-events-none relative z-[1] flex w-full flex-col items-center">
                                        <div className="relative w-full h-[190px] sm:h-[210px] overflow-hidden rounded-[20px]">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />

                                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#2C1810] flex items-center justify-center shadow-xs">
                                                <ArrowUpRight className="w-4 h-4 text-[#2C1810]" strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        <div className="relative z-10 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#F37021] border-4 border-white text-white flex items-center justify-center shadow-md -mt-7 mb-2 shrink-0">
                                            {isStar ? (
                                                <Star className="w-6 h-6 text-white fill-white" strokeWidth={1.5} />
                                            ) : (
                                                <Dog className="w-6.5 h-6.5 text-white" strokeWidth={2} />
                                            )}
                                        </div>

                                        <h3 className="pointer-events-auto text-lg sm:text-[20px] font-extrabold text-[#1E1B26] mt-2 mb-2 px-2 leading-snug group-hover:text-[#F37021] transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="pointer-events-auto text-sm sm:text-sm text-[#615147] font-normal leading-relaxed mb-6 px-3 flex-1">
                                            {service.description}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-[#F37021] font-bold text-sm group-hover:text-[#d95c0e] transition-colors mt-auto group/link">
                                            <span>Learn More</span>
                                            <div className="w-7 h-7 rounded-full border border-[#F37021] text-[#F37021] flex items-center justify-center group-hover:bg-[#F37021] group-hover:text-white transition-all duration-200">
                                                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                            </div>
                                        </span>
                                        </div>
                                    </div>
                                </MotionCard>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

            </div>
        </section>
    );
}
