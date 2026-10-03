// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Link from "../data/pet/PetLink";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, MotionCard } from "../data/pet/animations";
import {
    FaShower,
    FaBath,
    FaCut as FaScissors,
    FaBroom,
    FaCrown,
    FaShieldAlt,
    FaUserNurse,
    FaCalendarCheck,
    FaAward,
    FaPaw,
    FaClock,
} from "react-icons/fa";

const reactIconMap: Record<string, React.ElementType> = {
    FaShower,
    FaBath,
    FaScissors,
    FaBroom,
    FaCrown,
    FaShieldAlt,
    FaUserNurse,
    FaCalendarCheck,
    FaAward,
    FaPaw,
    FaClock,
};




export default function PriceSec() {
const petData = usePetSite();
const pricingData: PricingSecData = petData.pricingSec as PricingSecData;

    if (!pricingData) return null;

    return (
        <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">
            <FaPaw className="absolute top-10 left-8 w-28 h-28 text-[#F37021]/5 -rotate-12 pointer-events-none" />
            <FaPaw className="absolute bottom-10 right-8 w-32 h-32 text-[#F37021]/5 rotate-45 pointer-events-none" />

            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col items-center text-center mb-10">
                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span className="text-[#F37021] font-extrabold text-sm sm:text-sm tracking-widest uppercase">
                                {pricingData.badge}
                            </span>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight leading-tight mb-3">
                            {pricingData.titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {pricingData.titleHighlight}
                            </span>
                        </h2>
                    </FadeIn>
                    <div className="flex items-center justify-center gap-2.5 mb-3.5">
                        <div className="h-[1.5px] w-12 bg-[#F37021] rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-12 bg-[#F37021] rounded-full" />
                    </div>
                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-xl mx-auto font-normal leading-relaxed">
                            {pricingData.description}
                        </p>
                    </FadeIn>

                </div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 w-full mb-8 sm:mb-10 items-stretch">
                    {pricingData.packages?.map((pkg) => {
                        const IconComponent = reactIconMap[pkg.icon] || FaShower;
                        const isPopular = pkg.isPopular;

                        return (
                            <StaggerItem key={pkg.id} direction="up" className="h-full">
                                <MotionCard
                                    hoverY={-6}
                                    hoverScale={1.01}
                                    className={`bg-white rounded-[28px] p-6 sm:p-7 flex flex-col justify-between relative group cursor-pointer h-full transition-all duration-300 ${isPopular
                                        ? "border-2 border-[#F37021] shadow-xl"
                                        : "border border-neutral-100/90 shadow-sm hover:shadow-xl"
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F37021] text-white font-extrabold text-[11px] tracking-wider uppercase px-4 py-1 rounded-full shadow-md z-20">
                                            {pkg.popularBadgeText || "MOST POPULAR"}
                                        </div>
                                    )}

                                    <div>
                                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#FFF5EE] text-[#F37021] flex items-center justify-center border border-[#F37021]/20 mx-auto mb-4 shrink-0 shadow-2xs">
                                            <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 text-[#F37021]" />
                                        </div>
                                        <h3 className="font-extrabold text-lg sm:text-xl text-[#2C1810] tracking-tight text-center mb-1">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-sm text-[#7A6A60] text-center font-medium leading-relaxed mb-4 min-h-[36px] flex items-center justify-center">
                                            {pkg.subtitle}
                                        </p>
                                        <div className="flex items-center justify-center gap-1.5 mb-5">
                                            <div className="w-6 h-6 rounded-full bg-[#F37021] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                                                {pkg.currency}
                                            </div>
                                            <span className="text-3xl sm:text-4xl font-extrabold text-[#2C1810] tracking-tight">
                                                {pkg.price}
                                            </span>
                                            <span className="text-sm font-bold text-[#7A6A60] ml-0.5">
                                                {pkg.period}
                                            </span>
                                        </div>
                                        <ul className="flex flex-col gap-2.5 mb-6 text-left w-full">
                                            {pkg.features?.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5 text-sm sm:text-sm text-[#3D2C24] font-medium leading-snug">
                                                    <FaPaw className="w-4 h-4 text-[#F37021] shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-[#FFF8F2] rounded-2xl p-3 flex flex-col items-center gap-2.5 mt-auto border border-[#F5EBE1]">
                                        <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#7A6A60]">
                                            <FaClock className="w-4.5 h-4.5 text-[#F37021]" />
                                            <span>{pkg.duration}</span>
                                        </div>
                                        <Link
                                            href={pkg.btnLink}
                                            className="bg-[#F37021] hover:bg-[#d95c0e] text-white font-extrabold text-sm sm:text-sm py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 shadow-xs transition-colors group/btn"
                                        >
                                            <span>{pkg.btnText}</span>
                                            <FaPaw className="w-4.5 h-4.5 text-white group-hover/btn:rotate-12 transition-transform" />
                                        </Link>
                                    </div>

                                </MotionCard>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
                <FadeIn direction="up" delay={0.3}>
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-neutral-100/90 px-6 sm:px-8 py-5 sm:py-6 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                            {pricingData.trustFeatures?.map((tf) => {
                                const TrustIcon = reactIconMap[tf.icon] || FaShieldAlt;

                                return (
                                    <div key={tf.id} className="flex items-center gap-4">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFF5EE] text-[#F37021] flex items-center justify-center shrink-0 border border-[#F37021]/20 shadow-2xs">
                                            <TrustIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#F37021]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-sm sm:text-base font-extrabold text-[#2C1810] leading-tight mb-0.5">
                                                {tf.title}
                                            </h4>
                                            <p className="text-sm text-[#7A6A60] leading-snug font-normal">
                                                {tf.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </FadeIn>

            </div>
        </section>
    );
}
