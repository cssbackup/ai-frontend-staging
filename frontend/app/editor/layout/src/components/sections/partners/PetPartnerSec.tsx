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
import { FaPaw } from "react-icons/fa";




export default function PartnerSec() {
const petData = usePetSite();
const partnerSecData: PartnerSecData = petData.partnerSec as PartnerSecData;

    if (!partnerSecData) return null;

    return (
        <section className="relative max-w-[1320px] mt-8 sm:mt-10 md:mt-12 lg:mt-14  mx-auto w-full overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <div className="flex flex-col items-center text-center mb-6">

                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-2 text-[#F37021] font-extrabold text-sm sm:text-sm tracking-widest uppercase mb-2.5">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{partnerSecData.badge || "OUR PARTNERS"}</span>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.1}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B26] tracking-tight leading-tight mb-2.5">
                            {partnerSecData.titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {partnerSecData.titleHighlight}
                            </span>
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.12}>
                        <div className="flex items-center justify-center gap-2.5 my-2">
                            <div className="h-[1.5px] w-8 bg-[#F37021]/50 rounded-full" />
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <div className="h-[1.5px] w-8 bg-[#F37021]/50 rounded-full" />
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-xl mx-auto font-normal leading-relaxed mt-1">
                            {partnerSecData.description}
                        </p>
                    </FadeIn>

                </div>
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 w-full">
                    {partnerSecData.partners?.map((partner) => (
                        <StaggerItem key={partner.id} direction="up">
                            <MotionCard hoverY={-5} hoverScale={1.02} className="h-full">
                                <div className="bg-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 border border-neutral-200/70 transition-all duration-300 flex items-center justify-center h-[120px] sm:h-[135px] lg:h-[145px] w-full group cursor-pointer relative">
                                    <div className="relative w-100 h-100 flex items-center justify-center">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                            className="object-contain object-center p-2 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            </MotionCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

            </div>
        </section>
    );
}
