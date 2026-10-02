// @ts-nocheck
"use client";

import React, { useState } from "react";
import Image from "../../../PetImage";
import {
    FaPaw,
    FaShower,
    FaBroom,
    FaStethoscope,
    FaBath,
    FaCheckCircle,
    FaShieldAlt,
    FaHeart,
    FaSearch,
    FaSmile,
    FaDog,
    FaWalking,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { ChevronRight, Sparkles as FaSparkles } from "lucide-react";

interface ServiceIncludedProps {
    data: ServiceDetailItem;
}

const renderTabIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-[#F37021]";
    switch (iconName) {
        case "FaShower":
        case "FaBath":
            return <FaShower className={iconClass} />;
        case "FaBroom":
            return <FaBroom className={iconClass} />;
        case "FaScissors":
            return <FaScissors className={iconClass} />;
        case "FaStethoscope":
            return <FaStethoscope className={iconClass} />;
        case "FaSparkles":
            return <FaSparkles className={iconClass} />;
        case "FaDog":
            return <FaDog className={iconClass} />;
        case "FaWalking":
            return <FaWalking className={iconClass} />;
        default:
            return <FaPaw className={iconClass} />;
    }
};

const renderBenefitIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-[#F37021]";
    switch (iconName) {
        case "FaShower":
            return <FaShower className={iconClass} />;
        case "FaShieldAlt":
            return <FaShieldAlt className={iconClass} />;
        case "FaHeart":
            return <FaHeart className={iconClass} />;
        case "FaSearch":
            return <FaSearch className={iconClass} />;
        case "FaSmile":
            return <FaSmile className={iconClass} />;
        default:
            return <FaPaw className={iconClass} />;
    }
};

export default function ServiceIncluded({ data }: ServiceIncludedProps) {
    const includedSection = data?.includedSection;
    const benefitsSection = data?.benefitsSection;

    const [activeIndex, setActiveIndex] = useState(0);

    if (!includedSection || !includedSection.items?.length) return null;

    const activeItem = includedSection.items[activeIndex] || includedSection.items[0];

    return (
        <section className="w-full mt-12 sm:mt-16 lg:mt-20">
            <div className="flex flex-col items-start mb-8">
                <div className="inline-flex items-center gap-1.5 mt-2 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-1.5">
                    <FaPaw className="w-5 h-5 text-[#F37021]" />
                    <span>{includedSection.badge || "WHAT'S INCLUDED"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3E1408] tracking-tight">
                    {includedSection.title}

                </h2>

            </div>
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)_minmax(270px,0.95fr)]">
                <div className="bg-[#FFF7F2] rounded-3xl p-3 sm:p-4 border border-[#FDEAE0] shadow-2xs space-y-2">
                    {includedSection.items.map((item, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                data-editor-no-inline
                                onClick={() => setActiveIndex(idx)}
                                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${isActive
                                        ? "bg-white border-2 border-[#F37021] shadow-xs"
                                        : "bg-transparent border border-transparent hover:bg-white/60"
                                    }`}
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div
                                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${isActive ? "bg-[#FFF0E6]" : "bg-[#FFF0E6]/80"
                                            }`}
                                    >
                                        {renderTabIcon(item.icon)}
                                    </div>
                                    <div className="min-w-0">
                                        <h3
                                            className={`text-sm sm:text-base font-extrabold leading-snug ${isActive ? "text-[#F37021]" : "text-[#3E1408]"
                                                }`}
                                        >
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-snug text-[#796B66] font-normal mt-0.5">
                                            {item.shortDesc}
                                        </p>
                                    </div>
                                </div>

                                {isActive && (
                                    <ChevronRight className="w-5 h-5 text-[#F37021] shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-100 shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden mb-5 border border-neutral-100">
                            <Image
                                src={activeItem.image || data.heroImage}
                                alt={activeItem.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover object-center"
                            />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#3E1408] mb-2">
                            {activeItem.title}
                        </h3>
                        <p className="text-sm md:text-[16px] text-[#615147] font-normal leading-relaxed mb-5">
                            {activeItem.fullDesc || activeItem.shortDesc}
                        </p>
                        {activeItem.bulletPoints && activeItem.bulletPoints.length > 0 && (
                            <div className="space-y-2">
                                {activeItem.bulletPoints.map((point, pIdx) => (
                                    <div key={pIdx} className="flex items-center gap-2.5 text-sm md:text-[16px] text-[#3E1408] ">
                                        <FaCheckCircle className="w-4 h-4 text-[#F37021] shrink-0" />
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {benefitsSection && (
                    <div>
                        <div className="bg-[#FFF7F2] rounded-3xl p-5 sm:p-6 border border-[#FDEAE0] shadow-2xs">

                            <div className="mb-5">
                                <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm tracking-widest uppercase mb-1">
                                    <FaPaw className="w-5 h-5 text-[#F37021]" />
                                    <span>{benefitsSection.badge || "BENEFITS"}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-extrabold text-[#3E1408] leading-tight mt-1">
                                    {benefitsSection.title || "Why Regular Grooming Matters"}
                                </h3>
                            </div>
                            <div className="divide-y divide-[#FDEAE0]">
                                {benefitsSection.items?.map((benefit, bIdx) => (
                                    <div
                                        key={benefit.id}
                                        className={`flex gap-3.5 items-start ${bIdx === 0 ? "pb-3.5" : bIdx === (benefitsSection.items.length - 1) ? "pt-3.5" : "py-3.5"
                                            }`}
                                    >
                                        <div className="w-11 h-11 rounded-full bg-[#FFF0E6] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                            {renderBenefitIcon(benefit.icon)}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-extrabold text-[#3E1408] mb-0.5 leading-tight whitespace-nowrap">
                                                {benefit.title}
                                            </h4>
                                            <p className="text-sm text-[#796B66] font-normal leading-snug">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
