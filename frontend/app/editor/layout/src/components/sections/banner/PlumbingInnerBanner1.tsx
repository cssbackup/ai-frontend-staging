// @ts-nocheck
"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOptionalPreview } from "../../context/PreviewContext";
import { Droplet } from "lucide-react";
import Image from "next/image";
import Link from "../header/PlumbingLink";
import {
  getInnerBannerBackground,
  getInnerBannerHeight,
  type InnerBannerAppearance,
} from "../../../types/innerBannerAppearance";

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  staggerChildren?: number;
  index?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
  once = true,
  className = "",
  staggerChildren,
  index,
}: ScrollRevealProps) {

  const isPreview = useOptionalPreview()?.isPreview ?? true;
  const reducedMotion = useReducedMotion();
  const animate = isPreview && !reducedMotion;

  const childDelay = typeof index === "number" && typeof staggerChildren === "number"
    ? delay + index * staggerChildren
    : delay;

  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };

      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 },
        };

      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 },
        };

      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 },
        };

      case "scale":
        return {
          hidden: {
            opacity: 0,
            scale: 0.85,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        };

      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={`${className} will-change-transform`}
      variants={getVariants()}
      initial={animate ? "hidden" : false}
      whileInView="visible"
      viewport={{
        once,
        amount: 0.1,
        margin: "0px",
      }}
      transition={{
        duration,
        delay: childDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  pretitle?: string;
  title?: string | { normal: string; highlighted?: string };
  description?: string;
  align?: "center" | "left";
  titleAs?: "h1" | "h2" | "h3" | "span";
  highlightClassName?: string;
  descriptionMaxWidth?: string;
  className?: string;
}

export function SectionHeader({
  pretitle,
  title,
  description,
  align = "center",
  titleAs = "h2",
  highlightClassName = "text-[#0F172A]",
  descriptionMaxWidth = "max-w-xl",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  const titleContent = (() => {
    if (!title) return null;
    if (typeof title === "string") return title;
    return (
      <>
        {title.normal}{" "}
        {title.highlighted && <span className={highlightClassName}>{title.highlighted}</span>}
      </>
    );
  })();

  const TitleTag = titleAs;

  return (
    <ScrollReveal direction="up">
      <div
        className={`flex flex-col ${
          isCenter ? "items-center text-center" : "items-start text-left"
        } ${className}`}
      >
      {pretitle && (
        <>
          <span className="text-sm font-black uppercase tracking-widest text-[#0052CC]">
            {pretitle}
          </span>
        </>
      )}

      {title && (
        <TitleTag className="mt-0 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
          {titleContent}
        </TitleTag>
      )}

      {/* Decorative Droplet Divider */}
      <div
        className={`mt-2 flex items-center ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <div className="h-[2px] w-8 bg-[#84CC16]" />
        <Droplet className="mx-2 h-4 w-4 fill-[#0052CC] text-[#0052CC]" />
        <div className="h-[2px] w-8 bg-[#84CC16]" />
      </div>

      {description && (
        <p
          className={`mt-4 ${descriptionMaxWidth} text-sm font-medium leading-relaxed text-[#64748B] sm:text-base`}
        >
          {description}
        </p>
      )}
      </div>
    </ScrollReveal>
  );
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbHome?: string;
  breadcrumbCurrent?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage: string;
  homeHref?: string;
  appearance?: InnerBannerAppearance;
  editorFields?: string[];
}

export function plumbingBannerAppearance(data: unknown): InnerBannerAppearance | undefined {
  if (!data || typeof data !== "object") return undefined;
  return (data as { innerBannerAppearance?: InnerBannerAppearance }).innerBannerAppearance;
}

export function plumbingEditorAttrs(label: string, fields: string) {
  return {
    "data-editor-section-label": label,
    "data-editor-fields": fields,
  };
}

export default function PlumbingInnerBanner1({
  title,
  breadcrumbHome = "Home",
  breadcrumbCurrent,
  breadcrumbs,
  backgroundImage,
  homeHref = "/",
  appearance,
  editorFields = ["banner"],
}: PageBannerProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
  const background = getInnerBannerBackground(appearance);
  const height = getInnerBannerHeight(appearance);
  const textStyle = { color: appearance?.textColor };

  return (
    <section
      data-editor-section-label="Page Banner"
      data-editor-fields={editorFields.join(" ")}
      className={
        height
          ? "relative -mt-20 flex w-full items-center overflow-hidden bg-[#062536] pt-20 sm:-mt-24 sm:pt-24"
          : "relative -mt-20 flex min-h-[380px] w-full items-center overflow-hidden bg-[#062536] pt-20 sm:-mt-24 md:min-h-[380px] sm:pt-24"
      }
      style={{ background, ...(height ? { height, minHeight: height } : {}) }}
    >
      {/* Background Image */}
      {!background && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#031c29]/80" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-12 md:px-10 lg:px-8">
        <ScrollReveal direction="down" distance={40}>
          <div className="text-left">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white md:text-4xl lg:text-5xl" style={textStyle}>
              {title}
            </h1>

            {/* Breadcrumb */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-white md:text-base">
              <Link
                href={homeHref}
                className="transition-opacity hover:opacity-80"
                style={textStyle}
              >
                {breadcrumbHome}
              </Link>

              {hasBreadcrumbs
                ? breadcrumbs.map((crumb, idx) => (
                    <span key={idx} className="flex items-center gap-3">
                      <span className="text-xl leading-none">»</span>
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="transition-opacity hover:opacity-80"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                    </span>
                  ))
                : breadcrumbCurrent && (
                    <>
                      <span className="text-xl leading-none">»</span>
                      <span>{breadcrumbCurrent}</span>
                    </>
                  )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
