// @ts-nocheck
"use client";

import { ServiceAboutPageData, site } from "../data/plumbing1";
import PlumbingAbout1 from "./PlumbingAbout1";
import PlumbingWhyChooseUs1 from "../whychooseus/PlumbingWhyChooseUs1";
import PlumbingInnerBanner1, { SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import CtaBanner from "../cta/PlumbingCTA1";
import { getPlumbingIcon, getPlumbingSocialItems, plumbingSocialHref } from "../../../lib/plumbingIcons";
import Image from "next/image";
import Link from "../header/PlumbingLink";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Mail } from "lucide-react";
import type { SectionProps } from "../../../types/section";

interface AboutUsProps {
  aboutData?: ServiceAboutPageData;
}

function AboutUs({ aboutData }: AboutUsProps) {
  const data = aboutData ?? site.aboutPage;

  const renderIcon = (iconName: string) => {
    const Icon = getPlumbingIcon(iconName);
    return <Icon className="h-6 w-6 text-[#2467EC]" />;
  };

  const renderSocialIcon = (label: string) => {
    const key = label.trim().toLowerCase();
    if (key === "facebook") return <FaFacebookF className="h-3.5 w-3.5" />;
    if (key === "twitter" || key === "x") return <FaTwitter className="h-3.5 w-3.5" />;
    if (key === "linkedin") return <FaLinkedinIn className="h-3.5 w-3.5" />;
    if (key === "instagram") return <FaInstagram className="h-3.5 w-3.5" />;
    if (key === "youtube") return <FaYoutube className="h-3.5 w-3.5" />;
    if (key === "email" || key === "mail") return <Mail className="h-3.5 w-3.5" />;
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

      {/* ABOUT SECTION */}
      <div
        {...plumbingEditorAttrs(
          "About",
          "pretitle title highlightedTitle sideImages badge subTitle heading desc stats button",
        )}
        className="relative"
      >
        <PlumbingAbout1 data={data as never} showButton={false} />
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div {...plumbingEditorAttrs("Why Choose Us", "whyChooseUs")} className="relative">
        <PlumbingWhyChooseUs1
          data={
            ((data as { whyChooseUs?: unknown }).whyChooseUs as never) ??
            (site.whyChooseUs as never)
          }
        />
      </div>

      {/* OUR VALUES SECTION */}
      {data?.ourValues && (
        <section
          {...plumbingEditorAttrs("Our Values", "ourValues")}
          className="relative bg-white pb-8  md:py-12"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHeader
              pretitle={data.ourValues.subTitle}
              title={data.ourValues.title}
              align="center"
            />

            <ScrollReveal direction="up">
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.ourValues.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF2FE]">
                      {renderIcon(item.iconName)}
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-[#1E293B]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#64748B]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* MEET OUR TEAM SECTION */}
      {data?.team && (
        <section
          {...plumbingEditorAttrs("Team", "team")}
          className="relative bg-white pb-8"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <SectionHeader
              pretitle={data.team.subTitle}
              title={data.team.title}
              align="center"
            />

            <ScrollReveal direction="up">
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.team.members?.map((member) => (
                  <div
                    key={member.id}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-slate-100">
                      <Link
                        href={`/teams/${member.slug}`}
                        className="relative block h-full w-full"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(min-width: 1024px) 288px, (min-width: 640px) 560px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col items-center pt-5 pb-2 text-center">
                      <Link href={`/teams/${member.slug}`}>
                        <h3 className="text-lg font-bold text-[#1E293B] transition-colors hover:text-[#2467EC]">
                          {member.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm font-medium text-[#64748B]">
                        {member.role}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        {getPlumbingSocialItems(member.socials).map((social) => (
                          <a
                            key={`${member.id}-${social.label}`}
                            href={plumbingSocialHref(social)}
                            target={/^(mailto:|tel:)/i.test(plumbingSocialHref(social)) ? undefined : "_blank"}
                            rel="noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2467EC] text-white transition-opacity hover:opacity-80"
                          >
                            {renderSocialIcon(social.label)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA BANNER SECTION */}
      {data?.ctaBanner && (
        <section
          {...plumbingEditorAttrs("CTA Banner", "ctaBanner")}
          className="py-8"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <ScrollReveal direction="up">
              <CtaBanner
                variant="about"
                title={data.ctaBanner.title}
                description={data.ctaBanner.desc}
                buttonLabel={data.ctaBanner.phoneLabel}
                buttonHref={data.ctaBanner.phoneHref}
                buttonIcon={data.ctaBanner.buttonIcon || "phone"}
                media={{
                  type: "image",
                  src: data.ctaBanner.image || "/categories/industry/template1/aboutcta.png",
                  alt: "Plumber Icon",
                  sizes: "(min-width: 640px) 128px, 96px",
                }}
              />
            </ScrollReveal>
          </div>
        </section>
      )}
    </main>
  );
}

export default function PlumbingAboutPage1({ data }: SectionProps) {
  return <AboutUs aboutData={(data as typeof site.aboutPage | undefined) ?? site.aboutPage} />;
}
