// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "../header/PlumbingLink";
import { Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import { ServiceTeamData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { getPlumbingSocialItems, plumbingSocialHref, plumbingItemsPerRowClass } from "../../../lib/plumbingIcons";
import type { SectionProps } from "../../../types/section";

interface TeamProps {
  teamData?: ServiceTeamData;
}

function Team({ teamData }: TeamProps) {
  const data = (teamData ?? site.team) as ServiceTeamData;

  const renderSocialIcon = (label: string) => {
    const key = label.trim().toLowerCase();
    if (key === "linkedin") return <FaLinkedinIn size={15} />;
    if (key === "facebook") return <FaFacebookF size={15} />;
    if (key === "twitter" || key === "x") return <FaTwitter size={15} />;
    if (key === "instagram") return <FaInstagram size={15} />;
    if (key === "youtube") return <FaYoutube size={15} />;
    if (key === "email" || key === "mail") return <Mail size={15} />;
    return <span className="text-[10px] font-bold uppercase">{label.charAt(0) || "?"}</span>;
  };

  return (
    <main>
      {/* PAGE BANNER */}
      {data?.banner && (
        <PlumbingInnerBanner1
          appearance={plumbingBannerAppearance(data)}
          title={data.banner.title}
          breadcrumbHome={data.banner.breadcrumbHome}
          breadcrumbCurrent={data.banner.breadcrumbCurrent}
          backgroundImage={data.banner.backgroundImage}
          homeHref={data.banner.homeHref}
        />
      )}

      {/* TEAM SECTION */}
      <section
        {...plumbingEditorAttrs("Team", "heading members itemsPerRow")}
        className="bg-slate-50/50 py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Header */}
          {data?.heading && (
            <SectionHeader
              pretitle={data.heading.subTitle}
              title={data.heading.title}
              description={data.heading.description}
              align="center"
              descriptionMaxWidth="max-w-2xl"
            />
          )}

          {/* Team Members Grid */}
          {data?.members?.length > 0 && (
            <ScrollReveal direction="up">
            <div className={`mt-12 grid ${plumbingItemsPerRowClass(data.itemsPerRow, 4)} gap-6`}>
              {data.members.map((member) => (
                <div
                  key={member.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    {/* Member Image with Social Overlay Badges */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                      <Link href={`/teams/${member.slug}`}>
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(min-width: 1024px) 288px, (min-width: 640px) 560px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Top Right Action Badges */}
                      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
                        {getPlumbingSocialItems(member.socials).map((social) => {
                          const href = plumbingSocialHref(social);
                          const isMail = /^(mailto:|tel:)/i.test(href);
                          return (
                            <a
                              key={`${member.id}-${social.label}`}
                              href={href}
                              target={isMail ? undefined : "_blank"}
                              rel="noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700"
                            >
                              {renderSocialIcon(social.label)}
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Info Content */}
                    <div className="space-y-2 p-6 text-center">
                      <Link href={`/teams/${member.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600">
                          {member.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-semibold text-blue-600">
                        {member.designation}
                      </p>
                      <div className="mx-auto my-3 h-0.5 w-10 bg-blue-100" />
                      <p className="text-sm leading-relaxed text-gray-500">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}

export default function PlumbingTeam1({ data }: SectionProps) {
  return <Team teamData={data as never} />;
}
