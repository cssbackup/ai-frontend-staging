// @ts-nocheck
"use client";

import { ServiceBlogData, site } from "../data/plumbing1";
import PlumbingInnerBanner1, {ScrollReveal, plumbingBannerAppearance } from "../banner/PlumbingInnerBanner1";
import PlumbingBlog1 from "./PlumbingBlog1";
import type { SectionProps } from "../../../types/section";

interface BlogProps {
  blogData?: ServiceBlogData;
}

function Blog({ blogData }: BlogProps) {
  const data = blogData ?? (site.blog as unknown as ServiceBlogData);

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

      {/* BLOG SECTION */}
      <ScrollReveal direction="up">
        <PlumbingBlog1 data={data as never} variant="blog" />
      </ScrollReveal>
    </main>
  );
}

export default function PlumbingBlogPage1({ data }: SectionProps) {
  return <Blog blogData={(data as typeof site.blog | undefined) ?? site.blog} />;
}
