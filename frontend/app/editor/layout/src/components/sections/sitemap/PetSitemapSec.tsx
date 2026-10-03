// @ts-nocheck
"use client";
import { usePetSite } from "../data/pet/petSite";

import React from "react";
import Link from "../data/pet/PetLink";
import { FadeIn } from "../data/pet/animations";
import { FaChevronRight } from "react-icons/fa";




export default function SitemapSec() {
const petData = usePetSite();
const sitemapSecData: SitemapSecData = petData.sitemapSec as SitemapSecData;

  if (!sitemapSecData || !sitemapSecData.items) return null;

  const items = sitemapSecData.items;

  return (
    <section className="relative max-w-[1320px] mt-8 sm:mt-10 md:mt-12 lg:mt-14 mx-auto w-full px-4 sm:px-6 lg:px-8">
      <FadeIn direction="up" delay={0.05}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-[#FCE3D3]">
          {items.map((item: SitemapItem, index: number) => {
            const isLastInRowLg = (index + 1) % 5 === 0 || index === items.length - 1;
            const isLastInRowMd = (index + 1) % 3 === 0 || index === items.length - 1;
            const isLastInRowSm = (index + 1) % 2 === 0 || index === items.length - 1;

            return (
              <div
                key={item.id || index}
                className="relative flex flex-col justify-start p-5 sm:p-6 md:p-7 lg:p-8 border-b border-[#FCE3D3] transition-colors duration-200 hover:bg-[#FFFDFC]"
              >
                {!isLastInRowLg && (
                  <div className="hidden lg:block absolute right-10 top-6 bottom-6 w-[1px] bg-[#FCE3D3]" />
                )}
                {!isLastInRowMd && (
                  <div className="hidden md:block lg:hidden absolute right-0 top-5 bottom-5 w-[1px] bg-[#FCE3D3]" />
                )}
                {!isLastInRowSm && (
                  <div className="block md:hidden absolute right-0 top-5 bottom-5 w-[1px] bg-[#FCE3D3]" />
                )}

                <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#F37021] tracking-tight">
                  {item.number}
                </span>

                <h3 className="text-sm sm:text-sm md:text-lg font-extrabold text-[#3E1408] tracking-wider uppercase mt-1.5 min-h-[48px] flex flex-col justify-start leading-tight">
                  {item.title.split("\n").map((line: string, idx: number) => (
                    <span key={idx} className="block">{line}</span>
                  ))}
                </h3>

                <div className="w-7 h-[2px] bg-[#F37021] mb-4 shrink-0 rounded-full" />

                <div className="flex flex-col space-y-2">
                  {item.links &&
                    item.links.map((link, lIndex) => (
                      <Link
                        key={lIndex}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm sm:text-sm md:text-[16px] font-semibold text-[#4A403A] hover:text-[#F37021] transition-colors duration-150 group"
                      >
                        <FaChevronRight className="w-3 h-3 text-[#F37021] shrink-0 transition-transform group-hover:translate-x-0.5" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
