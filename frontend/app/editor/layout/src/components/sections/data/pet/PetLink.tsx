"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { getPageNameFromHref } from "../../../../lib/pageVariantRouting";
import { useOptionalPreview } from "../../../context/PreviewContext";
import { editorSlug } from "./editorSlug";

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

type PetLinkProps = ComponentProps<typeof Link>;

export default function PetLink({
  href,
  onClick,
  children,
  ...props
}: PetLinkProps) {
  const preview = useOptionalPreview();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const target = typeof href === "string" ? href : href?.toString?.() ?? "";
    if (!preview || !target) return;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) return;
    event.preventDefault();
    const slug = editorSlug(getPageNameFromHref(target));
    const links = preview.pageLinks.flatMap(function walk(link): typeof preview.pageLinks {
      return [link, ...(link.children || []).flatMap(walk)];
    });
    const match = links.find((link) => {
      const fromHref = editorSlug(String(link.href || "").replace(/^#page-/i, ""));
      return editorSlug(link.label) === slug || fromHref === slug;
    });
    preview.setCurrentPage(match?.label || getPageNameFromHref(target));
    scrollTemplateToTop();
  };
  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
