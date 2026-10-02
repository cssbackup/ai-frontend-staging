// @ts-nocheck
"use client";

import React from "react";
import Image from "../../../PetImage";
import { FaPaw, FaRegCalendarAlt, FaRegUser, FaRegClock } from "react-icons/fa";

interface BlogContentProps {
    data: BlogDetailItem;
}

export default function BlogContent({ data }: BlogContentProps) {
    if (!data) return null;

    return (
        <article className="w-full">
            <div className="inline-block bg-[#FFF0E6] text-[#F37021] font-bold text-sm sm:text-sm px-4 py-1.5 rounded-full">
                {data.category}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#3E1408] leading-tight tracking-tight mb-4">
                {data.articleTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-sm text-[#8C7E7A] font-semibold mb-6">
                <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-[#F37021] w-4 h-4" />
                    <span>{data.date}</span>
                </div>
                <span className="text-[#D3C7C2]">|</span>
                <div className="flex items-center gap-2">
                    <FaRegUser className="text-[#F37021] w-4 h-4" />
                    <span>{data.author}</span>
                </div>
                <span className="text-[#D3C7C2]">|</span>
                <div className="flex items-center gap-2">
                    <FaRegClock className="text-[#F37021] w-4 h-4" />
                    <span>{data.readTime}</span>
                </div>
            </div>
            <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden mb-8 shadow-xs">
                <Image
                    src={data.heroImage}
                    alt={data.articleTitle}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover object-center"
                />
            </div>
            <p className="text-base sm:text-lg text-[#635551] font-normal leading-relaxed mb-8 sm:mb-10">
                {data.introParagraph}
            </p>
            <div className="space-y-6 sm:space-y-8">
                {data.contentPoints?.map((point) => (
                    <div key={point.id} className="flex gap-4 sm:gap-5 items-start">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF0E6] flex items-center justify-center text-[#F37021] text-base sm:text-lg shrink-0 mt-1">
                            <FaPaw />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg sm:text-xl font-extrabold text-[#3E1408] mb-2 leading-snug">
                                {point.title}
                            </h2>
                            <p className="text-sm sm:text-base text-[#635551] font-normal leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}
