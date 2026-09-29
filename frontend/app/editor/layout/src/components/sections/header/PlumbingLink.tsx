// @ts-nocheck
"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { getPageNameFromHref } from "../../../lib/pageVariantRouting";
import { useOptionalPreview } from "../../context/PreviewContext";

const scrollTemplateToTop = () => {
  const scrollContainer = document.querySelector<HTMLElement>(
    "[data-template-scroll]",
  );

  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

type PlumbingLinkProps = ComponentProps<typeof Link>;

export default function PlumbingLink({
  href,
  onClick,
  children,
  ...props
}: PlumbingLinkProps) {
  const preview = useOptionalPreview();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const target = typeof href === "string" ? href : href?.toString?.() ?? "";
    if (!preview || !target) return;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) return;

    event.preventDefault();
    preview.setCurrentPage(getPageNameFromHref(target));
    scrollTemplateToTop();
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
