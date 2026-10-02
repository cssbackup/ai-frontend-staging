// @ts-nocheck
"use client";
import { usePetSite } from "../../../petSite";

import React from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "../../ui/animations";
import {
    FaHeart,
    FaShieldHeart,
    FaPeopleGroup,
    FaHandHoldingHeart,
    FaPaw,
} from "react-icons/fa6";
import { FaUsers, FaHands, FaShieldAlt } from "react-icons/fa";

const reactIconMap: Record<string, React.ElementType> = {
    FaHeart,
    FaShieldHeart,
    FaPeopleGroup,
    FaHandHoldingHeart,
    FaPaw,
};




export default function MissionCta() {
const petData = usePetSite();
const ctaData: MissionCtaSecData | undefined = petData.missionCtaSec;

    if (!ctaData || !ctaData.items || ctaData.items.length === 0) return null;

    return (
        <section className="relative max-w-[1320px] mt-6 md:mt-8 mx-auto w-full px-4 sm:px-6 lg:px-8 font-sans">
            <FadeIn direction="up" delay={0.05}>
                <div className="bg-[#FFFBF8] rounded-[24px] sm:rounded-[32px] border border-[#FDE8DC] p-6 sm:p-8 lg:py-8 lg:px-8 shadow-xs">
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
                        {ctaData.items.map((item, index) => {
                            const IconComponent = reactIconMap[item.icon] || reactIconMap.FaPaw;

                            return (
                                <StaggerItem
                                    key={item.id || index}
                                    className={`flex items-center gap-4 sm:gap-4.5 ${
                                        index !== 0 ? "lg:pl-6 xl:pl-8" : ""
                                    } ${
                                        index !== ctaData.items.length - 1
                                            ? "lg:pr-6 xl:pr-8 lg:border-r lg:border-[#FDE8DC]"
                                            : ""
                                    }`}
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0 shadow-xs">
                                        <IconComponent className="w-9 h-9 sm:w-11 sm:h-11 text-[#F37021]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base sm:text-[17px] font-extrabold text-[#3E1408] mb-1 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm sm:text-[13px] md:text-[15px] text-[#6C5C52] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </FadeIn>
        </section>
    );
}
