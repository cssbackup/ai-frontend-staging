// @ts-nocheck
"use client";

import React from "react";
import Image from "../../../PetImage";
import Link from "../../../PetLink";
import { FaPaw, FaRegCalendarAlt } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

interface BlogSidebarProps {
    data: BlogSidebarData;
    posts: BlogPostItem[];
    currentSlug?: string;
    currentCategory?: string;
    allBlogDetails?: BlogDetailItem[];
}

export default function BlogSidebar({
    data,
    posts,
    currentSlug,
    currentCategory,
    allBlogDetails = [],
}: BlogSidebarProps) {
    if (!data) return null;

    const displayPosts = posts?.slice(0, 5);
    const getCategoryHref = (catName: string) => {
        const lowerCat = catName.toLowerCase();
        const detailMatch = allBlogDetails.find(
            (b) => b.category?.toLowerCase() === lowerCat || b.category?.toLowerCase().includes(lowerCat)
        );
        if (detailMatch) {
            return `/blog/${detailMatch.slug}`;
        }
        const postMatch = posts.find(
            (p) => p.category?.toLowerCase() === lowerCat || p.category?.toLowerCase().includes(lowerCat)
        );
        if (postMatch) {
            const postSlug = postMatch.link ? postMatch.link.replace("/blog/", "") : postMatch.id;
            return `/blog/${postSlug}`;
        }
        return "/blog";
    };

    return (
        <aside className="w-full space-y-6 sm:space-y-8">

            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-100 shadow-xs">
                <h3 className="text-xl font-extrabold text-[#3E1408] mb-4 sm:mb-5 tracking-tight">
                    {data.categoriesTitle || "Categories"}
                </h3>
                <div className="space-y-1.5">
                    {data.categories?.map((cat, idx) => {
                        const isActive =
                            currentCategory?.toLowerCase() === cat.name.toLowerCase() ||
                            (!currentCategory && cat.active);

                        const categoryHref = getCategoryHref(cat.name);

                        return (
                            <Link
                                key={idx}
                                href={categoryHref}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isActive
                                    ? "bg-[#FFF0E6] text-[#F37021] font-bold"
                                    : "text-[#5C4D48] hover:text-[#F37021] hover:bg-orange-50/50"
                                    }`}
                            >
                                <FaPaw
                                    className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#F37021]" : "text-[#B8ACA7]"
                                        }`}
                                />
                                <span>{cat.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-100 shadow-xs">
                <h3 className="text-xl font-extrabold text-[#3E1408] mb-5 tracking-tight">
                    {data.latestUpdatesTitle || "Latest Updates"}
                </h3>

                <div className="space-y-4 sm:space-y-5 mb-6">
                    {displayPosts?.map((post) => {
                        const postSlug = post.link ? post.link.replace("/blog/", "") : post.id;
                        const href = `/blog/${postSlug}`;

                        return (
                            <Link
                                key={post.id}
                                href={href}
                                className="flex items-center gap-4 group cursor-pointer"
                            >
                                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-neutral-100">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="80px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#3E1408] group-hover:text-[#F37021] transition-colors leading-snug line-clamp-2 mb-1.5">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-sm text-[#8C7E7A] font-semibold">
                                        <FaRegCalendarAlt className="w-3.5 h-3.5 text-[#F37021]" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <Link
                    href="/blog"
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#F37021] text-[#F37021] hover:bg-[#F37021] hover:text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-300 group/btn"
                >
                    <span>{data.viewAllBtnText || "View All Blogs"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
                </Link>
            </div>

        </aside>
    );
}
