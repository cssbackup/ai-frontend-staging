// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Image from "../data/pet/PetImage";
import { FadeIn, MotionCard } from "../data/pet/animations";
import { FaPaw, FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";




export default function TestimonialSec() {
const petData = usePetSite();
const testimonialData: TestimonialSecData | undefined = petData.testimonialSec;

    if (!testimonialData) return null;

    const { badge, titlePrefix, titleHighlight, description, testimonials } = testimonialData;

    return (
        <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden bg-neutral-50/50">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="flex flex-col items-center text-center mb-6">
                    <FadeIn direction="up" delay={0.05}>
                        <div className="flex items-center gap-2 mb-2">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span className="text-[#F37021] font-bold text-sm sm:text-sm uppercase tracking-widest">
                                {badge || "TESTIMONIALS"}
                            </span>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.08}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight leading-tight mb-3">
                            {titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {titleHighlight}
                            </span>
                        </h2>
                    </FadeIn>
                    <div className="flex items-center justify-center gap-2.5 mb-3.5">
                        <div className="h-[1.5px] w-10 bg-[#F37021] rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-10 bg-[#F37021] rounded-full" />
                    </div>
                    <FadeIn direction="up" delay={0.12}>
                        <p className="text-sm sm:text-base text-[#615147] font-normal max-w-xl mx-auto">
                            {description}
                        </p>
                    </FadeIn>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {testimonials?.map((item, idx) => (
                        <FadeIn key={item.id || idx} direction="up" delay={0.1 + idx * 0.05}>
                            <MotionCard
                                hoverY={-6}
                                hoverScale={1.01}
                                className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-neutral-100 shadow-sm  flex flex-col justify-between h-full group"
                            >
                                <div className="p-6 sm:p-7 flex flex-col flex-1">
                                    <ImQuotesLeft className="w-7 h-7 sm:w-8 sm:h-8 text-[#F37021] mb-4 shrink-0" />
                                    <p className="text-[#4A3B32] text-sm sm:text-base leading-relaxed font-normal mb-6 flex-1">
                                        {item.comment}
                                    </p>
                                    <div className="flex items-center gap-1 mt-auto">
                                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                            <FaStar key={i} className="w-4 h-4 text-[#F37021] fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#FFF8F3] px-6 py-4 flex items-center justify-between border-t border-[#F7EBE1]/70">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                            <Image
                                                src={item.avatar}
                                                alt={item.name}
                                                fill
                                                sizes="52px"
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-extrabold text-[#2C1810] text-sm sm:text-base leading-tight">
                                                {item.name}
                                            </h3>
                                            <span className="text-sm sm:text-sm text-[#615147] font-medium block mt-0.5">
                                                {item.role || (item as any).petName}
                                            </span>
                                        </div>
                                    </div>
                                    <FaPaw className="w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 text-[#F37021]/20 shrink-0" />
                                </div>
                            </MotionCard>
                        </FadeIn>
                    ))}
                </div>

            </div>
        </section>
    );
}
