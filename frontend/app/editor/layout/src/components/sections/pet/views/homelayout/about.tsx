// @ts-nocheck
"use client";
import { usePetSite } from "../../petSite";

import React from "react";
import Image from "../../PetImage";
import Link from "../../PetLink";
import { motion } from "framer-motion";
import { FadeIn, ScaleIn } from "../ui/animations";
import { ArrowRight } from "lucide-react";
import { FaPaw } from "react-icons/fa";




export default function About() {
const petData = usePetSite();
const aboutData: AboutData = petData.about;

    if (!aboutData) return null;

    return (
        <section className="relative w-full bg-[#F37021] py-16 sm:py-20 overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

                    <div className="lg:col-span-6 flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[620px] min-h-[370px] sm:min-h-[480px] lg:min-h-[530px] flex items-center justify-end">

                            <ScaleIn delay={0.1} className="absolute top-0 left-0 sm:top-2 sm:left-2 lg:left-0 z-20">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-white flex flex-col items-center justify-center text-center p-3 sm:p-4 border-4 border-white cursor-pointer"
                                >
                                    <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#F37021] leading-none mb-1 tracking-tight">
                                        {aboutData.experienceYears}
                                    </span>
                                    <span className="text-[11px] sm:text-sm lg:text-sm font-semibold text-[#F37021] leading-tight px-1 max-w-[135px]">
                                        {aboutData.experienceTitle}
                                    </span>
                                </motion.div>
                            </ScaleIn>
                            <ScaleIn delay={0.2} className="absolute bottom-0 left-0 sm:bottom-2 sm:left-4 lg:left-2 z-20">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-[5px] sm:border-[6px] border-white shadow-xl cursor-pointer relative"
                                >
                                    <Image
                                        src={aboutData.secondaryImage || "/about2.jpg"}
                                        alt="Pet grooming detail"
                                        fill
                                        sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px, 208px"
                                        className="object-cover object-center"
                                    />
                                </motion.div>
                            </ScaleIn>

                            <ScaleIn delay={0} className="relative z-10 ml-auto mr-0">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="relative w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[480px] xl:h-[480px] rounded-full overflow-hidden border-[6px] sm:border-[8px] border-white shadow-2xl cursor-pointer"
                                >
                                    <Image
                                        src={aboutData.mainImage || "/about1.jpg"}
                                        alt="Expert groomer with pet"
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 270px, (max-width: 1024px) 380px, 480px"
                                        className="object-cover object-center"
                                    />
                                </motion.div>
                            </ScaleIn>

                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col justify-center text-white">

                        <FadeIn direction="up" delay={0.05}>
                            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                                <FaPaw className="w-4.5 h-4.5 text-white shrink-0" />
                                <span className="text-white font-bold text-sm sm:text-base tracking-wider uppercase">
                                    {aboutData.badge}
                                </span>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.1}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight max-w-2xl">
                                {aboutData.title}
                            </h2>
                        </FadeIn>

                        <div className="flex flex-col gap-4 sm:gap-5 mb-8 max-w-2xl">
                            {aboutData.paragraphs?.map((para, index) => (
                                <FadeIn key={index} direction="up" delay={0.15 + index * 0.05}>
                                    <p className="text-white/95 text-justify text-base sm:text-lg leading-relaxed font-normal">
                                        {para}
                                    </p>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn direction="up" delay={0.25}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="w-fit"
                            >
                                <Link
                                    href={aboutData.btnLink}
                                    className="group inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-[#F37021] font-bold text-sm sm:text-base tracking-wider px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-colors duration-200 uppercase w-fit"
                                >
                                    <span>{aboutData.btnText}</span>
                                    <ArrowRight className="w-5 h-5 text-[#F37021] transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </FadeIn>

                    </div>

                </div>
            </div>
        </section>
    );
}

