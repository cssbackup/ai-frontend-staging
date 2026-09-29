import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn why Lestow builds an AI website builder for teams that want to ship, not wrestle with tools.",
};

export default function AboutPage() {
  return <AboutUs />;
}
