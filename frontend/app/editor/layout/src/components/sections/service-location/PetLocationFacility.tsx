// @ts-nocheck
"use client";

import React from "react";
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

interface FacilityProps {
    data: LocationFacilitiesSection;
}

export default function Facility({ data }: FacilityProps) {
    if (!data) return null;

    return (
        <div className="bg-[#FFFBF8] border border-[#FDE8DC] rounded-[28px] sm:rounded-[32px] p-6 lg:px-10 shadow-2xs">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 w-full max-w-xs sm:max-w-sm mb-1.5">
                    <div className="h-[1.5px] flex-1 bg-[#F37021]/30 rounded-full" />
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3E1408] tracking-tight">
                        {data.title}
                    </h3>
                    <div className="h-[1.5px] flex-1 bg-[#F37021]/30 rounded-full" />
                </div>
                <FaPaw className="w-5 h-5 text-[#F37021]" aria-hidden="true" />
            </div>
            {data.items && data.items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 items-center divide-y sm:divide-y-0 lg:divide-x divide-[#FDE8DC]">
                    {data.items.map((fac) => {
                        const IconComp = reactIconMap[fac.icon] || FaPaw;

                        return (
                            <div
                                key={fac.id}
                                className="flex items-center gap-3.5 px-3 lg:px-4 py-4 lg:py-1 first:pl-0 last:pr-0"
                            >
                                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#FFEFE5] text-[#F37021] flex items-center justify-center shrink-0 shadow-2xs">
                                    <IconComp className="w-7 h-7 text-[#F37021]" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <h4 className="text-sm sm:text-[16px] font-bold text-[#3E1408] leading-snug mb-0.5">
                                        {fac.title}
                                    </h4>
                                    <p className="text-sm sm:text-[14px] text-[#7A6B62] font-medium leading-tight">
                                        {fac.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
