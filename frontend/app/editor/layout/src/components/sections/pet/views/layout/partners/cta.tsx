// @ts-nocheck
"use client";
import { usePetSite } from "../../../petSite";

import React from "react";
import Link from "../../../PetLink";
import { FadeIn } from "../../ui/animations";
import {
    FaHandshake,
    FaPaw,
} from "react-icons/fa";

const reactIconMap: Record<string, React.ElementType> = {
    handshake: FaHandshake,
    FaHandshake: FaHandshake,
};




export default function PartnerCTA() {
const petData = usePetSite();
const ctaData: PartnerCtaData = petData.partnerCta as PartnerCtaData;

    if (!ctaData) return null;

    const MainIcon = reactIconMap[ctaData.icon] || FaHandshake;
    const BtnIcon = reactIconMap[ctaData.btnIcon || "paw"] || FaPaw;

    return (
        <section className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
            <FadeIn direction="up" delay={0.1}>
                <div className="relative bg-[#FFF9F6] border border-[#FDE8DC] rounded-[12px] p-4 overflow-hidden shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <FaPaw className="absolute -left-6 -bottom-6 w-32 h-32 text-[#F37021]/5 -rotate-12 pointer-events-none" />
                    <FaPaw className="absolute -right-6 -top-6 w-32 h-32 text-[#F37021]/5 rotate-45 pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center mx-16 sm:items-center gap-4 sm:gap-6 text-center sm:text-left z-10 flex-1">

                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
                            <MainIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1E1B26] mb-1 tracking-tight">
                                {ctaData.title}
                            </h3>
                            <p className="text-sm sm:text-sm md:text-base text-[#615147] font-normal leading-relaxed max-w-xl">
                                {ctaData.description}
                            </p>
                        </div>

                    </div>
                    <div className="z-10 shrink-0 mx-16">
                        <Link
                            href={ctaData.btnLink || "/contactus"}
                            className="inline-flex items-center gap-2.5 px-8 py-3 rounded-lg bg-white border-2 border-[#F37021] text-[#F37021] hover:bg-[#F37021] hover:text-white font-extrabold text-sm sm:text-base transition-all duration-300 shadow-xs hover:shadow-md group"
                        >
                            <span>{ctaData.btnText}</span>
                            <BtnIcon className="w-4 h-4 text-[#F37021] group-hover:text-white transition-colors duration-300" />
                        </Link>
                    </div>

                </div>
            </FadeIn>
        </section>
    );
}
