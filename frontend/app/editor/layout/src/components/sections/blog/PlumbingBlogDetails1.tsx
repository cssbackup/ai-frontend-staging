// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import Link from "../header/PlumbingLink";
import { BlogDetailData, BlogPost } from "../types/plumbing";
import type { InnerBannerAppearance } from "../../../types/innerBannerAppearance";
import PlumbingInnerBanner1, {ScrollReveal, plumbingBannerAppearance, plumbingEditorAttrs } from "../banner/PlumbingInnerBanner1";
import { Wrench, Settings, Droplets, Flame, Calendar } from "lucide-react";
import type { SectionProps } from "../../../types/section";
import { getBlogBySlug, site } from "../data/plumbing1";
import { useOptionalPreview } from "../../context/PreviewContext";

interface BlogDetailsProps {
  detailData: BlogDetailData;
  recentPosts?: BlogPost[];
  appearance?: InnerBannerAppearance;
}

const iconMap: Record<string, React.ReactNode> = {
  wrench: <Wrench className="h-4 w-4" />,
  tools: <Wrench className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
  "water-heater": <Flame className="h-4 w-4" />,
  drain: <Droplets className="h-4 w-4" />,
};

function BlogDetailsPage({
  detailData,
  recentPosts = [],
  appearance,
}: BlogDetailsProps) {
  if (!detailData) return null;

  const { banner, post, sidebar } = detailData;

  const currentSlug = detailData.slug.replace(/^blogs\//, "");
  const filteredPosts = recentPosts.filter(
    (p) => p.slug.replace(/^blogs\//, "") !== currentSlug
  );

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

      {/* BLOG CONTENT + SIDEBAR */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* Main Blog Post Content */}
            <div
              {...plumbingEditorAttrs("Article", "post")}
              className="lg:col-span-2"
            >
            <ScrollReveal direction="left" className="lg:col-span-2">
            <article className="lg:col-span-2 space-y-8">
                 <h1 className="text-3xl md:text-5xl font-semibold text-[#081a46]">{post.title}</h1>
              <p className="text-lg leading-relaxed text-[#64748B]">{post.intro}</p>
              <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-md">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  sizes="(min-width: 1024px) 752px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* <div className="flex items-center gap-6 border-b pb-4 text-sm text-[#64748B]">
                <span>{post.date}</span>
                <span>By {post.author}</span>
              </div> */}

             

              {/* Rendered Points/Steps */}
              <div className="space-y-6 pt-4">
                {post.points?.map((point) => (
                  <div
                    key={point.step}
                    className="rounded-2xl border  border-slate-100 bg-[#FAFBFD] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                  >
                    <h3 className="text-xl font-bold text-[#081a46]">
                      {point.step}. {point.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-[#64748B]">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
            </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div {...plumbingEditorAttrs("Sidebar", "sidebar")}>
            <ScrollReveal direction="right">
            <aside className="space-y-8">
              {/* Categories List */}
              {/* {sidebar?.categories && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <h3 className="mb-4 border-b pb-3 text-xl font-bold text-[#0F172A]">
                    Categories
                  </h3>
                  <ul className="space-y-3">
                    {sidebar.categories.map((cat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between text-sm text-[#64748B] transition hover:text-[#0052CC]"
                      >
                        <span className="flex items-center gap-2">
                          {cat.icon && iconMap[cat.icon]}
                          {cat.name}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm">
                          {cat.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Recent Posts List */}
              {filteredPosts.length > 0 && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <h3 className="mb-4 border-b pb-3 text-xl font-bold text-[#0F172A]">
                    Recent Posts
                  </h3>
                  <ul className="space-y-4">
                    {filteredPosts.slice(0, 4).map((item) => (
                      <li key={item.id} className="group flex items-start gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/${item.slug}`}
                            className="line-clamp-2 text-sm font-semibold text-[#0F172A] transition-colors group-hover:text-[#0052CC]"
                          >
                            {item.title}
                          </Link>
                          <div className="mt-1 flex items-center gap-1.5 text-sm text-[#94A3B8]">
                            <Calendar className="h-3 w-3" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sidebar CTA Card */}
              {sidebar?.cta && (
                <div className="rounded-2xl bg-[#0052CC] p-6 text-white shadow-lg">
                  <h3 className="text-2xl font-bold">{sidebar.cta.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100">
                    {sidebar.cta.description}
                  </p>
                  <Link
                    href={sidebar.cta.buttonHref}
                    className="mt-4 inline-block w-full rounded-xl bg-white py-3 text-center font-semibold text-[#0052CC] transition hover:bg-blue-50"
                  >
                    {sidebar.cta.buttonLabel}
                  </Link>
                </div>
              )}
            </aside>
            </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

const toSlug = (label: string) =>
  label.trim().toLowerCase().replace(/\s+/g, "-");

export default function PlumbingBlogDetails1({ data }: SectionProps) {
  const preview = useOptionalPreview();
  const record = (data ?? {}) as Record<string, unknown>;
  const slug = typeof record.slug === "string" ? record.slug : toSlug(preview?.currentPage ?? "");
  const items = Array.isArray(record.blogDetailItems)
    ? (record.blogDetailItems as BlogDetailData[])
    : Object.values(site.blogDetails);
  const detail = record.post
    ? record
    : items.find((item) => item.slug === slug) ?? getBlogBySlug(slug) ?? items[0];
  return (
    <BlogDetailsPage
      detailData={detail as never}
      recentPosts={site.blog.posts}
      appearance={plumbingBannerAppearance(data)}
    />
  );
}
