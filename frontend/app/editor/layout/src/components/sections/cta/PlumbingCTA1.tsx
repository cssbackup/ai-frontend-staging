// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "../header/PlumbingLink";
import { ReactNode } from "react";
import { Phone, PhoneCall, ArrowRight } from "lucide-react";
import { getPlumbingIcon } from "../../../lib/plumbingIcons";

export type CtaMedia =
  | { type: "icon"; icon: ReactNode }
  | { type: "image"; src: string; alt?: string; sizes?: string };

export type CtaBannerVariant = "about" | "blog" | "faq" | "award";

interface CtaBannerProps {
  title: string;
  description?: string;
  buttonLabel: string;
  buttonHref: string;
  media?: CtaMedia;
  variant?: CtaBannerVariant;
  buttonIcon?: string;
}

interface CtaBannerTheme {
  container: string;
  left: string;
  textBlock: string;
  title: string;
  desc: string;
  mediaWrapper: string;
  imageClassName: string;
  buttonWrap: string;
  button: string;
  buttonIcon: ReactNode;
  isPhoneCall: boolean;
}

const themes: Record<CtaBannerVariant, CtaBannerTheme> = {
  about: {
    container:
      "relative flex flex-col items-center justify-between rounded-2xl bg-[#0459E8] px-6 py-8 sm:px-10 md:py-10 lg:flex-row shadow-lg",
    left: "flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left",
    textBlock: "",
    title: "text-2xl font-bold text-white md:text-3xl",
    desc: "mt-2 max-w-xl text-sm font-medium text-blue-100 md:text-base",
    mediaWrapper: "relative h-20 w-24 shrink-0 sm:h-24 sm:w-32",
    imageClassName: "object-contain",
    buttonWrap: "mt-6 shrink-0 lg:mt-0",
    button:
      "inline-flex items-center gap-3 rounded-full bg-white sm:px-7 px-2 py-3.5 text-base font-bold text-[#0459E8] shadow-md transition-transform hover:scale-105",
    buttonIcon: (
      <Phone className="h-5 w-5 fill-[#0459E8] text-[#0459E8]" />
    ),
    isPhoneCall: false,
  },

  blog: {
    container:
      "mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#0047FF] px-6 py-6 text-white shadow-lg sm:px-10 md:flex-row",
    left: "flex items-center gap-4 text-center md:text-left",
    textBlock: "",
    title: "text-[20px] font-extrabold leading-snug text-white sm:text-[22px]",
    desc: "mt-0.5 text-[13px] font-medium text-white/80 sm:text-[14px]",
    mediaWrapper:
      "hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm",
    imageClassName: "object-cover",
    buttonWrap: "shrink-0",
    button:
      "inline-flex items-center gap-2.5 rounded-full bg-white sm:px-7 px-3 py-3 text-[14px] font-extrabold text-[#0047FF] shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md",
    buttonIcon: (
      <PhoneCall className="h-4 w-4 fill-current text-[#0047FF]" />
    ),
    isPhoneCall: true,
  },

  faq: {
    container:
      "mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#EEF2FF] p-6 text-center sm:flex-row sm:p-8 sm:text-left",
    left: "flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5",
    textBlock: "flex flex-col items-center sm:items-start",
    title: "text-xl font-bold text-[#0F172A]",
    desc: "mt-1 text-sm font-medium text-[#64748B]",
    mediaWrapper:
      "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0052CC]",
    imageClassName: "object-cover",
    buttonWrap: "",
    button:
      "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0052CC] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0041A3]",
    buttonIcon: <ArrowRight className="h-4 w-4" />,
    isPhoneCall: false,
  },

  award: {
    container:
      "mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-blue-50/60 p-6 sm:flex-row sm:p-8",
    left: "flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left",
    textBlock: "",
    title: "text-base font-bold text-[#0F172A] sm:text-lg",
    desc: "mt-1 max-w-xl text-sm font-medium text-[#64748B] sm:text-sm",
    mediaWrapper:
      "h-14 sm:w-28 sm:h-28 w-14 shrink-0 items-center justify-center rounded-full text-[#0052CC] sm:flex",
    imageClassName: "object-cover",
    buttonWrap: "",
    button:
      "inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0052CC] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#0043A8] active:scale-[0.98] sm:text-sm",
    buttonIcon: <ArrowRight className="h-4 w-4" />,
    isPhoneCall: false,
  },
};

export default function PlumbingCTA1({
  title,
  description,
  buttonLabel,
  buttonHref,
  media,
  variant = "about",
  buttonIcon,
}: CtaBannerProps) {
  const theme = themes[variant];
  const href = theme.isPhoneCall
    ? `tel:${buttonHref.replace(/\s+/g, "")}`
    : buttonHref;
  const ButtonIcon = buttonIcon ? getPlumbingIcon(buttonIcon) : null;

  return (
    <div className={theme.container}>
      {/* Left Side: Media + Title/Description */}
      <div className={theme.left}>
        {media?.type === "image" ? (
          <div className={theme.mediaWrapper}>
            <Image
              src={media.src}
              alt={media.alt || title}
              fill
              sizes={media.sizes}
              className={theme.imageClassName}
            />
          </div>
        ) : media?.type === "icon" ? (
          <div className={theme.mediaWrapper}>{media.icon}</div>
        ) : null}

        <div className={theme.textBlock}>
          <h3 className={theme.title}>{title}</h3>
          {description && <p className={theme.desc}>{description}</p>}
        </div>
      </div>

      {/* Right Side: Call / Action Button */}
      <div className={theme.buttonWrap}>
        <Link href={href} className={theme.button}>
          {ButtonIcon ? <ButtonIcon className="h-5 w-5" /> : theme.buttonIcon}
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}