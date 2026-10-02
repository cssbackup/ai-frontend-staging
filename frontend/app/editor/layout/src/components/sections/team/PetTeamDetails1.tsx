"use client";

import type { SectionProps } from "../../../types/section";
import { useOptionalPreview } from "../../context/PreviewContext";
import { editorSlug } from "../pet/editorSlug";
import PetFrame from "../pet/PetFrame";
import { mergePetSite, PetSiteProvider, usePetSite } from "../pet/petSite";
import SubBanner from "../pet/views/ui/subbanner";
import TeamDetails from "../pet/views/layout/teamdetails/teamdetails";

function PetDetailBody() {
  const site = usePetSite();
  const preview = useOptionalPreview();
  const slug = editorSlug(preview?.currentPage || "");
  const members = site.teamDetails?.members || [];
  const member = members.find((item) => item.slug === slug || editorSlug(item.name || "") === slug) || members[0];
  if (!member) return null;
  return (
    <main className="min-h-screen bg-white">
      <SubBanner title={member.title} bgImage={member.bgImage || "/subbanner.jpg"} breadcrumbs={member.breadcrumbs} />
      <TeamDetails data={member} />
    </main>
  );
}

export default function PetTeamDetails1({ data }: SectionProps) {
  const site = mergePetSite(data as Record<string, unknown> | undefined, "teamDetails");
  return (
    <PetSiteProvider value={site}>
      <PetFrame>
        <PetDetailBody />
      </PetFrame>
    </PetSiteProvider>
  );
}
