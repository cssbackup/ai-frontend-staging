// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowRight, ShieldAlert } from "lucide-react";
import { ServiceBlogData, site } from "../data/plumbing1";
import { SectionHeader, ScrollReveal, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import CtaBanner from "../cta/PlumbingCTA1";
import type { SectionProps } from "../../../types/section";

interface BlogSectionProps {
  blogData: ServiceBlogData;
  variant?: "home" | "blog";
}
// Access Data safely (Runtime)

function BlogSection({
  blogData,
  variant = "home",
}: BlogSectionProps) {
  const data = blogData;

  // Fallback Blog Cards matching the reference image exactly
  const allPosts = data?.posts || [];

  // Home: show 4 in a 4-column grid. Blog: show 6 in a 3-column grid (2 rows).
  const isBlogPage = variant === "blog";
  const posts = isBlogPage ? allPosts.slice(0, 6) : allPosts.slice(0, 4);
  const gridClass = isBlogPage
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  // CTA Banner Fallback Data
  const cta = data?.CtaBanner;

  const Wrapper = isBlogPage ? "main" : "section";

  return (
    <Wrapper className="w-full bg-whitex py-8 px-4 sm:px-6 lg:px-8">
      <div
        {...(isBlogPage
          ? plumbingEditorAttrs("Blog", "badge title posts")
          : {})}
        className="mx-auto max-w-[1320px]"
      >
        {/* SECTION HEADER */}
        <SectionHeader
          pretitle={data.badge}
          title={data.title}
          align="center"
          className="mb-10"
        />

        {/* BLOG CARDS GRID: home 4 per row, blog page 3 per row */}
        <ScrollReveal direction="up">
        <div className={`grid gap-6 ${gridClass}`}>
          {posts.map((post: any) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.image?.alt || post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  {/* Post Date */}
                  <div className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold text-[#94A3B8]">
                    <Calendar className="h-3.5 w-3.5 text-[#94A3B8]" />
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 text-[15px] sm:text-[20px] font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E40AF]">
                    {post.title}
                  </h3>

                  {isBlogPage && (
                    <p className="text-slate-700 pt-5">{post.description}</p>
                  )}
                </div>

                {/* Read More Link */}
                <div className="mt-3">
                  <a
                    href={post.slug || "#"}
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1E40AF] hover:underline"
                  >
                    {post.readMoreText}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        </ScrollReveal>
      </div>

        {/* CTA BANNER BELOW BLOGS */}
        <div
          {...(isBlogPage
            ? plumbingEditorAttrs("CTA Banner", "CtaBanner")
            : {})}
          className="mx-auto max-w-[1320px]"
        >
        <ScrollReveal direction="up">
          <CtaBanner
            variant="blog"
            title={cta.title}
            description={cta.desc}
            buttonLabel={cta.button.label}
            buttonHref={cta.button.href}
            buttonIcon={cta.buttonIcon || "phone"}
            media={
              cta.image
                ? {
                    type: "image",
                    src: cta.image,
                    alt: cta.title,
                    sizes: "48px",
                  }
                : {
                    type: "icon",
                    icon: <ShieldAlert className="h-6 w-6 text-white" />,
                  }
            }
          />
        </ScrollReveal>
        </div>
    </Wrapper>
  );
}

export default function PlumbingBlog1({
  data,
  variant = "home",
}: SectionProps & { variant?: "home" | "blog" }) {
  return (
    <BlogSection
      blogData={(data as typeof site.blog | undefined) ?? site.blog}
      variant={variant}
    />
  );
}
