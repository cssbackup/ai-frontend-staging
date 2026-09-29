// @ts-nocheck
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "../header/PlumbingLink";
import PlumbingInnerBanner1, {SectionHeader, ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { ProjectSectionVariantData } from "../types/plumbing";
import { MapPin, ArrowRight } from "lucide-react";
import type { SectionProps } from "../../../types/section";
import { plumbingItemsPerRowClass } from "../../../lib/plumbingIcons";

interface ProjectProps {
  projectData?: ProjectSectionVariantData;
}

function Project({ projectData }: ProjectProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  if (!projectData) return null;

  const { banner, tagline, title, description, categories, projects } =
    projectData;

  const resolveProjectCategoryId = (item: {
    category?: string;
    categoryLabel?: string;
  }) => {
    const raw = (item.category || "").trim().toLowerCase();
    const byId = categories?.find(
      (category) => (category.id || "").toLowerCase() === raw,
    );
    if (byId) return (byId.id || "").toLowerCase();

    const label = (item.categoryLabel || "").trim().toLowerCase();
    const byLabel = categories?.find((category) => {
      const categoryLabel = (category.label || "").toLowerCase();
      return categoryLabel === raw || (label && categoryLabel === label);
    });
    return (byLabel?.id || item.category || "").toLowerCase();
  };

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects?.filter(
          (item) => resolveProjectCategoryId(item) === activeCategory.toLowerCase(),
        );

  return (
    <main>
      {/* PAGE BANNER */}
      {banner && (
        <PlumbingInnerBanner1
          appearance={plumbingBannerAppearance(projectData)}
          title={banner.title}
          breadcrumbHome={banner.breadcrumbHome}
          breadcrumbCurrent={banner.breadcrumbCurrent}
          backgroundImage={banner.backgroundImage}
          homeHref={banner.homeHref}
        />
      )}

      {/* PORTFOLIO / PROJECTS GRID SECTION */}
      <section
        {...plumbingEditorAttrs("Projects", "tagline title description categories projects itemsPerRow")}
        className="bg-[#FAFBFD] py-8 md:py-10"
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <SectionHeader
            pretitle={tagline}
            title={title}
            description={description}
            align="center"
            className="mx-auto max-w-2xl"
          />

          {/* Filter Categories */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories?.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full cursor-pointer px-5 py-2 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#0052CC] text-white shadow-md shadow-blue-500/20"
                      : "border border-slate-200 bg-white text-[#0052CC] hover:border-[#0052CC] hover:text-[#0052CC]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Projects Card Grid */}
          <ScrollReveal direction="up">
          <div className={`mt-12 grid ${plumbingItemsPerRowClass(projectData.itemsPerRow, 4)} gap-6`}>
            {filteredProjects?.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 288px, (min-width: 640px) 600px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-2">
                  <div>
                    {/* Category Label */}
                    <span className="inline-block rounded-md bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-[#0052CC]">
                      {categories?.find((cat) => cat.id === project.category)?.label || project.categoryLabel}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2.5 h-10 line-clamp-2 text-base font-extrabold leading-5 text-[#0F172A] transition-colors group-hover:text-[#0052CC]">
                      {project.title}
                    </h3>

                    {/* Location */}
                    <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#64748B]">
                      <MapPin className="h-3.5 w-3.5 text-[#64748B]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* View Project Link */}
                  <div className="mt-0 border-t border-slate-100 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052CC] transition-all hover:gap-2"
                    >
                      <span>{project.linkText || "View Project"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

export default function PlumbingProject1({ data }: SectionProps) {
  return <Project projectData={data as never} />;
}
