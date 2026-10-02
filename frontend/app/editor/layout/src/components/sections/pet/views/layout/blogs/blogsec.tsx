// @ts-nocheck
"use client";
import { usePetSite } from "../../../petSite";

import React, { useState } from "react";
import Image from "../../../PetImage";
import Link from "../../../PetLink";
import {
    FadeIn,
    StaggerContainer,
    StaggerItem,
    MotionCard,
} from "../../ui/animations";
import Pagination from "../../ui/pagination";
import { ArrowRight, Calendar } from "lucide-react";
import { FaPaw } from "react-icons/fa";




export default function BlogSec() {
const petData = usePetSite();
const blogSecData: BlogSecData = (petData.blogSec || petData.ourBlogs) as BlogSecData;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;

    if (!blogSecData) return null;

    const posts = (blogSecData.posts || []).filter((post) => post.hidden !== true);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const sectionElement = document.getElementById("blog-section");
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="blog-section" className="relative max-w-[1320px] mt-4 sm:mt-6 md:mt-8 lg:mt-10 mx-auto w-full overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                    <FadeIn direction="up" delay={0.05}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B26] tracking-tight leading-tight mb-2.5">
                            {blogSecData.titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {blogSecData.titleHighlight}
                            </span>
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.1}>
                        <div className="flex items-center justify-center gap-2.5 my-2">
                            <div className="h-[1.5px] w-8 bg-[#F37021]/50 rounded-full" />
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <div className="h-[1.5px] w-8 bg-[#F37021]/50 rounded-full" />
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.15}>
                        <p className="text-sm sm:text-base text-[#615147] max-w-xl mx-auto font-normal leading-relaxed mt-1">
                            {blogSecData.description}
                        </p>
                    </FadeIn>

                </div>
                <StaggerContainer key={currentPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                    {currentPosts.map((post) => (
                        <StaggerItem key={post.id} direction="up">
                            <MotionCard hoverY={-6} hoverScale={1.01} className="h-full">
                                <div className="relative bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden p-4 sm:p-4.5 border border-amber-900/10 shadow-xs flex flex-col justify-between group h-full">
                                    <Link
                                        href={post.link || `/blog/${post.id}`}
                                        aria-label={post.title}
                                        data-editor-no-inline
                                        className="absolute inset-0 z-0"
                                    />
                                    <div className="pointer-events-none relative z-[1] flex flex-col flex-1">
                                    <div className="relative w-full h-[210px] sm:h-[230px] overflow-hidden rounded-[20px] mb-4">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-[#F37021] text-sm font-bold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 border border-neutral-100">
                                            <FaPaw className="w-3.5 h-3.5 text-[#F37021]" />
                                            <span>{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 text-left px-1.5 pb-1">

                                        <div className="flex items-center gap-2 text-sm font-semibold text-[#F37021] mb-2">
                                            <Calendar className="w-4 h-4 text-[#F37021]" strokeWidth={2} />
                                            <span>{post.date}</span>
                                        </div>
                                        <h2 className="pointer-events-auto text-base sm:text-lg lg:text-[19px] font-extrabold text-[#1E1B26] mb-2 leading-snug group-hover:text-[#F37021] transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="pointer-events-auto text-sm sm:text-sm text-[#615147] font-normal leading-relaxed mb-5 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-[#F37021] font-extrabold text-sm group-hover:text-[#d95c0e] transition-colors mt-auto group/link">
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2.5} />
                                        </span>

                                    </div>
                                    </div>
                                </div>
                            </MotionCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </div>
        </section>
    );
}
