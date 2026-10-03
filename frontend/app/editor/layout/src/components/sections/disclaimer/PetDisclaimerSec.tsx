// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import { FadeIn } from "../data/pet/animations";
import { FaPaw } from "react-icons/fa";




export default function DisclaimerSec() {
const petData = usePetSite();
const disclaimerSecData: DisclaimerSecData = (petData.disclaimerSec || {
    titlePrefix: "Terms and",
    titleHighlight: "Conditions",
    lastUpdated: "May 10, 2024",
    intro: "Welcome to Dodo Cares. By accessing or using our website and services, you agree to be bound by the following Terms and Conditions. Please read them carefully.",
    sections: [],
    footerNote: "Thank you for trusting Dodo Cares with your furry family members.",
    footerSubnote: "We are here to provide the best care, every time."
}) as DisclaimerSecData;

    if (!disclaimerSecData) return null;

    return (
        <section className="relative max-w-[1320px] mt-4 sm:mt-6 md:mt-8 lg:mt-10 mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-6">

                <FadeIn direction="up" delay={0.05}>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E1408] tracking-tight leading-tight mb-2">
                        {disclaimerSecData.titlePrefix}{" "}
                        <span className="text-[#3E1408]">
                            {disclaimerSecData.titleHighlight}
                        </span>
                    </h1>
                </FadeIn>
                <FadeIn direction="up" delay={0.1}>
                    <div className="flex items-center justify-center gap-2.5 my-1.5">
                        <div className="h-[1.5px] w-9 bg-[#F37021]/60 rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-9 bg-[#F37021]/60 rounded-full" />
                    </div>
                </FadeIn>

            </div>
            <FadeIn direction="up" delay={0.15}>
                <div className="w-full text-left font-sans space-y-5">
                    {disclaimerSecData.lastUpdated && (
                        <p className="text-sm sm:text-sm md:text-lg text-[#3E342F] font-normal">
                            <strong className="font-bold text-[#2A211C]">Last Updated:</strong> {disclaimerSecData.lastUpdated}
                        </p>
                    )}
                    {disclaimerSecData.intro && (
                        <p className="text-sm sm:text-sm md:text-lg text-[#4A403A] leading-relaxed font-normal">
                            {disclaimerSecData.intro}
                        </p>
                    )}
                    <div className="space-y-5 pt-2">
                        {disclaimerSecData.sections?.map((item) => (
                            <div key={item.id} className="space-y-1">
                                <h2 className="text-sm sm:text-base md:text-xl font-extrabold text-[#C83B00]">
                                    {item.id}. {item.title}
                                </h2>
                                <p className="text-sm sm:text-sm md:text-lg text-[#4A403A] leading-relaxed pl-4 sm:pl-5 font-normal">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>
                      
                      <hr className="w-full border-0 border-t border-[#FCE3D3] my-6" />
                    {(disclaimerSecData.footerNote || disclaimerSecData.footerSubnote) && (
                        <div className="mt-8 flex flex-col items-center justify-center text-center space-y-1.5">
                            {disclaimerSecData.footerNote && (
                                <div className="inline-flex items-center justify-center gap-2 text-sm sm:text-sm md:text-lg text-[#4A403A] font-normal">
                                    <FaPaw className="w-6 h-6 text-[#F37021] shrink-0" />
                                    <span>{disclaimerSecData.footerNote}</span>
                                </div>
                            )}
                            {disclaimerSecData.footerSubnote && (
                                <p className="text-sm sm:text-sm md:text-lg font-bold text-[#2A211C]">
                                    {disclaimerSecData.footerSubnote}
                                </p>
                            )}
                        </div>
                    )}

                </div>
            </FadeIn>
        </section>
    );
}
