"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import BlogSec from "../pet/views/layout/blogs/blogsec";

export default function PetBlogPage1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "blogSec" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <main className="w-full min-h-screen">
          <SubBanner pageKey="blog" />
          <BlogSec />
        </main>
      </PetFrame>
    </PetSiteProvider>
  );
}
