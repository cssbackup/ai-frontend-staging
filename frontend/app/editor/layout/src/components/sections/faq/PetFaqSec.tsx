// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React, { useState } from "react";
import Image from "../data/pet/PetImage";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../data/pet/animations";
import {
    FaPaw,
    FaPlus,
    FaMinus,
    FaHeadset,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";




export default function FaqSec() {
const petData = usePetSite();
const faqData: FaqSecData | undefined = petData.faqSec;

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!faqData) return null;

    const { titlePrefix, titleHighlight, titleSuffix, description, sidebar, faqs } = faqData;

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="flex flex-col items-center text-center mb-6">
                    <FadeIn direction="up" delay={0.05}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight leading-tight mb-2.5">
                            {titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {titleHighlight}
                            </span>{" "}
                            {titleSuffix}
                        </h2>
                    </FadeIn>
                    <div className="flex items-center justify-center gap-2.5 mb-3.5">
                        <div className="h-[1.5px] w-10 bg-[#F37021] rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-10 bg-[#F37021] rounded-full" />
                    </div>
                    <FadeIn direction="up" delay={0.1}>
                        <p className="text-sm  sm:text-base text-[#615147] font-normal max-w-xl mx-auto">
                            {description}
                        </p>
                    </FadeIn>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                    <div className="lg:col-span-5 flex flex-col items-center">
                        <FadeIn direction="up" delay={0.15} className="w-full">
                            <div className="relative w-full">
                                <div className="relative w-full h-[230px] flex items-end justify-center">
                                    <div className="absolute bottom-0 w-[88%] h-[82%] bg-[#FDEFE5] rounded-t-full z-0" />

                                    <FaPaw className="absolute top-6 left-6 w-10 h-10 text-[#F37021]/20 -rotate-12" />
                                    <FaPaw className="absolute top-12 right-6 w-10 h-10 text-[#F37021]/20 rotate-12" />

                                    {sidebar?.image && (
                                        <div className="relative w-full h-full z-10">
                                            <Image
                                                src={sidebar.image}
                                                alt="Pet Care Support"
                                                fill
                                                sizes="(max-width: 640px) 100vw, 420px"
                                                className="object-contain object-bottom"
                                                priority
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="bg-[#FFF5EE] rounded-[28px] p-6 sm:p-9 border border-[#F7EBE1] shadow-sm relative overflow-hidden flex flex-col pt-8 -mt-2">

                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-13 h-13 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-md shrink-0">
                                            <FaHeadset className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2C1810] leading-tight">
                                                {sidebar?.titlePrefix || "Still Have"}{" "}
                                                <span className="text-[#F37021]">
                                                    {sidebar?.titleHighlight || "Questions?"}
                                                </span>
                                            </h3>
                                            <p className="text-sm sm:text-sm text-[#615147] mt-1.5 leading-relaxed">
                                                {sidebar?.subtitle || "We're here to help! Reach out to our team and we'll be happy to assist you."}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 sm:space-y-5 mb-8">
                                        {sidebar?.phone && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#F37021] flex items-center justify-center shadow-xs shrink-0">
                                                    <FaPhoneAlt className="w-4.5 h-4.5" />
                                                </div>
                                                <div>
                                                    <span className="text-md font-bold text-[#2C1810] block">Call Us</span>
                                                    <span className="text-sm sm:text-sm text-[#615147] font-semibold">{sidebar.phone}</span>
                                                </div>
                                            </div>
                                        )}
                                        {sidebar?.email && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#F37021] flex items-center justify-center shadow-xs shrink-0">
                                                    <FaEnvelope className="w-4.5 h-4.5" />
                                                </div>
                                                <div>
                                                    <span className="text-md font-bold text-[#2C1810] block">Email Us</span>
                                                    <span className="text-sm sm:text-sm text-[#615147] font-semibold">{sidebar.email}</span>
                                                </div>
                                            </div>
                                        )}
                                        {sidebar?.address && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#F37021] flex items-center justify-center shadow-xs shrink-0">
                                                    <FaMapMarkerAlt className="w-4.5 h-4.5" />
                                                </div>
                                                <div>
                                                    <span className="text-md font-bold text-[#2C1810] block">Visit Us</span>
                                                    <span className="text-sm text-[#615147] font-medium leading-tight block max-w-[240px]">{sidebar.address}</span>
                                                </div>
                                            </div>
                                        )}
                                        {sidebar?.hours && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-[#F37021] flex items-center justify-center shadow-xs shrink-0">
                                                    <FaClock className="w-4.5 h-4.5" />
                                                </div>
                                                <div>
                                                    <span className="text-md font-bold text-[#2C1810] block">Opening Hours</span>
                                                    <span className="text-sm text-[#615147] font-semibold">{sidebar.hours}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full pt-4 border-t border-[#F7EBE1]/80 relative flex items-end justify-between px-1 opacity-80 pointer-events-none">
                                        <div className="flex flex-col items-center">
                                            <svg width="56" height="46" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M30 5L5 25H12V45H48V25H55L30 5Z" fill="#F8DFCE" />
                                                <circle cx="30" cy="33" r="4" fill="#FFF5EE" />
                                                <circle cx="25" cy="26" r="2" fill="#FFF5EE" />
                                                <circle cx="35" cy="26" r="2" fill="#FFF5EE" />
                                                <circle cx="23" cy="31" r="2" fill="#FFF5EE" />
                                                <circle cx="37" cy="31" r="2" fill="#FFF5EE" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-center mb-0.5">
                                            <svg width="26" height="16" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3C3 1.34315 4.34315 0 6 0H24C25.6569 0 27 1.34315 27 3V6C27 12.6274 21.6274 18 15 18C8.37258 18 3 12.6274 3 6V3Z" fill="#F8DFCE" />
                                                <circle cx="15" cy="9" r="2.5" fill="#FFF5EE" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-center mb-0.5">
                                            <svg width="65" height="26" viewBox="0 0 70 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="55" cy="15" r="10" fill="#F8DFCE" />
                                                <path d="M50 12C53 10 57 18 60 15" stroke="#FFF5EE" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M0 22C15 22 25 15 45 16" stroke="#F8DFCE" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </FadeIn>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-3.5">
                        {faqs?.map((item, idx) => {
                            const isOpen = openIndex === idx;

                            return (
                                <FadeIn key={item.id || idx} direction="up" delay={0.1 + idx * 0.04}>
                                    <div
                                        onClick={() => toggleFaq(idx)}
                                        className={`bg-white rounded-[20px] p-5 sm:p-6 transition-all duration-300 cursor-pointer select-none border ${isOpen
                                            ? "border-[#F37021] shadow-sm"
                                            : "border-neutral-100 hover:border-[#F37021]/40 shadow-xs"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3.5">
                                                <div
                                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-sm font-extrabold flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen
                                                        ? "bg-[#F37021] text-white"
                                                        : "border-2 border-[#F37021] text-[#F37021] bg-white"
                                                        }`}
                                                >
                                                    {idx + 1}
                                                </div>

                                                <h3 className="font-bold text-[#2C1810] text-sm sm:text-base md:text-[16px] leading-snug">
                                                    {item.question}
                                                </h3>
                                            </div>
                                            <div className="text-[#F37021] font-bold shrink-0">
                                                {isOpen ? (
                                                    <FaMinus className="w-4 h-4 text-[#F37021]" />
                                                ) : (
                                                    <FaPlus className="w-4 h-4 text-[#F37021]" />
                                                )}
                                            </div>
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-[#615147] text-[15px] leading-relaxed pt-4 pl-10 sm:pl-11 border-t border-neutral-100 mt-3">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}
