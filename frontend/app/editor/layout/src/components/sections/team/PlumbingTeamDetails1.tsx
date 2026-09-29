// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "../header/PlumbingLink";
import PlumbingInnerBanner1, {ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { site, getTeamMemberBySlug } from "../data/plumbing1";
import { TeamMemberDetailData, TeamDetailsData } from "../types/plumbing";
import type { InnerBannerAppearance } from "../../../types/innerBannerAppearance";
import { Calendar, Mail, Phone, MapPin, Headphones, CheckCircle2, Award, Wrench, Users, ShieldCheck, BadgeCheck, ArrowRight, Droplet } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";
import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";

interface TeamDetailsProps {
  detailData?: TeamMemberDetailData;
  bannerData?: TeamDetailsData["banner"];
  appearance?: InnerBannerAppearance;
}

function TeamDetails({ detailData, bannerData, appearance }: TeamDetailsProps) {
  // Fallback to default site data if detailData isn't passed directly
  const data = detailData ?? site?.teamDetails?.members?.["michael-roberts"];
  const banner = bannerData ?? site?.teamDetails?.banner;

  if (!data) return null;

  const renderStatIcon = (iconName: string) => {
    const iconClass = "h-7 w-7 sm:w-14 sm:h-14 text-[#3b82f6]";
    switch (iconName) {
      case "award":
        return <Award className={iconClass} />;
      case "wrench":
        return <Wrench className={iconClass} />;
      case "users":
        return <Users className={iconClass} />;
      case "shield":
        return <ShieldCheck className={iconClass} />;
      default: {
        const Icon = getPlumbingIcon(iconName);
        return <Icon className={iconClass} />;
      }
    }
  };

  return (
    <main>
      {/* PAGE BANNER */}
      {banner && (
        <PlumbingInnerBanner1
          appearance={appearance ?? plumbingBannerAppearance(detailData)}
          title={banner.title}
          breadcrumbHome={banner.breadcrumbHome}
          breadcrumbCurrent={banner.breadcrumbCurrent}
          breadcrumbs={banner.breadcrumbs}
          backgroundImage={banner.backgroundImage}
          homeHref={banner.homeHref}
        />
      )}

      {/* TEAM DETAILS MAIN CONTENT */}
      <section
        {...plumbingEditorAttrs("Team Details", "teamDetailItems")}
        className="bg-[#fcfdfd] py-8 md:py-16"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          {/* Main Content Layout: 12-Column Grid */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Area: Photo + Details + About Section (8 Cols) */}
            <ScrollReveal direction="left" className="lg:col-span-8">
            <div className="space-y-12 lg:col-span-8">
              {/* Top Profile Header (Photo + Quick Details) */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:items-center">
                {/* Photo (5 Cols) */}
                <div className="sm:col-span-6 lg:col-span-6">
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-[2rem]">
                    <Image
                      src={data.image}
                      alt={data.name}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Info (6 Cols) */}
                <div className="flex flex-col justify-center sm:col-span-6 lg:col-span-6">
                  <span className="text-[13px] font-extrabold uppercase tracking-wider text-[#3b82f6]">
                    {data.designation}
                  </span>

                  <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl lg:text-[42px] lg:leading-tight">
                    {data.name}
                  </h1>

                  {/* Water Droplet Accent Line */}
                  <div className="mt-4 flex items-center gap-1">
                    <div className="h-[2px] w-8 rounded-full bg-[#a3e635]" />
                    <Droplet className="h-4 w-4 fill-[#0052CC] text-[#0052CC]" />

                    <div className="h-[2px] w-8 rounded-full bg-[#a3e635]" />
                  </div>

                  <p className="mt-5 text-sm font-medium leading-relaxed text-[#64748b]">
                    {data.experienceBadge}
                  </p>

                  {/* Meta List */}
                  <div className="mt-6 space-y-3.5 text-[13px] font-semibold text-[#475569]">
                    {data.quickInfo?.joinedDate && (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 shrink-0 text-[#3b82f6]" />
                        <span>{data.quickInfo.joinedDate}</span>
                      </div>
                    )}
                    {data.quickInfo?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 shrink-0 text-[#3b82f6]" />
                        <a
                          href={`mailto:${data.quickInfo.email}`}
                          className="transition-colors hover:text-[#3b82f6]"
                        >
                          {data.quickInfo.email}
                        </a>
                      </div>
                    )}
                    {data.quickInfo?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-[#3b82f6]" />
                        <a
                          href={`tel:${data.quickInfo.phone}`}
                          className="transition-colors hover:text-[#3b82f6]"
                        >
                          {data.quickInfo.phone}
                        </a>
                      </div>
                    )}
                    {data.quickInfo?.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 shrink-0 text-[#3b82f6]" />
                        <span>{data.quickInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio Section ("About Michael") */}
              <div>
                <h2 className="text-2xl font-black text-[#0f172a] sm:text-3xl">
                  {data.aboutTitle || `About ${data.name?.split(" ")[0]}`}
                </h2>
                <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#a3e635]" />

                <div className="mt-6 space-y-4 text-sm sm:text-[16px] text-[#393d46]">
                  {data.aboutParagraphs?.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Right Column: Dark Blue Help Card + Stacked Stats Box (4 Cols) */}
            <ScrollReveal direction="right" className="lg:col-span-4">
            <div className="space-y-6 lg:col-span-4">
              {/* Top Dark Blue Widget */}
              {data.helpWidget && (
                <div className="rounded-[1.75rem] bg-[#07132b] p-7 text-center text-white shadow-xl">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center text-[#3b82f6]">
                    <Headphones className="h-10 w-10 stroke-[1.5]" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {data.helpWidget.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {data.helpWidget.description}
                  </p>
                  <Link
                    href={data.helpWidget.buttonHref || "/contact"}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a3e635] px-4 py-3 text-sm font-bold text-[#0f172a] transition-all hover:bg-[#8ece25]"
                  >
                    {data.helpWidget.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {/* Directly Below: Stats Block Stacked Card */}
              {data.stats && (
                <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                    {data.stats.map((stat) => (
                      <div key={stat.id} className="flex items-center gap-4">
                        <div className="flex h-11 sm:w-20 sm:h-20 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/80">
                          {renderStatIcon(stat.iconName)}
                        </div>
                        <div>
                          <div className="text-base font-black text-[#1e3a8a]">
                            {stat.value}
                          </div>
                          <p className="text-sm font-medium text-[#64748b]">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </ScrollReveal>
          </div>

          {/* Bottom Grid: Areas of Expertise & Certifications */}
          <div className="mt-16 grid grid-cols-1 lg:gap-8 gap-3 sm:grid-cols-2">
            {/* Areas of Expertise Card */}
            <ScrollReveal direction="left">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white p-4 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-extrabold text-[#0f172a]">
                Areas of Expertise
              </h3>
              <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#a3e635]" />

              <ul className="mt-8 space-y-4">
                {data.areasOfExpertise?.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3.5 text-sm font-semibold text-[#334155]"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3b82f6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Background Light Graphic */}
              <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-10">
                <Wrench className="h-40 w-40 text-[#3b82f6]" />
              </div>
            </div>
            </ScrollReveal>

            {/* Certifications Card */}
            <ScrollReveal direction="right">
            <div className="rounded-[1.75rem] border border-slate-100 bg-white p-4 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-extrabold text-[#0f172a]">
                Certifications
              </h3>
              <div className="mt-2.5 h-[3px] w-10 rounded-full bg-[#a3e635]" />

              <div className="mt-8 space-y-6">
                {data.certifications?.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50/80 text-[#3b82f6]">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0f172a]">
                        {cert.title}
                      </h4>
                      <p className="mt-0.5 text-sm font-semibold text-[#64748b]">
                        {cert.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

const toSlug = (label: string) =>
  label.trim().toLowerCase().replace(/\s+/g, "-");

export default function PlumbingTeamDetails1({ data }: SectionProps) {
  const preview = useOptionalPreview();
  const record = (data ?? {}) as Record<string, unknown>;
  const slug = typeof record.slug === "string" ? record.slug : toSlug(preview?.currentPage ?? "");
  const members = (record.members as TeamDetailsData["members"] | undefined)
    ?? site.teamDetails.members;
  const detail = record.name
    ? record
    : members[slug] ?? getTeamMemberBySlug(slug) ?? Object.values(members)[0];
  const bannerData =
    (record.banner as TeamDetailsData["banner"] | undefined) ?? site.teamDetails.banner;
  return (
    <TeamDetails
      detailData={detail as never}
      bannerData={bannerData}
      appearance={plumbingBannerAppearance(data)}
    />
  );
}
