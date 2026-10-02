// @ts-nocheck
"use client";

import React from "react";
import {
    FaPaw,
    FaSearch,
    FaShower,
    FaLightbulb,
    FaBullhorn,
    FaUsers,
    FaAward,
    FaCheckDouble,
    FaHome,
    FaSmile,
    FaRunning,
    FaStar,
    FaCheck,
    FaBrain,
    FaClipboard,
    FaStethoscope,
    FaFlask,
    FaPills,
    FaHeart,
    FaBroom,
    FaBath,
    FaWind,
    FaComments,
    FaCut,
    FaSyringe,
    FaBed,
    FaWalking,
    FaUtensils,
    FaChartLine,
} from "react-icons/fa";
import {
    FaScissors,
    FaListCheck,
    FaHeartPulse,
} from "react-icons/fa6";
import { Sparkles as FaSparkles } from "lucide-react";

interface ServiceProcessProps {
    data: ServiceDetailItem;
}

const renderProcessIcon = (iconName: string) => {
    const iconClass = "w-7 h-7 sm:w-8 sm:h-8 text-[#F37021]";
    switch (iconName) {
        case "FaSearch":
            return <FaSearch className={iconClass} />;
        case "FaShower":
            return <FaShower className={iconClass} />;
        case "FaScissors":
            return <FaScissors className={iconClass} />;
        case "FaSparkles":
            return <FaSparkles className={iconClass} />;
        case "FaPaw":
            return <FaPaw className={iconClass} />;
        case "FaLightbulb":
            return <FaLightbulb className={iconClass} />;
        case "FaBullhorn":
            return <FaBullhorn className={iconClass} />;
        case "FaUsers":
            return <FaUsers className={iconClass} />;
        case "FaAward":
            return <FaAward className={iconClass} />;
        case "FaListCheck":
            return <FaListCheck className={iconClass} />;
        case "FaCheckDouble":
            return <FaCheckDouble className={iconClass} />;
        case "FaHome":
            return <FaHome className={iconClass} />;
        case "FaSmile":
            return <FaSmile className={iconClass} />;
        case "FaRunning":
            return <FaRunning className={iconClass} />;
        case "FaStar":
            return <FaStar className={iconClass} />;
        case "FaCheck":
            return <FaCheck className={iconClass} />;
        case "FaBrain":
            return <FaBrain className={iconClass} />;
        case "FaClipboard":
            return <FaClipboard className={iconClass} />;
        case "FaStethoscope":
            return <FaStethoscope className={iconClass} />;
        case "FaFlask":
            return <FaFlask className={iconClass} />;
        case "FaPills":
            return <FaPills className={iconClass} />;
        case "FaHeart":
            return <FaHeart className={iconClass} />;
        case "FaBroom":
            return <FaBroom className={iconClass} />;
        case "FaBath":
            return <FaBath className={iconClass} />;
        case "FaWind":
            return <FaWind className={iconClass} />;
        case "FaComments":
            return <FaComments className={iconClass} />;
        case "FaCut":
            return <FaCut className={iconClass} />;
        case "FaSyringe":
            return <FaSyringe className={iconClass} />;
        case "FaHeartPulse":
            return <FaHeartPulse className={iconClass} />;
        case "FaBed":
            return <FaBed className={iconClass} />;
        case "FaWalking":
            return <FaWalking className={iconClass} />;
        case "FaUtensils":
            return <FaUtensils className={iconClass} />;
        case "FaChartLine":
            return <FaChartLine className={iconClass} />;
        default:
            return <FaPaw className={iconClass} />;
    }
};

export default function ServiceProcess({ data }: ServiceProcessProps) {
    const processSection = data?.processSection;

    if (!processSection || !processSection.items?.length) return null;

    return (
        <section className="w-full mt-6 md:mt-8">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-1.5">
                    <FaPaw className="w-4 h-4 text-[#F37021]" />
                    <span>{processSection.badge || "OUR GROOMING PROCESS"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3E1408] tracking-tight mb-3">
                    {processSection.title || "Care in Every Step"}
                </h2>

                <div className="flex items-center justify-center gap-3">
                    <div className="h-[1.5px] w-12 sm:w-16 bg-[#F37021]/40 rounded-full" />
                    <FaPaw className="w-4 h-4 text-[#F37021]" aria-hidden="true" />
                    <div className="h-[1.5px] w-12 sm:w-16 bg-[#F37021]/40 rounded-full" />
                </div>
            </div>
            <div className="relative w-full">
                <div className="hidden lg:block absolute top-[74px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#F37021]/50 z-0" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                    {processSection.items.map((step, idx) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="relative flex flex-col items-center mb-3.5">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F37021] text-white text-sm sm:text-sm font-extrabold flex items-center justify-center shadow-xs z-20 mb-[-10px]">
                                    {step.stepNumber || idx + 1}
                                </div>
                                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-26 lg:h-26 rounded-full bg-[#FFF0E6] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFE6D6] shadow-2xs z-10 border-4 border-white">
                                    {renderProcessIcon(step.icon)}
                                </div>
                            </div>
                            <h3 className="text-base sm:text-lg font-extrabold text-[#3E1408] mb-1.5 leading-snug">
                                {step.title}
                            </h3>
                            <p className="text-sm md:text-[16px] text-[#615147] font-normal leading-relaxed max-w-[210px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

