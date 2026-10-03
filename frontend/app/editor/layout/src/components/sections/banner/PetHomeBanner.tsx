// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React, { useState, useEffect } from "react";
import Image from "../data/pet/PetImage";
import Link from "../data/pet/PetLink";
import {
  Heart,
  ShieldCheck,
  UserCheck,
  User,
  Home,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaPaw } from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  ShieldCheck,
  UserCheck,
  User,
  Home,
  PawPrint: FaPaw,
  verified: BadgeCheck,
  Verified: BadgeCheck,
  location: MapPin,
  Location: MapPin,
  support: UserCheck,
  Support: UserCheck,
  delivery: Truck,
  Delivery: Truck,
};



const DecorativeScribbleHeart = () => (
  <svg
    width="54"
    height="16"
    viewBox="0 0 54 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block ml-2.5 text-[#F37021] shrink-0"
    aria-hidden="true"
  >
    <path
      d="M2 9C5.5 5 8.5 5 12 9C15.5 13 18.5 13 22 9C25.5 5 28.5 5 32 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M40 10.8C38.2 8.5 38.2 5.8 40.2 4.2C42.2 2.6 44.8 4.1 45.8 5.6C46.8 4.1 49.4 2.6 51.4 4.2C53.4 5.8 53.4 8.5 51.6 10.8L45.8 15L40 10.8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Banner() {
const petData = usePetSite();
const bannerData: BannerData = petData.banner;

  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  if (!bannerData) return null;

  const slides: BannerSlideItem[] =
    bannerData.slides && bannerData.slides.length > 0
      ? (bannerData.slides as BannerSlideItem[])
      : [
        {
          id: "1",
          badge: bannerData.badge,
          titlePrefix: bannerData.titlePrefix,
          titleHighlight: bannerData.titleHighlight,
          titleSuffix: bannerData.titleSuffix,
          description: bannerData.description,
          bgImage: bannerData.bgImage || "/img2.png",
          primaryBtnText: bannerData.primaryBtnText,
          primaryBtnLink: bannerData.primaryBtnLink,
          secondaryBtnText: bannerData.secondaryBtnText,
          secondaryBtnLink: bannerData.secondaryBtnLink,
        },
      ];

  const totalSlides = slides.length;

  const displaySlides = Array.from({ length: 20 }).flatMap(() => slides);

  const handlePrev = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => (prev > 0 ? prev - 1 : totalSlides * 10 - 1));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => prev + 1);
  };

  const goToSlide = (dotIndex: number) => {
    setIsTransitioning(true);
    setVirtualIndex((prev) => {
      const currentModulo = prev % totalSlides;
      const diff = (dotIndex - currentModulo + totalSlides) % totalSlides;
      return prev + (diff === 0 ? 0 : diff);
    });
  };

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setVirtualIndex((prev) => prev + 1);
    }, 6500);
    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    if (virtualIndex >= totalSlides * 12) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setVirtualIndex(virtualIndex % totalSlides);
      }, 1450);
      return () => clearTimeout(timer);
    }
  }, [virtualIndex, totalSlides]);

  const activeDotIndex = virtualIndex % totalSlides;

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[720px] lg:min-h-[760px] bg-[#FDF8F3] overflow-hidden flex flex-col justify-center">


      <div
        style={{
          transform: `translateX(-${virtualIndex * 100}%)`,
          transition: isTransitioning ? "transform 1.4s cubic-bezier(0.25, 1, 0.35, 1)" : "none",
          willChange: "transform",
        }}
        className="w-full flex shrink-0"
      >
        {displaySlides.map((slide, index) => {
          const slideFeatures = slide?.features || bannerData.features;

          return (
            <div
              key={index}
              className="relative w-full shrink-0 flex flex-col justify-center pt-20 sm:pt-40 lg:pt-44 pb-10 sm:pb-44 lg:pb-56 min-h-[540px] sm:min-h-[720px] lg:min-h-[760px]"
            >

              <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#FDF8F3]">
                <Image
                  src={slide.bgImage}
                  alt={slide.titleHighlight || `Pet Banner Slide ${(index % totalSlides) + 1}`}
                  fill
                  priority={index < totalSlides}
                  sizes="100vw"
                  className="object-cover object-right sm:object-[88%_bottom] lg:object-right-bottom"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F3] via-[#FDF8F3]/95 via-45% to-transparent to-75% hidden lg:block z-20 pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F3] via-[#FDF8F3]/90 via-55% to-[#FDF8F3]/30 lg:hidden z-20 pointer-events-none" />
              </div>

              <div className="relative z-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid mx-1 sm:mx-10 lg:mx-12 grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center px-1 sm:px-4 lg:px-6">

                  <div className="lg:col-span-7 flex flex-col justify-center min-h-0 sm:min-h-[400px]">
                    <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left">

                      <div className="inline-flex items-center justify-center gap-1.5 mb-2.5 sm:mb-4 mt-8 sm:mt-10 mx-auto sm:mx-0">
                        <span className="text-[#F37021] font-semibold text-base sm:text-xl tracking-tight">
                          {slide.badge}
                        </span>
                        <DecorativeScribbleHeart />
                      </div>

                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#2C1810] tracking-tight leading-[1.15] mb-4 sm:mb-6 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
                        {slide.titlePrefix}{" "}
                        <span className="text-[#F37021] font-semibold">
                          {slide.titleHighlight}
                        </span>{" "}
                        {slide.titleSuffix}
                      </h1>

                      <p className="text-sm sm:text-lg text-[#615147] leading-relaxed max-w-lg mb-6 sm:mb-8 font-normal text-center sm:text-left mx-auto sm:mx-0">
                        {slide.description}
                      </p>

                      <div className="flex flex-nowrap items-center justify-center sm:justify-start gap-3 sm:gap-0 mb-6 sm:mb-11 max-w-4xl mx-auto sm:mx-0">
                        {slideFeatures?.map((feature: { id: string; title: string; icon: string }, idx: number) => {
                          const iconKey = String(feature.icon || "");
                          const IconComponent =
                            iconMap[iconKey] ||
                            iconMap[iconKey.toLowerCase()] ||
                            iconMap[iconKey.charAt(0).toUpperCase() + iconKey.slice(1)] ||
                            FaPaw;

                          let line1 = feature.title;
                          let line2 = "";
                          if (feature.title === "Loving Care") {
                            line1 = "Loving";
                            line2 = "Care";
                          } else if (feature.title === "Safe & Reliable") {
                            line1 = "Safe &";
                            line2 = "Reliable";
                          } else if (feature.title === "Expert Team") {
                            line1 = "Expert";
                            line2 = "Team";
                          } else if (feature.title === "Home Like Comfort") {
                            line1 = "Home Like";
                            line2 = "Comfort";
                          } else {
                            const parts = feature.title.split(" ");
                            line1 = parts.slice(0, Math.ceil(parts.length / 2)).join(" ");
                            line2 = parts.slice(Math.ceil(parts.length / 2)).join(" ");
                          }

                          return (
                            <React.Fragment key={feature.id}>
                              {idx > 0 && (
                                <div className="hidden sm:block h-8 sm:h-9 w-[1.5px] bg-[#2C1810]/20 mx-3 sm:mx-4 lg:mx-5 shrink-0" />
                              )}
                              <div className="flex shrink-0 items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-[#F37021] bg-white flex items-center justify-center shrink-0 shadow-2xs">
                                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-[#F37021]" strokeWidth={2.2} />
                                </div>
                                <div className="flex flex-col whitespace-nowrap text-sm lg:text-[15px] font-bold text-[#2C1810] leading-tight text-left [overflow-wrap:normal] [word-break:normal]">
                                  <span className="block whitespace-nowrap">{line1}</span>
                                  {line2 && <span className="block whitespace-nowrap">{line2}</span>}
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 mx-auto sm:mx-0">
                        <div>
                          <Link
                            href={slide.primaryBtnLink}
                            className="group inline-flex items-center justify-center bg-[#2A1810] hover:bg-[#3D2217] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                          >
                            <span>{slide.primaryBtnText}</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 text-white transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>

                        <div>
                          <Link
                            href={slide.secondaryBtnLink}
                            className="group inline-flex items-center gap-2 text-[#2A1810] hover:text-[#3D2217] font-semibold text-sm sm:text-lg transition-colors py-2"
                          >
                            <span className="border-b-2 border-[#F37021] pb-0.5">
                              {slide.secondaryBtnText}
                            </span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F37021] transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        data-editor-no-inline
        className="hidden md:flex absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2C1810] hover:bg-[#3D2217] text-white items-center justify-center shadow-lg transition-colors duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-5.5 h-5.5 text-white" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        data-editor-no-inline
        className="hidden md:flex absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2C1810] hover:bg-[#3D2217] text-white items-center justify-center shadow-lg transition-colors duration-200 cursor-pointer"
      >
        <ChevronRight className="w-5.5 h-5.5 text-white" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-[60px] sm:h-[130px] md:h-[170px] lg:h-[200px]"
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200 L0 76 C 400 159, 980 166, 1440 4 L 1440 200 Z"
            fill="#FFFFFF"
          />
          <path
            d="M0 200 L0 92 C 400 175, 980 182, 1440 20 L 1440 200 Z"
            fill="#F37021"
          />
        </svg>

        <FaPaw
          className="absolute right-[5%] -bottom-1 sm:bottom-1 lg:-bottom-0 w-10 h-10 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-white/20 rotate-[18deg]"
          aria-hidden="true"
        />
      </div>

      <div className="absolute bottom-9 sm:bottom-20 lg:bottom-24 left-0 right-0 z-30 flex items-center justify-center gap-2.5">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeDotIndex}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-2xs ${index === activeDotIndex
                ? "bg-[#F37021] scale-125"
                : "bg-white/90 ring-1 ring-black/10 hover:bg-white"
              }`}
          />
        ))}
      </div>

    </section>
  );
}