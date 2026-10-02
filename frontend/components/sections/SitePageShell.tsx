"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import HomeNav from "@/components/home/home-nav";
import HomeFooter from "@/components/layout/home-footer";
import { UserAuthProvider } from "@/components/auth/UserAuthContext";

type SitePageShellProps = {
  title: ReactNode;
  subtitle: string;
  cta?: { label: string; href: string };
  bandTitle: string;
  children: ReactNode;
};

export default function SitePageShell({
  title,
  subtitle,
  cta,
  bandTitle,
  children,
}: SitePageShellProps) {
  return (
    <UserAuthProvider>
      <div className="min-h-dvh bg-white text-zinc-950">
        <HomeNav variant="light" />

        <header className="px-5 pb-8 pt-10 text-center sm:px-8 sm:pb-10 sm:pt-14">
          <h1 className="mx-auto max-w-[760px] text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.045em]">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-neutral-600 sm:text-base">
            {subtitle}
          </p>
          {cta ? (
            <Link
              href={cta.href}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-neutral-800 md:mt-6"
            >
              {cta.label}
            </Link>
          ) : null}
        </header>

        <section
          aria-label={bandTitle}
          className="relative overflow-hidden bg-gradient-to-b from-[#2d7bff] via-[#6eb0ff] to-white px-5 pt-10 pb-10 text-center sm:px-8 sm:py-20"
        >
          <p className="mx-auto max-w-[640px] text-lg font-medium tracking-[-0.03em] text-white sm:text-2xl">
            {bandTitle}
          </p>
        </section>

        <div className="bg-white">{children}</div>
        <HomeFooter />
      </div>
    </UserAuthProvider>
  );
}
