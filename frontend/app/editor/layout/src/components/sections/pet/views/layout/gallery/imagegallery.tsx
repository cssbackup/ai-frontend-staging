// @ts-nocheck
"use client";
import { usePetSite } from "../../../petSite";

import React, { useState, useEffect, useCallback } from "react";
import Image from "../../../PetImage";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, MotionCard } from "../../ui/animations";
import Pagination from "../../ui/pagination";
import {
    FaCut as FaScissors,
    FaBath,
    FaPaw,
    FaBuilding,
    FaCalendarAlt,
    FaDribbble,
    FaExpand,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
} from "react-icons/fa";

const categoryIconMap: Record<string, React.ElementType> = {
    all: FaPaw,
    scissors: FaScissors,
    bath: FaBath,
    play: FaDribbble,
    center: FaBuilding,
    calendar: FaCalendarAlt,
};




export default function ImageGallery() {
const petData = usePetSite();
const galleryData: GallerySecData = petData.gallerySec as GallerySecData;

    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    if (!galleryData) return null;

    const { titlePrefix, titleHighlight, description, categories, items } = galleryData;

    const filteredItems =
        activeCategory === "all"
            ? items
            : items.filter((item) => item.category === activeCategory);

    const totalPages = Math.ceil((filteredItems?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredItems?.slice(startIndex, startIndex + itemsPerPage) || [];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedIndex(null);
        const sectionElement = document.getElementById("image-gallery-section");
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
    }, [filteredItems.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
    }, [filteredItems.length]);

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex, handlePrev, handleNext]);

    const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

    return (
        <section id="image-gallery-section" className="relative w-full mt-6 sm:mt-8 md:mt-10 lg:mt-10 overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col items-center text-center mb-8">
                    <FadeIn direction="up" delay={0.05}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C1810] tracking-tight leading-tight mb-3">
                            {titlePrefix}{" "}
                            <span className="text-[#F37021] font-extrabold">
                                {titleHighlight}
                            </span>
                        </h1>
                    </FadeIn>
                    <div className="flex items-center justify-center gap-2.5 mb-3.5">
                        <div className="h-[1.5px] w-12 bg-[#F37021] rounded-full" />
                        <FaPaw className="w-5 h-5 text-[#F37021]" />
                        <div className="h-[1.5px] w-12 bg-[#F37021] rounded-full" />
                    </div>

                    <FadeIn direction="up" delay={0.1}>
                        <p className="text-sm sm:text-base text-[#615147] font-normal max-w-lg mx-auto">
                            {description}
                        </p>
                    </FadeIn>
                </div>
                <FadeIn direction="up" delay={0.15}>
                    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-12">
                        {categories?.map((cat) => {
                            const IconComp = categoryIconMap[cat.icon] || FaPaw;
                            const isActive = activeCategory === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    data-editor-no-inline
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setCurrentPage(1);
                                        setSelectedIndex(null);
                                    }}
                                    className={`rounded-full px-5 py-2.5 sm:px-6 sm:py-3 font-extrabold text-sm sm:text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 border ${isActive
                                        ? "bg-[#F37021] text-white border-[#F37021] shadow-md shadow-[#F37021]/25 scale-105"
                                        : "bg-white text-[#2C1810] border-neutral-200/90 hover:border-[#F37021]/60 hover:text-[#F37021] shadow-xs"
                                        }`}
                                >
                                    <IconComp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-white" : "text-[#F37021]"}`} />
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </FadeIn>
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <AnimatePresence>
                        {paginatedItems?.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MotionCard
                                    hoverY={-6}
                                    hoverScale={1.02}
                                    className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-neutral-100/90 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative h-[240px] sm:h-[280px]"
                                    onClick={() => setSelectedIndex(startIndex + index)}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.alt || item.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                                        <div className="flex items-center justify-between">
                                            <span className="font-extrabold text-sm sm:text-base drop-shadow-sm">
                                                {item.title}
                                            </span>
                                            <div className="w-9 h-9 rounded-full bg-[#F37021] text-white flex items-center justify-center shadow-md">
                                                <FaExpand className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </MotionCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                <AnimatePresence>
                    {selectedIndex !== null && currentItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-[#0c0d10]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <button
                                onClick={() => setSelectedIndex(null)}
                                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-50 backdrop-blur-sm hover:scale-105"
                                aria-label="Close image lightbox"
                            >
                                <FaTimes className="w-5 h-5 text-white" />
                            </button>
                            {filteredItems.length > 1 && (
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer z-50 backdrop-blur-sm shadow-xl hover:scale-105"
                                    aria-label="Previous image"
                                >
                                    <FaChevronLeft className="w-5 h-5 text-white" />
                                </button>
                            )}

                            {filteredItems.length > 1 && (
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer z-50 backdrop-blur-sm shadow-xl hover:scale-105"
                                    aria-label="Next image"
                                >
                                    <FaChevronRight className="w-5 h-5 text-white" />
                                </button>
                            )}
                            <div
                                className="relative max-w-5xl w-full h-[75vh] sm:h-[82vh] flex flex-col items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.div
                                    key={currentItem.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    <Image
                                        src={currentItem.image}
                                        alt={currentItem.alt || currentItem.title}
                                        fill
                                        priority
                                        className="object-contain select-none"
                                    />
                                    {currentItem.title && (
                                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-[#2d211b]/85 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full shadow-2xl z-20 pointer-events-none max-w-[90%] text-center">
                                            <p className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
                                                {currentItem.title}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}


