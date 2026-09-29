// @ts-nocheck
"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "../header/PlumbingLink";
import { Calendar, Users, Award, ArrowRight, Check, Clock, Settings } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import { ServiceAboutPageData, ServiceFeatureStripData, site } from "../data/plumbing1";
import { SectionHeader, ScrollReveal } from "../banner/PlumbingInnerBanner1";
import { IoShieldCheckmark } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import type { SectionProps } from "../../../types/section";

interface AboutSectionProps {
  aboutData: ServiceAboutPageData;
  featureStripData: ServiceFeatureStripData;
  hideButton?: boolean;
}

// Animated Counter component handling string/number values like "4.3K" or "18"
function AnimatedCounter({
  targetString,
  suffix = "",
}: {
  targetString: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const numericMatch = targetString.match(/[0-9.]+/);
    const hasK = targetString.toUpperCase().includes("K");
    const rawNum = numericMatch ? parseFloat(numericMatch[0]) : 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const duration = 2000;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;

            const progress = Math.min((currentTime - startTime) / duration, 1);

            const currentNum = (progress * rawNum).toFixed(
              targetString.includes(".") ? 1 : 0,
            );

            setDisplayValue(`${currentNum}${hasK ? "K" : ""}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetString, hasAnimated]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function AboutSection({
  aboutData,
  featureStripData,
  hideButton = false,
}: AboutSectionProps) {
  const data = aboutData;
  const featureStrip = featureStripData;
  const stats = data.stats || [];

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="h-5 w-5 text-[#2563EB]" />;

      case "users":
        return <Users className="h-5 w-5 text-[#16A34A]" />;

      case "award":
        return <Award className="h-5 w-5 text-[#2563EB]" />;

      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className="h-5 w-5 text-[#2563EB]" />;
      }
    }
  };

  const getStatBg = (iconName: string) => {
    switch (iconName) {
      case "users":
        return "bg-[#DCFCE7]";

      default:
        return "bg-[#DBEAFE]";
    }
  };

  const getFeatureIcon = (iconName: string, index: number) => {
    switch (iconName) {
      case "shield-check":
        return (
          <IoShieldCheckmark className="h-5 w-5 text-[#1E40AF] md:h-8 md:w-8" />
        );

      case "heart-handshake":
        return <RiCustomerService2Line className="h-5 w-5 text-[#16A34A]" />;

      case "clock":
        return <Clock className="h-5 w-5 text-[#1E40AF] md:h-8 md:w-8" />;

      case "users":
        return <Settings className="h-5 w-5 text-[#16A34A] md:h-8 md:w-8" />;

      default: {
        const Icon = getPlumbingIcon(iconName);
        return (
          <Icon
            className={`h-5 w-5 md:h-8 md:w-8 ${
              index % 2 === 0 ? "text-[#1E40AF]" : "text-[#16A34A]"
            }`}
          />
        );
      }
    }
  };

  const getFeatureBg = (index: number) => {
    return index % 2 === 0 ? "bg-[#DBEAFE]" : "bg-[#DCFCE7]";
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 md:py-12">
      <div className="mx-auto max-w-[1300px] px-2 sm:px-6 lg:px-8">
        {/* 1. TOP CENTERED HEADER SECTION */}
        <SectionHeader
          pretitle={data.pretitle}
          title={
            data.title
              ? { normal: data.title, highlighted: data.highlightedTitle }
              : undefined
          }
          align="center"
          className="mx-auto max-w-[950px]"
          highlightClassName="text-[#2563EB]"
        />

        {/* 2. BOTTOM 2-COLUMN GRID SECTION */}
        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT SIDE */}
          <ScrollReveal direction="left" className="order-2 lg:order-1 lg:col-span-6">
          <div className="order-2 flex justify-center lg:order-1 lg:col-span-6">
            <div className="relative w-full max-w-[540px] pb-10 pl-6 pr-4 pt-8">
              {/* Top-Left Blue Dot Grid Accent */}
              <div
                className="absolute left-0 top-0 z-0 h-[100px] w-[100px]"
                style={{
                  backgroundImage:
                    "radial-gradient(#2563EB 3px, transparent 3px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Bottom-Left Solid Blue Background Shape Accent */}
              <div className="absolute bottom-6 left-2 z-0 h-[100px] w-[100px] rounded-[15px] bg-[#1E40AF]" />

              {/* Main Image */}
              <div className="relative z-10 h-[360px] w-full overflow-hidden rounded-[45px] bg-slate-100 shadow-md sm:h-[440px] md:h-[480px]">
                <Image
                  src={data.sideImages?.mainLeft || ""}
                  alt={data.title || "About Us"}
                  fill
                  sizes="(max-width: 640px) 100vw, 540px"
                  className="object-cover"
                />
              </div>

              {/* Bottom Floating Blue Badge Card */}
              {data.badge && (
                <div className="absolute bottom-0 left-[60%] z-20 flex -translate-x-1/2 flex-col items-center gap-1 rounded-2xl bg-[#1E40AF] p-2 text-center text-white shadow-xl sm:left-1/2 sm:flex-row sm:gap-3.5 sm:px-6 sm:py-4 sm:text-left">
                  {" "}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#84CC16] text-[#0F172A]">
                    {" "}
                    <Check className="h-6 w-6 stroke-[3]" />{" "}
                  </div>{" "}
                  <div className="flex flex-col items-center sm:items-start">
                    {" "}
                    <h4 className="text-[14px] font-bold text-white sm:text-[15px]">
                      {" "}
                      {data.badge.title}{" "}
                    </h4>{" "}
                    <p className="text-[12px] font-medium text-blue-100 sm:text-sm">
                      {" "}
                      {data.badge.desc}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>
              )}
            </div>
          </div>
          </ScrollReveal>

          {/* RIGHT SIDE */}
          <ScrollReveal direction="right" className="order-1 lg:order-2 lg:col-span-6">
          <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:col-span-6 lg:items-start lg:text-left">
            {/* Subtitle Badge */}
            {data.subTitle && (
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1E40AF] sm:text-[14px]">
                  {data.subTitle}
                </span>

                <div className="h-[2px] w-10 bg-[#84CC16]" />
              </div>
            )}

            {/* Main Heading */}
            {data.heading && (
              <h3 className="mt-3 text-[28px] font-extrabold leading-[1.2] text-[#0F172A] sm:text-[34px] md:text-[38px]">
                {data.heading}
              </h3>
            )}

            {/* Description */}
            {data.desc && (
              <p className="mt-4 text-[14px] font-medium leading-[1.7] text-[#64748B] sm:text-[15px]">
                {data.desc}
              </p>
            )}

            {stats.length > 0 && (
              <div className="mt-8 grid w-full grid-cols-2 gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:grid-cols-3 sm:gap-2 sm:p-6">
                {stats.map((stat, idx) => (
                  <div
                    key={stat.id || idx}
                    className={`flex  flex-col items-center gap-3 text-center xl:flex-row xl:items-center xl:gap-3 xl:text-left ${
                      idx !== 0
                        ? "border-l border-gray-100 pl-3 sm:border-l sm:border-gray-100 sm:pl-3"
                        : ""
                    } ${
                      stats.length % 2 !== 0 && idx === stats.length - 1
                        ? "col-span-2 sm:col-span-1"
                        : ""
                    }`}
                  >
                    {/* Circle Icon Badge */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${getStatBg(
                        stat.iconName,
                      )}`}
                    >
                      {getStatIcon(stat.iconName)}
                    </div>

                    {/* Stat Number & Label */}
                    <div className="flex min-w-0 flex-col items-center xl:items-start">
                      <span className="text-[22px] font-black leading-none text-[#1E40AF] sm:text-[28px]">
                        <AnimatedCounter targetString={stat.number} />
                        <span className="text-[#84CC16]">{stat.suffix}</span>
                      </span>

                      <span className="mt-1.5 min-h-10 text-sm font-semibold text-[#64748B]">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Button */}
            {!hideButton && data.button && (
              <Link
                href={data.button.href}
                className="mt-8 inline-flex h-[46px] items-center justify-center gap-3 rounded-full border-[1.5px] border-[#1E40AF] px-7 text-[14px] font-bold text-[#1E40AF] transition-all duration-300 hover:bg-[#1E40AF] hover:text-white"
              >
                <span>{data.button.label}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          </ScrollReveal>
        </div>

        {/* 3. FEATURE STRIP */}
        {featureStrip.length > 0 && (
          <ScrollReveal direction="up">
          <div className="mt-8 w-full rounded-2xl border border-gray-100 bg-white px-6 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:px-8 sm:py-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {featureStrip.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 ${
                    index !== 0 ? "lg:border-l lg:border-gray-100 lg:pl-6" : ""
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${getFeatureBg(
                      index,
                    )}`}
                  >
                    {getFeatureIcon(item.icon, index)}
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-[17px] font-bold text-[#0F172A]">
                      {item.title}
                    </h4>

                    <p className="mt-0.5 text-[14px] font-medium leading-relaxed text-[#64748B]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export default function PlumbingAbout1({
  data,
  showButton = true,
}: SectionProps & { showButton?: boolean }) {
  const custom =
    (data as Partial<typeof site.aboutPage> & {
      featureStrip?: typeof site.featureStrip;
    } | undefined) ?? {};
  return (
    <AboutSection
      aboutData={{ ...site.aboutPage, ...custom }}
      featureStripData={custom.featureStrip ?? site.featureStrip}
      hideButton={!showButton}
    />
  );
}
