// @ts-nocheck
"use client";

import type { SectionProps } from "../../../types/section";
import { site } from "../data/plumbing1";
import PlumbingLegalLayout from "../legal/PlumbingLegalLayout";

export default function PlumbingTermsConditions1({ data }: SectionProps) {
  return (
    <PlumbingLegalLayout
      legalData={(data as typeof site.legal.terms | undefined) ?? site.legal.terms}
    />
  );
}
