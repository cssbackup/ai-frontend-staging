// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React, { useState, useRef } from "react";
import Image from "../data/pet/PetImage";
import { motion } from "framer-motion";
import Link from "../data/pet/PetLink";
import {
    FadeIn,
    MotionCard,
} from "../data/pet/animations";
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import Statistics from "../data/pet/statistics";




export default function Services() {
const petData = usePetSite();
const serviceData: ServiceAreasData = petData.serviceAreas as ServiceAreasData;

    const [activeDot, setActiveDot] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!serviceData) return null;

    const handlePrev = () => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.75;
            scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    const handleNext = () => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.75;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll <= 0) return;
        const scrollRatio = scrollLeft / maxScroll;
        if (scrollRatio < 0.33) setActiveDot(0);
        else if (scrollRatio < 0.66) setActiveDot(1);
        else setActiveDot(2);
    };

    const handleDotClick = (index: number) => {
        setActiveDot(index);
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            const targetScroll = (maxScroll / 2) * index;
            scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14 overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="flex flex-col items-center text-center mb-6">
                  
                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-2">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{serviceData.badge}</span>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#2C1810] tracking-tight leading-tight mb-3.5 max-w-3xl">
                            {serviceData.titlePrefix} {serviceData.titleMiddle}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {serviceData.titleSuffix}
                            </span>
                        </h2>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-md mx-auto mb-3 font-normal leading-relaxed">
                            {serviceData.description}
                        </p>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <div className="flex items-center justify-center gap-2.5 mt-1">
                            <div className="h-[1.5px] w-7 sm:w-8 bg-[#F37021]/50 rounded-full" />
                            <FaPaw
                                className="w-5 h-5 text-[#F37021]"
                                aria-hidden="true"
                            />
                            <div className="h-[1.5px] w-7 sm:w-8 bg-[#F37021]/50 rounded-full" />
                        </div>
                    </FadeIn>
                </div>
                <FadeIn direction="up" delay={0.25}>
                    <div className="relative flex items-center gap-3 sm:gap-4">

                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#F37021", color: "#ffffff" }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            onClick={handlePrev}
                            aria-label="Previous locations"
                            className="hidden sm:flex shrink-0 w-10 h-10 rounded-full border-2 border-[#F37021]/30 text-[#F37021] bg-white items-center justify-center shadow-xs transition-colors duration-200 cursor-pointer z-10 group"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#F37021] group-hover:text-white transition-colors" />
                        </motion.button>
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto gap-4 sm:gap-5 w-full pb-3 pt-1 scroll-smooth snap-x snap-mandatory [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            <div className="flex gap-4 sm:gap-5 min-w-full flex-nowrap">
                                {serviceData.locations?.map((loc, idx) => (
                                    <motion.div
                                        key={loc.id || idx}
                                        initial={{ opacity: 0.5, scale: 0.93, y: 15 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ amount: 0.25 }}
                                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: idx * 0.05 }}
                                        className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(20%-1rem)] shrink-0 snap-start"
                                    >
                                        <MotionCard
                                            hoverY={-8}
                                            hoverScale={1.02}
                                            className="bg-white rounded-t-[58px] sm:rounded-t-[70px] rounded-b-[22px] p-2.5 sm:p-3 border border-neutral-100 shadow-md flex flex-col items-center text-center group cursor-pointer h-full"
                                        >
                                            <Link href={loc.link || `/servicelocation/${loc.name.toLowerCase()}`} className="w-full h-full flex flex-col items-center">

                                                <div
                                                    data-editor-no-inline
                                                    className="relative w-full h-[180px] sm:h-[195px] overflow-hidden rounded-t-[48px] sm:rounded-t-[60px]"
                                                >
                                                    <Image
                                                        src={loc.image}
                                                        alt={loc.name}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                                                        className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                                                    />
                                                    <div className="pointer-events-none absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#2C1810] shadow-xs">
                                                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                                                    </div>
                                                </div>
                                                <motion.div
                                                    data-editor-no-inline
                                                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="relative z-10 w-11 h-11 rounded-full bg-white shadow-md border border-neutral-100 flex items-center justify-center -mt-5.5 mb-2 shrink-0 group-hover:bg-[#F37021] transition-colors duration-300"
                                                >
                                                    <FaMapMarkerAlt className="w-5 h-5 text-[#F37021] group-hover:text-white transition-colors duration-300" />
                                                </motion.div>
                                                <h3 className="whitespace-nowrap text-lg sm:text-xl font-extrabold text-[#1E1B26] mb-1 group-hover:text-[#F37021] transition-colors">
                                                    {loc.name}
                                                </h3>
                                                <p className="text-sm sm:text-sm text-[#7A6A60] px-3 pb-3 font-normal leading-relaxed max-w-[240px]">
                                                    {loc.description}
                                                </p>
                                            </Link>
                                        </MotionCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#F37021", color: "#ffffff" }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleNext}
                            aria-label="Next locations"
                            className="hidden sm:flex shrink-0 w-10 h-10 rounded-full border-2 border-[#F37021]/30 text-[#F37021] bg-white items-center justify-center shadow-xs transition-colors duration-200 cursor-pointer z-10 group"
                        >
                            <ChevronRight className="w-5 h-5 text-[#F37021] group-hover:text-white transition-colors" />
                        </motion.button>

                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.3}>
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {[0, 1, 2].map((dotIndex) => (
                            <motion.button
                                key={dotIndex}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => handleDotClick(dotIndex)}
                                aria-label={`Go to slide ${dotIndex + 1}`}
                                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${activeDot === dotIndex
                                    ? "bg-[#F37021] scale-110"
                                    : "bg-neutral-300 hover:bg-neutral-400"
                                    }`}
                            />
                        ))}
                    </div>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.35}>
                    <Statistics stats={serviceData.stats} />
                </FadeIn>

            </div>
        </section>
    );
}
