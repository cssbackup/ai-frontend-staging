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
import { ArrowRight, Calendar } from "lucide-react";
import { FaPaw } from "react-icons/fa";




export default function Blogs() {
const petData = usePetSite();
const blogsData: OurBlogsData = petData.ourBlogs as OurBlogsData;

    if (!blogsData) return null;

    return (
        <section className="relative max-w-[1320px] mt-8 sm:mt-10 md:mt-12 lg:mt-14 mx-auto w-full overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <div className="flex flex-col items-center text-center">

                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-1.5 text-[#F37021] font-bold text-sm sm:text-sm tracking-widest uppercase mb-2 sm:mb-3">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{blogsData.badge}</span>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.1}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B26] tracking-tight leading-tight mb-3.5 max-w-3xl">
                            {blogsData.titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {blogsData.titleHighlight}
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
                            {blogsData.description}
                        </p>
                    </FadeIn>

                </div>


                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 lg:gap-7 w-full">
                    {blogsData.posts?.filter((post) => post.hidden !== true).slice(0, 4).map((post) => (
                        <StaggerItem key={post.id} direction="up">
                            <MotionCard hoverY={-6} hoverScale={1.01} className="h-full">
                                <Link
                                    href={post.link || `/blog/${post.id}`}
                                    className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden p-4 border border-amber-900/10 flex flex-col justify-between group cursor-pointer h-full block"
                                >

                                    <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden rounded-[20px] mb-4">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#F37021] text-sm font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-neutral-100">
                                            {post.category !== "Pet Health" && (
                                                <FaPaw className="w-3 h-3 text-[#F37021]" />
                                            )}
                                            <span>{post.category}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-1 text-left px-1 pb-1">


                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#F37021] mb-2">
                                            <Calendar className="w-3.5 h-3.5 text-[#F37021]" strokeWidth={2} />
                                            <span>{post.date}</span>
                                        </div>


                                        <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B26] mb-2 leading-snug group-hover:text-[#F37021] transition-colors">
                                            {post.title}
                                        </h3>


                                        <p className="text-sm sm:text-sm text-[#615147] font-normal leading-relaxed mb-5 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <span className="inline-flex items-center gap-1.5 text-[#F37021] font-extrabold text-sm group-hover:text-[#d95c0e] transition-colors mt-auto group/link">
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2.5} />
                                        </span>

                                    </div>
                                </Link>
                            </MotionCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

            </div>
        </section>
    );
}
