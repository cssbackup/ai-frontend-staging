// @ts-nocheck
"use client";

import Link from "../header/PlumbingLink";
import { ServiceLegalPageData } from "../types/plumbing";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";

interface LegalProps {
  legalData?: ServiceLegalPageData;
}

export default function PlumbingLegalLayout({ legalData }: LegalProps) {
  if (!legalData) return null;

  return (
    <main>
      {/* PAGE BANNER */}
      {legalData.banner && (
        <PlumbingInnerBanner1
          appearance={plumbingBannerAppearance(legalData)}
          title={legalData.banner.title}
          breadcrumbHome={legalData.banner.breadcrumbHome}
          breadcrumbCurrent={legalData.banner.breadcrumbCurrent}
          backgroundImage={legalData.banner.backgroundImage}
          homeHref={legalData.banner.homeHref}
        />
      )}

      {/* LEGAL CONTENT SECTION */}
      <section
        {...plumbingEditorAttrs("Policy Content", "title lastUpdated intro sections")}
        className="bg-[#FAFBFD] py-8 md:py-12"
      >
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
          <ScrollReveal direction="up">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] ">
            
            {/* Main Title & Last Updated */}
            <SectionHeader title={legalData.title} align="left" titleAs="h1" />

            {legalData.lastUpdated && (
              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-[#64748B]">
                Last Updated: <span className="text-[#0052CC]">{legalData.lastUpdated}</span>
              </p>
            )}

            {/* Intro Text */}
            {legalData.intro && (
              <p className="mt-6 text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                {legalData.intro}
              </p>
            )}

            {/* Document Sections */}
            {legalData.sections && legalData.sections.length > 0 && (
              <div className="mt-10 flex flex-col gap-8">
                {legalData.sections.map((sec) => (
                  <div key={sec.id} className="flex flex-col gap-2.5">
                    <h2 className="text-lg font-extrabold text-[#0F172A] sm:text-xl">
                      {sec.title}
                    </h2>
                    
                    <p className="text-sm font-medium leading-relaxed text-[#64748B] sm:text-base">
                      {sec.content}
                    </p>

                    {/* Optional Contact Block in Section */}
                    {sec.contactInfo && (
                      <div className="mt-2 flex flex-col gap-1.5 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-[#0F172A]">
                        {sec.contactInfo.email && (
                          <p>
                            Email:{" "}
                            <Link
                              href={`mailto:${sec.contactInfo.email}`}
                              className="text-[#84CC16] hover:underline"
                            >
                              {sec.contactInfo.email}
                            </Link>
                          </p>
                        )}
                        {sec.contactInfo.phone && (
                          <p>
                            Phone:{" "}
                            <span className="text-[#475569]">
                              {sec.contactInfo.phone}
                            </span>
                          </p>
                        )}
                        {sec.contactInfo.address && (
                          <p>
                            Address:{" "}
                            <span className="text-[#475569]">
                              {sec.contactInfo.address}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
