// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";
import { useOptionalPreview } from "../../context/PreviewContext";
import { editorSlug } from "../data/pet/editorSlug";
import { filterMenuByHiddenPageLinks } from "../../../lib/navVisibility";

import React, { useEffect, useState } from "react";
import Image from "../data/pet/PetImage";
import Link from "../data/pet/PetLink";
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink, Mail, Menu, Phone, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export default function Navbar() {
const petData = usePetSite();

    const { navbar } = petData;
    const preview = useOptionalPreview();
    const designLinks = [
        { id: "home", label: "Home", href: "/" },
        { id: "about", label: "About Us", href: "/about" },
        { id: "services", label: "Services", href: "/services" },
        { id: "blog", label: "Blog", href: "/blog" },
        { id: "gallery", label: "Gallery", href: "/gallery" },
    ];
    const storedLinks = Array.isArray(navbar?.menu) && navbar.menu.length
        ? navbar.menu
        : navbar?.navLinks;
    const rawLinks = (Array.isArray(storedLinks) && storedLinks.length > 0 && storedLinks.length <= 6
        ? storedLinks
        : designLinks
    ).map((link) => ({ ...link, children: undefined, menuType: "link" }));
    const navLinks = filterMenuByHiddenPageLinks(
        rawLinks,
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
        if (!href || href === "/" || href === "#") {
            return pathname === "/";
        }
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const addedButtons = Array.isArray(navbar?.buttons) ? navbar.buttons : [];
    const ctaButton = navbar?.ctaButton?.label
        ? [
              {
                  label: navbar.ctaButton.label,
                  href: navbar.ctaButton.href,
                  variant: "primary",
                  icon: "arrow-right",
                  iconPosition: "after",
              },
          ]
        : [];
    const headerButtons = [
        ...ctaButton.filter(
            (button) =>
                !addedButtons.some(
                    (added) =>
                        (added?.label || "").trim().toLowerCase() ===
                        button.label.trim().toLowerCase(),
                ),
        ),
        ...addedButtons,
    ];

    const buttonIconMap = {
        "arrow-right": ArrowRight,
        "arrow-left": ArrowLeft,
        plus: Plus,
        phone: Phone,
        mail: Mail,
        "external-link": ExternalLink,
    };

    const renderHeaderButton = (button, index, fullWidth = false) => {
        const Icon = buttonIconMap[button.icon] || null;
        const iconAfter = (button.iconPosition ?? "after") !== "before";
        const primary = (button.variant ?? "primary") !== "secondary";
        const iconNode = Icon ? (
            <Icon className="h-4 w-4 shrink-0" />
        ) : null;
        return (
            <Link
                key={`${button.label || "button"}-${index}`}
                href={button.href || "#"}
                target={button.openInNewTab ? "_blank" : undefined}
                rel={button.openInNewTab ? "noreferrer" : undefined}
                className={`group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-2 text-base font-semibold transition-all duration-200 sm:px-7 sm:py-2.5 xl:text-lg ${
                    fullWidth ? "w-full py-3" : ""
                } ${
                    primary
                        ? "bg-[#2C1810] text-white shadow-sm hover:bg-[#3D2217]"
                        : "border border-[#2C1810] bg-white text-[#2C1810] hover:bg-[#FDF8F3]"
                }`}
            >
                {!iconAfter && iconNode}
                <span>{button.label}</span>
                {iconAfter && iconNode}
            </Link>
        );
    };

    const renderNavLink = (link, mobile = false) => {
        const isActive = checkIsActive(link.href);
        const children = Array.isArray(link.children) ? link.children : [];
        if (!mobile && children.length) {
            return (
                <div key={link.id || link.label} className="group/drop relative">
                    <Link
                        href={link.href || "#"}
                        className={`relative inline-flex items-center gap-1 py-1.5 text-lg font-semibold transition-colors duration-200 xl:text-xl ${
                            isActive
                                ? "text-[#F37021]"
                                : "text-[#2C1810] hover:text-[#F37021]"
                        }`}
                    >
                        <span>{link.label}</span>
                        <ChevronDown className="h-4 w-4" />
                        {isActive && (
                            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#F37021]" />
                        )}
                    </Link>
                    <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-3 opacity-0 transition group-hover/drop:visible group-hover/drop:opacity-100">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-2 shadow-xl">
                            {children.map((child) => (
                                <Link
                                    key={child.href || child.label}
                                    href={child.href || "#"}
                                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#2C1810] hover:bg-orange-50 hover:text-[#F37021]"
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (mobile && children.length) {
            return (
                <div key={link.id || link.label} className="flex flex-col gap-1">
                    <Link
                        href={link.href || "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`rounded-2xl px-4 py-2.5 text-base font-semibold transition-colors ${
                            isActive
                                ? "bg-orange-50 text-[#F37021]"
                                : "text-[#2C1810] hover:bg-neutral-50 hover:text-[#F37021]"
                        }`}
                    >
                        {link.label}
                    </Link>
                    {children.map((child) => (
                        <Link
                            key={child.href || child.label}
                            href={child.href || "#"}
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-xl px-4 py-2 pl-7 text-sm font-semibold text-[#615147] hover:bg-neutral-50 hover:text-[#F37021]"
                        >
                            {child.label}
                        </Link>
                    ))}
                </div>
            );
        }

        return (
            <Link
                key={link.id || link.label}
                href={link.href || "#"}
                onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
                className={
                    mobile
                        ? `rounded-2xl px-4 py-2.5 text-base font-semibold transition-colors ${
                              isActive
                                  ? "bg-orange-50 text-[#F37021]"
                                  : "text-[#2C1810] hover:bg-neutral-50 hover:text-[#F37021]"
                          }`
                        : `relative whitespace-nowrap py-1.5 text-lg font-semibold transition-colors duration-200 xl:text-xl ${
                              isActive
                                  ? "text-[#F37021]"
                                  : "text-[#2C1810] hover:text-[#F37021]"
                          }`
                }
            >
                {mobile ? (
                    link.label
                ) : (
                    <motion.span
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        {link.label}
                    </motion.span>
                )}
                {!mobile && isActive && (
                    <motion.span
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 h-[3px] w-full origin-center rounded-full bg-[#F37021]"
                    />
                )}
            </Link>
        );
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

                            const logoDisplay =
                                navbar?.logoDisplay === "text" ||
                                navbar?.logoDisplay === "image" ||
                                navbar?.logoDisplay === "both"
                                    ? navbar.logoDisplay
                                    : logoSrc && logoText
                                      ? "both"
                                      : logoSrc
                                        ? "image"
                                        : "text";
                            const showLogoImage =
                                (logoDisplay === "image" || logoDisplay === "both") &&
                                Boolean(logoSrc);
                            const showLogoText =
                                (logoDisplay === "text" || logoDisplay === "both") &&
                                Boolean(logoText);

                            return (
                                <>
                                    {showLogoImage ? (
                                        <Image
                                            src={logoSrc}
                                            alt={logoAlt}
                                            width={300}
                                            height={100}
                                            priority
                                            className="h-18 sm:h-22 md:h-24 lg:h-28 w-auto object-contain"
                                        />
                                    ) : null}
                                    {showLogoText ? (
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
                <div className="hidden min-w-0 lg:flex shrink items-center gap-5 xl:gap-8">
                    {navLinks.map((link) => renderNavLink(link))}
                </div>

                {headerButtons.length > 0 && (
                <div className="hidden lg:flex shrink-0 items-center gap-3">
                    <div className="h-9 w-[1.5px] bg-neutral-200" />
                    {headerButtons.map((button, index) => (
                        <motion.div
                            key={`${button.label || "button"}-${index}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {renderHeaderButton(button, index)}
                        </motion.div>
                    ))}
                </div>
                )}

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
                                {navLinks.map((link) => renderNavLink(link, true))}
                            </div>

                            {headerButtons.length > 0 && (
                            <>
                            <hr className="border-neutral-100 my-1" />
                            <div className="flex flex-col gap-2">
                                {headerButtons.map((button, index) =>
                                    renderHeaderButton(button, index, true),
                                )}
                            </div>
                            </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
        </div>
    );
}
