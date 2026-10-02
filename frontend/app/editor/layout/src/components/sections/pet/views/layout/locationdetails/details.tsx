// @ts-nocheck
"use client";

import React from "react";
import Image from "../../../PetImage";
import Link from "../../../PetLink";
import { FadeIn } from "../../ui/animations";
import Facility from "./facility";
import {
    FaPaw,
    FaPhone,
    FaEnvelope,
    FaLocationDot as FaMapMarkerAlt,
    FaClock,
    FaCheck,
    FaCar,
    FaScissors,
    FaFaceSmile as FaSmile,
    FaBath,
    FaBroom,
    FaShower,
    FaAward,
} from "react-icons/fa6";

const reactIconMap: Record<string, React.ElementType> = {
    FaPaw,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaCheck,
    FaCar,
    FaScissors,
    FaSmile,
    FaBath,
    FaBroom,
    FaShower,
    FaAward,
};

interface LocationDetailsProps {
    data: LocationDetailItem;
}

export default function LocationDetails({ data }: LocationDetailsProps) {
    if (!data) return null;

    const AddressIcon = reactIconMap[data.contacts?.address?.icon] || FaMapMarkerAlt;
    const PhoneIcon = reactIconMap[data.contacts?.phone?.icon] || FaPhone;
    const EmailIcon = reactIconMap[data.contacts?.email?.icon] || FaEnvelope;
    const TimingsIcon = reactIconMap[data.contacts?.timings?.icon] || FaClock;

    return (
        <section className="relative w-full max-w-[1320px] mt-8 sm:mt-10 md:mt-12 lg:mt-14 mx-auto px-4 sm:px-6 lg:px-8 font-sans">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 sm:mb-10">

                <div className="lg:col-span-5 flex flex-col justify-center pt-2">
                    <FadeIn direction="up" delay={0.02}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E1408] tracking-tight leading-tight mb-2">
                            <span>{data.titlePrefix || data.name.split(" ")[0]}</span>{" "}
                            <span className="text-[#F37021]">
                                {data.titleHighlight || data.name.split(" ").slice(1).join(" ") || "Center"}
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.05}>
                        <div className="inline-flex items-center gap-2 text-[#7A6B62] font-semibold text-sm sm:text-sm md:text-[16px] mb-4">
                            <FaPaw className="w-5 h-5 text-[#F37021]" />
                            <span>{data.subtitleBadge}</span>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.08}>
                        <p className="text-sm sm:text-sm md:text-[16px] text-[#6C5C52] leading-relaxed max-w-lg">
                            {data.description}
                        </p>
                    </FadeIn>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {data.contacts?.address && (
                        <FadeIn direction="up" delay={0.1}>
                            <div className="bg-[#FFFBF8] border border-[#FDE8DC] rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center h-full shadow-2xs">
                                <div className="w-12 h-12 rounded-full bg-[#FFEFE5] text-[#F37021] flex items-center justify-center mb-3 shrink-0">
                                    <AddressIcon className="w-8 h-8" />
                                </div>
                                <span className="text-sm md:text-[16px] font-bold text-[#3E1408] block mb-1">
                                    {data.contacts.address.title}
                                </span>
                                <p className="text-sm sm:text-sm text-[#7A6B62] font-medium leading-relaxed">
                                    {data.contacts.address.text}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {data.contacts?.phone && (
                        <FadeIn direction="up" delay={0.12}>
                            <div className="bg-[#FFFBF8] border border-[#FDE8DC] rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center h-full shadow-2xs">
                                <div className="w-12 h-12 rounded-full bg-[#FFEFE5] text-[#F37021] flex items-center justify-center mb-3 shrink-0">
                                    <PhoneIcon className="w-8 h-8" />
                                </div>
                                <span className="text-sm md:text-[16px] font-bold text-[#3E1408] block mb-1">
                                    {data.contacts.phone.title}
                                </span>
                                <p className="text-sm sm:text-sm  text-[#7A6B62] font-bold">
                                    {data.contacts.phone.text}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {data.contacts?.email && (
                        <FadeIn direction="up" delay={0.14}>
                            <div className="bg-[#FFFBF8] border border-[#FDE8DC] rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center h-full shadow-2xs">
                                <div className="w-12 h-12 rounded-full bg-[#FFEFE5] text-[#F37021] flex items-center justify-center mb-3 shrink-0">
                                    <EmailIcon className="w-8 h-8" />
                                </div>
                                <span className="text-sm md:text-[16px] font-bold text-[#3E1408] block mb-1">
                                    {data.contacts.email.title}
                                </span>
                                <p className="text-sm sm:text-sm  text-[#7A6B62] font-medium w-full">
                                    {data.contacts.email.text}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {data.contacts?.timings && (
                        <FadeIn direction="up" delay={0.16}>
                            <div className="bg-[#FFFBF8] border border-[#FDE8DC] rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center h-full shadow-2xs">
                                <div className="w-12 h-12 rounded-full bg-[#FFEFE5] text-[#F37021] flex items-center justify-center mb-3 shrink-0">
                                    <TimingsIcon className="w-8 h-8" />
                                </div>
                                <span className="text-sm md:text-[16px] font-bold text-[#3E1408] block mb-1">
                                    {data.contacts.timings.title}
                                </span>
                                <p className="text-sm text-[#7A6B62] font-medium leading-tight">
                                    {data.contacts.timings.text}
                                </p>
                                {data.contacts.timings.subtext && (
                                    <p className="text-sm text-[#7A6B62] font-bold leading-tight mt-0.5">
                                        {data.contacts.timings.subtext}
                                    </p>
                                )}
                            </div>
                        </FadeIn>
                    )}

                </div>

            </div>

            <div className="bg-[#FFFBF8] rounded-[28px] border border-[#FDE8DC] p-6 sm:p-8 lg:p-10 shadow-xs mb-10 sm:mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                    {data.aboutSection && (
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E1408] mb-1">
                                {data.aboutSection.title}
                            </h2>
                            <div className="w-10 h-[2.5px] bg-[#F37021] rounded-full mb-4" />

                            <p className="text-[#6C5C52] leading-relaxed mb-6">
                                {data.aboutSection.description}
                            </p>

                            {data.aboutSection.points && (
                                <div className="flex flex-col gap-3 mb-7">
                                    {data.aboutSection.points.map((pt, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[#F37021] text-white flex items-center justify-center shrink-0">
                                                <FaCheck className="w-3 h-3 stroke-[3]" />
                                            </div>
                                            <span className="font-bold text-[#3E1408]">
                                                {pt}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={data.aboutSection.btnLink || "/appointment"}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#F37021] hover:bg-[#d95e14] text-white font-bold text-sm rounded-lg transition shadow-xs cursor-pointer w-fit"
                            >
                                <span className="text-[15px]">{data.aboutSection.btnText}</span>
                                <FaPaw className="w-4 h-4 text-white" />
                            </Link>
                        </div>
                    )}

                    {data.mapInfo && (
                        <div className="lg:col-span-7 relative w-full h-[340px] sm:h-[400px] rounded-[24px] overflow-hidden border border-[#FDE8DC] bg-slate-100 flex items-center justify-center shadow-xs group">
                            {data.mapInfo.mapEmbedUrl ? (
                                <iframe
                                    src={data.mapInfo.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    className="w-full h-full rounded-[24px]"
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                            ) : (
                                <>
                                    <Image
                                        src={data.mapInfo.image || "/service/service1.jpg"}
                                        alt={data.mapInfo.pinTitle}
                                        fill
                                        className="object-cover object-center opacity-85"
                                    />
                                    <div className="absolute inset-0 bg-sky-900/10 backdrop-blur-[1px]" />
                                </>
                            )}

                            <div className="absolute z-10 flex flex-col items-center px-4 max-w-sm text-center pointer-events-none">

                                <div className="relative flex flex-col items-center justify-center mb-1 drop-shadow-md animate-bounce">
                                    <div className="relative w-11 h-14 flex items-center justify-center">
                                        <svg
                                            viewBox="0 0 38 52"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-full h-full"
                                        >
                                            <path
                                                d="M19 0C8.50659 0 0 8.50659 0 19C0 31.5 19 52 19 52C19 52 38 31.5 38 19C38 8.50659 29.4934 0 19 0Z"
                                                fill="#F37021"
                                                stroke="#FFFFFF"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        <div className="absolute top-[8px] flex items-center justify-center">
                                            <FaPaw className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="w-5 h-1.5 bg-black/25 rounded-full blur-[1px] -mt-1" />
                                </div>

                                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-neutral-100/90 text-center pointer-events-auto">
                                    <h4 className="text-sm sm:text-base font-extrabold text-[#3E1408] mb-1">
                                        {data.mapInfo.pinTitle}
                                    </h4>
                                    <p className="text-[11px] sm:text-sm text-[#7A6B62] font-medium leading-relaxed">
                                        {data.mapInfo.pinAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {data.facilitiesSection && (
                <Facility data={data.facilitiesSection} />
            )}

        </section>
    );
}
