// @ts-nocheck
"use client";
import { usePetSite } from "../../petSite";

import React from "react";
import Image from "../../PetImage";
import Link from "../../PetLink";
import {
    FadeIn,
    StaggerContainer,
    StaggerItem,
    MotionCard,
} from "../ui/animations";
import { ArrowRight } from "lucide-react";
import { FaPaw } from "react-icons/fa";




export default function Teams() {
const petData = usePetSite();
const teamData: OurTeamData = petData.ourTeam as OurTeamData;

    if (!teamData) return null;

    return (
        <section className="relative w-full max-w-[1320px] mx-auto mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <div className="flex flex-col items-center text-center">

                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{teamData.badge}</span>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B26] tracking-tight leading-tight mb-3.5 max-w-3xl">
                            {teamData.titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {teamData.titleHighlight}
                            </span>
                        </h2>
                    </FadeIn>

                    <div className="flex items-center justify-center gap-2.5 mt-1 mb-4">
                        <div className="h-[1.5px] w-7 bg-[#F37021]/50 rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-7 bg-[#F37021]/50 rounded-full" />
                    </div>

                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-xl mx-auto font-normal leading-relaxed">
                            {teamData.description}
                        </p>
                    </FadeIn>

                </div>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 lg:gap-7 w-full">
                    {teamData.members?.filter((member) => member.active !== false).map((member) => (
                        <StaggerItem key={member.id} direction="up">
                            <MotionCard hoverY={-6} hoverScale={1.01} className="h-full">
                                <div className="relative bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden p-3.5 sm:p-4 border border-amber-900/10 flex flex-col justify-between group h-full">
                                    <Link
                                        href={member.link || "/team"}
                                        aria-label={member.name}
                                        data-editor-no-inline
                                        className="absolute inset-0 z-0"
                                    />
                                    <div className="pointer-events-none relative z-[1] flex h-full flex-col justify-between">
                                    <div className="relative w-full aspect-[4/4.2] sm:aspect-[4/4.4] overflow-hidden rounded-[20px] mb-4">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="flex items-end justify-between px-2 pb-2 pt-1">
                                        <div className="flex flex-col text-left">
                                            <h3 className="pointer-events-auto text-lg sm:text-[20px] font-extrabold text-[#1E1B26] mb-1 group-hover:text-[#F37021] transition-colors leading-snug">
                                                {member.name}
                                            </h3>
                                            <span className="pointer-events-auto text-sm sm:text-sm font-bold text-[#F37021] block mb-1.5">
                                                {member.role}
                                            </span>
                                            <div className="h-[2.5px] w-8 bg-[#F37021] rounded-full" />
                                        </div>

                                        <div className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-full border border-neutral-200 text-[#F37021] flex items-center justify-center group-hover:border-[#F37021] group-hover:bg-[#F37021] group-hover:text-white transition-colors duration-200 shrink-0 ml-2">
                                            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2.5} />
                                        </div>
                                    </div>
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
