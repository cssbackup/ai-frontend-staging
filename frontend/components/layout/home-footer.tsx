import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const footerResourceLinks = [
  ["Help center", "/help-center"],
  ["How it works", "/#how-it-works"],
  ["Cookie Preferences", "/cookie-preferences"],
] as const;

export const footerCompanyLinks = [
  ["Pricing", "/pricing"],
  ["Cookie Policy", "/cookie-policy"],
  ["Terms of Service", "/terms"],
] as const;

export const footerLegalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
] as const;

export default function HomeFooter({ onStart }: { onStart?: () => void }) {
  return (
    <footer className="relative overflow-hidden bg-[#0b1220] px-5 pb-6 pt-10 text-white sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1680ff]/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(22,128,255,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="grid items-start gap-x-12 gap-y-8 border-b border-white/10 pb-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_auto_auto]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/lestow-logo.svg"
              alt="Lestow AI Website Builder"
              width={146}
              height={46}
              className="h-[46px] w-[146px] brightness-0 invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/85">
              Build production-ready applications through conversation. Work
              with AI agents that design, develop, and deploy your app from idea
              to launch.
            </p>
            {onStart ? (
              <button
                type="button"
                onClick={onStart}
                className="mt-5 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#8ec5ff] transition hover:text-white"
              >
                Start building
                <ArrowRight size={15} aria-hidden />
              </button>
            ) : (
              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8ec5ff] transition hover:text-white"
              >
                Start building
                <ArrowRight size={15} aria-hidden />
              </Link>
            )}
          </div>
          <FooterColumn title="Resources" links={footerResourceLinks} />
          <FooterColumn title="Company" links={footerCompanyLinks} />
        </div>
        <div className="flex flex-col gap-4 pt-5 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {new Date().getFullYear()} Lestow. All rights reserved.
          </p>
          <div className="flex shrink-0 flex-wrap justify-start gap-6 whitespace-nowrap sm:min-w-[280px] sm:justify-end">
            {footerLegalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="leading-5 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[.16em] text-white/90">
        {title}
      </h3>
      <ul className="mt-5 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="block text-sm font-medium leading-6 text-white/80 transition hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
