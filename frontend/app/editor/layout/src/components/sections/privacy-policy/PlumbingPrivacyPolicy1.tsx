// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { site } from "../data/plumbing1";
import PlumbingLegalLayout from "../legal/PlumbingLegalLayout";

export default function PlumbingPrivacyPolicy1({ data }: SectionProps) {
  return (
    <PlumbingLegalLayout
      legalData={(data as typeof site.legal.privacy | undefined) ?? site.legal.privacy}
    />
  );
}
