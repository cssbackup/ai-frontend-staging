import type { Metadata } from "next";
import PricingPage from "@/components/sections/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starter is free on a shared URL. Core adds AI, hosting, and your own domain.",
};

export default function PricingRoute() {
  return <PricingPage />;
}
