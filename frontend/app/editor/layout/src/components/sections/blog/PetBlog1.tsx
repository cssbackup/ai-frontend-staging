"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../pet/petSite";
import Blogs from "../pet/views/homelayout/blogs";

export default function PetBlog1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "ourBlogs" || undefined);
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <Blogs />
      </PetFrame>
    </PetSiteProvider>
  );
}
