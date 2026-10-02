// @ts-nocheck
"use client";
import { usePetSite } from "../../petSite";
import { useOptionalPreview } from "../../../../context/PreviewContext";
import { editorSlug } from "../../editorSlug";
import { filterMenuByHiddenPageLinks } from "../../../../../lib/navVisibility";

import React, { useEffect, useState } from "react";
import Image from "../../PetImage";
import Link from "../../PetLink";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export default function Navbar() {
const petData = usePetSite();

    const { navbar } = petData;
    const preview = useOptionalPreview();
    const navLinks = filterMenuByHiddenPageLinks(
        navbar?.navLinks,
        preview?.pageLinks,
    );
    const slug = editorSlug(preview?.currentPage || "home");
    const pathname = slug === "home" ? "/" : `/${slug}`;
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [editorFrame, setEditorFrame] = useState<{
        top: number;
        left: number;
        width: number;
    } | null>(null);

    useEffect(() => {
        const scrollContainer = document.querySelector<HTMLElement>(
            "[data-template-scroll]",
        );
        if (!scrollContainer) return;

        const updateEditorFrame = () => {
            const bounds = scrollContainer.getBoundingClientRect();
            setEditorFrame({
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
            });
        };

        updateEditorFrame();
        window.addEventListener("resize", updateEditorFrame);
        const resizeObserver = new ResizeObserver(updateEditorFrame);
        resizeObserver.observe(scrollContainer);

        return () => {
            window.removeEventListener("resize", updateEditorFrame);
            resizeObserver.disconnect();
        };
    }, []);

    const checkIsActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <div className="relative z-[70] h-0 w-full">
        <header
            className="pointer-events-none fixed z-40 px-4 py-4 sm:px-6 lg:px-8"
            style={
                editorFrame
                    ? {
                          top: editorFrame.top,
                          left: editorFrame.left,
                          width: editorFrame.width,
                          right: "auto",
                      }
                    : { top: 0, left: 0, right: 0 }
            }
        >
            <nav
                data-plumbing-header-bar
                className="pointer-events-auto relative mx-auto w-full max-w-[1320px] bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-[24px] shadow-md border border-neutral-100/80 px-6 flex items-center justify-between transition-all duration-300"
            >
                {/* Brand Logo */}
                <Link href="/" className="flex items-center group shrink-0">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex items-center gap-3"
                    >
                        {(() => {
                            const logoValue = navbar?.logo;
                            const logoObject =
                                logoValue && typeof logoValue === "object"
                                    ? logoValue
                                    : null;
                            const logoText =
                                typeof logoValue === "string" ? logoValue.trim() : "";
                            const logoSrc =
                                (typeof navbar?.logoImage === "string" &&
                                    navbar.logoImage.trim()) ||
                                (typeof logoObject?.src === "string"
                                    ? logoObject.src.trim()
                                    : "");
                            const logoAlt =
                                (typeof navbar?.logoImageTitle === "string" &&
                                    navbar.logoImageTitle.trim()) ||
                                logoObject?.alt ||
                                logoText ||
                                "Logo";

                            return (
                                <>
                                    {logoSrc ? (
                                        <Image
                                            src={logoSrc}
                                            alt={logoAlt}
                                            width={300}
                                            height={100}
                                            priority
                                            className="h-18 sm:h-22 md:h-24 lg:h-28 w-auto object-contain"
                                        />
                                    ) : null}
                                    {logoText ? (
                                        <span className="flex h-18 items-center text-xl font-bold tracking-tight text-[#2C1810] sm:h-22 sm:text-2xl md:h-24 lg:h-28 lg:text-3xl">
                                            {logoText}
                                        </span>
                                    ) : null}
                                </>
                            );
                        })()}
                    </motion.div>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8 xl:gap-12">
                    {navLinks.map((link: NavLink) => {
                        const isActive = checkIsActive(link.href);
                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                className={`relative py-1.5 text-lg xl:text-xl font-semibold transition-colors duration-200 ${isActive
                                    ? "text-[#F37021]"
                                    : "text-[#2C1810] hover:text-[#F37021]"
                                    }`}
                            >
                                <motion.span
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                    className="inline-block"
                                >
                                    {link.label}
                                </motion.span>
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, scaleX: 0.8 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F37021] rounded-full origin-center"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Right Section (Divider + Contact Us CTA) */}
                <div className="hidden lg:flex items-center gap-7">
                    {/* Vertical Separator */}
                    <div className="h-9 w-[1.5px] bg-neutral-200" />

                    {/* CTA Button */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Link
                            href={navbar.ctaButton.href}
                            className="group inline-flex items-center justify-center bg-[#2C1810] hover:bg-[#3D2217] text-white px-6 py-2 sm:px-7 sm:py-2.5 rounded-full text-base xl:text-lg font-semibold transition-all duration-200 shadow-sm"
                        >
                            <span>{navbar.ctaButton.label}</span>
                            <ArrowRight className="w-4.5 h-4.5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="flex lg:hidden items-center">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-xl text-[#2C1810] hover:bg-neutral-100 transition-colors focus:outline-none"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="absolute top-full left-0 right-0 mt-3 p-5 bg-white rounded-3xl shadow-xl border border-neutral-100 flex flex-col gap-4 z-50 lg:hidden"
                        >
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link: NavLink) => {
                                    const isActive = checkIsActive(link.href);
                                    return (
                                        <Link
                                            key={link.id}
                                            href={link.href}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`px-4 py-2.5 rounded-2xl text-base font-semibold transition-colors ${isActive
                                                ? "bg-orange-50 text-[#F37021]"
                                                : "text-[#2C1810] hover:bg-neutral-50 hover:text-[#F37021]"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>

                            <hr className="border-neutral-100 my-1" />

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <Link
                                    href={navbar.ctaButton.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="group inline-flex items-center justify-center bg-[#2C1810] hover:bg-[#3D2217] text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-200 w-full"
                                >
                                    <span>{navbar.ctaButton.label}</span>
                                    <ArrowRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
        </div>
    );
}
