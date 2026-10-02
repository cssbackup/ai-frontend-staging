// @ts-nocheck
"use client";

import React, { useState } from "react";
import Image from "../../../PetImage";
import { defaultEnquireForm } from "../../../petDefaults";
import {
    FaPaw,
    FaShieldAlt,
    FaHeart,
    FaStethoscope,
    FaShower,
    FaBroom,
    FaAward,
    FaUserCheck,
    FaHome,
    FaStar,
    FaBrain,
    FaFlask,
    FaSyringe,
    FaAmbulance,
    FaLeaf,
    FaWind,
    FaUserNurse,
    FaBed,
    FaUtensils,
    FaWalking,
    FaRunning,
} from "react-icons/fa";
import {
    FaScissors,
    FaHeartPulse,
} from "react-icons/fa6";
import { Sparkles as FaSparkles } from "lucide-react";

interface ServiceHeroProps {
    data: ServiceDetailItem;
}
const renderIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 sm:w-8 sm:h-8 text-[#F37021]";
    switch (iconName) {
        case "FaShieldAlt":
            return <FaShieldAlt className={iconClass} />;
        case "FaScissors":
            return <FaScissors className={iconClass} />;
        case "FaHeart":
            return <FaHeart className={iconClass} />;
        case "FaSparkles":
            return <FaSparkles className={iconClass} />;
        case "FaStethoscope":
            return <FaStethoscope className={iconClass} />;
        case "FaShower":
            return <FaShower className={iconClass} />;
        case "FaBroom":
            return <FaBroom className={iconClass} />;
        case "FaAward":
            return <FaAward className={iconClass} />;
        case "FaUserCheck":
            return <FaUserCheck className={iconClass} />;
        case "FaHome":
            return <FaHome className={iconClass} />;
        case "FaStar":
            return <FaStar className={iconClass} />;
        case "FaBrain":
            return <FaBrain className={iconClass} />;
        case "FaFlask":
            return <FaFlask className={iconClass} />;
        case "FaSyringe":
            return <FaSyringe className={iconClass} />;
        case "FaAmbulance":
            return <FaAmbulance className={iconClass} />;
        case "FaLeaf":
            return <FaLeaf className={iconClass} />;
        case "FaWind":
            return <FaWind className={iconClass} />;
        case "FaHeartPulse":
            return <FaHeartPulse className={iconClass} />;
        case "FaUserNurse":
            return <FaUserNurse className={iconClass} />;
        case "FaBed":
            return <FaBed className={iconClass} />;
        case "FaUtensils":
            return <FaUtensils className={iconClass} />;
        case "FaWalking":
            return <FaWalking className={iconClass} />;
        case "FaRunning":
            return <FaRunning className={iconClass} />;
        default:
            return <FaPaw className={iconClass} />;
    }
};

export default function ServiceHero({ data }: ServiceHeroProps) {
    const [formSubmitted, setFormSubmitted] = useState(false);

    if (!data) return null;

    const formConfig = data?.enquireForm || defaultEnquireForm;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 4000);
    };

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">

                <div className="lg:col-span-4 flex flex-col justify-between py-1">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-2">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{data.badge || "OUR SERVICE"}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#3E1408] tracking-tight leading-tight mb-4">
                            {data.titlePrefix ? (
                                <span className="text-[#F37021] relative inline-block mr-2 pb-1">
                                    {data.titlePrefix}
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F37021]/40 rounded-full" />
                                </span>
                            ) : null}
                            <span>{data.titleHighlight || data.title}</span>
                        </h1>
                        <p className="text-sm sm:text-sm md:text-base text-[#615147] font-normal leading-relaxed mb-6 max-w-sm">
                            {data.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-2">
                        {data.heroFeatures?.map((feat) => (
                            <div
                                key={feat.id}
                                className="flex flex-col items-center text-center group cursor-pointer"
                            >
                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF0E6] flex items-center justify-center mb-1.5 transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                                    {renderIcon(feat.icon)}
                                </div>
                                <span className="text-[11px] sm:text-sm font-extrabold text-[#3E1408] leading-tight">
                                    {feat.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-5 min-h-[300px] sm:min-h-[360px] lg:min-h-full relative rounded-3xl overflow-hidden shadow-xs border border-neutral-100">
                    <Image
                        src={data.heroImage}
                        alt={data.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover object-center"
                    />
                </div>
                <div className="lg:col-span-3 flex flex-col h-full">
                    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-100 shadow-xs flex flex-col justify-between h-full">
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg sm:text-xl font-extrabold text-[#3E1408] tracking-tight">
                                    {formConfig?.title || "Enquire Now"}
                                </h3>

                            </div>
                            <p className="text-sm md:text-md font-semibold text-[#796B66] font-normal leading-relaxed">
                                {formConfig?.subtitle || "Fill out the form and our team will get back to you shortly."}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-2.5">
                            <div>
                                <input
                                    type="text"
                                    required
                                    placeholder={formConfig?.namePlaceholder || "Your Name *"}
                                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-sm text-[#3E1408] placeholder:text-[#9E8E88] focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    required
                                    placeholder={formConfig?.emailPlaceholder || "Email Address *"}
                                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-sm text-[#3E1408] placeholder:text-[#9E8E88] focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    required
                                    placeholder={formConfig?.phonePlaceholder || "Phone Number *"}
                                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-sm text-[#3E1408] placeholder:text-[#9E8E88] focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
                                />
                            </div>

                            <div>
                                <select
                                    defaultValue=""
                                    required
                                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-sm text-[#3E1408] focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all cursor-pointer"
                                >
                                    <option value="" disabled>
                                        {formConfig?.selectServicePlaceholder || "Select Service *"}
                                    </option>
                                    {formConfig?.serviceOptions?.map((opt: { value: string; label: string }) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <textarea
                                    rows={2}
                                    placeholder={formConfig?.messagePlaceholder || "Your Message"}
                                    className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-sm text-[#3E1408] placeholder:text-[#9E8E88] focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#F37021] hover:bg-[#d95c0e] text-white font-extrabold text-sm sm:text-sm px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-1"
                            >
                                <span>{formConfig?.submitBtnText || "Submit Enquiry"}</span>
                                <FaPaw className="w-3.5 h-3.5 text-white" />
                            </button>

                            {formSubmitted && (
                                <p className="text-sm text-emerald-600 font-bold text-center mt-1">
                                    {formConfig?.successMessage || "Thank you! We will reach out to you."}
                                </p>
                            )}
                        </form>

                    </div>
                </div>

            </div>
        </section>
    );
}