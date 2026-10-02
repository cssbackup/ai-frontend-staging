"use client";

import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";
import { editorSlug } from "../pet/editorSlug";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider, usePetSite } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import BlogContent from "../pet/views/layout/blogdetails/blogcontent";
import BlogSidebar from "../pet/views/layout/blogdetails/blogsidebar";

function PetDetailBody() {
  const site = usePetSite();
  const preview = useOptionalPreview();
  const slug = editorSlug(preview?.currentPage || "");
  const posts = site.blogDetails?.posts || [];
  const post = posts.find((item) => item.slug === slug || editorSlug(item.title || "") === slug) || posts[0];
  if (!post) return null;
  const allPosts = site.ourBlogs?.posts || site.blogSec?.posts || [];
  return (
    <main className="min-h-screen">
      <SubBanner title={post.title || "Blog Detail"} breadcrumbs={post.breadcrumbs} bgImage={post.bgImage} />
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 lg:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8">
            <BlogContent data={post} />
          </div>
          <div className="lg:col-span-4">
            <BlogSidebar data={site.blogSidebar} posts={allPosts} currentSlug={post.slug} currentCategory={post.category} allBlogDetails={posts} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PetBlogDetails1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "blogDetails");
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <PetDetailBody />
      </PetFrame>
    </PetSiteProvider>
  );
}
