// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Image from "../data/pet/PetImage";
import Link from "../data/pet/PetLink";
import { motion } from "framer-motion";
import {
    FadeIn,
    ScaleIn,
    StaggerContainer,
    StaggerItem,
    MotionCard,
} from "../data/pet/animations";
import { ArrowRight } from "lucide-react";
import {
    FaKitMedical,
    FaShower,
    FaScissors,
    FaStethoscope,
    FaShieldHeart,
    FaHeartPulse,
    FaDog,
    FaPaw,
} from "react-icons/fa6";

const reactIconMap: Record<string, React.ElementType> = {
    FaKitMedical,
    FaShower,
    FaScissors,
    FaStethoscope,
    FaShieldHeart,
    FaHeartPulse,
    FaDog,
    FaPaw,
};




const DecorativeWavyPaw = () => (
    <div className="flex items-center gap-2 mb-4">
        <svg
            width="50"
            height="14"
            viewBox="0 0 50 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#F37021] shrink-0"
            aria-hidden="true"
        >
            <path
                d="M2 7C6 3 10 3 14 7C18 11 22 11 26 7C30 3 34 3 38 7C42 11 46 11 48 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
        <FaPaw className="w-5 h-5 text-[#F37021]" />
    </div>
);

export default function WhyChooseUs() {
const petData = usePetSite();
const whyData: WhyChooseUsData = petData.whyChooseUs as WhyChooseUsData;

    if (!whyData) return null;

    return (
        <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

                    <div className="lg:col-span-5 flex flex-col justify-center relative">

                        <FaPaw
                            className="absolute -top-6 -left-6 sm:-left-10 w-16 h-16 sm:w-20 sm:h-20 text-[#2C1810]/5 -rotate-12 pointer-events-none"
                        />
                        <FaPaw
                            className="absolute bottom-4 right-8 sm:right-16 w-20 h-20 sm:w-24 sm:h-24 text-[#2C1810]/5 rotate-12 pointer-events-none"
                        />

                        <FadeIn direction="up" delay={0.05}>
                            <div className="bg-white border border-[#F37021]/30 text-[#F37021] text-sm sm:text-sm font-bold tracking-wide rounded-full px-3.5 py-1 inline-flex items-center gap-1.5 w-fit mb-3.5 shadow-2xs">
                                <FaPaw className="w-5 h-5 text-[#F37021]" />
                                <span>{whyData.badge}</span>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.1}>
                            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1B120C] tracking-tight leading-[1.08] mb-2">
                                {whyData.titlePrefix}{" "}
                                <span className="text-[#F37021] font-extrabold">{whyData.titleHighlight}</span>
                            </h2>
                        </FadeIn>

                        <DecorativeWavyPaw />

                        <FadeIn direction="up" delay={0.15}>
                            <p className="text-sm sm:text-base text-[#615147] leading-relaxed max-w-md mb-6 font-normal">
                                {whyData.description}
                            </p>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.2}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="w-fit"
                            >
                                <Link
                                    href={whyData.btnLink}
                                    className="bg-[#F37021] hover:bg-[#d95c0e] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-colors duration-200 group w-fit cursor-pointer"
                                >
                                    <span>{whyData.btnText}</span>
                                    <ArrowRight className="w-4.5 h-4.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </FadeIn>

                    </div>

                    <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
                        <ScaleIn delay={0.1} className="w-full max-w-[660px]">
                            <div className="relative w-full max-w-[660px] h-[300px] sm:h-[380px] lg:h-[430px] rounded-tl-[90px] sm:rounded-tl-[135px] rounded-bl-[90px] sm:rounded-bl-[135px] rounded-tr-[32px] rounded-br-[32px] overflow-hidden border-2 sm:border-3 border-[#FCE4D6] shadow-xl">
                                <Image
                                    src={whyData.mainImage || "/whychoose.jpg"}
                                    alt="Why Choose Dodo Cares"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                    className="object-cover object-center"
                                />
                            </div>
                        </ScaleIn>
                    </div>

                </div>

                


                {whyData.bottomBanner && (
                    <FadeIn direction="up" delay={0.1}>
                        <div className="bg-gradient-to-r from-[#FFF6F0] via-[#FFF3EB] to-[#FFF6F0] rounded-2xl p-5 sm:p-6 md:p-6 lg:px-9 lg:py-6 border border-[#F37021]/15 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 shadow-2xs relative overflow-hidden mt-8 md:mt-10">

                            {/* Left Info */}
                            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 text-center sm:text-left min-w-0">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full bg-[#F37021] text-white flex items-center justify-center shrink-0 shadow-2xs border-4 border-white">
                                    <FaDog className="w-8 h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h4 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-extrabold text-[#1E1B26] mb-1 leading-snug">
                                        {whyData.bottomBanner.title}
                                    </h4>
                                    <p className="text-sm sm:text-sm md:text-sm lg:text-base text-[#615147] font-medium leading-relaxed">
                                        {whyData.bottomBanner.subtitle}
                                    </p>
                                </div>
                            </div>


                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="shrink-0 w-full sm:w-auto"
                            >
                                <Link
                                    href={whyData.bottomBanner.btnLink}
                                    className="bg-[#F37021] hover:bg-[#d95c0e] text-white font-bold text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-colors w-full sm:w-auto shrink-0 group cursor-pointer whitespace-nowrap"
                                >
                                    <span>{whyData.bottomBanner.btnText}</span>
                                    <ArrowRight className="w-4.5 h-4.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>

                        </div>
                    </FadeIn>
                )}

            </div>
        </section>
    );
}
