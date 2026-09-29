"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GOOGLE_ADS_ID = "AW-18402848218";

/** Lestow app pages only — never inject into customer /published sites. */
export default function GoogleAdsTag() {
  const pathname = usePathname() || "";
  if (pathname.startsWith("/published")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
