"use client";

import type { SectionProps } from "../../../types/section";
import PetFrame from "../data/pet/PetFrame";
import { mergePetSite, PetSiteProvider } from "../data/pet/petSite";
import Blogs from "./PetBlogsHome";

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
