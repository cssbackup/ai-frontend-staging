// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Image from "../data/pet/PetImage";
import Link from "../data/pet/PetLink";
import { FadeIn } from "../data/pet/animations";
import { FaPaw, FaArrowRight, FaCheck } from "react-icons/fa";
import { Eye, Target } from "lucide-react";




export default function MissionSec() {
const petData = usePetSite();
const missionData: MissionSecData = petData.missionSec as MissionSecData;

    if (!missionData) return null;

    return (
        <section className="relative max-w-[1320px] mt-8 sm:mt-10 md:mt-12 lg:mt-14 mx-auto w-full px-4 sm:px-6 lg:px-8 font-sans">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6">
                {missionData.badge && (
                    <FadeIn direction="up" delay={0.02}>
                        <div className="flex items-center justify-center gap-2 text-[#F37021] font-bold text-sm sm:text-sm tracking-wider uppercase mb-2">
                            <div className="h-[1.5px] w-7 sm:w-9 bg-[#F37021] rounded-full" />
                            <FaPaw className="w-5 h-5" />
                            <span>{missionData.badge}</span>
                            <div className="h-[1.5px] w-7 sm:w-9 bg-[#F37021] rounded-full" />
                        </div>
                    </FadeIn>
                )}

                <FadeIn direction="up" delay={0.05}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E1408] tracking-tight leading-tight mb-2">
                        {missionData.titlePrefix}{" "}
                        <span className="text-[#F37021]">{missionData.titleHighlight}</span>
                    </h2>
                </FadeIn>

                <FadeIn direction="up" delay={0.08}>
                    <div className="flex items-center justify-center gap-2.5 my-2">
                        <div className="h-[1.5px] w-9 bg-[#F37021]/60 rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-9 bg-[#F37021]/60 rounded-full" />
                    </div>
                </FadeIn>

                {missionData.description && (
                    <FadeIn direction="up" delay={0.1}>
                        <p className="text-sm sm:text-base md:text-lg text-[#5A4D44] max-w-2xl mx-auto leading-relaxed font-normal mt-2">
                            {missionData.description}
                        </p>
                    </FadeIn>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {missionData.vision && (
                    <FadeIn direction="up" delay={0.12} className="h-full">
                        <div className="relative h-full min-h-[380px] bg-[#FFF9F5] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch border border-[#FDE8DC]/60 shadow-sm">

                            <div className="relative w-full md:w-[48%] min-h-[320px] md:min-h-full shrink-0 overflow-hidden">
                                <div className="absolute inset-0 border-b-4 md:border-b-4 md:border-r-4 border-[#F37021] rounded-b-[180px] md:rounded-b-none md:rounded-tr-[100%] md:rounded-br-[100%] overflow-hidden">
                                    <Image
                                        src={missionData.vision.image}
                                        alt={missionData.vision.title || "Our Vision"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-20 h-20 rounded-full bg-white/95 p-1.5 shadow-md flex items-center justify-center z-10">
                                    <div className="w-full h-full rounded-full border border-orange-200/80 bg-[#FFF6F0] flex items-center justify-center">
                                        <Eye className="w-8 h-8 text-[#F37021] stroke-[2.2]" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between text-left z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0">
                                            <Eye className="w-8 h-8 text-[#F37021]" />
                                        </div>
                                        <div>
                                            <span className="text-sm md:text-lg font-black uppercase tracking-wider text-[#F37021]">
                                                {missionData.vision.badge}
                                            </span>
                                            <div className="w-10 h-[2.5px] bg-[#F37021] mt-0.5 rounded-full" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3E1408] mb-3">
                                        {missionData.vision.title}
                                    </h3>

                                    <p className="text-sm sm:text-sm md:text-lg text-[#6C5C52] leading-relaxed mb-6">
                                        {missionData.vision.description}
                                    </p>
                                </div>

                                {missionData.vision.btnText && (
                                    <div>
                                        <Link
                                            href={missionData.vision.btnLink || "/about"}
                                            className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#F37021] hover:bg-[#d95e14] text-white font-bold text-sm sm:text-sm rounded-full transition shadow-sm group w-fit"
                                        >
                                            <span>{missionData.vision.btnText}</span>
                                            <div className="w-6 h-6 rounded-full bg-white text-[#F37021] flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                                                <FaArrowRight className="w-2.5 h-2.5" />
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                        </div>
                    </FadeIn>
                )}
                {missionData.mission && (
                    <FadeIn direction="up" delay={0.15} className="h-full">
                        <div className="relative h-full min-h-[380px] bg-[#FFF9F5] rounded-[32px] overflow-hidden flex flex-col-reverse md:flex-row items-stretch border border-[#FDE8DC]/60 shadow-sm">

                            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center text-left z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#FFEFE5] flex items-center justify-center shrink-0">
                                        <Target className="w-8 h-8 text-[#F37021]" />
                                    </div>
                                    <div>
                                        <span className="text-sm md:text-lg  font-black uppercase tracking-wider text-[#F37021]">
                                            {missionData.mission.badge}
                                        </span>
                                        <div className="w-10 h-[2.5px] bg-[#F37021] mt-0.5 rounded-full" />
                                    </div>
                                </div>

                                <p className="text-sm sm:text-sm md:text-[15px]  text-[#6C5C52] leading-relaxed mb-5">
                                    {missionData.mission.description}
                                </p>

                                {missionData.mission.points && (
                                    <div className="space-y-4">
                                        {missionData.mission.points.map((point) => (
                                            <div key={point.id} className="flex items-start gap-2.5">
                                                <div className="w-5 h-5 rounded-full bg-[#F37021] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                    <FaCheck className="w-3 h-3 stroke-[1.5]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm sm:text-sm md:text-[15px] font-bold text-[#3E1408] leading-tight">
                                                        {point.title}
                                                    </h4>
                                                    <p className="text-sm sm:text-sm text-[#7A6B62] leading-normal mt-0.5">
                                                        {point.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative w-full md:w-[48%] min-h-[320px] md:min-h-full shrink-0 overflow-hidden">
                                <div className="absolute inset-0 border-b-4 md:border-b-4 md:border-l-4 border-[#F37021] rounded-b-[180px] md:rounded-b-none md:rounded-tl-[100%] md:rounded-bl-[100%] overflow-hidden">
                                    <Image
                                        src={missionData.mission.image}
                                        alt="Our Mission"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                        </div>
                    </FadeIn>
                )}

            </div>
        </section>
    );
}