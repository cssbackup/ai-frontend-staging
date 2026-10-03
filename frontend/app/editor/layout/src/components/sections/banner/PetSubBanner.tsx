// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Image from "../data/pet/PetImage";
import Link from "../data/pet/PetLink";
import { FadeIn } from "../data/pet/animations";



interface SubBannerProps {
    pageKey?: string;
    title?: string;
    bgImage?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function SubBanner({
    pageKey = "about",
    title,
    bgImage,
    breadcrumbs,
}: SubBannerProps) {
const petData = usePetSite();

    const bannerKey =
        pageKey === "teams" || pageKey === "team"
            ? "ourteam"
            : pageKey === "contact"
              ? "contactus"
              : pageKey === "service"
                ? "services"
                : pageKey === "why-choose-us"
                  ? "whychooseus"
                  : pageKey === "service-location"
                    ? "servicelocation"
                    : pageKey === "terms"
                      ? "termscondition"
                      : pageKey === "cookie" || pageKey === "cookie-policy"
                        ? "cookiepolicy"
                        : pageKey;
    const subBannerData: any =
        petData.subBanners?.[bannerKey as keyof typeof petData.subBanners] ||
        petData.subBanners?.[pageKey as keyof typeof petData.subBanners];
    const pageBanner = petData.pageBanner;

    const displayTitle = title || pageBanner?.title || subBannerData?.title || "About Us";
    const displayBgImage =
        bgImage ||
        pageBanner?.bgImage ||
        subBannerData?.bgImage ||
        petData.subBanners?.about?.bgImage ||
        "/subbanner.jpg";
    const displayBreadcrumbs = breadcrumbs || pageBanner?.breadcrumbs || subBannerData?.breadcrumbs || [
        { label: "Home", href: "/" },
        { label: displayTitle, active: true },
    ];

    return (
        <section className="relative z-[1] w-full min-h-[360px] h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center overflow-hidden bg-[#2C1810] pt-24 sm:pt-28 lg:pt-32">

            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={displayBgImage}
                    alt={displayTitle}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center sm:object-[center_35%]"
                />
                <div className="absolute inset-0 bg-black/40 sm:bg-black/35 z-10" />
            </div>
            <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center pb-12 sm:pb-16">
                <FadeIn direction="up" delay={0.1}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                        {displayTitle}
                    </h1>
                </FadeIn>
            </div>
            <div className="absolute w-70 sm:w-120 md:w-140 bottom-[-1px] left-1/2 -translate-x-1/2 z-20">
                <FadeIn direction="up" delay={0.15}>
                    <div className="relative bg-white rounded-t-[28px] sm:rounded-t-[36px] px-8 sm:px-14 py-3 sm:py-4 flex items-center justify-center gap-2.5">
                        <div className="absolute right-[calc(100%-0.5px)] bottom-0 w-7 h-7 sm:w-9 sm:h-9 text-white pointer-events-none overflow-hidden">
                            <svg
                                viewBox="0 0 36 36"
                                className="w-full h-full fill-current block"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path d="M 0 36 A 36 36 0 0 0 36 0 L 37 0 L 37 37 L 0 37 Z" />
                            </svg>
                        </div>

                        {displayBreadcrumbs.map((item: any, idx: number) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && (
                                    <span className="text-[#2C1810] font-bold text-sm sm:text-base md:text-lg mx-0.5">
                                        /
                                    </span>
                                )}
                                {item.href && !item.active ? (
                                    <Link
                                        href={item.href}
                                        className="text-[#2C1810] hover:text-[#F37021] font-bold text-sm sm:text-base md:text-[18px] lg:text-[20px] transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#F37021] font-bold text-sm sm:text-base md:text-[18px] lg:text-[20px]">
                                        {item.label}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                        <div className="absolute left-[calc(100%-0.5px)] bottom-0 w-7 h-7 sm:w-9 sm:h-9 text-white pointer-events-none overflow-hidden">
                            <svg
                                viewBox="0 0 36 36"
                                className="w-full h-full fill-current block"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path d="M 0 0 A 36 36 0 0 0 36 36 L 37 37 L -1 37 L -1 0 Z" />
                            </svg>
                        </div>

                    </div>
                </FadeIn>
            </div>

        </section>
    );
}
